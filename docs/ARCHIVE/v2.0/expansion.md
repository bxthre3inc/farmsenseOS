---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **D-DAP (Documentation Drift Aversion Protocol)**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.

## Additional Technical Specifications (Expanded Detail)

### SQL Schema Expansion

**Index Strategy:**
```sql
-- BRIN index for time-series (efficient for append-only)
CREATE INDEX idx_sensor_time_brin ON sensor_readings USING BRIN (time);

-- Partial index for high-quality readings only
CREATE INDEX idx_sensor_quality ON sensor_readings (field_id, time) 
WHERE quality_score > 0.8;

-- Expression index for common query pattern
CREATE INDEX idx_sensor_hour ON sensor_readings 
USING BTREE (date_trunc('hour', time));
```

**Partitioning Strategy:**
| Table | Strategy | Retention |
|-------|----------|-----------|
| sensor_readings | TimescaleDB hypertable, 7-day chunks | 2 years hot, 5 years cold |
| compliance_logs | Native partition by month | 10 years |
| kriging_grids | Partition by field_id hash | 1 year |

### API Expansion: Detailed Request/Response

**POST /v1/ingest/telemetry (Field Device Upload)**

Request Headers:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
X-Device-ID: vfa-7f8a9b2c-3d4e
Content-Type: application/x-msgpack
```

Request Body (MessagePack encoded):
```
{
  "device_id": "vfa-7f8a9b2c-3d4e",
  "field_id": "field-abc-123",
  "timestamp": "2026-03-10T14:30:00Z",
  "readings": [
    {"depth": 10, "vwc": 0.234, "temp": 18.5, "ec": 0.8},
    {"depth": 25, "vwc": 0.312, "temp": 17.2, "ec": 0.9},
    {"depth": 48, "vwc": 0.389, "temp": 16.8, "ec": 1.1}
  ],
  "metadata": {
    "rssi": -92,
    "voltage": 3.72,
    "firmware": "2.1.3",
    "chirp_count": 1442
  },
  "signature": "ed25519_signature_bytes"
}
```

Response (200 OK):
```
{
  "status": "accepted",
  "ingestion_id": "ing-uuid",
  "latency_ms": 45,
  "next_chirp_interval": 14400
}
```

Response (400 Bad Request):
```
{
  "error": "validation_failed",
  "details": [
    {"field": "readings[2].vwc", "message": "Exceeds physical maximum (0.55)"}
  ]
}
```

**GET /v1/fields/{id}/moisture (Retrieve Kriging Grid)**

Query Parameters:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| resolution | enum | "1m" | "50m", "20m", "10m", "1m" |
| depth | int | 25 | cm depth for query |
| timestamp | ISO8601 | now | Historical retrieval |
| format | enum | "json" | "json", "geotiff", "png" |

Response (JSON):
```
{
  "field_id": "field-abc-123",
  "grid_spec": {
    "resolution_m": 1,
    "width": 126,
    "height": 126,
    "bounds": {
      "north": 37.7531,
      "south": 37.7518,
      "east": -106.0198,
      "west": -106.0212
    }
  },
  "timestamp": "2026-03-10T14:30:00Z",
  "depth_cm": 25,
  "statistics": {
    "min": 0.152,
    "max": 0.423,
    "mean": 0.298,
    "std": 0.045
  },
  "confidence": {
    "mape": 0.032,
    "coverage": 0.94
  },
  "data": "base64_encoded_float32_array",
  "worksheet": {
    "recommended": "irrigate",
    "zones": [
      {
        "zone_id": 1,
        "bounds": [[x1,y1], [x2,y2], ...],
        "current_vwc": 0.234,
        "target_vwc": 0.350,
        "deficit_mm": 45.2,
        "duration_min": 52,
        "rate_mm_hr": 12.5
      }
    ]
  }
}
```

### Firmware Expansion: Detailed State Machines

**PMT State Machine (Full):**

```
[INIT] → Self-test
  ├─ Pass → [GNSS_ACQ]
  └─ Fail → [FAULT_INIT]

[GNSS_ACQ] → Wait for RTK fix
  ├─ Fix <2cm → [SLEEP]
  └─ Timeout → [FAULT_GNSS]

[SLEEP] → RTC alarm (default 4hr)
  ├─ Alarm → [PULSE]
  └─ Interrupt (motion) → [FOCUS_COLLAPSE]

[PULSE] → Activate LNA, listen
  ├─ Sensor chirp detected → [SENSE]
  ├─ DHU command received → [EXECUTE]
  └─ No activity → [SLEEP]

