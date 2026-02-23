"""
FarmSense Sensor Emulator — Standalone FastAPI Microservice (Port 8003)

This service is the bridge between the physics engine (environment-simulator, port 8002)
and the FarmSense backend API (port 8000). It should be started AFTER both services.

Unlike the environment-simulator which manages abstract physics state,
the sensor-emulator manages the hardware-authentic data pipeline:
- Hardware noise injection via noise.py
- Fisherman's Attention mode governance via attention_engine.py
- 187-byte payload budget validation via encoding.py
- Per-field SensorBridge orchestration via sensor_bridge.py
"""

import asyncio
import logging
import os
import httpx
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any

# Import physics simulators from the sibling environment-simulator service
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'environment-simulator'))
# Import edge compute firmware modules from the sibling edge-compute service
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'edge-compute', 'src'))

from simulators.vfa_simulator import VFASimulator
from simulators.pmt_simulator import PMTSimulator
from simulators.pfa_simulator import PFASimulator
from simulators.lrz_simulator import LRZSimulator

from emulator.sensor_bridge import SensorBridge
from attention_engine import AttentionMode

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("SensorEmulator")

app = FastAPI(
    title="FarmSense Sensor Emulator",
    description="Hardware-authentic sensor bridge between the physics engine and the FarmSense backend. "
                "Applies realistic noise, RF attenuation, and Fisherman's Attention adaptive scaling.",
    version="1.0.0"
)

# --- Configuration ---
BACKEND_URL   = os.getenv("FARMSENSE_BACKEND_URL", "http://localhost:8000")
FIELD_LAT     = float(os.getenv("FIELD_LAT", "37.742"))
FIELD_LON     = float(os.getenv("FIELD_LON", "-105.86"))
FIELD_ID      = os.getenv("FIELD_ID", "field_01")
TIME_MULTIPLIER = float(os.getenv("TIME_MULTIPLIER", "1.0"))

IS_RUNNING = False
BRIDGE: SensorBridge = None

# LRZ grid: 10 nodes spread across the 126-acre field
LRZ_GRID = [
    {"id": "LRZ-4001", "lat_offset": 0.001,  "lon_offset": 0.001},
    {"id": "LRZ-4002", "lat_offset": 0.001,  "lon_offset": -0.001},
    {"id": "LRZ-4003", "lat_offset": -0.001, "lon_offset": 0.001},
    {"id": "LRZ-4004", "lat_offset": -0.001, "lon_offset": -0.001},
    {"id": "LRZ-4005", "lat_offset": 0.002,  "lon_offset": 0.000},
    {"id": "LRZ-4006", "lat_offset": -0.002, "lon_offset": 0.000},
    {"id": "LRZ-4007", "lat_offset": 0.000,  "lon_offset": 0.002},
    {"id": "LRZ-4008", "lat_offset": 0.000,  "lon_offset": -0.002},
    {"id": "LRZ-4009", "lat_offset": 0.0015, "lon_offset": 0.0015},
    {"id": "LRZ-4010", "lat_offset": -0.0015,"lon_offset": -0.0015},
]


def initialize_bridge() -> SensorBridge:
    global BRIDGE
    # Build physics simulators
    simulators = {
        "vfa_1": VFASimulator("VFA-1001", FIELD_ID, BACKEND_URL, FIELD_LAT, FIELD_LON),
        "pmt_1": PMTSimulator("PMT-2001", FIELD_ID, BACKEND_URL, FIELD_LAT, FIELD_LON),
        "pfa_1": PFASimulator("PFA-3001", FIELD_ID, BACKEND_URL),
    }
    bridge = SensorBridge(FIELD_ID, BACKEND_URL, simulators)

    # Register LRZ nodes into the bridge
    for node_cfg in LRZ_GRID:
        lrz = LRZSimulator(
            node_cfg["id"], FIELD_ID, BACKEND_URL,
            FIELD_LAT + node_cfg["lat_offset"],
            FIELD_LON + node_cfg["lon_offset"]
        )
        bridge.register_lrz(node_cfg["id"], lrz)

    BRIDGE = bridge
    logger.info(f"SensorBridge initialized for field {FIELD_ID} with {len(LRZ_GRID)} LRZ nodes.")
    return bridge


