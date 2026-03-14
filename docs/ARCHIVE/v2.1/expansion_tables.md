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

### Comprehensive Data Tables

#### Monthly Operational Metrics (Subdistrict 1 Scale)
| Month | Fields Active | Telemetry Points | Storage (GB) | API Calls | Alerts |
|-------|---------------|------------------|--------------|-----------|--------|
| Jan | 0 | 0 | 0 | 5,000 | 12 |
| Feb | 0 | 0 | 0 | 5,000 | 8 |
| Mar | 320 | 6.4M | 45 | 150,000 | 45 |
| Apr | 640 | 12.8M | 89 | 320,000 | 78 |
| May | 960 | 19.2M | 134 | 580,000 | 120 |
| Jun | 1,280 | 25.6M | 178 | 890,000 | 156 |
| Jul | 1,280 | 25.6M | 178 | 920,000 | 180 |
| Aug | 1,280 | 25.6M | 178 | 900,000 | 165 |
| Sep | 1,280 | 25.6M | 178 | 850,000 | 140 |
| Oct | 640 | 12.8M | 89 | 400,000 | 85 |
| Nov | 0 | 0 | 0 | 50,000 | 25 |
| Dec | 0 | 0 | 0 | 20,000 | 15 |
| **Annual** | | **128M** | **890** | **4.1M** | **1,029** |

#### Device Error Code Reference (Complete)
| Code | Device | Severity | Description | Recovery Action |
|------|--------|----------|-------------|-----------------|
| 0x00 | ALL | INFO | Normal operation | None |
| 0x01 | PMT | HIGH | Power-on self-test failure | Replace unit |
| 0x02 | PMT | HIGH | GNSS acquisition timeout | Check antenna, reset |
| 0x03 | PMT | HIGH | GNSS RTK correction lost | Verify base station |
| 0x04 | PMT | HIGH | IMU calibration drift | Recalibrate, replace if persists |
| 0x05 | PMT | MEDIUM | LoRa TX failure | Check antenna, retry |
| 0x06 | PMT | MEDIUM | LoRa RX timeout | Verify DHU online |
| 0x07 | PMT | HIGH | Flow meter comm failure | Check wiring, replace |
| 0x08 | PMT | CRITICAL | Battery <10% | Emergency replacement |
| 0x09 | PMT | CRITICAL | CT clamp saturation | Check pump load |
| 0x0A | PMT | HIGH | EEPROM corruption | Factory reset, reconfig |
| 0x10 | VFA | MEDIUM | Nitrogen pressure <3 PSI | Recharge, check seals |
| 0x11 | VFA | MEDIUM | Sensor drift >5% | Field recalibration |
| 0x12 | VFA | HIGH | Sensor communication fail | Replace sensor |
| 0x13 | VFA | MEDIUM | Battery <20% | Schedule replacement |
| 0x14 | VFA | HIGH | Temperature out of range | Check installation depth |
| 0x20 | PFA | CRITICAL | Actuation relay fail | Immediate replacement |
| 0x21 | PFA | CRITICAL | Flow rate >110% rated | Check for leak |
| 0x22 | PFA | CRITICAL | Pressure >150% rated | Emergency stop |
| 0x23 | PFA | MEDIUM | CT clamp imbalance | Check pump alignment |
| 0x24 | PFA | HIGH | Cavitation signature | Inspect pump, intake |
| 0x30 | LRZ | MEDIUM | Dielectric out of range | Soil change or failure |
| 0x31 | LRZ | HIGH | No PMT acknowledgment | Check PMT, antenna |
| 0x40 | DHU | HIGH | LTE-M connection lost | Check signal, SIM |
| 0x41 | DHU | HIGH | RSS connection lost | Check 2.4GHz link |
| 0x42 | DHU | CRITICAL | Black Box >90% full | Urgent maintenance |
| 0x43 | DHU | HIGH | Solar charging failure | Check panels, MPPT |
| 0x44 | DHU | CRITICAL | Battery <20% | Emergency service |
| 0x50 | RSS | HIGH | Primary fiber down | Failover to LTE |
| 0x51 | RSS | HIGH | Generator fail | Check fuel, starter |
| 0x52 | RSS | CRITICAL | Storage >90% | Archive to cold |