[SENSE] → Sample all sensors
  ├─ Normal → [COMPUTE]
  └─ Anomaly → [FOCUS_RIPPLE]

[COMPUTE] → Edge-EBK calculation
  ├─ Complete → [TX]
  └─ Timeout → [FAULT_COMPUTE]

[TX] → Transmit to DHU
  ├─ ACK received → [SLEEP]
  ├─ NACK → [RETRY]
  └─ Timeout (3 retries) → [ISLAND]

[ISLAND] → Autonomous mode
  ├─ Last valid worksheet <24hr → Execute cached
  ├─ Last valid worksheet >24hr → Emergency stop
  └─ DHU reconnected → [SYNC]

[FOCUS_RIPPLE] → 15-min high-frequency
  ├─ Anomaly resolves → [SLEEP]
  └─ Anomaly persists → [FOCUS_COLLAPSE]

[FOCUS_COLLAPSE] → 5-sec emergency mode
  ├─ Emergency handled → [SLEEP]
  └─ Critical fault → [FAULT_CRITICAL]
```

**State Timing:**
| State | Entry Condition | Exit Condition | Max Duration |
|-------|---------------|----------------|--------------|
| INIT | Power on | Tests complete | 30 seconds |
| GNSS_ACQ | INIT pass | RTK fix | 10 minutes |
| SLEEP | Default | Alarm/interrupt | 4 hours |
| PULSE | SLEEP alarm | Activity detected | 5 seconds |
| SENSE | PULSE trigger | Sampling complete | 200 milliseconds |
| COMPUTE | SENSE complete | Calculation done | 500 milliseconds |
| TX | COMPUTE done | ACK received | 2 seconds |
| FOCUS_RIPPLE | Anomaly detected | Resolved | 15 minutes |
| FOCUS_COLLAPSE | Critical event | Handled | 5 seconds |
| ISLAND | DHU timeout | Reconnected | Indefinite |

### Hardware BOM Expansion: Detailed Component Lists

**PMT Detailed BOM (with alternatives):**

| Item | Primary Part | Alt Part | Qty | Primary Cost | Alt Cost |
|------|--------------|----------|-----|--------------|----------|
| MCU | ESP32-S3-WROOM-1 | ESP32-S3-MINI-1 | 1 | $4.50 | $3.80 |
| GNSS | u-blox ZED-F9P | Septentrio mosaic-X5 | 1 | $89.00 | $145.00 |
| LoRa | RFM95W-915S2 | Ebyte E22-900M30S | 1 | $8.00 | $12.50 |
| IMU | BNO055 | LSM9DS1 | 1 | $12.00 | $8.50 |
| Flow | Badger TFX-5000 | Dynasonics DUFX | 1 | $485.00 | $420.00 |
| Battery Primary | LS14500 | ER14505 | 1 | $4.50 | $3.80 |
| HPC | SII HPC1550 | Vitzrocell HPC | 1 | $2.50 | $2.20 |
| Enclosure | Polycase ML-44F | Hammond 1554 | 1 | $89.00 | $65.00 |
| Antenna LoRa | Taoglas TI.20 | Laird MAF94256 | 1 | $12.00 | $9.50 |
| GPS Antenna | u-blox ANN-MB-00 | Tallysman TW3882 | 1 | $18.00 | $25.00 |
| Mounting | Custom SS | Off-shelf U-bolt | 1 | $65.00 | $35.00 |
| Isolators | Vibrashock VSG-1 | Barry B mounts | 4 | $60.00 | $40.00 |
| Connector M12 | Binder 763 | Amphenol C091 | 3 | $15.00 | $12.00 |
| Cable harness | Custom | Off-shelf | 1 | $35.00 | $25.00 |
| PCB (4-layer) | JLCPCB | PCBWay | 1 | $8.50 | $7.00 |
| **SUBTOTAL** | | | | **$808.00** | **$745.30** |
| Labor (3hr @ $50) | | | | $150.00 | $150.00 |
| Margin (15%) | | | | $143.70 | $134.30 |
| **TOTAL** | | | | **$1,101.70** | **$1,029.60** |

**VFA Detailed Sensor Specifications:**

**GroPoint Profile (Advanced Sensor):**
| Parameter | Specification |
|-----------|-------------|
| Measurement principle | Frequency Domain Reflectometry (FDR) |
| VWC accuracy | ±2% (typical), ±3% (max) |
| Temperature accuracy | ±0.5°C |
| EC accuracy | ±5% |
| Measurement volume | ~0.5L (4" sphere) |
| Operating temp | -40°C to +60°C |
| Power | 3.6V, 15mA (active), <1µA (sleep) |
| Interface | SDI-12, RS-485 |
| Cable | 4-wire shielded, 5m standard |
| Warranty | 5 years |

**Custom Basic Sensor:**
| Parameter | Specification |
|-----------|-------------|
| Measurement principle | Capacitive (100MHz) |
| VWC accuracy | ±5% |
| Temperature accuracy | ±1°C |
| Measurement volume | ~0.25L |
| Operating temp | -20°C to +50°C |
| Power | 3.3V, 8mA (active), <5µA (sleep) |
| Interface | Analog (12-bit) |
| Cable | 2-wire, 3m standard |
| Warranty | 2 years |

### Network Protocol Expansion

**900MHz CSS LoRa Protocol Stack:**

**Physical Layer:**
| Parameter | Value |
|-----------|-------|
| Frequency range | 902-928 MHz (US ISM) |
| Channel bandwidth | 125 kHz |
| Spreading factors | 7-12 (SF7 = fastest, SF12 = most robust) |
| Coding rate | 4/5 |
| Preamble | 8 symbols |
| Payload max | 255 bytes |
| CRC | Enabled |

**Data Rate Configuration:**
| SF | Bitrate | Sensitivity | Range (km) | Use case |
|----|---------|-------------|------------|----------|
| 7 | 5.47 kbps | -123 dBm | 2 | Good conditions, short range |
| 9 | 1.76 kbps | -131 dBm | 5 | Typical field conditions |
| 11 | 0.44 kbps | -139 dBm | 8 | Poor conditions, dense canopy |
| 12 | 0.29 kbps | -148 dBm | 10 | Emergency, extreme range |

**Adaptive Data Rate (ADR):**
- Algorithm: Node adjusts SF based on SNR feedback from gateway
- Floor: SF7 (minimum for reliability)
- Ceiling: SF12 (emergency only, high power)
- Default: SF9 (balance of speed and range)

**MAC Layer (LoRaWAN-like):**
- Class A: Bi-directional after uplink (power efficient)
- Confirmed vs. unconfirmed messages
- Frame counter for replay protection
- Join procedure with AppKey derivation

**Application Layer (FarmSense Custom):**
```
Packet Structure (max 187 bytes):
[Header: 8 bytes]
  - Protocol version (1 byte)
  - Device type (1 byte): 0x01=PMT, 0x02=PFA, 0x03=VFA, 0x04=LRZ
  - Device ID (4 bytes)
  - Sequence number (2 bytes)

