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

# FarmSense Master Manual: The Deterministic Farming Operating System
**Comprehensive Technical Specification V2.0**

---

## Table of Contents

| Part | Title | Key Contents |
|------|-------|--------------|
| I | Executive Foundation | Jeremy Beebe, SPAC, MAD, Architecture |
| II | Market Intelligence | TAM $12.8B, Competitive Moat, Federal Grants |
| III | Human Capital | Org Chart, 18 FTE roadmap, Advisory Board |
| IV | Technical Core | SQL Schema, API Specs, Kriging, LSTM |
| V | Hardware Ecosystem | RSS, DHU, PMT, PFA, VFA, LRZ1/LRZ2, Full BOMs |
| VI | Interface Layer | React Dashboards, 3D VRI, Regulatory Portal |
| VII | Hydrologic Oracle | SPAC Thermodynamics, Matérn Kernels, Crop Libs |
| VIII | Pilot Mission | CSU SLV 2-Field Specification, Timeline |
| IX | Operations | Seasonal Cycle, Sled Hospital, Maintenance |
| X | Infrastructure | AWS EKS, GitOps, DR, Observability |
| XI | Cybersecurity | Zero-Trust, eBPF, Sovereign Hardening |
| XII | Water Court Ledger | NREP Standard, Chain of Custody, Legal Admissibility |
| XIII | Global Standards | GlobalG.A.P., Nitrogen, Carbon MRV |
| XIV | Financial Backbone | 10-Year Cash Flow, CAPEX/OPEX, Exit |
| XV | Federal Grant Registry | USDA, NSF, DOE, Gates Foundation, ARPA-E |
| XVI | SLV Case Study | 2026 Pilot Results, Trial Outcome |
| XVII | Appendices | BOM Catalog, Firmware Tables, Soil References |

---

# PART I: EXECUTIVE FOUNDATION (STRATEGIC BLUEPRINT)

## 1.0 Executive Summary

FarmSense constitutes the definitive technical, operational, and financial deployment blueprint of a Deterministic Farming Operating System (DFOS), integrating across Subdistrict 1 of the San Luis Valley (SLV), Colorado.

**Primary Objectives:**
- 20–30% reduction in irrigation water consumption
- 18–22% increase in crop return on investment (ROI)
- Legally defensible Digital Water Ledger for Water Court admissibility

**Core Innovation:** Replace stochastic, intuition-based agricultural practices with a high-fidelity, rule-based computational engine optimizing the Soil-Plant-Atmosphere Continuum (SPAC) using a multi-layered sensor network.

**Economic Catalyst:** The Rio Grande Basin faces severe hydro-economic crisis. With 89,000 acre-foot annual aquifer depletion and $500/AF groundwater pumping fees (quadrupled from $75-150/AF), FarmSense shifts from agronomic optimization tool to legal necessity.

**Leadership:** Jeremy Beebe serves as Chief Executive Officer of bxthre3 inc., with successful startup exit track record (Hempvada).

---

## 1.1 Hydro-Economic Logic and The Deterministic Paradigm

### 1.1.1 The San Luis Valley Crisis as Economic Multiplier

**Geographic Context:**
- Elevation: 7,500-8,000 feet above sea level
- Precipitation: 7-10 inches annually
- Irrigated agriculture: 300,000 acres dependent on snowmelt and aquifers
- Reservoir storage: 26% of historical capacity
- Annual aquifer depletion: 89,000 acre-feet

**The $500/AF Fee Structure:**
The Rio Grande Water Conservation District (RGWCD) implemented a punitive $500 per acre-foot groundwater pumping fee to combat over-consumption. This represents a quadrupling of previous costs ($75-150/AF).

For a 126-acre center pivot consuming 252 AF/season:
- 20% water reduction = 50.4 AF saved per season
- 50.4 AF × $500/AF = $25,200 direct savings per pivot annually
- FarmSense Enterprise Tier subscription: $499/month ($5,988/year)
- First-year ROI: 421% return on subscription cost

### 1.1.2 The Deterministic Shift

