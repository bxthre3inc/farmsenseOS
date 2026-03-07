# MASTER SYSTEM SPECIFICATION: FarmSense Systems & Infrastructure (V2.1)

> **The Single Source of Truth for Hardware, Network, and Infrastructure**
> Consolidates: 14 Master Specs, 10 Knowledge Items, 2 EDRs, and the Comprehensive Hardware breakdown.

---

## 1. Executive Summary & Philosophy

The FarmSense system is a utility-grade hydrological infrastructure project designed for 10-40 year operational lifecycles. It employs a **Heterogeneous Tiered Architecture** that ensures data integrity and mechanical safety even during total regional internet failures.

### Core Pillars
1. **2:4:12 Stereo Density**: 2 VFAs, 4 LRZ2s, and 12 LRZ1s per field to support 1m "Enterprise" resolution.
2. **Cut-Less Integration**: All field hardware is non-invasive, preserving machine structural warranties and avoiding pipe cuts.
3. **Seasonal Sled Extraction**: High-value internal sensor "sleds" are extracted post-harvest to prevent winter battery degradation, leaving cheap HDPE "docking shells" in situ.
4. **Fisherman's Attention**: Adaptive update frequencies (5s to 4h) based on environmental activity and anomalies.
5. **Digital Water Ledger**: Absolute seniority protection in Water Court via ±1.0% flow accuracy and PBFT consensus.

---

## 2. System Hierarchy & Topology

### 2.1 The Data Stack
| Layer | Node | Role | Protocol |
| :--- | :--- | :--- | :--- |
| **L0 (Air)** | eBee Ag / Mavic 3M | Multispectral Spatial Priors | DJI/SenseFly proprietary |
| **L1 (Source)** | VFA, LRZ, PFA, CSA | Raw Ground Truth Telemetry | 900MHz LoRa Mesh |
| **L1.5 (Hub)** | PMT | Field Aggregator & Kinematic Auditor | 5GHz LTU / LoRa Sink |
| **L2 (District)** | DHU | Edge Coordinator & PBFT Ledger | 5GHz LTU / Fiber / LTE-M |
| **L3 (Cortex)** | RSS | Regional Master DIL & Sled Hospital | Fiber / Starlink Business |

### 2.2 Connectivity Standards
- **L1 → L1.5**: 900MHz LoRa Mesh (**CSS modulation**, NOT FHSS). AES-128/256 encrypted. 100% canopy penetration.
- **L1.5 → L2**: 5GHz Ubiquiti LTU Sector (Primary). Telit ME910G1 LTE-M (Failover).
- **L2 → L3**: Fiber ONT Primary. Starlink Business Failover.
- **L3 → Cloud**: Symmetrical Gigabit Fiber.

### 2.3 RF Coexistence & Standards
- **Standardized Terminology**: Use "**LoRa Bursts**" (CSS), not "FHSS Chirps."
- **Coexistence**: PMT enclosure houses both 5GHz LTU and 900MHz SX1262. Study (CSU Pilot) validates <1% packet loss at full power.
- **DHU Requirements**: Requires both 5GHz LTU Sector array (3x120°) and a dedicated 900MHz LoRa Mesh Gateway sink.

---

## 3. Layer 3: Regional Superstation (RSS) V1.3
**Role**: Territory Cortex, Master DIL, and Sled Hospital.
**Infrastructure**: Modified 40' High-Cube Container (R-21 Insulation).

