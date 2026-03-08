i# MASTER SYSTEM SPECIFICATION: FarmSense Systems & Infrastructure (V2.1)

> **The Single Source of Truth for Hardware, Network, and Infrastructure**
> Consolidates: 14 Master Specs, 10 Knowledge Items, 2 EDRs, and the Comprehensive Hardware breakdown.

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
| **L1 (Source)** | VFA, LRZ1, LRZ2, PFA, CSA | Raw Ground Truth Telemetry | 900MHz LoRa Mesh |
| **L1.5 (Hub)** | PMT | Field Aggregator & Kinematic Auditor | 2.4GHz / LoRa Sink |
| **L2 (District)** | DHU | Edge Coordinator & PBFT Ledger | 2.4GHz High-Gain / Fiber / LTE-M |
| **L3 (Cortex)** | RSS | Regional Master DIL & Sled Hospital | Fiber / Starlink Business |

### 2.2 Connectivity Standards

- **L1 → L1.5**: 900MHz LoRa Mesh (**CSS modulation**, NOT FHSS). **AES-256** encrypted. 100% canopy penetration.
- **L1.5 → L2**: 2.4GHz High-Gain (Primary). Telit ME910G1 LTE-M (Failover).
- **Diagnostics**: **BLE 5.0 Wireless Console**. Allows ground-level calibration/diagnostics from 50m range (no ladder required).
- **Security**: **AES-256 Hardware Root-of-Trust**. All outbound LoRa chirps are signed to prevent "Refractive Denial-of-Service" or spoofed VRI commands.
- **Sleep**: 400mA Deep-Sleep (Winter Mode). Prevents LiSOCl2 passivation while maintaining RTC for "Warm Starts."

### 2.3 RF Coexistence & Standards

- **Standardized Terminology**: Use "**LoRa Bursts**" (CSS), not "FHSS Chirps."
- **Coexistence**: PMT enclosure houses both 2.4GHz High-Gain and 900MHz SX1262. Study (CSU Pilot) validates <1% packet loss at full power.
- **DHU Requirements**: Requires both 2.4GHz High-Gain array and a dedicated 900MHz LoRa Mesh Gateway sink.

---

## 3. Layer 3: Regional Superstation (RSS) V1.3

**Role**: Territory Cortex, Master DIL, and Sled Hospital.
**Infrastructure**: Modified 40' High-Cube Container (R-21 Insulation).

### 3.1 Facility Architecture: The 40' HC Command Center

The RSS utilizes a 40' High-Cube (HC) Modified Shipping Container divided into three distinct functional zones in a "Dirty-to-Clean" linear progression.

#### Zone A: The Logistics & Refurbishment Bay (20' x 7.7')

Primary intake for field hardware and rapid deployment fleet docking.