| Dimension | Current Industry Standard | FarmSense DFOS |
|-----------|---------------------------|----------------|
| **Observation** | Visual scouting / manual soil probe | 1m centimetric Kriging with ground-truth validation |
| **Calculation** | Crop-coefficient (static, FAO-56) | SPAC thermodynamics (dynamic, real-time) |
| **Decision** | Intuition-based pumping schedules | Edge-calculated VRI prescription |
| **Evidence** | Paper logs, human memory | SHA-256 sovereign ledger, cryptographic proofs |
| **Resolution** | Field-scale (variable) | 1m grid, legally admissible |

**Elimination of Stochastic Elements:**
Traditional agriculture relies on intuition, visual cues, and historical patterns. FarmSense replaces these with deterministic, explainable algorithms that can be audited, validated, and defended in Water Court.

---

## 1.2 SPAC Modeling and Edaphic Variability

FarmSense utilizes 11 domain-specific, explainable engines. All irrigation and trading decisions are deterministic and judgment-based — a non-negotiable requirement for Water Court admissibility.

### 1.2.1 Soil Layer (Edaphic)

**Parameters Monitored:**
- Soil Matric Potential (SMP) — measure of energy required to extract water
- Volumetric Water Content (VWC) — percentage of soil volume occupied by water
- Electrical Conductivity (EC) — indicator of salinity and nutrient content
- pH — alkalinity/acidity affecting nutrient availability
- Soil temperature (affects biological activity)

**SLV Soil Series Calibration:**

**San Luis Soil Series:**
- pH: 8.4-9.8 (highly alkaline)
- Exchangeable sodium: 15-60%
- Primary risk: Salt buildup from irrigation
- Irrigation trigger threshold: 75-80 kPa (conservative for salt management)
- Texture: Sandy loam with clay lenses

**Gunbarrel Soil Series:**
- Type: Highly porous sand
- Hydraulic conductivity: High (>10 cm/hr saturated)
- Requirement: Low-volume, high-frequency micro-irrigation
- Irrigation trigger: 20-25 kPa (low threshold due to rapid drainage)
- Risk: Deep percolation, nitrogen leaching

**Alamosa Soil Series:**
- Type: Clay loam
- Water holding capacity: High
- Drainage: Slow
- Irrigation trigger: 50-60 kPa
- Risk: Waterlogging, root rot

**Dynamic Refill Points:**
The system adjusts irrigation thresholds based on real-time soil texture analysis rather than static zone assignments. Clay soils hold water longer but drain slowly; sandy soils require frequent, light irrigation.

### 1.2.2 Plant Layer (Vegetative)

**Parameters Monitored:**
- Leaf water potential (Ψleaf) — direct measure of plant water stress
- Canopy Water Stress Index (CWSI) — thermal infrared signature
- Normalized Difference Vegetation Index (NDVI) — overall plant health
- Stomatal conductance — indicator of photosynthetic efficiency

**Early Stress Detection:**
The system detects stomatal closure prior to visible wilting, enabling intervention before yield damage occurs. CWSI > 0.3 indicates moderate stress; > 0.6 indicates severe stress requiring immediate irrigation.

### 1.2.3 Atmosphere Layer (Meteorologic)

**Parameters Monitored:**
- Vapor Pressure Deficit (VPD) — driving force for transpiration
- Solar radiation (shortwave and photosynthetically active)
- Wind speed and direction (affects evaporation)
- Relative humidity
- Precipitation (actual and forecasted)

**Forecasting Architecture:**
Long Short-Term Memory (LSTM) deep learning networks process 1-9 day ensemble weather forecasts to predict ET trends with 81-94% accuracy. This enables anticipatory irrigation scheduling.

**SLV Potato ET Demand:**
Peak growing season (July-August): 4.5-7.7 mm/day evapotranspiration demand. Early season (June): 2.5-3.5 mm/day. Late season (September): 3.0-4.5 mm/day.

---

## 1.3 Management Allowable Depletion (MAD) Framework

MAD defines the percentage of available soil water (between field capacity and permanent wilting point) that can be depleted before crop experiences physiological damage.

