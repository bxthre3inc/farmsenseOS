---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **MODULAR DAP (Drift Aversion Protocol)**
> **Module: D-DAP (Documentation)**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.

# PART V: THE HARDWARE ECOSYSTEM

## 5.1 Regional Superstation (RSS) V1.0

### 5.1.1 Role & Positioning

**Function:** Level 3 territory master, decentralized cloud counterpart
**Location:** Monte Vista, CO (centrally positioned in SLV)
**Coverage:** 1,280 fields, 166,000 acres
**Critical capability:** Continues full operation during total regional backhaul failure

### 5.1.2 Physical Specifications

**Enclosure:** Modified 40-foot High-Cube ISO shipping container
- Dimensions: 40' × 8' × 9.5' (L×W×H)
- Climate control: HVAC maintaining 18-24°C
- Security: Biometric access, seismic sensors, fire suppression
- Power: Dual feed + 20kW generator backup

**Compute Cluster:**
| Component | Specification |
|-----------|---------------|
| CPU | AMD Threadripper PRO 5995WX (64 cores / 128 threads) |
| RAM | 512GB DDR4-3200 ECC |
| GPU | 2× NVIDIA RTX A6000 (48GB each) |
| Storage | 50TB NVMe SSD (hot), 200TB HDD (cold) |
| Network | Dual 100GbE fiber, LTE backup |

### 5.1.3 Software Stack

- OS: Ubuntu 22.04 LTS (real-time kernel patches)
- Database: PostgreSQL 15 + TimescaleDB extension
- Geospatial: PostGIS 3.4, raster analytics
- Container orchestration: Kubernetes (k3s lightweight)

---

## 5.2 District Hub (DHU) V1.1

### 5.2.1 Role & Positioning

