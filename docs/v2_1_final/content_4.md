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


## 5.7 Single Field Deployment (SFD) Configurations

### 5.7.1 SFD-P: Standard Pivot (126-acre circular)
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| PMT | 1 | $1,261.20 | $1,261.20 |
| PFA | 1 | $3,467.50 | $3,467.50 |
| VFA | 2 | $151.90 | $303.80 |
| LRZ2 (Reference) | 4 | $54.30 | $217.20 |
| LRZ1 (Basic) | 12 | $29.00 | $348.00 |
| Installation labor | 1 | $400.00 | $400.00 |
| **SFD-P Total** | | | **$5,997.70** |

**Resolution:** 50m Compliance / 1m Enterprise

### 5.7.2 SFD-C: Corner-Swing Arm (150+ acre)
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| PMT | 1 | $1,261.20 | $1,261.20 |
| CSA (Swing-Arm Tracker) | 1 | $1,500.00 | $1,500.00 |
| PFA | 1 | $3,467.50 | $3,467.50 |
| VFA | 4 | $151.90 | $607.60 |
| LRZ2 | 6 | $54.30 | $325.80 |
| LRZ1 | 16 | $29.00 | $464.00 |
| Installation | 1 | $600.00 | $600.00 |
| **SFD-C Total** | | | **$8,226.10** |

**Special:** BLE 5.2 distance ranging for ±0.1° joint resolution

### 5.7.3 SFD-F: Flood/Surface Irrigation
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| DHU-Lite/Static PMT | 1 | $2,500.00 | $2,500.00 |
| PFA | 1 | $3,467.50 | $3,467.50 |
| VFA | 4 | $151.90 | $607.60 |
| LRZ2 | 8 | $54.30 | $434.40 |
| LRZ1 | 20 | $29.00 | $580.00 |
| Installation | 1 | $800.00 | $800.00 |
| **SFD-F Total** | | | **$8,389.50** |

**Special:** Wetting Front Propagation algorithms

## 5.8 Subdistrict 1 Scale (1,280 Fields)

### 5.8.1 Phase 1 — Compliance Foundation
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| SFD-P (standard) | 1,280 | $5,997.70 | $7,677,056 |
| RSS infrastructure | 1 | $122,445 | $122,445 |
| DHU infrastructure | 13 | $4,622 | $60,086 |
| Installation (bulk) | 1,280 | $300 | $384,000 |
| **Phase 1 Total** | | | **$8,243,587** |

### 5.8.2 Phase 2 — Full Ecosystem Saturation
| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| Additional LRZ density | 1,280 fields | $1,500 | $1,920,000 |
| VRI actuators (section) | 1,280 | $1,500 | $1,920,000 |
| DHU expansion (full 25) | 12 | $4,622 | $55,464 |
| Fleet service trucks | 3 | $45,000 | $135,000 |
| Sled Hospital facility | 1 | $75,000 | $75,000 |
| **Phase 2 Total** | | | **$4,105,464** |

**Total Subdistrict 1 Investment:** $12,349,051

### 5.8.3 Per-Acre Economics
| Metric | Value |
|--------|-------|
| Hardware CAPEX per acre | $93.36 |
| Annual SaaS at $499/field | $7,664,640 |
| Payback period | 1.6 years |
| 10-year ROI | 521% |

---

# PART VI: THE INTERFACE LAYER

## 6.0 User Interface Architecture
FarmSense provides role-specific interfaces for farmers, regulators, administrators, investors, and researchers.

## 6.1 Farmer Dashboard (3D VRI Control Center)

### 6.1.1 Technical Stack
| Layer | Technology |
|-------|------------|
| Framework | React 19 (Next.js App Router) |
| 3D Rendering | Three.js + React Three Fiber |
| Maps | MapLibre GL JS (self-hosted) |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Real-time | WebSocket (Socket.io) |

### 6.1.2 Core Features
| Feature | Description |
|---------|-------------|
| 3D Field Heatmap | Interactive 1m resolution overlay |
| Resolution Pop | 50m → 1m zoom blur/unlock |
| Traffic-Light Status | Green/Yellow/Red field health |
| Irrigation Worksheet | VRI prescription viewer |
| Mobile PWA | Offline cache for field use |

### 6.1.3 "Resolution Pop" FOMO Trigger
**UX Pattern:**
1. Free/Basic user zooms to field anomaly
2. UI renders 50m grid clearly
3. 1m grid displays with blur + "High-Resolution Data Available" overlay
4. Enterprise upgrade prompt appears
5. Conversion: ~12% of triggered users upgrade within 24 hours

