---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **DOCUMENTATION DRIFT AVERSION PROTOCOL**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.


## DETAILED TECHNICAL EXPANSION

### Extended API Documentation

#### Full Request/Response Schemas

**POST /v1/ingest/telemetry**

Request Schema:
```json
{
  "device_id": "uuid",
  "field_id": "uuid",
  "timestamp": "2026-03-10T14:30:00Z",
  "readings": [
    {
      "sensor_type": "moisture_10cm",
      "value": 0.23,
      "unit": "m³/m³",
      "quality_score": 0.98,
      "metadata": {
        "rssi": -85,
        "battery_v": 3.6,
        "temperature_c": 18.5
      }
    }
  ],
  "signature": "ed25519_hex"
}
```

Response Schema (200 OK):
```json
{
  "status": "accepted",
  "ingestion_id": "uuid",
  "processed_at": "2026-03-10T14:30:01Z",
  "next_chirp_interval_sec": 14400
}
```

Response Schema (400 Bad Request):
```json
{
  "error": "validation_failed",
  "code": "INVALID_SIGNATURE",
  "message": "Ed25519 signature verification failed",
  "retry": false
}
```

Response Schema (429 Rate Limited):
```json
{
  "error": "rate_limited",
  "retry_after_sec": 60,
  "current_quota": 999,
  "quota_reset": "2026-03-10T15:00:00Z"
}
```

**GET /v1/fields/{id}/moisture**

Query Parameters:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| resolution | enum | No | "1m" | "1m", "10m", "20m", "50m" |
| depth_cm | int | No | 30 | Sensor depth (10, 18, 25, 35, 48) |
| timestamp | ISO8601 | No | now | Historical query |

Response Schema (200 OK):
```json
{
  "field_id": "uuid",
  "resolution": "1m",
  "depth_cm": 30,
  "timestamp": "2026-03-10T14:30:00Z",
  "grid": {
    "bbox": [-106.123, 37.456, -106.111, 37.468],
    "crs": "EPSG:4326",
    "width": 126,
    "height": 142,
    "data": [0.21, 0.22, 0.23, ...]
  },
  "kriging": {
    "method": "regression_kriging",
    "variogram": "matern",
    "nu": 1.0,
    "mape": 0.045
  },
  "sources": [
    { "device_id": "uuid", "type": "vfa", "distance_m": 12.4 },
    { "device_id": "uuid", "type": "lrz2", "distance_m": 8.7 }
  ]
}
```

**POST /v1/irrigation/worksheet**

Request Schema:
```json
{
  "field_id": "uuid",
  "pivot_id": "uuid",
  "requested_by": "user_uuid",
  "strategy": "mad_optimized",
  "constraints": {
    "max_depth_cm": 48,
    "min_vwc": 0.15,
    "avoid_hours": [14, 15, 16],
    "wind_threshold_mph": 15
  }
}
```

Response Schema:
```json
{
  "worksheet_id": "uuid",
  "generated_at": "2026-03-10T14:30:00Z",
  "valid_until": "2026-03-11T06:00:00Z",
  "prescription": {
    "total_volume_af": 2.34,
    "duration_hours": 8.5,
    "start_time": "2026-03-11T02:00:00Z",
    "spatial_map": [126, 142, [...]],
    "tower_speeds": [0.8, 1.2, 1.0, ...]
  },
  "confidence": 0.94,
  "contributing_sensors": 18
}
```

### Extended Soil Physics Tables

#### Particle Size Distribution by SLV Series
| Series | Sand % | Silt % | Clay % | USDA Class |
|--------|--------|--------|--------|------------|
| San Luis | 65 | 25 | 10 | Sandy loam |
| Gunbarrel | 82 | 12 | 6 | Loamy sand |
| Alamosa | 35 | 35 | 30 | Clay loam |
| Blanca | 45 | 30 | 25 | Loam |
| Costilla | 55 | 25 | 20 | Sandy loam |
| Hooper | 70 | 20 | 10 | Sandy loam |

#### Moisture Retention Curves (van Genuchten Parameters)
| Series | θs | θr | α (1/cm) | n | Ks (cm/day) |
|--------|-----|-----|----------|---|-------------|
| San Luis | 0.45 | 0.08 | 0.035 | 1.8 | 45 |
| Gunbarrel | 0.38 | 0.04 | 0.045 | 1.5 | 120 |
| Alamosa | 0.52 | 0.12 | 0.025 | 2.1 | 8 |

#### Infiltration Rates by Initial Moisture
| Initial VWC | Gunbarrel | San Luis | Alamosa |
|-------------|-----------|----------|---------|
| 0.05 (dry) | 15 cm/hr | 8 cm/hr | 2 cm/hr |
| 0.15 (moist) | 10 cm/hr | 5 cm/hr | 1 cm/hr |
| 0.25 (wet) | 5 cm/hr | 2 cm/hr | 0.5 cm/hr |