**Crop-Specific MAD Thresholds:**
| Crop | Stage | MAD % | Trigger kPa |
|------|-------|-------|-------------|
| Potato | Emergence | 30% | 30-40 kPa |
| Potato | Tuber Initiation | 40% | 50-60 kPa |
| Potato | Bulking | 50% | 70-80 kPa |
| Potato | Maturation | 60% | 80-100 kPa |
| Barley | Tillering | 30% | 40-50 kPa |
| Barley | Grain fill | 60% | 80-100 kPa |
| Alfalfa | Establishment | 40% | 50-60 kPa |
| Alfalfa | Production | 60% | 80-100 kPa |

**The "Water Battery" Strategy:**
The Core Compute Server (Zo) delays irrigation to the "last possible minute," utilizing the deep soil profile as a dynamic battery. This strategy:
- Leaves headroom for rainfall capture
- Maximizes natural precipitation utilization
- Eliminates deep percolation losses
- Reduces nutrient leaching
- Minimizes pumping costs

---

## 1.4 System Architecture Overview

### 1.4.1 Backend Intelligence (Decentralized Cloud Layer)

**RDC (Regional Data Center / Map Servers):**
- Function: Master data library
- Data types: Sentinel-2 multispectral imagery, Landsat thermal, historical edaphic datasets, soil survey polygons
- Update frequency: Sentinel-2 (5-day revisit), Landsat (16-day revisit)

**Spatial Query Engine (Map Manager / Oracle):**
- Function: Extracts spatial values at precise latitude/longitude coordinates
- Operations: Point queries, polygon intersection, raster sampling
- Output: Lightweight JSON arrays for edge processing
- Technologies: PostGIS, STAC API integration

**Core Compute Server (Zo):**
- Location: brodiblanco.zo.computer / cloud infrastructure
- Functions:
  - Bayesian prior establishment using historical SFD profiles
  - Localized Kriging algorithms (geostatistical interpolation)
  - Worksheets generation for district-level distribution
  - Long-term Digital Water Ledger vaulting
- Capacity: Processes hundreds of thousands of data points into predictive spatial grids

### 1.4.2 Regional/District Edge Infrastructure

**Regional Superstation (RSS) — Level 3:**
- Location: Monte Vista, Colorado
- Function: Territory master, equal cloud counterpart to backend intelligence
- Form factor: Modified 40-foot High-Cube shipping container
- Compute: 64-Core AMD Threadripper PRO, 512GB ECC RAM
- Storage: 50TB Enterprise NVMe array (hot), 200TB cold archive
- **Critical capability:** Continues full operation during total regional internet or cellular blackouts
- Redundancy: Dual fiber paths, LTE backup, generator power

**District Hub (DHU) — Level 2:**
- Mounting: 35-foot Class 4 timber pole
- Coverage radius: 100 pivots with extreme overlapping redundancy
- Compute: NVIDIA Jetson Orin Nano (8GB RAM, Ampere GPU)
- Functions:
  - Executes Zo "Worksheets" locally
  - Instantaneous "Reflex Logic" decisions (<100ms latency)
  - PBFT consensus for Digital Water Ledger
  - 20m/10m Kriging computation
- Communications:
  - 900MHz CSS LoRa Mesh (field sensor ingress)
  - 2.4GHz Ubiquiti LTU (backhaul to RSS)
  - LTE-M fallback
- **30-Day "Black Box" Cache:** 128GB Swissbit PSLC Industrial SSD
  - Function: Continuously records AES-256 encrypted audit packets
  - Outcome: If total regional backhaul fails (fiber cut + cellular blackout), the ledger remains intact and legally admissible

### 1.4.3 Field Layer (Level 1-1.5)

**Field Device Hierarchy:**

| Level | Device | Function | Elevation | Reporting Target |
|-------|--------|------------|-----------|------------------|
| 1.5 | **PMT (Pivot Motion Tracker)** | Field Aggregator / Hub | 10-15 ft on pivot | DHU |
| 1 | **VFA (Vertical Field Anchor)** | Deep-truth probe | Ground level (buried) | PMT |
| 1 | **LRZ1 (Lateral Root-Zone Basic)** | Spatial scout | Ground level (buried) | PMT |
| 1 | **LRZ2 (Lateral Root-Zone Reference)** | Spatial scout + VWC | Ground level (buried) | PMT |
| 1 | **PFA (Pressure & Flow Anchor)** | Wellhead sentry | Ground level | PMT |