**Function:** Level 2 regional mesh manager, edge coordinator
**Mounting:** 35-foot Class 4 timber pole (12" base diameter)
**Coverage:** 100-pivot radius (12,600 acres)
**Critical capability:** 30-day autonomous operation during backhaul failure

### 5.2.2 Physical Specifications

**Enclosure:**
- Housing: Polycase WP-21F (NEMA 4X, IP67)
- Mounting: Pole bracket with seismic dampeners
- Dimensions: 14" × 12" × 8"
- Weight: 8.2 kg (18 lbs)

**Compute Module:**
| Component | Specification |
|-----------|---------------|
| CPU/GPU | NVIDIA Jetson Orin Nano (8GB) |
| AI Performance | 40 TOPS (INT8) |
| RAM | 8GB LPDDR5 |
| Storage | 128GB Swissbit PSLC Industrial SSD (30-day cache) |
| OS | JetPack 6.0 (Ubuntu 22.04) |

### 5.2.3 Communications Array

**900MHz CSS LoRa Gateway (Revised V1.1):**
- Module: Semtech SX1302-based concentrator
- Antenna: 6dBi omnidirectional fiberglass whip
- Channels: 8× multi-SF, 1× FSK
- Capacity: 10,000+ sensor nodes

**2.4GHz Backhaul:**
- Antennas: 3× Ubiquiti LTU-Lite Sector (120° each, 18dBi)
- Frequency: 2.402-2.477 GHz
- Modulation: TDD (Time Division Duplexing)
- Throughput: 150 Mbps per sector
- Range: 15km line-of-sight

**LTE-M Fallback:**
- Module: Quectel BG95 (Cat M1)
- Bands: B2, B4, B12, B13, B25, B26
- Protocol: CoAP/LwM2M

### 5.2.4 Power System

| Component | Specification |
|-----------|---------------|
| Battery | LiFePO4 12V 200Ah (2.4kWh) |
| Solar | 4× 200W panels (800W total) |
| Charger | MPPT 60A controller |
| Active heating | 50W pad heater (sub-zero operation) |
| Runtime | 7 days without sun (full load), 30 days (sleep mode) |

### 5.2.5 DHU Bill of Materials

| Item | Part Number | Qty | Unit Cost | Extended |
|------|-------------|-----|-----------|----------|
| Jetson Orin Nano | 900-13767-0010-000 | 1 | $499.00 | $499.00 |
| Swissbit PSLC SSD | SBSDABJ-128G-000 | 1 | $285.00 | $285.00 |
| LiFePO4 Battery | LFP12V200AH | 1 | $1,200.00 | $1,200.00 |
| Solar Panel 200W | RICH SOLAR 200W | 4 | $189.00 | $756.00 |
| MPPT Controller | Victron SmartSolar 60A | 1 | $325.00 | $325.00 |
| LoRa Gateway | RAK7243C | 1 | $289.00 | $289.00 |
| LTU Sector Antenna | Ubiquiti LTU-Lite | 3 | $149.00 | $447.00 |
| LTE Module | Quectel BG95 | 1 | $45.00 | $45.00 |
| NEMA 4X Enclosure | Polycase WP-21F | 1 | $189.00 | $189.00 |
| Mounting Hardware | Custom bracket kit | 1 | $125.00 | $125.00 |
| **TOTAL** | | | | **$4,160.00** |

---

## 5.3 Pivot Motion Tracker (PMT) V1.6

### 5.3.1 Role & Positioning

**Function:** Level 1.5 Field Hub, Primary Field Aggregator
**Location:** Tower 2 or 3 of center pivot span
**Elevation:** 10-15 feet above ground level
**Critical function:** Aggregates all ground-level sensors, circumvents canopy attenuation

### 5.3.2 Physical Specifications

**Housing:**
- Enclosure: Polycase ML-44F (NEMA 4X, IP67)
- Mounting: Tower bracket with spring isolators (vibration dampening)
- Dimensions: 8" × 6" × 4"
- Weight: 2.8 kg (6.2 lbs)

**Environmental:**
- Temperature: -40°C to +85°C operational
- Humidity: 0-100% RH (IP67 sealed)
- Vibration: MIL-STD-810H Method 514.8 compliant
- Altitude: Sea level to 10,000 ft

### 5.3.3 Compute & Sensing

**Core Module:** ESP32-S3 (Espressif)
| Parameter | Specification |
|-----------|---------------|
| CPU | Xtensa LX7 dual-core @ 240MHz |
| FPU | Yes (vector floating point) |
| RAM | 512KB SRAM + 8MB PSRAM |
| Flash | 16MB QSPI |
| WiFi | 802.11 b/g/n (2.4GHz) |
| Bluetooth | BLE 5.0 (maintenance/config) |

**GNSS (Positioning):**
- Module: u-blox ZED-F9P
- Constellations: GPS, GLONASS, Galileo, BeiDou
- RTK accuracy: ±2cm horizontal, ±4cm vertical (with corrections)
- Update rate: 10Hz (kinematic)

**Inertial Measurement (Structural Monitoring):**
- Module: Bosch BNO055 (9-axis IMU)
- Accelerometer: ±16g
- Gyroscope: ±2000°/s
- Magnetometer: ±1300µT
- Fusion: Built-in sensor fusion (Euler angles, quaternion)

**Hydraulic Monitoring:**
- Flow meter: Badger Meter TFX-5000 (ultrasonic transit-time)
- Accuracy: ±1.0% of reading
- Mounting: Clamp-on (no pipe cutting)
- Range: 0.1-40 ft/s velocity

### 5.3.4 Communications

**900MHz CSS LoRa Mesh (Sensor Ingress):**
- Module: HopeRF RFM95W (SX1276-based)
- Frequency: 915MHz
- TX Power: +20dBm (100mW)
- Sensitivity: -148dBm (SF12)
- Antenna: 3dBi whip (external, spring-mounted)

**2.4GHz/LTE-M (Backhaul to DHU):**
- WiFi: ESP32-S3 integrated (2.4GHz)
- LTE-M: Optional Quectel BG95 module
- Range to DHU: 2-5km typical

### 5.3.5 Power System

**Primary:** 12VDC from pivot electrical (via transformer)
**Backup:** Saft LS14500 LiSOCl2 primary cell (3.6V, 2.6Ah)
- Function: Keep-alive for RTC and GNSS ephemeris
- Duration: 2 years (sleep mode)
- HPC: Hybrid Pulse Capacitor for burst TX

**Power Consumption:**
| Mode | Current | Duration |
|------|---------|----------|
| Sleep | 8µA | 4 hours |
| Chirp (LNA wake) | 15mA | 50ms |
| Sense (ADC) | 45mA | 100ms |
| Compute (EBK) | 80mA | 200ms |
| TX (LoRa burst) | 120mA | 150ms |

### 5.3.6 Firmware State Machine

**States:**
- **INIT:** Boot, self-test, GNSS lock
- **SLEEP:** Deep sleep, RTC timer wake
- **PULSE:** Chirp interval, check for sensor data
- **SENSE:** Collect kinematic data (IMU, GNSS)
- **COMPUTE:** Execute Edge-EBK algorithm
- **TX:** Transmit payload to DHU
- **ISLAND:** Autonomous mode (DHU link lost)

**Fault Handlers:**
| Code | Condition | Action |
|------|-----------|--------|
| FAULT_01 | PMT stall (IMU >3g spike) | EMERGENCY_STOP, alert |
| FAULT_02 | DHU link lost >4hr | ISLAND_MODE, cached worksheet |
| FAULT_03 | Battery <20% | Reduced chirp frequency |
| FAULT_04 | GNSS lost >10min | Dead reckoning (IMU only) |

### 5.3.7 PMT Bill of Materials

| Item | Part Number | Qty | Unit Cost | Extended |
|------|-------------|-----|-----------|----------|
| ESP32-S3 DevKit | ESP32-S3-DevKitC-1 | 1 | $15.00 | $15.00 |
| u-blox ZED-F9P | ZED-F9P-02B | 1 | $89.00 | $89.00 |
| BNO055 IMU | BNO055 | 1 | $12.00 | $12.00 |
| RFM95W LoRa | RFM95W-915S2 | 1 | $8.00 | $8.00 |
| TFX-5000 Flow | Badger TFX-5000 | 1 | $485.00 | $485.00 |
| LiSOCl2 Battery | Saft LS14500 | 1 | $4.50 | $4.50 |
| HPC Capacitor | SII HPC1550 | 1 | $2.50 | $2.50 |
| NEMA 4X Enclosure | Polycase ML-44F | 1 | $89.00 | $89.00 |
| Mounting Bracket | Custom (stainless) | 1 | $65.00 | $65.00 |
| Antenna (LoRa) | Taoglas TI.20 | 1 | $12.00 | $12.00 |
| Spring Isolators | Vibrashock VSG-1 | 4 | $15.00 | $60.00 |
| **TOTAL** | | | | **$842.00** |

---

## 5.4 Pressure & Flow Anchor (PFA) V1.9

### 5.4.1 Role & Positioning

**Function:** Level 1 wellhead sentry and safety actuator
**Location:** Mounted at wellhead, downstream of pump, upstream of pivot
**Critical function:** Flow measurement, pump protection, emergency shutoff

### 5.4.2 Physical Specifications

**Housing:**
- Enclosure: Polycase WP-21F (NEMA 4X)
- Mounting: Wellhead bracket (stainless steel)
- Dimensions: 12" × 10" × 6"
- Weight: 4.5 kg (10 lbs)

### 5.4.3 Sensing Stack

**Flow Measurement:**
- Device: Badger Meter TFX-5000 (ultrasonic transit-time)
- Accuracy: ±1.0% of reading
- Repeatability: ±0.2%
- Pipe diameter: 6-12" (adjustable clamp-on)
- Outputs: 4-20mA, pulse, Modbus

**Pressure Monitoring:**
- Device: Dwyer PBLTX (submersible)
- Range: 0-300 PSI
- Accuracy: ±0.25% FS
- Housing: 316 stainless steel

**Current Monitoring:**
- CT Clamps: Magnelab SCT-0400 (3× split-core)
- Rating: 400A per phase
- Accuracy: ±1%
- Purpose: Cavitation detection via harmonic analysis

**Motor Health (FFT Analysis):**
- Sampling: 10kHz on current waveforms
- Analysis: FFT to detect bearing wear, cavitation, unbalance
- Detection: Torque ripple, harmonic distortion
- Alert: Pre-failure warning (days to weeks ahead)

### 5.4.4 Actuation

**Safety Relay:**
- Device: Omron G9EA-1-B (30A, 24VDC coil)
- Function: Emergency pump shutoff
- Response time: <50ms
- Manual override: Physical bypass switch

**Reflex Logic Table:**
| Condition | Sensor | Threshold | Action | Latency |
|-----------|--------|-----------|--------|---------|
| PMT stall | PMT command | Digital signal | ACTUATE_STOP | <100ms |
| Line pressure drop | Dwyer PBLTX | <5 PSI | ACTUATE_STOP | <50ms |
| Saturation alert | VFA (chirp) | >48" wet | ACTUATE_STOP | <500ms |
| Cavitation detected | CT clamp FFT | 3rd harmonic >15% | ACTUATE_STOP + Alert | <1s |
| Flow rate anomaly | TFX-5000 | >120% baseline | ACTUATE_STOP | <100ms |

### 5.4.5 Communications

**900MHz CSS LoRa:**
- Module: nRF52840 (Nordic Semiconductor)
- CPU: Cortex-M4F @ 64MHz
- Security: ARM TrustZone, Cryptocell-310 (AES-256)
- TX Power: +8dBm (6.3mW)
- Range to PMT: 50-200m (depending on canopy)

**BLE 5.4:**
- Purpose: Maintenance/configuration
- Range: 10m
- Security: LE Secure Connections

### 5.4.6 Power System

**Battery:** LiFePO4 12V 50Ah (600Wh)
**Charging:** 20W solar panel + MPPT controller
**Active heating:** 5W Kapton pad (sub-zero protection)
**Runtime:** 5 days without sun

### 5.4.7 PFA Bill of Materials

| Item | Part Number | Qty | Unit Cost | Extended |
|------|-------------|-----|-----------|----------|
| nRF52840 Module | nRF52840-DK | 1 | $12.00 | $12.00 |
| TFX-5000 Flow | Badger TFX-5000 | 1 | $485.00 | $485.00 |
| Dwyer PBLTX | Dwyer PBLTX | 1 | $289.00 | $289.00 |
| CT Clamps (3×) | Magnelab SCT-0400 | 3 | $45.00 | $135.00 |
| Safety Relay | Omron G9EA-1-B | 1 | $65.00 | $65.00 |
| LiFePO4 Battery | 12V 50Ah | 1 | $450.00 | $450.00 |
| Solar Panel 20W | Renogy 20W | 1 | $45.00 | $45.00 |
| MPPT Controller | 10A | 1 | $35.00 | $35.00 |
| Heater Pad | 5W Kapton | 1 | $18.00 | $18.00 |
| NEMA 4X Enclosure | Polycase WP-21F | 1 | $189.00 | $189.00 |
| **TOTAL** | | | | **$1,723.00** |

---

## 5.5 Vertical Field Anchor (VFA) V2.1

### 5.5.1 Role & Positioning

**Function:** Level 1 deep-truth probe, 48" soil profile monitoring
**Location:** 2 per field (offset from pivot track, representative soil)
**Burial depth:** 48" (1.2m), flush with soil surface
**Deployment:** Two-phase (permanent shell + removable Alpha-Sled)

### 5.5.2 Physical Specifications

**Outer Shell (Permanent):**
- Material: HDPE SDR9 (2.067" ID / 52.5mm)
- Length: 48" (1219mm)
- Wall thickness: 0.154" (3.9mm)
- End: Taper tip (friction-molded, monolithic)
- Seal: HDPE fusion weld, pressure-tested to 100 PSI
- UV resistance: 40-year rated

**Alpha-Sled (Removable):**
- Material: CHDPE (cross-linked high-density PE)
- Diameter: 50mm (1.97")
- Length: 46" (1168mm)
- Electronics housing: Sealed compartments, IP68
- Antenna: SS-304 whip, 3ft (91cm), spring base
- Extraction: Manual pull via stainless steel cable

### 5.5.3 The 48U Stack Sequence

| Slot (inch) | Component | Function | Notes |
|-------------|-----------|----------|-------|
| 0-2 | Desiccant Pack | Apex moisture trap | Replaceable cartridge |
| 2-8 | Battery Cartridge #1 | 3× 21700 Li-ion + heater | 10.8V, 4.5Ah |
| 8-12 | Advanced Sensor #1 | 10" (25cm) VWC/Temp/EC | Primary root zone |
| 12-18 | Basic Sensor #1 | 18" (45cm) VWC/Temp | Secondary zone |
| 18-25 | Advanced Sensor #2 | 25" (63cm) VWC/Temp/EC | Deep root anchor |
| 25-35 | Basic Sensor #2 | 35" (89cm) VWC/Temp | Wetting front |
| 35-48 | Advanced Sensor #3 | 48" (122cm) VWC/Temp/EC | Deep percolation detection |

**Advanced Sensor (GroPoint Profile segment):**
- Parameters: VWC, soil temperature, bulk EC
- Accuracy: ±3% VWC
- Measurement zone: 4" (10cm) diameter sphere

**Basic Sensor (custom capacitive):**
- Parameters: VWC, temperature
- Accuracy: ±5% VWC
- Cost: 40% of GroPoint

### 5.5.4 The Proxy Method (Non-Contact Sensing)

**Principle:** High-frequency dielectric field projection
- Frequency: ~100MHz
- Field penetration: Through 50mm CHDPE sled wall
- Gap medium: +5 PSI dry nitrogen (prevents condensation)
- Advantage: Electronics never contact soil, corrosion eliminated

**Calibration:**
- Mineral soil: Topp equation (ε = 3.03 + 9.3m + 146m²)
- Organic soil: Custom calibration curve
- Site-specific: Field-calibrated with gravimetric samples

### 5.5.5 Communications

**900MHz CSS LoRa:**
- Module: nRF52840 (same as PFA)
- TX Power: +8dBm
- Reporting: To elevated PMT (50-200m range)
- Protocol: 128-bit encrypted chirp every 4 hours (default)

### 5.5.6 Power System

**Battery Cartridges:** 5× 21700 Li-ion packs
- Configuration: 3S1P (3 cells series, 1 parallel)
- Voltage: 10.8V nominal
- Capacity: 4.5Ah per cartridge
- Total capacity: 22.5Ah @ 10.8V = 243Wh

**Active Heating:**
- Element: 5W Kapton heater per battery cartridge
- Trigger: Temperature <0°C
- Purpose: Prevent lithium plating during charging

**Battery Life:** 4+ years at 4-hour chirp intervals

### 5.5.7 VFA Bill of Materials (1,280 Unit Tier)

| Item | Part Number | Unit Cost |
|------|-------------|-----------|
| Outer Shell (HDPE SDR9 2") | Custom extrusion | $6.75 |
| Alpha-Sled (CHDPE) | Custom molded | $12.50 |
| Antenna (SS-304 whip) | Taoglas | $3.50 |
| Compute (nRF52840) | Nordic | $8.50 |
| Seals (Viton FKM) | Parker | $2.40 |
| Battery Cartridges (5×) | 21700 Li-ion | $83.75 |
| Advanced Sensors (3× GroPoint) | AquaSpy | $141.00 |
| Basic Sensors (2× custom) | FarmSense | $18.00 |
| Nitrogen fill valve | Swagelok | $4.80 |
| Desiccant cartridge | Silica gel | $1.20 |
| **TOTAL** | | **$282.40** |

*Note: Bom at 1,280 unit OEM scale. Prototype costs 3-5× higher.*

---

## 5.6 Lateral Root-Zone Surveyor (LRZ1/LRZ2) V1.2

### 5.6.1 Role & Positioning

**Function:** Level 1 spatial scouts, distributed moisture mapping
**Density:** 16 per field
- 4× LRZ2 (Reference nodes with VWC + temperature)
- 12× LRZ1 (Truth nodes with basic sensing)
**Distribution:** Grid pattern, 1 per ~8 acres

### 5.6.2 Physical Specifications

**Housing (Alpha-Sled):**
- Material: CHDPE (same as VFA)
- Diameter: 35mm (1.38")
- Length: 12" (305mm)
- Deployment: Buried 10" deep, cap flush with surface

### 5.6.3 PCBA (Custom Circuit)

**Microcontroller:** nRF52840 (same as PFA/VFA)
- GPIO allocation:
  - P0.02/P0.03: 12-bit analog dielectric sensing
  - P0.28-P0.31: LoRa SPI interface
  - P0.10: Temperature (1-wire)

**Sensing:**
- Method: Capacitive dielectric (non-contact)
- Frequency: ~100MHz
- Penetration: Through CHDPE wall into soil
- Calibration: Field-specific with gravimetric correlation

**LRZ1 (Basic):**
- Parameters: Volumetric water content
- Accuracy: ±5%
- Cost target: $29/unit at scale

**LRZ2 (Reference):**
- Parameters: VWC + soil temperature
- Accuracy: ±3% VWC, ±0.5°C temp
- Cost target: $54.30/unit at scale

### 5.6.4 Communications

**900MHz CSS LoRa:**
- Module: Integrated nRF52840 (RADIO peripheral)
- Protocol: Dumb chirp (encrypted, minimal payload)
- Interval: 4 hours (adjustable 1-24 hours)
- Reporting: Directly to elevated PMT

### 5.6.5 Power System

**Battery:** 21700 LiSOCl2 primary cell (SAFT LS14500 equivalent)
- Voltage: 3.6V
- Capacity: 2.6Ah
- Chemistry: Lithium Thionyl Chloride (high energy density)
- Life: 4+ years at 4-hour chirp intervals

**Power Consumption:**
| State | Current | Duration | Energy |
|-------|---------|----------|--------|
| Sleep | 2µA | 3h 59m | 0.01mAh |
| Wake | 15mA | 50ms | 0.0002mAh |
| Sense | 8mA | 100ms | 0.0002mAh |
| TX | 45mA | 150ms | 0.002mAh |
| **Total per cycle** | | | **~0.003mAh** |
| **Annual consumption** | | | **~7mAh** |
| **4-year life** | | | **~28mAh (well within 2600mAh capacity)** |

### 5.6.6 LRZ1 Bill of Materials

| Item | Cost |
|------|------|
| nRF52840 module | $4.50 |
| PCBA (2-layer) | $3.20 |
| CHDPE sled | $2.80 |
| LiSOCl2 battery | $4.50 |
| Antenna (PCB) | $1.20 |
| Seals/O-rings | $0.80 |
| Nitrogen fill | $0.50 |
| Desiccant | $0.50 |
| Assembly labor | $11.50 |
| **TOTAL** | **$29.00** |

### 5.6.7 LRZ2 Bill of Materials

| Item | Cost |
|------|------|
| nRF52840 module | $4.50 |
| PCBA (4-layer, temp sensor) | $4.80 |
| CHDPE sled | $2.80 |
| Temp sensor (DS18B20) | $1.20 |
| LiSOCl2 battery (larger) | $6.50 |
| Antenna (PCB + whip) | $2.40 |
| Seals/O-rings | $1.20 |
| Nitrogen fill | $0.50 |
| Desiccant | $0.50 |
| Assembly labor | $14.00 |
| Calibration | $6.00 |
| **TOTAL** | **$54.30** |

---

## 5.7 Single Field Deployment Configurations

### 5.7.1 SFD-P: Standard Pivot (126-Acre Circular)

**Geometry:**
- Pivot radius: 1,320 feet (1/4 mile)
- Area: 126 acres (51 hectares)
- Soil: Homogeneous or managed by zone

**Node Configuration:**
| Device | Qty | Purpose |
|--------|-----|---------|
| PMT | 1 | Field aggregator, kinematic tracking |
| PFA | 1 | Wellhead sentry, flow monitoring |
| VFA | 2 | Deep profile truth (48") |
| LRZ2 | 4 | Reference scouts |
| LRZ1 | 12 | Spatial truth scouts |
| **Total** | **20 nodes** | |

**Resolution:**
- Compliance: 50m grid (free tier)
- Enterprise: 1m grid (subscription)

**Cost per SFD-P:**
| Component | Qty | Unit | Extended |
|-----------|-----|------|----------|
| PMT | 1 | $842 | $842 |
| PFA | 1 | $1,723 | $1,723 |
| VFA | 2 | $282 | $564 |
| LRZ2 | 4 | $54 | $216 |
| LRZ1 | 12 | $29 | $348 |
| **Hardware** | | | **$3,693** |
| Installation | 20 | $15 | $300 |
| **Total** | | | **$3,993** |

### 5.7.2 SFD-C: Corner-Swing Arm (150+ Acre)

**Geometry:**
- Type: Center pivot with corner arm (end gun or swing arm)
- Area: 150-175 acres (variable by geometry)

**Additional Components:**
| Device | Qty | Purpose |
|--------|-----|---------|
| CSA | 1 | Corner-Swing Auditor |

**CSA (Corner-Swing Auditor) Specifications:**
- Mounting: Last tower + swing arm
- Tracking: BLE 5.2 distance ranging
- Precision: ±0.1° joint resolution
- Function: Maps swing-arm coverage area

**SFD-C Total Nodes:** 28 (20 standard + 8 corner-specific)

### 5.7.3 SFD-F: Flood/Surface Irrigation

**Type:** Graded furrow, border strip, or level basin

**Node Configuration:**
| Device | Qty | Purpose |
|--------|-----|---------|
| PMT-Lite | 1 | Static field hub (no pivot tracking) |
| PFA | 1 | Headgate flow monitoring |
| VFA | 4 | Wetting front tracking |
| LRZ2 | 8 | Spatial density (irregular coverage) |
| LRZ1 | 20 | Extended truth network |
| **Total** | **34 nodes** | |

**Wetting Front Propagation:**
- Algorithm: Track infiltration from head/ditch
- Trigger: Irrigation cessation when wetting front reaches 36"
- Purpose: Prevent deep percolation in flood systems

---

## 5.8 Subdistrict 1 Scale (1,280 Fields)

### 5.8.1 Phase 1 — Compliance Foundation

**Scope:** Immediate Water Court readiness
- 1,280 fields × SFD-P configuration
- 1,280 PMTs (all fields instrumented)
- Base RSS infrastructure (1 station)
- Minimum viable sensor density

**Node Count:**
| Device | Per Field | Total |
|--------|-----------|-------|
| PMT | 1 | 1,280 |
| PFA | 1 | 1,280 |
| VFA | 2 | 2,560 |
| LRZ2 | 4 | 5,120 |
| LRZ1 | 12 | 15,360 |
| **Total Nodes** | **20** | **25,600** |

**Infrastructure:**
| Item | Qty | Unit Cost | Extended |
|------|-----|-----------|----------|
| DHU | 13 | $4,160 | $54,080 |
| RSS | 1 | $25,000 | $25,000 |
| Installation | 25,600 | $15 | $384,000 |
| **Phase 1 CAPEX** | | | **$1,580,800** |

### 5.8.2 Phase 2 — Full Ecosystem Saturation

**Scope:** 18-node Stereo Density per field
- 25 DHUs (full coverage with redundancy)
- Enhanced RSS (compute upgrade)
- 1m-pixel spatial moisture grid

**Phase 2 Additions:**
| Item | Qty | Unit Cost | Extended |
|------|-----|-----------|----------|
| Additional sensors | 12,800 | $45 | $576,000 |
| Additional DHUs | 12 | $4,160 | $49,920 |
| RSS upgrade | 1 | $15,000 | $15,000 |
| **Phase 2 CAPEX** | | | **$640,920** |
| **Phase 1+2 Total** | | | **$3,970,638** |

**Annual Revenue at Scale:**
| Tier | Fields | Monthly | Annual |
|------|--------|---------|--------|
| Base | 256 | $149 | $457,728 |
| Plus | 512 | $299 | $1,837,056 |
| Enterprise | 512 | $499 | $3,065,856 |
| **Total ARR** | **1,280** | | **$5,360,640** |