[Payload: variable]
  - Reading count (1 byte)
  - For each reading:
    - Sensor ID (1 byte)
    - Value type (1 byte): 0x01=VWC, 0x02=Temp, 0x03=EC
    - Value (4 bytes float32)
    - Timestamp offset (2 bytes, minutes since header)

[Metadata: 16 bytes]
  - Battery voltage (2 bytes, 0.01V resolution)
  - RSSI (2 bytes, signed dBm)
  - Firmware version (2 bytes)
  - Uptime (4 bytes, seconds)
  - Reserved (6 bytes)

[Security: 16 bytes]
  - AES-128-CCM nonce (8 bytes)
  - MIC (8 bytes)
```

### Testing and QA Procedures

**Factory Acceptance Testing (FAT):**

| Test | Method | Criteria | Duration |
|------|--------|----------|----------|
| Functional | Automated test jig | All sensors respond | 30 min |
| Calibration | Known-volume chambers | VWC ±3% accuracy | 2 hours |
| Communication | Anechoic chamber | LoRa range >50m | 15 min |
| Power | Programmed load profile | Battery life >4yr calculated | N/A |
| Environmental | Thermal chamber | -40°C to +60°C operational | 24 hours |

**Site Acceptance Testing (SAT):**

| Test | Method | Criteria |
|------|--------|----------|
| Installation | Visual inspection | Per SOP compliance |
| Chirp verification | Live monitoring | ACK from PMT/DHU |
| Positioning | GPS survey | <30cm from planned |
| Calibration | Gravimetric samples | R² >0.95 |
| Integration | End-to-end data flow | Zo receives telemetry |

**Ongoing Quality Monitoring:**

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Chirp success rate | >99% | <95% |
| Battery voltage | >3.0V | <3.0V |
| Sensor drift | <2% annually | >5% |
| Data latency | <1 hour | >4 hours |
| Kriging MAPE | <5% | >8% |