### 6.1.4 Technical Specifications
| Metric | Target |
|--------|--------|
| WebSocket update rate | 1 Hz |
| 3D frame rate | 60 FPS (mobile) |
| Tile streaming | Frustum-aware from RSS |
| Offline cache | 7 days field data |

## 6.2 Regulatory Portal (Water Court Audit Interface)

### 6.2.1 Purpose
Immutable compliance reporting for legal proceedings and regulatory audits.

### 6.2.2 Features
| Feature | Description |
|---------|-------------|
| Audit Log | Read-only with hash verification |
| Export | PDF/CSV in .dwl format |
| Multi-Field | Aggregation across portfolios |
| Consensus | PBFT certificate display |
| Violations | Automated detection & tracking |

### 6.2.3 SLV 2026 Compliance
| Requirement | Implementation |
|-------------|----------------|
| WORM storage | S3 Object Lock 7 years |
| Signatures | Ed25519 on all exports |
| Retention | Automated summaries (daily/weekly/monthly) |
| Tamper-proof | SHA-256 chain verification |

## 6.3 Admin Dashboard (Fleet C&C)

### 6.3.1 Sled Hospital Monitor
| Metric | Display |
|--------|---------|
| Real-time health | All 25,600 nodes |
| Maintenance queue | Scheduled repairs |
| Pressure-decay tests | Latest results |
| Nitrogen purge status | Current levels |

### 6.3.2 System Alerts
| Alert Type | Trigger | Action |
|------------|---------|--------|
| Critical | PMT offline >1hr | Immediate dispatch |
| Warning | VFA battery <20% | Schedule replacement |
| Info | Firmware available | Queue update |

## 6.4 Investor ROI Dashboard

### 6.4.1 Metrics Displayed
| Metric | Unit | Aggregation |
|--------|------|-------------|
| Water savings | AF/field | Real-time |
| Energy reduction | kWh | Monthly |
| Yield improvement | CWT/acre | Seasonal |
| SaaS ARR | USD | Monthly |
| Regional pipeline | Fields | Quarterly |

### 6.4.2 Cohort Analysis
| Cohort | Avg Water Savings | Avg Yield Gain | Retention |
|--------|-------------------|----------------|-----------|
| 2026 Pilot | 21.3% | 10.2% | 100% |
| Q3 2026 | — | — | Projected |

## 6.5 Grant & Research Portals

### 6.5.1 NRCS Conservation Credit Calculator
**Auto-mapping:** FarmSense metrics → NRCS Resource Concern categories

| Concern | FarmSense Data | Credit |
|---------|----------------|--------|
| Soil quality | VWC trends, EC | 1-5 points |
| Water quantity | AF saved | 1-10 points |
| Water quality | Nitrogen leaching prevention | 1-5 points |

**Export:** LaTeX for academic publication

### 6.5.2 Federated Learning Interface
| Feature | Specification |
|---------|-------------|
| Privacy | Differential privacy (ε=1.0) |
| Models | Kriging, LSTM, crop stress |
| Data access | Aggregate only, no raw download |
| Rewards | Contributors receive model improvements |

---

# PART VII: THE HYDROLOGIC ORACLE

## 7.0 Oracle Overview
The Hydrologic Oracle is the inference engine that transforms raw sensor data into actionable irrigation intelligence.

## 7.1 SPAC Thermodynamics: Surface Energy Balance

### 7.1.1 Fundamental Equation
```
R_n - G = λE + H
```

| Term | Description | Measurement |
|------|-------------|-------------|
| R_n | Net radiation | Kipp & Zonen pyranometer (theoretical) |
| G | Soil heat flux | VFA dual-needle thermal pulse (±1%) |
| λE | Latent heat flux (ET) | Calculated from water balance |
| H | Sensible heat flux | Calculated from temperature gradients |

### 7.1.2 Penman-Monteith Model
**Canopy Resistance (r_c):**
```
r_c = (Δ(R_n-G) + ρ_a c_p (e_s - e_a)/r_a) / (λE(Δ+γ)) - r_a
```

**Stomatal Closure Detection:**
- VPD > 3.5 kPa → 40% photosynthetic efficiency reduction predicted
- CWSI > 0.3 → Moderate stress, increase monitoring
- CWSI > 0.6 → Severe stress, immediate irrigation

## 7.2 Mathematical Derivation: Cokriging with Matern Kernels