**Critical Architecture Point:**
The PMT (elevated on the pivot span at 10-15 feet) serves as the **Primary Field Aggregator**. All ground-level devices (VFA, LRZ1, LRZ2, PFA) report upward to the PMT via 900MHz CSS LoRa. The PMT then:
1. Aggregates all sensor data
2. Performs Edge-EBK computation (50m grid)
3. Packages into encrypted payload (~187 bytes)
4. Transmits to DHU via 2.4GHz/LTE-M

This elevated topology circumvents the dense water canopy that attenuates ground-level signals, ensuring constant line-of-sight between field mesh and the PMT aggregator.

---

## 1.5 Telemetry Architecture Resolution

### 1.5.1 The VFA-to-DHU Challenge (Resolved)

**Initial Design Flaw:**
- VFA specification required: 900MHz CSS LoRa uplink
- DHU specification (original): Triple-Sector 2.4GHz Ubiquiti LTU only
- Problem: Ubiquiti LTU 2.4GHz architecture cannot receive 900MHz CSS LoRa modulations

**Resolution:**
DHU Bill of Materials officially revised to include enterprise-grade **900MHz CSS LoRa Mesh gateway** (Semtech SX1302-based concentrator) alongside existing 2.4GHz array.

### 1.5.2 900MHz CSS LoRa Mesh Specifications

**Technical Parameters:**
- Frequency: 915MHz (ISM band, North America)
- Bandwidth: 125 kHz
- Spreading Factor: SF7-SF12 (adaptive)
- Sensitivity: -148 dBm (SF12)
- Link Budget: 150 dB theoretical
- Practical range: 5km with foliage, 25km line-of-sight
- Encryption: AES-128 (application layer)
- Battery life: 4+ years at 4-hour chirp intervals

**Canopy Penetration Advantage:**
| Condition | 2.4GHz Signal Loss | 915MHz CSS LoRa Loss |
|-----------|-------------------|---------------------|
| Free space | 0 dB | 0 dB |
| Sparse canopy (early corn) | -3 dB | -1 dB |
| Dense canopy (mid-season) | -8 to -12 dB | -2 to -3 dB |
| Wet foliage after rain | -15 to -20 dB | -3 to -5 dB |
| Ground-level moisture | Severe multipath | Minimal impact |

**Anti-Collision Protocol:**
CSS LoRa uses chirp spread spectrum modulation with frequency hopping across 75 sub-bands, mitigating co-channel interference and eliminating packet collision probability within a single high-density farm field.

---

## 1.6 Risk Factor Analysis

### 1.6.1 Geopolitical Water Scarcity

**Threat Vector:** Interstate litigation (Colorado vs. Nebraska, Kansas) triggering federal aquifer management takeover under the Commerce Clause.

**Mitigation:** The Sovereign Digital Water Ledger enables state engineers to prove Compact compliance with cryptographic certainty, reducing federal intervention standing. Immutable evidence reduces litigation risk.

### 1.6.2 Technical Obsolescence

**Moat Strategy:** Sensor-Agnostic Architecture

The Hydrologic Oracle functions as the "Inference Layer" — fusing satellite trends with sub-surface sensor realities. Pure satellite-only competitors (Ceres, Taranis) cannot cross this moat because they lack ground-truth validation at 1m resolution.

**Protocol Flexibility:** LoRa, NB-IoT, LTE-M, and future protocols supported via firmware updates without hardware replacement.

---

## 1.7 Long-Term Roadmap: Sovereign Water Infrastructure

| Phase | Timeline | Geography | Scale |
|-------|----------|-----------|-------|
| I | 2026-2027 | SLV Subdistrict 1 | 1,280 fields, 166,000 acres |
| II | 2028-2029 | Colorado River Basin | 40+ subdistricts, 1.2M acres |
| III | 2030-2031 | High Plains (Ogallala) | 5 states, 3M acres |
| IV | 2032+ | International | Murray-Darling, North China Plain, Indus Basin |

**2030 Vision:** FarmSense as the standard water accounting infrastructure for climate-stressed agricultural regions globally.