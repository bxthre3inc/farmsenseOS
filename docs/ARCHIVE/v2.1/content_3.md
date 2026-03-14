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

# PART V: THE HARDWARE ECOSYSTEM

## 5.0 Hardware Overview
FarmSense implements a hierarchical hardware ecosystem from regional superstations to buried field sensors, all designed for 10-year operational life in harsh agricultural environments.

## 5.1 Regional Superstation (RSS) V1.0

### 5.1.1 Physical Specifications
| Attribute | Specification |
|-----------|-------------|
| Form factor | 40' High-Cube shipping container (modified) |
| Location | Monte Vista, Colorado |
| Footprint | 320 sq ft (40' × 8') |
| Weight | 15,000 lbs (fully loaded) |

### 5.1.2 Compute Specifications
| Component | Specification |
|-----------|-------------|
| CPU | AMD Threadripper PRO 5995WX (64-core) |
| RAM | 512GB ECC DDR4-3200 |
| GPU | 2× NVIDIA RTX A6000 (48GB each) |
| Storage (hot) | 50TB NVMe RAID-10 (Enterprise) |
| Storage (cold) | 200TB HDD archive |

### 5.1.3 Communications
| Interface | Specification | Purpose |
|-----------|-------------|---------|
| Fiber | 10 Gbps (dual path) | Primary backhaul |
| LTE | Cat-20 (2 Gbps) | Backup connectivity |
| Satellite | Starlink (backup) | Emergency only |
| 2.4GHz | 3× Ubiquiti LTU Sector | DHU backhaul |

### 5.1.4 Power
| Component | Specification |
|-----------|-------------|
| Grid | 480V 3-phase, 200A service |
| Generator | 50kW diesel (auto-start) |
| UPS | 30kWh LiFePO4 (4-hour runtime) |
| Solar | 20kW array (supplemental) |

### 5.1.5 BOM — RSS V1.0
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| Threadripper PRO 5995WX | 1 | $6,499 | $6,499 |
| 512GB ECC DDR4 | 4 | $399 | $1,596 |
| RTX A6000 | 2 | $4,500 | $9,000 |
| 50TB NVMe array | 1 | $8,000 | $8,000 |
| 200TB HDD archive | 1 | $4,000 | $4,000 |
| LTU Sector 5AC | 3 | $450 | $1,350 |
| 50kW generator | 1 | $12,000 | $12,000 |
| 30kWh LiFePO4 bank | 1 | $15,000 | $15,000 |
| 20kW solar array | 1 | $40,000 | $40,000 |
| Container modification | 1 | $25,000 | $25,000 |
| **TOTAL RSS BOM** | | | **$122,445** |

## 5.2 District Hub (DHU) V1.2

### 5.2.1 Physical Specifications
| Attribute | Specification |
|-----------|-------------|
| Mounting | 35' Class 4 timber pole |
| Enclosure | NEMA 4X Polycarbonate (Polycase ML-44F) |
| Weight | 85 lbs (fully loaded) |
| Wind rating | 100 mph sustained |

### 5.2.2 Compute Specifications
| Component | Specification |
|-----------|-------------|
| SBC | NVIDIA Jetson Orin Nano 8GB |
| CPU | 6-core Arm Cortex-A78AE @ 1.5 GHz |
| GPU | 1024-core Ampere architecture |
| RAM | 8GB LPDDR5 |
| Storage (hot) | 128GB Swissbit PSLC SSD |
| Storage (cache) | 128GB microSD (emergency backup) |

### 5.2.3 Communications
| Interface | Specification | Purpose |
|-----------|-------------|---------|
| 900MHz | RAK2287 concentrator | Field sensor ingress |
| 2.4GHz | Ubiquiti LTU Sector | DHU-RSS backhaul |
| LTE-M | Quectel BG96 | Failover |
| BLE 5.0 | nRF52840 | Technician maintenance |

### 5.2.4 Power
| Component | Specification |
|-----------|-------------|
| Source | 200W solar + 200Ah LiFePO4 |
| Battery | 200Ah @ 12V (2.4 kWh) |
| Runtime | 7+ days without sun |
| Charging | MPPT 20A controller |

### 5.2.5 Black Box Cache (Critical Feature)
**Purpose:** 30-day continuous audit logging during total backhaul failure