### 7.2.1 Why Matern?
| Kernel | Smoothness | Use Case |
|--------|------------|----------|
| Exponential (ν=0.5) | Rough, continuous | Compaction ridges |
| Matern (ν=1.0) | Once differentiable | Standard fields |
| Gaussian (ν→∞) | Infinitely smooth | Not used (oversmooths) |

**Auto-tuning:** ν varies 0.5-1.5 based on Field Roughness Index (FRI):
- FRI < 0.3 → ν = 1.5 (smooth)
- FRI 0.3-0.7 → ν = 1.0 (moderate)
- FRI > 0.7 → ν = 0.5 (rough)

### 7.2.2 Residual Calculation
```
Z(s) = m(s) + ε(s)
```
- m(s) = deterministic trend (satellite NDVI)
- ε(s) = spatially correlated residual (ground-truth sensors)
- Covariance: C(h) = σ² * (2^(1-ν) / Γ(ν)) * (κh)^ν * K_ν(κh)

## 7.3 Crop-Specific Calibration Libraries

### 7.3.1 Potato (Russet Burbank)
| Stage | Days | Critical MAD | VPD Threshold |
|-------|------|--------------|---------------|
| Emergence | 1-30 | 30% | 2.0 kPa |
| Tuber Initiation | 31-50 | 40% | 2.5 kPa |
| Bulking | 51-80 | 50% | 3.0 kPa |
| Maturation | 81-120 | 60% | 3.5 kPa |

**Stress Avoidance:** <80 kPa at tuber initiation (yield-sensitive)

### 7.3.2 Barley (Standard Varieties)
| Stage | Critical MAD | Notes |
|-------|--------------|-------|
| Tillering | 30% | Sensitive to early drought |
| Stem elongation | 50% | Moderate tolerance |
| Grain fill | 60% | Drought-tolerant phase |

### 7.3.3 Alfalfa
| Condition | MAD | Strategy |
|-----------|-----|----------|
| Establishment | 40% | Conservative, root development |
| Production (Cut 1-3) | 60% | Maximize yield |
| Production (Cut 4+) | 50% | Quality over quantity |
| Bloom stress | Variable | Harvest timing optimization |

## 7.4 Forecasting Architecture

### 7.4.1 Input Data Sources
| Source | Update Frequency | Spatial Resolution | Use |
|--------|------------------|-------------------|-----|
| GFS | 6 hours | 13 km | Large-scale patterns |
| HRRR | Hourly | 3 km | Convective precipitation |
| NAM | 6 hours | 12 km | Regional trends |
| ECMWF | 12 hours | 9 km | Global validation |

### 7.4.2 LSTM Ensemble
| Configuration | Layers | Units | Dropout |
|---------------|--------|-------|---------|
| Short-term (1-day) | 2 | 128 | 0.2 |
| Medium-term (5-day) | 3 | 256 | 0.3 |
| Long-term (9-day) | 3 | 512 | 0.4 |

**Accuracy:** 81-94% ET prediction (validated against weighing lysimeters)

## 7.5 Global Hydrologic Basin Registry (40 Targets)

### 7.5.1 Registry by Stress Level
| Basin | Region | Stress | Priority | Timeline |
|-------|--------|--------|----------|----------|
| Rio Grande | USA (CO/NM/TX) | Critical | Active | 2026 |
| Ogallala | USA (NE/KS/OK/TX) | Critical | High | 2028 |
| Colorado River | USA (AZ/CA/NV/UT) | Severe | High | 2028 |
| Murray-Darling | Australia | High | Medium | 2029 |
| North China Plain | China | Critical | Medium | 2030 |
| Indus | Pakistan/India | Severe | Medium | 2030 |
| Nile | Egypt/Ethiopia/Sudan | Severe | Low | 2031 |
| Ganges | India/Bangladesh | High | Low | 2032 |

### 7.5.2 Applicability Scoring
| Factor | Weight | Rio Grande | Ogallala | Indus |
|--------|--------|------------|----------|-------|
| Regulatory enforcement | 25% | 10/10 | 8/10 | 6/10 |
| Economic water cost | 25% | 10/10 | 9/10 | 5/10 |
| Center-pivot density | 20% | 9/10 | 9/10 | 3/10 |
| Political stability | 15% | 9/10 | 10/10 | 4/10 |
| Partner availability | 15% | 10/10 | 9/10 | 5/10 |
| **Weighted Score** | | **9.65** | **8.95** | **4.65** |