### 3.1 Facility Zones
- **Zone A: Logistics Hub (20')**: Features a 12' SS workbench, **Nitrogen Manifold** (+5 PSI purge), and digital **Pressure-Decay QC** station ($<0.1$ PSI drop/15 min). Stores Polaris Ranger-HD and auger fleet.
- **Zone B: Staging (10')**: Industrial Ready-Rack (500 unit capacity). Burn-in bench for u-blox ZED-F9P RTK verification.
- **Zone C: Clean Vault (10')**: Hermetically sealed room with Mitsubishi Hyper-Heat HVAC (operational to −40°F), HEPA scrubbing, and spring-dampened server racks.

### 3.2 Oracle Unified Compute Cluster
- **Compute**: 64-Core AMD Threadripper PRO 5995WX, 512GB ECC RAM, Dual NVIDIA RTX A6000 (48GB).
- **Storage**: 50TB WD Gold Enterprise NVMe (RAID-10).
- **Operations**:
  - **Kriging Engine**: Renders 1m-resolution Enterprise Tile (Layer 12 PNGs) every 15 mins.
  - **FHE**: Manages Fully Homomorphic Encryption for long-term legal vaulting.
  - **XR Streaming**: Frustum-aware tile streaming for C&C portal technicians.

### 3.3 RSS BOM & Financials
| Category | Component | Cost |
| :--- | :--- | :--- |
| Cluster | TR Pro + Dual A6000 + 50TB NVMe | $46,999 |
| Facility | SeaBox HC40 + HVAC + Solar/Batt | $36,700 |
| Fleet | Polaris Ranger-HD + Auger | $28,500 |
| Software | Oracle Core License | $50,000 |
| **TOTAL** | **Subdistrict 1 RSS Base** | **$187,699** |

---

## 4. Layer 2: District Hub (DHU) V1.1
**Role**: Edge Coordinator & Regional Router. manages 100 pivots/5000 acres per unit.
**Mast**: 35ft Class 4 Southern Yellow Pine (CCA Treated), set 8ft deep in crushed rock.

### 4.1 Technical Architecture
- **Edge Module**: NVIDIA Jetson Orin Nano (8GB). 1024-core Ampere GPU for local reflex-kriging.
- **Backhaul**: Triple-Sector Ubiquiti LTU (120°) + Telit LTE-M Failover.
- **Storage**: 128GB Swissbit pSLC Industrial SSD.
- **OS**: JetPack 5.x/6.x with Docker containerized radio/logic layers.
- **Watchdog**: Hardware power-cycle trigger on 5-min heartbeat failure.

### 4.2 DHU BOM (Subdistrict 1 Batch)
| Category | Component | Cost |
| :--- | :--- | :--- |
| Compute | Jetson Orin Nano + 128GB pSLC SSD | $581 |
| Comms | 3x LTU Sectors + LTE-M Modem | $1,307 |
| Infrastructure | 35ft Pole + NEMA 4X Enclosure | $1,542 |
| Power | 200W Array + 200Ah Heated LFP | $1,190 |
| **TOTAL** | **Per Unit Hardware Cost** | **$5,041** |

---

## 5. Layer 1.5: Field Aggregation & Kinematics

### 5.1 Pivot Motion Tracker (PMT) V1.7
**Role**: Field Hub & Hydraulic/Kinematic Auditor.

- **Positioning**: **u-blox ZED-F9P RTK GNSS** (<5cm error). **Warm Start** <5s via Saft LS14500 backup.
- **Kinematics**: **Bosch BNO055 9-Axis IMU** (Quaternions). Detects "Crabbing" (structural tower misalignment).
- **Flow**: **Badger Meter TFX-5000** Ultrasonic Clamp-on (±1.0% accuracy). Non-invasive.
- **Compute**: **ESP32-S3-WROOM-1** (Dual-core 240MHz). Calculates 16x16 failover grid natively.
- **VRI Logic**: Executes 1m-pixel prescriptions delivered from DHU/RSS. 

#### PMT Bus & Pin Mapping
| Bus | Peripheral | Address/Baud |
| :--- | :--- | :--- |
| I2C | Bosch BNO055 | 0x28 (400kHz) |
| UART1 | ZED-F9P | 921,600 bps |
| UART2 | TFX-5000 | 9600-8-N-1 |
| SPI | SX1262 LoRa | Sensor Sink |

### 5.2 Pressure & Flow Anchor (PFA) V1.9
**Role**: Source/Well Sentry & Safety Actuator.

- **Motor Audit**: 3x Magnelab split-core CT clamps. FFT analysis for cavitation/bearing wear.
- **Hydrology**: Dwyer Vented 316-SS sounder (PBLTX). Barometric compensated depth.
- **Actuation**: Omron 30A Industrial Relay for remote pump "Soft-Stop."
- **Logic**: NXP i.MX RT1020 (Cortex-M7 @ 500MHz).
- **Reflex Logic Table**:
  - `PMT_STALL` → ACTUATE_STOP
  - `BURST_MAINLINE` → ACTUATE_STOP
  - `SATURATION_ALERT` (48") → ACTUATE_STOP

### 5.3 Corner-Swing Auditor (CSA) V1.0
**Role**: Dual-node kinematic resolver for articulate swing-arms.
- **Layout**: PST (Primary Span Tracker) + SAT (Swing-Arm Tracker).
- **Sync**: BLE 5.2 Distance Ranging resolves joint elbow to ±0.1°.
- **Trigonometry**: `θ = arccos((d1²+d2²-d3²) / (2·d1·d2))` for variable chord analysis.

---

## 6. Layer 1: Subsurface Sensor Fleet

### 6.1 Vertical Field Anchor (VFA) V1.21 - "The Foundation"
**Density**: 1 (Primary) or 2 (High-Stakes Pilot) per field.
**Housing**: 48" HDPE SDR9 Outer Shell (Permanent) + 50mm Alpha-Sled (Removable).

#### 48U Modular Sequence
- **Slot 10**: **Advanced** (10") - NPK / EC / pH.
- **Slot 18**: **Basic** (18") - VWC / Temp.
- **Slot 25**: **Advanced** (25") - Root Anchor.
- **Slot 35**: **Basic** (35") - Wetting Front.
- **Slot 48**: **Advanced** (48") - **Deep Percolation / Waste Audit**.

### 6.2 Lateral Root-Zone (LRZ) Variants
**Density**: 16 per field (4x LRZ2 Reference + 12x LRZ1 Truth).

- **LRZ1 (Truth Node)**: Monolithic 18" HDPE. Fixed 10" and 18" sensors. $29.00 target.
- **LRZ2 (Reference)**: Removable mapping sled. 10"/18" depths. $54.30 target.
- **AKP-LRZ (Tactical)**: Airborne Ballistic Kinetic Penetrator. Hardened Cr-Mo steel nose. Survives 500G impact for air-deployment.

### 6.3 "AlphaSled" PCBA Standard (Shared)
- **SoC**: Nordic nRF52840 + Semtech SX1262 SPI module.
- **PCBA GPIO**:
  - P0.02 / P0.03: 12-bit Analog Dielectric Ingest.
  - P0.28-P0.31: LoRa Radio SPI.
- **Sensing**: Non-contact ~100MHz dielectric projection through HDPE walls.

---

## 7. Tier 2/3: VRI Actuation Fleet

### 7.1 Integrated Smart Nozzle (ISN/SCN) V1.0
**Role**: Nozzle-level 1m precision actuator.
- **SoC**: ASR6601 Monolithic (Embedded in valve body).
- **Unit Cost**: $18.00 Target.
- **Control**: PWM (0-100% duty) with phase-dithering to prevent water hammer.

### 7.2 Smart Section Node (SSN) V1.0
**Role**: Span-level pressure & volume regulator.
- **SoC**: ESP32-C6 (Matter/Thread support).
- **Hardware**: Integrated 2" butterfly valve + Ultrasonic flow loop.
- **Bypass**: Engineered siphoning manifold prevents starvation of end-guns.

### 7.3 Hydraulic Dithering Scheduler (HDS)
**Orchestration Logic**: Stays solenoid actuation across 25 zones.
- **Default Stagger**: 80ms.
- **Total Window**: 2.0s (converts massive spike to controlled ramp).
- **ESD Mode**: Enters "Safe Drain" (10% duty) on PFA-detected pressure spike >15%.

---

## 8. Layer 0: Aerial Auditing Fleet V1.3

### 8.1 Platforms
- **eBee Ag (Fixed-Wing)**: Broad-acre NDVI/NDRE baselines. 90-min endurance. 1,200 acres/flight.
- **DJI Mavic 3M (Multi-Rotor)**: 0.7cm/pixel diagnostic tool for "Resolution Pop" verification.

### 8.2 Logic
1. **Spectral-to-Soil Correlation**: Fuses NDVI with static Soil Variability Maps.
2. **Resolution Pop**: High NDVI stress detected → Dispatches Multi-rotor for 10m AGL audit → Sales upgrade trigger.

---

## 9. Engineering Standards & Materials

### 9.1 Materials
- **Pipes**: 2" HDPE SDR9 (High-Albedo White). UV-resistant, chemical inert in SLV alkali.
- **Enclosures**: Polycase NEMA 4X / IP67 Polycarbonate (IK08 Impact). RF-transparent.
- **Tips**: Zinc-plated friction-formed alloy (A5-H8 Hardness).
- **Seals**: Viton (FKM) O-Rings + Dry Nitrogen (+5 psi) internal pressuring.

### 9.2 Operating Logic
- **MAD Logic**: Local calculation of Management Allowable Depletion on nRF52840.
- **Frost Defense**:
  - T < 0°C → Solar Priority mode.
  - T < 5°C → LiFePO4 Charge Lock.
  - SoC < 15% → "Deep Freeze" 1µA Hibernation.

---

## 10. Financial Summary - Subdistrict 1 (1,280 Fields)

### Per Field Standard Rollout (Tier 1 Speed VRI)
| Item | Hardware Cost | Labor/Audit | Subtotal |
| :--- | :---: | :---: | :---: |
| Sensors (18 Nodes) | $846.75 | — | $846.75 |
| Hubs (PMT + PFA) | $1,947.00 | $124.00 | $2,071.00 |
| **TOTAL** | | | **$2,917.75** |

### Tiered Upgrades
- **Tier 2 (Section VRI)**: +$1,500 - $1,800
- **Tier 3 (Grid VRI)**: +$3,800 - $4,500

### Infrastructure
- **District Hubs (25)**: $126,025 (Hardware) | $206,000 (Total with civil/fiber)
- **Regional Superstation (1)**: $187,699 (Total)

---
*Classification: Master Project Asset | Single Source of Truth | Approved 2026-03-07*