| Spec | Value |
|------|-------|
| Capacity | 128GB Swissbit PSLC SSD |
| Write rate | 50 MB/day (compressed audit packets) |
| Retention | 30+ days at full telemetry |
| Encryption | AES-256-GCM |
| Hash chain | SHA-256 linking |

### 5.2.6 BOM — DHU V1.2
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| Jetson Orin Nano | 1 | $499 | $499 |
| Swissbit 128GB PSLC | 1 | $245 | $245 |
| RAK2287 900MHz | 1 | $89 | $89 |
| LTU Lite AP | 1 | $189 | $189 |
| 200W solar panel | 2 | $180 | $360 |
| 200Ah LiFePO4 | 1 | $1,800 | $1,800 |
| Polycase ML-44F | 1 | $340 | $340 |
| 35' timber pole | 1 | $450 | $450 |
| Cables, connectors | 1 | $150 | $150 |
| Installation labor | 1 | $500 | $500 |
| **TOTAL DHU BOM** | | | **$4,622** |

## 5.3 Pivot Motion Tracker (PMT) V1.6 — CRITICAL: FIELD AGGREGATOR

### 5.3.1 Role Definition
**CRITICAL ARCHITECTURE POINT:** The PMT is the **Primary Field Aggregator**. It is elevated 10-15 feet on the pivot span, above the dense crop canopy. All ground-level devices (VFA, LRZ1, LRZ2, PFA) report **to the PMT**, not directly to the DHU.

### 5.3.2 Physical Specifications
| Attribute | Specification |
|-----------|-------------|
| Mounting | Towers 2-3 of center pivot |
| Elevation | 10-15 feet above ground |
| Enclosure | Polycase WP-21F (NEMA 4X) |
| Weight | 12 lbs |

### 5.3.3 Compute Specifications
| Component | Specification |
|-----------|-------------|
| MCU | ESP32-S3-MINI-1-N8R8 |
| Flash | 8MB QSPI |
| RAM | 512KB SRAM + 8MB PSRAM |
| FPU | Yes (single-precision) |
| Vector unit | Yes (SIMD) |

### 5.3.4 Sensors
| Sensor | Specification | Purpose |
|--------|-------------|---------|
| GNSS | u-blox ZED-F9P RTK | Sub-cm positioning |
| IMU | Bosch BNO055 9-axis | Tower stability, stall detection |
| Flow meter | Badger TFX-5000 clamp-on | ±1.0% flow accuracy |
| Current | 3× Magnelab SCT-0400-400 | Pump signature analysis |

### 5.3.5 Communications
| Interface | Specification | Purpose |
|-----------|-------------|---------|
| Ingress | 900MHz CSS LoRa Mesh | VFA, LRZ1, LRZ2, PFA |
| Egress | 2.4GHz (ESPNOW) or LTE-M | DHU backhaul |
| Maintenance | BLE 5.0 | Technician access |

### 5.3.6 Edge-EBK Computation
**Responsibility:** The PMT performs **Edge-EBK** (Empirical Bayesian Kriging) to generate a 50m-resolution 16×16 probability matrix from field sensor inputs.

**Power:** The FPU processes AES-256 chirps from VFA/LRZ1/LRZ2/PFA into a localized probability matrix. In "COLLAPSE" mode, the FPU focuses 100% compute on the active pivot trajectory.

### 5.3.7 Payload Structure
**Unified Field State Payload (~187 bytes):**
- PMT kinematic data (position, velocity, vibration)
- 50m Edge-EBK arrays (16×16 grid)
- Intercepted VFA/LRZ/PFA telemetry
- Timestamp + cryptographic signature

### 5.3.8 BOM — PMT V1.6
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| ESP32-S3-MINI-1 | 1 | $3.20 | $3.20 |
| ZED-F9P RTK | 1 | $165.00 | $165.00 |
| BNO055 IMU | 1 | $12.50 | $12.50 |
| TFX-5000 clamp-on | 1 | $695.00 | $695.00 |
| SCT-0400-400 (3×) | 3 | $45.00 | $135.00 |
| RFM95W 900MHz | 1 | $6.50 | $6.50 |
| Polycase WP-21F | 1 | $89.00 | $89.00 |
| Solar panel 20W | 1 | $45.00 | $45.00 |
| Battery 12V 7Ah | 1 | $25.00 | $25.00 |
| Antennas, cables | 1 | $35.00 | $35.00 |
| Assembly labor | 1 | $50.00 | $50.00 |
| **TOTAL PMT BOM** | | | **$1,261.20** |