### Extended Hardware Calibration Procedures

#### VFA Calibration Protocol

**Step 1: Factory Calibration**
| Standard | VWC | EC (dS/m) | Temperature |
|----------|-----|-----------|-------------|
| Air dry | 0.00 | 0.00 | 25°C |
| Oven dry | 0.00 | 0.00 | 105°C |
| Tap water | 1.00 | 0.50 | 25°C |
| 0.1M NaCl | 1.00 | 11.0 | 25°C |

**Step 2: Field Calibration**
1. Collect undisturbed soil core at 30cm
2. Measure volumetrically (core method)
3. Install VFA at same location
4. Record dielectric reading
5. Calculate field-specific calibration: VWC = a × ε + b
6. Update device EEPROM with coefficients

**Step 3: Validation**
| Check | Tolerance | Action if Fail |
|-------|-----------|----------------|
| Replicate cores | ±2% VWC | Recalibrate |
| Seasonal drift | ±3% | Sensor replacement |
| Cross-sensor agreement | ±4% | Field inspection |

#### PMT Flow Meter Calibration

**Zero Calibration (Dry Pipe):**
1. Close all valves downstream
2. Ensure pipe is full but static
3. Record TFX-5000 zero offset
4. Store in EEPROM

**Span Calibration (Known Flow):**
1. Install inline reference meter (±0.5%)
2. Run pump at 25%, 50%, 75%, 100% capacity
3. Record TFX readings vs reference
4. Calculate linear correction: Q_corrected = m × Q_raw + b

**Field Verification (Quarterly):**
| Test | Method | Tolerance |
|------|--------|-----------|
| Zero | Static full pipe | ±0.5 GPM |
| Span | Comparison to well test | ±2% |
| Totalizer | Volume balance | ±3% |

### Extended Firmware State Machines

#### PMT State Machine (Detailed)

States:
| State | Entry Condition | Activities | Exit Condition |
|-------|-----------------|------------|----------------|
| INIT | Power-on | Self-test, load config | Test pass → SLEEP |
| SLEEP | Stable, parked | RTC running, 8µA | RTC alarm → PULSE |
| PULSE | Scheduled interval | Power up LoRa, 15mA | TX complete → SENSE or SLEEP |
| SENSE | Active monitoring | ADC sampling, 45mA | Sample complete → COMPUTE |
| COMPUTE | Data available | EBK calculation, 80mA | Done → TX or ACTUATE |
| TX | Data ready | LoRa transmission, 120mA | ACK received → SLEEP |
| ACTUATE | Reflex trigger | Relay control, 60mA | Confirmation → SLEEP |
| FAULT | Error detected | Logging, alerting, 45mA | Recovery or manual reset |

Transitions:
| From | To | Trigger |
|------|-----|---------|
| SLEEP | PULSE | RTC timer (4hr/1hr/15min/5sec based on mode) |
| PULSE | SLEEP | No data pending |
| SENSE | COMPUTE | All sensors sampled |
| COMPUTE | ACTUATE | Reflex condition met |
| ANY | FAULT | Error condition |
| FAULT | INIT | Watchdog or manual reset |

#### VFA State Machine

States:
| State | Power | Activities |
|-------|-------|------------|
| DEEP_SLEEP | 2µA | RTC, wake on interrupt |
| CHIRP | 12mA | Sample sensors, AES encrypt, LoRA TX |
| RIPPLE_RESPOND | 18mA | Faster sampling when PMT requests |

Chirp Interval Table:
| Mode | Interval | Battery Life |
|------|----------|--------------|
| Standard | 4 hours | 4.2 years |
| Ripple | 15 minutes | 3.1 years |
| Emergency | 5 minutes | 1.8 years |

### Extended Supply Chain Details

#### Critical Components Lead Times
| Component | Supplier | Lead Time | MOQ | Strategic Stock |
|-------------|----------|-----------|-----|-----------------|
| nRF52840-QIAA | Nordic | 16 weeks | 1,000 | 3 months |
| ESP32-S3-MINI-1 | Espressif | 12 weeks | 500 | 2 months |
| ZED-F9P | u-blox | 20 weeks | 100 | 6 months |
| Jetson Orin Nano | NVIDIA | 24 weeks | 50 | 4 months |
| Threadripper PRO | AMD | 8 weeks | 1 | 1 month |
| Swissbit PSLC | Swissbit | 14 weeks | 200 | 3 months |
| TFX-5000 | Badger | 10 weeks | 10 | 2 months |
| HDPE SDR9 pipe | Local | 2 weeks | 500 ft | 1 month |

