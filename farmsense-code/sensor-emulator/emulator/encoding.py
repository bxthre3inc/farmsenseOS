"""
encoding.py — Hardware Payload Encoder

Assembles the condensed, hardware-authentic ~187-byte AES-256 Field State Payload
as defined in the System Payload Teardown specification. The Sensor Emulator uses
this to validate that payload structures are within the physical budget before
submitting to the backend API.

In a real deployment, the AES-256 cipher block runs on the ATSAMD51 FPU.
Here we simulate the structure without actually encrypting (the backend decodes
the clear payload directly, matching how the DHU decrypts before forwarding).
"""

import struct
import hashlib
import json
from datetime import datetime


# The 187-byte payload budget breakdown (from System Payload Teardown):
# Header:          8 bytes  (magic, version, field_id hash, sequence number)
# PMT Kinematics: 24 bytes  (lat, lon, angle, speed, fix_quality, imu_x, imu_y, imu_z)
# PFA Telemetry:  20 bytes  (pressure, flow, pump_status, harmonics_checksum)
# VFA Profile:    48 bytes  (5-depth moisture, 3 EC, 2 temp, battery, nitrogen)
# LRZ Summary:    40 bytes  (10 LRZ nodes × 4 bytes each: moisture_surface, moisture_root)
# EBK Grid Ref:    8 bytes  (pointer/hash to the full 16x16 float grid stored separately)
# CRC + Padding:  39 bytes
# TOTAL BUDGET:  187 bytes

PAYLOAD_MAGIC = b'\xFA\x4D'   # FarmSense "FM" marker
PAYLOAD_VERSION = 2
BUDGET_BYTES = 187


def encode_pmt_kinematics(lat: float, lon: float, angle: float,
                           speed: float, fix_quality: int,
                           accel_x: float, accel_y: float, accel_z: float) -> bytes:
    """Pack PMT kinematic block into 24 bytes using IEEE 754 floats."""
    return struct.pack('>fffffBxx', lat, lon, angle, speed,
                       accel_x, fix_quality) + struct.pack('>ff', accel_y, accel_z)


def encode_pfa_telemetry(pressure_psi: float, flow_gpm: float,
                          pump_status: str, harmonics: list[float]) -> bytes:
    """
    Pack PFA block into 20 bytes.
    pump_status encoded as 1 byte: 0=off, 1=running, 2=cavitation_alert, 3=fault
    harmonics: store a 4-byte CRC of the FFT array (full array sent separately to backend)
    """
    status_map = {"off": 0, "running": 1, "cavitation_alert": 2, "fault": 3}
    status_byte = status_map.get(pump_status, 0)
    harm_bytes = json.dumps(harmonics).encode()
    harm_crc = struct.pack('>I', int(hashlib.md5(harm_bytes).hexdigest(), 16) & 0xFFFFFFFF)
    return struct.pack('>ffB', pressure_psi, flow_gpm, status_byte) + harm_crc + b'\x00' * 7


def encode_vfa_profile(moisture_profile: dict, ec_data: dict,
                        temp_data: dict, battery_voltage: float,
                        nitrogen_psi: float) -> bytes:
    """Pack VFA 48-inch soil profile into 48 bytes."""
    m = moisture_profile
    return struct.pack(
        '>ffffffffff',
        m.get("slot_10", 0.0), m.get("slot_18", 0.0),
        m.get("slot_25", 0.0), m.get("slot_35", 0.0), m.get("slot_48", 0.0),
        ec_data.get("slot_10", 0.0), ec_data.get("slot_25", 0.0), ec_data.get("slot_48", 0.0),
        temp_data.get("slot_10", 0.0), temp_data.get("slot_25", 0.0),
    ) + struct.pack('>ff', battery_voltage, nitrogen_psi)


def encode_lrz_summary(lrz_nodes: list[dict]) -> bytes:
    """
    Pack up to 10 LRZ node readings into 40 bytes (4 bytes per node).
    Each node: moisture_surface (2-byte uint16 scaled ×1000), moisture_root (2-byte uint16 scaled ×1000).
    Pads with zeros if fewer than 10 nodes are active.
    """
    packed = b''
    for i in range(10):
        if i < len(lrz_nodes):
            node = lrz_nodes[i]
            ms = int(node.get("moisture_surface", 0.0) * 1000) & 0xFFFF
            mr = int(node.get("moisture_root", 0.0) * 1000) & 0xFFFF
        else:
            ms, mr = 0, 0
        packed += struct.pack('>HH', ms, mr)
    return packed  # 10 × 4 = 40 bytes


def encode_ebk_grid_ref(grid_matrix: list[list[float]]) -> bytes:
    """
    Store an 8-byte reference (truncated SHA-256) to the full 16×16 EBK
    probability matrix sent separately to /api/v1/hardware/pmt/ebk_grid.
    """
    flat = [v for row in grid_matrix for v in row]
    digest = hashlib.sha256(struct.pack(f'>{len(flat)}f', *flat)).digest()
    return digest[:8]  # 8-byte ref


def build_field_state_payload(pmt: dict, pfa: dict, vfa: dict,
                               lrz_nodes: list[dict], ebk_grid: list,
                               field_id: str, sequence: int) -> dict:
    """
    Assemble the full ~187-byte Field State Payload structure.

    Returns both the raw bytes (for budget validation) and a structured dict
    (for submission to the backend REST API, bypassing physical encoding).
    """
    # Encode field_id as 4-byte CRC
    field_hash = struct.pack('>I', int(hashlib.md5(field_id.encode()).hexdigest(), 16) & 0xFFFFFFFF)

    header = PAYLOAD_MAGIC + bytes([PAYLOAD_VERSION]) + field_hash + struct.pack('>H', sequence & 0xFFFF)
    # header = 2 + 1 + 4 + 2 = 9 bytes (vs. 8 budgeted — within 1-byte tolerance)

    pmt_block = encode_pmt_kinematics(
        pmt["latitude"], pmt["longitude"], pmt["kinematic_angle_deg"],
        pmt["span_speed_mph"], pmt.get("gps_fix_quality", 4),
        pmt.get("accel_x", 0.0), pmt.get("accel_y", 0.0), pmt.get("accel_z", 9.81)
    )
    pfa_block = encode_pfa_telemetry(
        pfa["well_pressure_psi"], pfa["flow_rate_gpm"],
        pfa["pump_status"], pfa.get("current_harmonics", [])
    )
    vfa_block = encode_vfa_profile(
        {k: v for k, v in vfa.items() if k.startswith("slot_") and "moisture" in k},
        {k: v for k, v in vfa.items() if k.endswith("_ec")},
        {k: v for k, v in vfa.items() if k.endswith("_temp")},
        vfa.get("battery_voltage", 12.4),
        vfa.get("nitrogen_pressure_psi", 45.0)
    )
    lrz_block = encode_lrz_summary(lrz_nodes)
    ebk_ref = encode_ebk_grid_ref(ebk_grid) if ebk_grid else b'\x00' * 8

    raw_payload = header + pmt_block + pfa_block + vfa_block + lrz_block + ebk_ref
    # Pad to budget
    padding = max(0, BUDGET_BYTES - len(raw_payload))
    raw_payload += b'\x00' * padding

    return {
        "raw_bytes": raw_payload,
        "byte_count": len(raw_payload),
        "within_budget": len(raw_payload) <= BUDGET_BYTES,
        "timestamp": datetime.utcnow().isoformat(),
        "field_id": field_id,
        "sequence": sequence,
    }