## 5.4 Pressure & Flow Anchor (PFA) V1.9

### 5.4.1 Role Definition
**Wellhead Sentry & Safety Actuator**
The PFA is the critical safety node at the wellhead, monitoring flow and pressure, and capable of actuating emergency pump stops.

### 5.4.2 Physical Specifications
| Attribute | Specification |
|-----------|-------------|
| Mounting | Wellhead pipe (2-6" diameter) |
| Enclosure | Polycase WP-21F (NEMA 4X) |
| Weight | 18 lbs |
| Ingress | IP67 |

### 5.4.3 Sensors
| Sensor | Specification | Purpose |
|--------|-------------|---------|
| Flow | Badger TFX-5000 (clamp-on) | ±1.0% volumetric flow |
| Current | 3× Magnelab SCT-0400-400 | Pump signature, predictive maintenance |
| Pressure | Dwyer PBLTX (vented, 316-SS) | Line pressure monitoring |

### 5.4.4 Actuation
| Component | Specification | Purpose |
|-----------|-------------|---------|
| Relay | Omron G7L-1A-TUB 30A | Pump soft-stop |
| Response time | <50ms | Emergency halt |

### 5.4.5 Communications
| Interface | Specification | Purpose |
|-----------|-------------|---------|
| Primary | 900MHz CSS LoRa | PMT ingress |
| Maintenance | BLE 5.4 | Technician diagnostics |

### 5.4.6 Reflex Logic Table
| Condition | PMT Command | PFA Action |
|-----------|-------------|------------|
| PMT_STALL detected | ACTUATE_STOP | Open relay (<50ms) |
| Line pressure <5 PSI | ACTUATE_STOP | Open relay (<50ms) |
| Saturation alert (48") | ACTUATE_STOP | Open relay (<50ms) |
| Cavitation signature | ACTUATE_STOP + ALERT | Open relay, notify |

### 5.4.7 BOM — PFA V1.9
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| nRF52840-QIAA | 1 | $4.50 | $4.50 |
| TFX-5000 clamp-on | 1 | $695.00 | $695.00 |
| SCT-0400-400 (3×) | 3 | $45.00 | $135.00 |
| Dwyer PBLTX | 1 | $289.00 | $289.00 |
| Omron G7L-1A-TUB | 1 | $45.00 | $45.00 |
| 200Ah LiFePO4 | 1 | $1,800.00 | $1,800.00 |
| 200W solar | 2 | $180.00 | $360.00 |
| Polycase WP-21F | 1 | $89.00 | $89.00 |
| Cables, connectors | 1 | $150.00 | $150.00 |
| **TOTAL PFA BOM** | | | **$3,467.50** |

## 5.5 Vertical Field Anchor (VFA) V2.1

### 5.5.1 Role Definition
**Deep-Truth Probe (48" Profile)**
The VFA is the primary ground-truth sensor for sub-surface moisture, with sensors at multiple depths providing a vertical moisture profile.

### 5.5.2 Physical Specifications
| Attribute | Specification |
|-----------|-------------|
| Housing | 2" HDPE SDR9 outer shell (permanent) |
| Sled | 50mm CHDPE SDR9 Alpha-Sled (removable) |
| Length | 48 inches (1219mm) |
| Burial | Ground level, capped flush |
| Extraction | Pre-harvest (September) |

### 5.5.3 The 48U Stack Sequence
| Slot (inch) | Component | Function |
|-------------|-------------|----------|
| 1 (Top) | Desiccant Pack | Apex moisture trap |
| 2-5 | Battery Cartridge #1 | 3× 21700 Li-ion + heater |
| 10 | Advanced Sensor | 10" Root Zone Ingest |
| 18 | Basic Sensor | 18" VWC/Temp |
| 25 | Advanced Sensor | 25" Root Anchor |
| 35 | Basic Sensor | 35" Wetting Front |
| 48 (Bottom) | Advanced Sensor | 48" Deep Percolation |

### 5.5.4 Sensor Specifications
| Depth | Type | Parameters |
|-------|------|------------|
| 10" | GroPoint Profile | VWC, EC, Temp |
| 18" | Basic | VWC |
| 25" | GroPoint Profile | VWC, EC, Temp |
| 35" | Basic | VWC |
| 48" | GroPoint Profile | VWC, EC, Temp |

### 5.5.5 The Proxy Method
**Non-Contact Capacitive Sensing:**
The sensors utilize an advanced non-contact capacitive method, shooting high-frequency dielectric fields through the 50mm sled wall and across a +5 PSI dry nitrogen gap directly into the soil. This eliminates galvanic corrosion and sensor drift.

### 5.5.6 Communications
| Interface | Specification | Purpose |
|-----------|-------------|---------|
| Primary | 900MHz CSS LoRa | PMT ingress |
| Range | 1km+ to elevated PMT | Canopy penetration |

### 5.5.7 BOM — VFA V2.1 (1,280 unit tier)
| Component | Cost |
|-----------|------|
| Housing (HDPE SDR9) | $6.75 |
| Antenna (SS-304 whip) | $3.50 |
| Compute (nRF52840) | $8.50 |
| Seals (Viton FKM) | $2.40 |
| Battery Cartridges (5×) | $83.75 |
| Sensors (3× Adv + 2× Basic) | $47.00 |
| **TOTAL VFA BOM** | **$151.90** |

## 5.6 Lateral Root-Zone Surveyor (LRZ) V1.2 — CRITICAL: TWO VARIANTS

### 5.6.1 CRITICAL DISTINCTION: LRZ1 vs LRZ2
| Feature | LRZ1 (Basic) | LRZ2 (Reference) |
|---------|--------------|------------------|
| **Cost** | $29.00 | $54.30 |
| **Sensors** | Dielectric (VWC only) | Dielectric + Temperature |
| **Calibration** | Standard | Enhanced (temperature-compensated) |
| **Role** | Spatial density filler | Ground-truth anchor point |
| **Density** | 12 per field | 4 per field |
| **Total per field** | | 16 LRZ nodes |
| **Reporting** | To PMT | To PMT |
| **Power** | 2.6Ah LiSOCl2 | 2.6Ah LiSOCl2 |
| **Battery life** | 4+ years | 4+ years |

### 5.6.2 LRZ1 Specifications (Basic)
| Attribute | Specification |
|-----------|-------------|
| MCU | nRF52840-QIAA |
| Sensor | Capacitive dielectric (~100MHz) |
| Measurement | Volumetric Water Content (VWC) |
| Accuracy | ±3% |
| Housing | 2" HDPE SDR9 shell + removable sled |
| Antenna | Stainless steel whip (buried, RF-transparent) |

### 5.6.3 LRZ2 Specifications (Reference)
| Attribute | Specification |
|-----------|-------------|
| MCU | nRF52840-QIAA |
| Sensors | Capacitive dielectric + Digital temperature |
| Measurements | VWC + Soil Temperature |
| Accuracy | VWC ±2.5%, Temp ±0.5°C |
| Calibration | Temperature-compensated VWC |
| Housing | 2" HDPE SDR9 shell + removable sled |

### 5.6.4 PCB Layout (Both Variants)
| GPIO | Function |
|------|----------|
| P0.02 | ADC0 (dielectric) |
| P0.03 | ADC1 (temperature - LRZ2 only) |
| P0.28-P0.31 | LoRa SPI (SCK, MISO, MOSI, CS) |
| P1.00 | LoRa IRQ |
| P0.29 | LoRa RST |

### 5.6.5 Sensing Methodology
**~100MHz Dielectric Projection:**
Both variants project high-frequency RF through the HDPE walls into the surrounding soil. The frequency was selected to:
- Minimize salinity effects
- Provide good spatial resolution (~6" sphere of influence)
- Enable through-wall measurement without soil contact

### 5.6.6 BOM Comparison
| Component | LRZ1 | LRZ2 |
|-----------|------|------|
| nRF52840-QIAA | $4.50 | $4.50 |
| Dielectric circuit | $8.00 | $8.00 |
| Temp sensor | — | $12.00 |
| PCB + passives | $6.50 | $6.50 |
| Housing assembly | $10.00 | $10.00 |
| Battery (2.6Ah) | $12.00 | $12.00 |
| Antenna | $3.50 | $3.50 |
| Assembly labor | $15.00 | $15.00 |
| **TOTAL** | **$29.00** | **$54.30** |