async def emulation_loop():
    global IS_RUNNING, TIME_MULTIPLIER
    logger.info("Sensor Emulator loop started.")
    while True:
        if IS_RUNNING and BRIDGE is not None:
            try:
                await BRIDGE.tick(time_multiplier=TIME_MULTIPLIER)
            except Exception as e:
                logger.error(f"Bridge tick error: {e}")

            # Wait for the attention-engine-governed interval
            interval = BRIDGE.attention.get_tick_interval_seconds(TIME_MULTIPLIER)
            await asyncio.sleep(interval)
        else:
            await asyncio.sleep(2.0)


@app.on_event("startup")
async def startup_event():
    initialize_bridge()
    asyncio.create_task(emulation_loop())


# --- Control API ---

class EmulatorControlRequest(BaseModel):
    action: str
    target: str = None
    value: Any = None

@app.post("/api/emulator/control", tags=["Control"])
async def control_emulator(req: EmulatorControlRequest):
    global IS_RUNNING, TIME_MULTIPLIER

    if req.action == "start":
        IS_RUNNING = True
        return {"status": "started", "attention_mode": BRIDGE.attention.mode.value}

    elif req.action == "stop":
        IS_RUNNING = False
        return {"status": "stopped"}

    elif req.action == "set_multiplier":
        TIME_MULTIPLIER = float(req.value)
        return {"status": "ok", "time_multiplier": TIME_MULTIPLIER}

    elif req.action == "toggle_pump":
        state = bool(req.value)
        pfa = BRIDGE.simulators.get("pfa_1")
        pmt = BRIDGE.simulators.get("pmt_1")
        if pfa: pfa.toggle_pump(state)
        if pmt: pmt.toggle_motion(state)
        return {"status": "ok", "pump_on": state}

    elif req.action == "inject_fault":
        hw_id = req.target
        if hw_id in BRIDGE.simulators:
            BRIDGE.simulators[hw_id].break_hardware()
            return {"status": "fault_injected", "target": hw_id}
        return {"error": "target_not_found"}

    elif req.action == "resolve_fault":
        hw_id = req.target
        if hw_id in BRIDGE.simulators:
            BRIDGE.simulators[hw_id].fix_hardware()
            return {"status": "fault_resolved", "target": hw_id}
        return {"error": "target_not_found"}

    elif req.action == "tick":
        # Manually trigger one tick for testing
        if BRIDGE:
            await BRIDGE.tick(TIME_MULTIPLIER)
        return {"status": "tick_complete"}

    return {"error": "unknown_action"}


@app.get("/api/emulator/attention", tags=["Status"])
async def get_attention_state():
    """Returns the current Fisherman's Attention mode and tick interval."""
    if not BRIDGE:
        return {"error": "bridge_not_initialized"}
    return BRIDGE.attention.summary()


@app.post("/api/emulator/mode", tags=["Control"])
async def set_attention_mode_override(mode: str):
    """
    Force-override the attention mode (for testing and demo purposes).
    Valid values: dormant | anticipatory | ripple | collapse
    """
    if not BRIDGE:
        return {"error": "bridge_not_initialized"}
    try:
        BRIDGE.attention.mode = AttentionMode(mode.lower())
        return {"status": "override_applied", "mode": BRIDGE.attention.mode.value}
    except ValueError:
        return {"error": f"Invalid mode '{mode}'. Must be one of: dormant, anticipatory, ripple, collapse"}


@app.get("/api/emulator/state", tags=["Status"])
async def get_full_state():
    if not BRIDGE:
        return {"error": "not_initialized"}
    return {
        "is_running": IS_RUNNING,
        "time_multiplier": TIME_MULTIPLIER,
        "attention": BRIDGE.attention.summary(),
        "simulators": {
            k: {"broken": v.is_broken, "class": v.__class__.__name__}
            for k, v in BRIDGE.simulators.items()
        },
        "lrz_nodes": len(BRIDGE._lrz_nodes),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