#### Supplier Diversification Strategy
| Component | Primary | Secondary | Tertiary |
|-----------|---------|-----------|----------|
| LoRa modules | RAK | Ebyte | HopeRF |
| MCUs | Nordic | Espressif | STMicro |
| Solar panels | Renogy | HQST | Rich Solar |
| Batteries | Battle Born | SOK | Ampere Time |

### Extended Testing Protocols

#### Environmental Stress Testing (Full Suite)

**Thermal Shock (MIL-STD-810H Method 503.7):**
| Cycle | Low (°C) | High (°C) | Dwell (min) | Transitions |
|-------|----------|-----------|-------------|-------------|
| 1 | -40 | +85 | 30 | 5 |
| 2 | -30 | +75 | 60 | 10 |
| 3 | -20 | +65 | 120 | 20 |
| Pass Criteria | No functional degradation | | | |

**Salt Fog (MIL-STD-810H Method 509.7):**
| Parameter | Value |
|-----------|-------|
| Concentration | 5% NaCl |
| Temperature | 35°C |
| Duration | 96 hours |
| Pass Criteria | No corrosion on critical surfaces |

**Solar Radiation (MIL-STD-810H Method 505.7):**
| Parameter | Value |
|-----------|-------|
| Irradiance | 1120 W/m² |
| Duration | 240 hours |
| UV component | Per ASTM G154 |
| Pass Criteria | <5% polymer degradation |

#### EMC Testing (FCC Part 15)
| Test | Standard | Limit | Margin |
|------|----------|-------|--------|
| Radiated emissions | CISPR 22 | Class B | 6 dB |
| Conducted emissions | CISPR 22 | Class B | 8 dB |
| ESD immunity | IEC 61000-4-2 | ±8kV contact | Pass |
| Radiated immunity | IEC 61000-4-3 | 10 V/m | Pass |
| EFT/Burst | IEC 61000-4-4 | ±2kV | Pass |
| Surge | IEC 61000-4-5 | ±2kV | Pass |

### Extended Financial Models

#### Grant Funding Timeline
| Quarter | Grant | Amount | Probability | Expected Value |
|---------|-------|--------|-------------|----------------|
| Q1 2026 | USDA SBIR I | $300K | 60% | $180K |
| Q2 2026 | NSF SBIR I | $275K | 55% | $151K |
| Q3 2026 | NRCS CIG | $500K | 40% | $200K |
| Q4 2026 | DOE Water-Energy | $5M | 25% | $1.25M |
| 2027 | USDA SBIR II | $1.1M | 70% | $770K |
| 2027 | Gates Foundation | $10M | 15% | $1.5M |
| **Total Expected** | | | | **$4.05M** |

#### Investor Return Scenarios
| Scenario | Exit Year | Valuation | Return Multiple |
|----------|-----------|-----------|-----------------|
| Conservative | 2030 | $100M | 10x |
| Base | 2029 | $250M | 25x |
| Optimistic | 2028 | $500M | 50x |
| Required for 20% IRR | — | — | 15x |

### Extended Compliance Documentation

#### Water Court Evidence Package
| Document | Format | Signatures | Retention |
|----------|--------|------------|-----------|
| Daily telemetry logs | CSV | Ed25519 | 7 years |
| Kriging worksheets | JSON | Ed25519 | 7 years |
| Irrigation events | CSV | PBFT + Ed25519 | 10 years |
| Compliance summary | PDF | Ed25519 + timestamp | 10 years |
| Expert validation | PDF | Third-party signature | 10 years |

#### NRCS Conservation Planning Integration
| Resource Concern | FarmSense Metric | NRCS Code | Points |
|------------------|------------------|-----------|--------|
| Soil quality limitation | EC trends, VWC stability | 1A | 3 |
| Soil quality degradation | Organic matter tracking | 1B | 2 |
| Excess water | Drainage management | 2A | 2 |
| Ponding, flooding | Saturation alerts | 2B | 2 |
| Sheet, rill erosion | Cover crop optimization | 3A | 2 |
| Concentrated flow erosion | Runoff modeling | 3B | 2 |
| Inadequate infiltration | Infiltration rate tracking | 4A | 2 |
| Seasonal high water table | Water table monitoring | 4B | 2 |
| Ponding | Saturation detection | 4C | 1 |
| Flooding | Wetting front tracking | 4D | 1 |
| Surface water depletion | AF saved annually | 5A | 5 |
| Groundwater depletion | Aquifer monitoring | 5B | 5 |
| Inefficient irrigation | VRI optimization % | 6A | 3 |
| Nutrients transported | Nitrogen leaching prevention | 7A | 3 |
| Pests pressure | Stress detection | 8A | 2 |
| Inadequate habitat | Biodiversity indicators | 9A | 1 |

**Total Possible Points:** 41
**FarmSense Typical Score:** 35-38 (85-93%)