- **Tactical Fleet Dock**: Dimensioned for Polaris Ranger-HD UTV (62" width) and Hydraulic Auger Trailer. Floor reinforced with **Industrial Diamond Plate** to withstand SLV alkali tracking.
- **The Sled Hospital JIGs**: 12-foot stainless steel longitudinal workbench with automated fixation JIGs for high-volume sled processing.
- **Nitrogen Station**: Automated manifold flushing internal sensor cavities to **+5 PSI Dry Nitrogen** (+/- 0.1 PSI). Creates an active environmental defense against groundwater ingress.
- **Seal Validation & QC**: Digital **Pressure-Decay Tester** ($<0.1$ PSI drop/15 min). All extracted sleds must pass this gate before storage.
- **Environmental Barrier**: Industrial clear-strip curtains provide a thermal and dust barrier between Zone A and Zone B.

#### Zone B: Inventory Staging & Ready-Rack (10' x 7.7')

Supply chain buffer for maximum daily "Rapid Deployment" output.

- **The Ready-Rack**: Vertical high-density shelving organizing 500 units into "Pivot Kits" (1 VFA + 16 LRZ1/LRZ2 nodes per kits).
- **Burn-In Bench**: u-blox ZED-F9P RTK verification station for ensuring hardware-silicon parity prior to field dispatch.

#### Zone C: The Clean Vault (10' x 7.7')

Hermetically sealed high-density compute and legal data repository.

- **Climate Control**: Mitsubishi Hyper-Heat HVAC (operational to −40°F) with HEPA scrubbing and positive-pressure airlock.
- **Structural Integrity**: Spring-dampened server racks to isolate vibrational shock from nearby freight rail or seismic events.
- **Power Sentry**: 5kW Honda EU7000iS dual-fuel auto-start generator provides SOC failover for the rack if the 100kWh LFP bank drops below 30%.

### 3.2 Oracle Unified Compute Cluster

- **Compute**: 64-Core AMD Threadripper PRO 5995WX, 512GB ECC RAM, Dual NVIDIA RTX A6000 (48GB).
- **Storage**: 50TB WD Gold Enterprise NVMe (RAID-10).
- **Operations**:
  - **Kriging Engine**: Renders 10,000 sensor readings/sec toward 1m-resolution Enterprise Tiles. Accounts for spatial autocorrelation and Bayesian priors (historical SFD profiles).
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

- **Edge Processing Engine**: **NVIDIA Jetson Orin Nano (8GB)**. 1024-core Ampere GPU. Enables true 1m resolution support at the edge.
- **Backhaul Spine**:
  - **Primary**: Fiber ONT (G-PON) "Fiber-First" mandate.
  - **Secondary**: Telit ME910G1 LTE-M Modem (Pay-As-You-Go IoT).
- **The "Black Box" Ledger**: 128GB Swissbit pSLC Industrial SSD. Write-endurance for 30-day secure cache of every water transaction.
- **Watchdog Sentry**: Hardware power-cycle trigger on 5-min heartbeat failure. Dual Gore-Tex vents for pressure equalization.

### 4.2 DHU BOM (Subdistrict 1 Batch)

| Category | Component | Cost |
| :--- | :--- | :--- |
| Compute | Jetson Orin Nano + 128GB pSLC SSD | $581 |
| Comms | 3x LTU Sectors + LTE-M Modem + **900MHz Gateway** | $1,427 |
| Infrastructure | 35ft Pole + NEMA 4X Enclosure | $1,542 |
| Power | 200W Array + 200Ah Heated LFP | $1,190 |
| **TOTAL** | **Per Unit Hardware Cost** | **$5,161** |

---

## 5. Layer 1.5: Field Aggregation & Kinematics

### 5.1 Pivot Motion Tracker (PMT) V1.7

**Role**: Field Hub & Hydraulic/Kinematic Auditor.

- **Non-Invasive Flow Stack**: **Badger Meter TFX-5000** Ultrasonic Transit-Time (±1.0% accuracy). Employs dual-path transducers to verify **Volumetric Hydraulic Reality** and suppress kinetic noise.
- **Kinematic Positioning**: **u-blox ZED-F9P RTK GNSS** (<5cm error). Integrated with Bosch BNO055 9-Axis IMU to detect "Crabbing" and **Structural Cantilever Deviations**.
- **Edge Computation (L1.5/PMT)**:
  - Generates initial **50m Spatial Grid** (Compliance Level) natively for zero-downtime Local-VRI.
  - Passes 50m grid + RAW sensor telemetry for redundant auditing.
- **District Computation (L2/DHU)**:
  - Receives L1.5 50m grid.
  - Computes secondary **20m and 10m Resolution Tiles** for territory-level optimization.
  - Passes 50m, 20m, 10m, and RAW telemetry to RSS.
- **Cortex Computation (L3/RSS)**:
  - Consolidates all tiers for the **Master Compliance Ledger**.
  - Renders the definitive **1m Enterprise Raster** (Enterprise Level) using Regression Kriging.
  - **Point Zoom (1cm Hyper-Accuracy)**: On-demand diagnostic zoom. Renders 1cm resolution for any specific coordinate within the 1m grid using raw ultrasonic/dielectric telemetry and IMU-kinematic correction.

#### PMT Bus & Pin Mapping (Cortex-M4/ESP32-S3)

| Bus | Peripheral | Pin (GPIO) | Address/Baud |
| :--- | :---: | :---: | :--- |
| **I2C** | Bosch BNO055 | SDA(21)/SCL(22) | 0x28 (400kHz) |
| **UART1** | ZED-F9P | TX(17)/RX(16) | 921,600 bps |
| **UART2** | TFX-5000 | TX(18)/RX(19) | 9600-8-N-1 |
| **SPI** | SX1262 LoRa | SCK(5)/MISO(19)/MOSI(27) | Sensor Sink |
| **GPIO** | Pulse Output | 34 (Ext. Interrupt) | High-Precision |

### 5.2 Pressure & Flow Anchor (PFA) V1.9

**Role**: Source/Well Sentry & Safety Actuator.

- **Motor Audit**: 3x Magnelab split-core CT clamps. **Machine Learning Harmonic Analysis** (400A) is shifted to the **PMT Hub** to preserve Level 1 silicon consistency.
- **Hydrology**: Dwyer Vented 316-SS sounder (PBLTX). Barometric compensated depth.
- **Actuation**: Omron 30A Industrial Relay for remote pump "Soft-Stop."
- **Logic**: **nRF52840** (Cortex-M4F @ 64MHz). Provides secure **AES-256** signing, **BLE 5.4** maintenance, and basic threshold reflex logic.
- **Reflex Logic Table**:
  - `PMT_STALL` → ACTUATE_STOP (Command from PMT)
  - `BURST_MAINLINE` → ACTUATE_STOP (Local Threshold)
  - `SATURATION_ALERT` (48") → ACTUATE_STOP (Local Threshold)

#### PFA Register Table (nRF52840)

| Register | Value | Description |
| :--- | :---: | :--- |
| `0x400C` | `0x01` | Pump Interlock State (1=Closed) |
| `0x4010` | `FLOAT` | Line Pressure (PSI) |
| `0x4018` | `UINT32` | Frequency Domain Harmonic Peak (Hz) |

### 5.3 Corner-Swing Auditor (CSA) V1.0

**Role**: Dual-node kinematic resolver for articulate swing-arms.

- **Layout**: PST (Primary Span Tracker) + SAT (Swing-Arm Tracker).
- **Sync**: BLE 5.2 Distance Ranging resolves joint elbow to ±0.1°.

---

## 6. Layer 4: Vertical Field Anchor (VFA) V1.21

**Role**: Subsurface "Truth" Node & Deep Percolation Auditor.
**Housing**: 48" HDPE SDR9 Outer Shell (Permanent) + 50mm CHDPE SDR9 Alpha-Sled (Removable).

### 6.1 Structural Resilience & The Docking Station

- **Outer Shell**: 2" HDPE SDR9 (High-Albedo White). Stays in-ground year-round. Yield strength optimized to resist sub-zero frost-shatter and SLV soil compaction warping.
- **Friction-Molded Tapered Tip**: The drive tip is created via **high-speed friction molding**—spinning the HDPE SDR9 pipe at extreme RPM while pressing into a tapered mold to create a monolithic, molecularly-welded high-penetration tip.
- **The Seasonal Purge**: Sleds are inhabitied with Viton (FKM) 2" O-rings. Upon insertion, the cavity is pressurized to **+5 PSI with Dry Nitrogen**, creating an active environmental buffer against micro-fractures and groundwater ingress.
- **Whip Antenna**: 3-foot SS-304 stainless steel whip with heavy-duty spring mount. Mounts to the C&C Cap, providing a 3-foot elevated signature for line-of-sight backhaul to the PMT.

### 6.2 The "Proxy Method" 48U Physical Stack Sequence

The VFA shoots high-frequency dielectric fields through the sled wall to measure the Soil-Plant-Atmosphere Continuum (SPAC). Sensors are inhabitied in a **locked physical stack sequence** of 48 Units (1U = 1 inch).

| U-Slot | Component | Function |
| :--- | :--- | :--- |
| **Slot 1** | 1U Desiccant Pack | Apex moisture trap and atmospheric protection. |
| **Slots 2-5** | 4U Battery Cartridge #1 | 3x 21700 Li-ion cells + Thermal Defense heater. |
| **Slots 6-9** | 4U Extruded Spacer | Rigid structural separation. |
| **Slot 10** | 1U Advanced Sensor | 10" Depth: High-resolution **Root Zone Ingest**. |
| **Slots 11-14** | 4U Battery Cartridge #2 | Distributed power supply. |
| **Slots 15-17** | 3U Extruded Spacer | Rigid structural separation. |
| **Slot 18** | 1U Basic Sensor | 18" Depth: Volumetric Water Content (VWC) / Temp. |
| **Slots 19-24** | 6U Extruded Spacer | Rigid structural separation. |
| **Slot 25** | 1U Advanced Sensor | 25" Depth: Root Anchor (Pivot Point Analysis). |
| **Slots 26-29** | 4U Battery Cartridge #3 | Distributed power supply. |
| **Slots 30-34** | 5U Extruded Spacer | Rigid structural separation. |
| **Slot 35** | 1U Basic Sensor | 35" Depth: Wetting Front Propagation tracking. |
| **Slots 36-39** | 4U Battery Cartridge #4 | Distributed power supply. |
| **Slots 40-43** | 4U Extruded Spacer | Rigid structural separation. |
| **Slots 44-47** | 4U Battery Cartridge #5 | Distributed power supply. |
| **Slot 48** | 1U Advanced Sensor | 48" Depth: The Deep Percolation Anchor (Aquifer Auditing). |

### 6.3 VFA Hyper-Granular OEM BOM (1,280 Unit Tier)

| Category | Component Detail | Supplier Strategy | Unit Cost |
| :--- | :--- | :--- | :--- |
| **Housing** | 2" SCH 40 UV-Stabilized HDPE SDR9 | Direct Extruder | $3.25 |
| **Housing** | Friction-Molded HDPE Tapered Tip | Custom Rotational JIG | $3.50 |
| **Antenna** | 3ft SS-304 Whip + Spring | Hub-Mount Pultruded | $3.50 |
| **Adhesive** | Industrial HDPE SDR9 Cement | Automated Bulk | $0.50 |
| **Compute** | nRF52840 "Routing" Board | Tier-1 PCBA | $8.50 |
| **Seals** | Viton (FKM) 2" O-Rings (x2) | Industrial Bulk | $2.40 |
| **Purge** | Dry Nitrogen Gas Fill | Sled Hospital Assembly | $0.15 |
| **Climate** | 1U Stamped Desiccant Matrix | Bulk Supply | $1.50 |
| **Structure**| 48" Rigid CHDPE SDR9 AlphaSled | Continuous Extrusion | $3.75 |
| **Structure**| Extruded Rigid Spacers (22U) | Recycled Bulk | $0.35 |
| **Power** | 5x 4U Battery Cartridges (21700) | Direct Cell Sourcing | $83.75 |
| **Sensors** | 3x Advanced + 2x Basic | Fab-Direct Assembly | $47.00 |
| **TOTAL** | **Per Unit Hardware Cost** | **Absolute OEM Scale** | **$158.20** |

### 6.4 Lateral Root-Zone (LRZ) Variants

**Density**: 16 per field (4x LRZ2 Reference + 12x LRZ1 Truth).

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

## 11. Subdistrict 1 Scale (1,280 Fields)

Based on the established **2:4:12 Stereo Ratio** and edge-compute density requirements for a subdistrict-wide rollout.

### 11.1 Field-Level Infrastructure (1,280 Fields)

| Component | Qty per Field | Total Qty | Unit Cost | Extended Cost |
| :--- | :---: | :---: | :---: | :---: |
| VFA Foundation | 2 | 2,560 | $159.65 | $408,704 |
| LRZ2 Reference | 4 | 5,120 | $54.30 | $278,016 |
| LRZ1 Truth Node | 12 | 15,360 | $29.00 | $445,440 |
| PMT Field Hub | 1 | 1,280 | $1,140.50 | $1,459,840 |
| PFA Well Sentry | 1 | 1,280 | $961.50 | $1,230,720 |
| **Subtotal (Field Assets)** | | | | **$3,822,720** |

### 11.2 Regional-Level Infrastructure

Estimated coverage for Subdistrict 1 territory.

| Component | Coverage Ratio | Total Qty | Unit Cost | Extended Cost |
| :--- | :---: | :---: | :---: | :---: |
| District Hub (DHU) | 1 per 100 Fields | 13 | $4,594.00 | $59,722 |
| Regional Superstation | 1 per Subdistrict | 1 | $212,000.00 | $212,000 |
| Aerial Fleet (eBee) | Fixed-Wing | 2 | $14,500.00 | $29,000 |
| Aerial Fleet (Mavic) | Multi-Rotor | 4 | $4,999.00 | $19,996 |
| **Subtotal (Regional Assets)** | | | | **$320,718** |

### 11.3 Total CAPEX Estimates

- **PHASE 1 (Compliance Foundation)**: **$1,580,800** (1,280 PMTs + Installation + Base RSS). Focus: Immediate Water Court Defensibility.
- **PHASE 2 (Full Ecosystem Saturation)**: **$3,970,638** (18-node Stereo Density: VFAs + LRZs + PFAs + Fleet).
- **Density**: ~18 Nodes Per Field (Phase 2).
- **Data Standard**: 1m-pixel high-resolution spatial moisture grid.

---

## **11. Single Field Deployment (SFD) Canonical Configurations**

To ensure repeatable precision and ease of auditing for the "Digital Water Ledger," FarmSense standardizes on three canonical Single Field Deployment (SFD) models. These configurations define the hardware density and topological placement required to achieve ±1.0% flow accuracy and 1m Enterprise spatial resolution.

### **11.1 SFD-P: Standard Pivot (126-Acre Circular)**

Used for standard center-pivot machines without articulate corner-swing arms. This is the baseline "Subdistrict 1" deployment model.

- **L1.5 Field Hub**: 1× **PMT (V1.7)** mounted on the main span (typically tower 2 or 3).
- **L1 Safety Actuator**: 1× **PFA (V1.9)** at the wellhead for source auditing.
- **L1 Sub-Surface Stereo Array**:
  - 2× **VFA (V1.21)** Deep Percolation Anchors (placed at 1/3 and 2/3 radii).
  - 4× **LRZ2** Spatial Reference Nodes (cardinal directions).
  - 12× **LRZ1** High-Density Truth Nodes (stochastic placement within SFD zones).
- **Total Node Count**: 20 Nodes.
- **Target Accuracy**: ±1.0% Volumetric, 50m Spatial (Compliance) / 1m Spatial (Enterprise).

### **11.2 SFD-C: Articulate Corner-Swing Arm (150+ Acre)**

Required for center-pivots equipped with a swing-arm extension to irrigate the field corners. Utilizes the "CSA" dual-resolver logic.

- **L1.5 Field Hub (Sync)**:
  - 1× **PMT (V1.7)** on the Primary Span (Standard Hub).
  - 1× **CSA (V1.0)** on the Swing-Arm (Secondary Resolver).
- **L1 Safety Actuator**: 1× **PFA (V1.9)** at the wellhead.
- **L1 Sub-Surface Stereo Array**:
  - 4× **VFA (V1.21)** (Increased density to cover corner-swing transitions).
  - 6× **LRZ2** Spatial Reference Nodes.
  - 16× **LRZ1** High-Density Truth Nodes.
- **Total Node Count**: 28 Nodes.
- **Logic**: BLE 5.2 Distance Ranging resolves the swing-arm joint to ±0.1°.

### **11.3 SFD-F: Flood / Surface Irrigation (60-160 Acre)**

The definitive configuration for surface irrigation (furrow, flood, or gated pipe) where no moving pivot hardware is present.

- **L1.5 Field Hub (Static)**: 1× **DHU-Lite / Static-PMT**. Mounted on a 15ft mast at the highest elevation point of the field (Ditch Intake).
- **L1 Source Monitor**: 1× **PFA (V1.9)** (or Ultrasonic Flume Auditor) at the headgate or ditch turnout.
- **L1 Sub-Surface Array**:
  - 4× **VFA (V1.21)** (Linear placement along the primary drainage gradient).
  - 8× **LRZ2** Spatial Reference Nodes (placed at head, middle, and tail of runs).
  - 20× **LRZ1** High-Density Truth Nodes.
- **Total Node Count**: 34 Nodes (Higher density required to account for the lack of kinematic kinematic "continuous sweeping" data).
- **Logic**: Relies on "Wetting Front Propagation" algorithms to calculate virtual depth without movement trackers.

---

## 12. Maintenance & "Sled Hospital" SOP

To ensure a 10-year hardware survival curve and maximize SaaS margins, FarmSense utilizes a circular "Sled Exchange" economy.

### 12.1 SOP-09: Post-Harvest Recovery

1. **Retrieval**: At harvest-end (November), internal electronic "Sleds" are extracted from their permanent field housings.
2. **Decontamination**: Sleds undergo an ultrasonic cleansing bath to remove mineral scaling.
3. **Seal Verification**: 15-minute digital pressure-decay test ensures Viton seals remain integral.
4. **Nitrogen Purge**: Sleds are re-pressurized with Dry Nitrogen (+5 PSI) before winter storage.
5. **Silicon Lifecycle**: High-value components (nRF52, ESP32-S3) are bench-tested for signal-floor stability.

---
*Classification: Master Project Asset | Single Source of Truth | Approved 2026-03-07*