#### Antenna Specifications by Application
| Application | Frequency | Type | Gain | Pattern | Connector | Cable | Length |
|-------------|-----------|------|------|---------|-----------|-------|--------|
| PMT LoRa | 915MHz | Whip | 2.1 dBi | Omnidirectional | U.FL | LMR-195 | 10ft |
| PMT GNSS | 1.575GHz | Patch | 5 dBi | Hemispherical | SMA | RG-174 | 10ft |
| VFA LoRa | 915MHz | Whip | 2.1 dBi | Omnidirectional | U.FL | None (internal) | 3ft |
| DHU LoRa | 915MHz | Omni | 3 dBi | Omnidirectional | N | LMR-400 | 50ft |
| DHU 2.4GHz | 2.4GHz | Sector | 15 dBi | 120° | N | LMR-600 | 100ft |
| DHU LTE | 700-2.1GHz | Omni | 3 dBi | Omnidirectional | SMA | LMR-240 | 25ft |

#### PCB Layer Stackup (All Field Devices)
| Layer | Material | Thickness | Function |
|-------|----------|-----------|----------|
| Top overlay | Silkscreen | 0.01mm | Component labels |
| Top solder mask | Green LPI | 0.02mm | Protection |
| Top copper | 1oz Cu | 0.035mm | Signal routing |
| Prepreg | FR-4 | 0.09mm | Dielectric |
| Inner 1 | 1oz Cu | 0.035mm | Ground plane |
| Core | FR-4 | 1.0mm | Structure |
| Inner 2 | 1oz Cu | 0.035mm | Power plane |
| Prepreg | FR-4 | 0.09mm | Dielectric |
| Bottom copper | 1oz Cu | 0.035mm | Signal routing |
| Bottom solder mask | Green LPI | 0.02mm | Protection |
| Bottom overlay | Silkscreen | 0.01mm | Assembly info |

#### Grounding and Bonding Requirements
| Connection | Wire Size | Torque | Inspection Frequency |
|------------|-----------|--------|---------------------|
| DHU pole ground | 4 AWG | 25 ft-lb | Annual |
| PMT tower bond | 8 AWG | 15 ft-lb | Annual |
| PFA wellhead bond | 4 AWG | 30 ft-lb | Annual |
| VFA shell ground | 10 AWG | 10 ft-lb | Extraction |
| RSS container ground | 2/0 AWG | 50 ft-lb | Semi-annual |

#### Enclosure IP Ratings and Tests
| Device | Rating | Test | Duration | Result |
|--------|--------|------|----------|--------|
| PMT | IP67 | Dust + immersion | 30min @ 1m | Pass |
| PFA | IP67 | Dust + immersion | 30min @ 1m | Pass |
| VFA | IP68 | Dust + pressure | 72hr @ 3m | Pass |
| LRZ | IP68 | Dust + pressure | 72hr @ 3m | Pass |
| DHU | IP66 | Dust + jets | 3min @ 100kPa | Pass |
| RSS | IP55 | Dust + water | Continuous | Pass |

#### Power Budget Calculations (Detailed)

**PMT Daily Power Budget:**
| Mode | Current | Duration | Energy (mAh) |
|------|---------|----------|--------------|
| SLEEP | 8µA | 22.5hr | 0.18 |
| PULSE | 15mA | 2min | 0.5 |
| SENSE | 45mA | 10min | 7.5 |
| COMPUTE | 80mA | 5min | 6.7 |
| TX | 120mA | 3min | 6.0 |
| **Daily Total** | | | **20.88mAh** |
| Battery capacity | | | 7,000mAh |
| Days per charge | | | 335 days |
| Solar panel (20W) | | | 4hr sun = 80Wh/day |

**VFA Annual Power Budget:**
| Mode | Current | Duration | Energy (mAh/year) |
|------|---------|----------|-------------------|
| DEEP_SLEEP | 2µA | 8750hr | 17.5 |
| CHIRP | 12mA | 10hr | 120 |
| RIPPLE | 18mA | 2hr | 36 |
| **Annual Total** | | | **173.5mAh** |
| Battery capacity | | | 2,600mAh |
| Years per battery | | | 15 years (de-rated to 4) |