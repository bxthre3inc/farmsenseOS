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

# PART I: EXECUTIVE FOUNDATION

## 1.0 Executive Summary
FarmSense constitutes the definitive technical, operational, and financial deployment blueprint of a Deterministic Farming Operating System (DFOS), integrating across Subdistrict 1 of the San Luis Valley (SLV), Colorado.

### 1.0.1 Primary Objectives
- 20–30% reduction in irrigation water consumption
- 18–22% increase in crop return on investment (ROI)
- Legally defensible Digital Water Ledger for Water Court admissibility

### 1.0.2 Core Innovation
Replace stochastic, intuition-based agricultural practices with a high-fidelity, rule-based computational engine optimizing the Soil-Plant-Atmosphere Continuum (SPAC) using a multi-layered sensor network.

### 1.0.3 Economic Catalyst
The Rio Grande Basin faces severe hydro-economic crisis. With 89,000 acre-foot annual aquifer depletion and $500/AF groundwater pumping fees (quadrupled from $75-150/AF), FarmSense shifts from agronomic optimization tool to legal necessity.

### 1.0.4 Leadership
Jeremy Beebe serves as Chief Executive Officer of bxthre3 inc., with successful startup exit track record (Hempvada).

## 1.1 Hydro-Economic Logic and The Deterministic Paradigm

### 1.1.1 The San Luis Valley Crisis as Economic Multiplier
**Geographic Context:**
- Elevation: 7,500-8,000 feet above sea level
- Precipitation: 7-10 inches annually
- Irrigated agriculture: 300,000 acres dependent on snowmelt and aquifers
- Reservoir storage: 26% of historical capacity
- Annual aquifer depletion: 89,000 acre-feet

### 1.1.2 The $500/AF Fee Structure
The Rio Grande Water Conservation District (RGWCD) implemented a punitive $500 per acre-foot groundwater pumping fee to combat over-consumption. This represents a quadrupling of previous costs ($75-150/AF).

For a 126-acre center pivot consuming 252 AF/season:
- 20% water reduction = 50.4 AF saved per season
- 50.4 AF × $500/AF = $25,200 direct savings per pivot annually
- FarmSense Enterprise Tier subscription: $499/month ($5,988/year)
- First-year ROI: 421% return on subscription cost

### 1.1.3 The Deterministic Shift
| Dimension | Current Industry Standard | FarmSense DFOS |
|-----------|---------------------------|----------------|
| Observation | Visual scouting / manual soil probe | 1m centimetric Kriging with ground-truth validation |
| Calculation | Crop-coefficient (static, FAO-56) | SPAC thermodynamics (dynamic, real-time) |
| Decision | Intuition-based pumping schedules | Edge-calculated VRI prescription |
| Evidence | Paper logs, human memory | SHA-256 sovereign ledger, cryptographic proofs |
| Resolution | Field-scale (variable) | 1m grid, legally admissible |

## 1.2 SPAC Modeling and Edaphic Variability
FarmSense utilizes 11 domain-specific, explainable engines. All irrigation and trading decisions are deterministic and judgment-based — a non-negotiable requirement for Water Court admissibility.

### 1.2.1 Soil Layer (Edaphic)
**Parameters Monitored:**
- Soil Matric Potential (SMP) — measure of energy required to extract water
- Volumetric Water Content (VWC) — percentage of soil volume occupied by water
- Electrical Conductivity (EC) — indicator of salinity and nutrient content
- pH — alkalinity/acidity affecting nutrient availability
- Soil temperature (affects biological activity)

### 1.2.2 SLV Soil Series Calibration
**San Luis Soil Series:**
- pH: 8.4-9.8 (highly alkaline)
- Exchangeable sodium: 15-60%
- Primary risk: Salt buildup from irrigation
- Irrigation trigger threshold: 75-80 kPa (conservative for salt management)

**Gunbarrel Soil Series:**
- Type: Highly porous sand
- Hydraulic conductivity: High (>10 cm/hr saturated)
- Requirement: Low-volume, high-frequency micro-irrigation
- Irrigation trigger: 20-25 kPa (low threshold due to rapid drainage)

**Alamosa Soil Series:**
- Type: Clay loam
- Water holding capacity: High
- Drainage: Slow
- Irrigation trigger: 50-60 kPa

### 1.2.3 Plant Layer (Vegetative)
**Parameters Monitored:**
- Leaf water potential (Ψleaf) — direct measure of plant water stress
- Canopy Water Stress Index (CWSI) — thermal infrared signature
- Normalized Difference Vegetation Index (NDVI) — overall plant health
- Stomatal conductance — indicator of photosynthetic efficiency

### 1.2.4 Atmosphere Layer (Meteorologic)
**Parameters Monitored:**
- Vapor Pressure Deficit (VPD) — driving force for transpiration
- Solar radiation (shortwave and photosynthetically active)
- Wind speed and direction (affects evaporation)
- Relative humidity
- Precipitation (actual and forecasted)

**Forecasting Architecture:**
Long Short-Term Memory (LSTM) deep learning networks process 1-9 day ensemble weather forecasts to predict ET trends with 81-94% accuracy.

## 1.3 Management Allowable Depletion (MAD) Framework
MAD defines the percentage of available soil water (between field capacity and permanent wilting point) that can be depleted before crop experiences physiological damage.

### 1.3.1 Crop-Specific MAD Thresholds
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

### 1.3.2 The "Water Battery" Strategy
The Core Compute Server (Zo) delays irrigation to the "last possible minute," utilizing the deep soil profile as a dynamic battery. This strategy:
- Leaves headroom for rainfall capture
- Maximizes natural precipitation utilization
- Eliminates deep percolation losses
- Reduces nutrient leaching
- Minimizes pumping costs

## 1.4 System Architecture Overview

### 1.4.1 Backend Intelligence (Decentralized Cloud Layer)
**RDC (Regional Data Center / Map Servers):**
- Function: Master data library
- Data types: Sentinel-2 multispectral imagery, Landsat thermal, historical edaphic datasets
- Update frequency: Sentinel-2 (5-day revisit), Landsat (16-day revisit)

**Spatial Query Engine (Map Manager / Oracle):**
- Function: Extracts spatial values at precise latitude/longitude coordinates
- Operations: Point queries, polygon intersection, raster sampling
- Output: Lightweight JSON arrays for edge processing
- Technologies: PostGIS, STAC API integration

**Core Compute Server (Zo):**
- Location: brodiblanco.zo.computer / cloud infrastructure
- Functions: Bayesian priors, Localized Kriging algorithms, Worksheets generation, Ledger vaulting
- Capacity: Processes hundreds of thousands of data points into predictive spatial grids

### 1.4.2 Regional/District Edge Infrastructure
**Regional Superstation (RSS) — Level 3:**
- Location: Monte Vista, Colorado
- Function: Territory master, equal cloud counterpart to backend intelligence
- Form factor: Modified 40-foot High-Cube shipping container
- Compute: 64-Core AMD Threadripper PRO, 512GB ECC RAM
- Storage: 50TB Enterprise NVMe array (hot), 200TB cold archive
- **Critical capability:** Continues full operation during total regional internet or cellular blackouts

**District Hub (DHU) — Level 2:**
- Mounting: 35-foot Class 4 timber pole
- Coverage radius: 100 pivots with extreme overlapping redundancy
- Compute: NVIDIA Jetson Orin Nano (8GB RAM, Ampere GPU)
- **30-Day "Black Box" Cache:** 128GB Swissbit PSLC Industrial SSD

### 1.4.3 Field Layer (Level 1-1.5) — CRITICAL HIERARCHY
| Level | Device | Function | Elevation | Reporting Target |
|-------|--------|------------|-----------|------------------|
| 1.5 | **PMT (Pivot Motion Tracker)** | **Field Aggregator / Hub** | 10-15 ft on pivot | DHU |
| 1 | **VFA (Vertical Field Anchor)** | Deep-truth probe | Ground level (buried) | **PMT** |
| 1 | **LRZ1 (Lateral Root-Zone Basic)** | Spatial scout | Ground level (buried) | **PMT** |
| 1 | **LRZ2 (Lateral Root-Zone Reference)** | Spatial scout + VWC | Ground level (buried) | **PMT** |
| 1 | **PFA (Pressure & Flow Anchor)** | Wellhead sentry | Ground level | **PMT** |

**CRITICAL ARCHITECTURE POINT:**
The PMT (elevated on the pivot span at 10-15 feet) serves as the **Primary Field Aggregator**. All ground-level devices (VFA, LRZ1, LRZ2, PFA) report upward to the PMT via 900MHz CSS LoRa. The PMT then:
1. Aggregates all sensor data
2. Performs Edge-EBK computation (50m grid)
3. Packages into encrypted payload (~187 bytes)
4. Transmits to DHU via 2.4GHz/LTE-M

This elevated topology circumvents the dense water canopy that attenuates ground-level signals.

## 1.5 Telemetry Architecture Resolution

### 1.5.1 The VFA-to-DHU Challenge (Resolved)
**Initial Design Flaw:**
- VFA specified 900MHz CSS LoRa uplink
- DHU specified 2.4GHz Ubiquiti LTU only
- **Resolution:** DHU BOM revised to include 900MHz CSS LoRa gateway alongside 2.4GHz array

### 1.5.2 The PMT Field Hub Solution (CONFIRMED)
**The PMT as Primary Field Aggregator:**
- PMT elevated 10-15 feet on pivot span
- All field sensors (VFA, LRZ1, LRZ2, PFA) report to PMT via 900MHz CSS LoRa
- PMT aggregates, computes Edge-EBK, and routes to DHU
- This topology entirely circumvents dense water canopy attenuation

### 1.5.3 LRZ1 vs LRZ2 Distinction (CRITICAL)
| Feature | LRZ1 (Basic) | LRZ2 (Reference) |
|---------|--------------|------------------|
| **Cost** | $29.00 | $54.30 |
| **Sensors** | Dielectric only | Dielectric + Temperature |
| **Calibration** | Standard | Enhanced |
| **Role** | Spatial density filler | Ground-truth anchor |
| **Reporting** | To PMT | To PMT |
| **Power** | 2.6Ah LiSOCl2 | 2.6Ah LiSOCl2 |

**Deployment Ratio:**
- LRZ2 (Reference): 4 per field
- LRZ1 (Basic): 12 per field
- Total: 16 LRZ nodes per standard field

## 1.6 Risk Factor Analysis

### 1.6.1 Geopolitical Water Scarcity
Interstate litigation could trigger federal aquifer takeovers. The Sovereign Ledger enables state engineers to prove compact compliance, reducing federal intervention standing.

### 1.6.2 Technical Obsolescence
FarmSense is "Sensor-Agnostic." The Hydrologic Oracle becomes the "Inference Layer" fusing satellite trends with sub-surface realities — a moat satellite-only players cannot cross.

## 1.7 Long-Term Roadmap: Sovereign Water Infrastructure

### 1.7.1 Phase Timeline
| Phase | Timeline | Scope | Fields |
|-------|----------|-------|--------|
| 1 | 2026-2027 | SLV Subdistrict 1 | 1,280 |
| 2 | 2028-2029 | Colorado River Basin | 5,000+ |
| 3 | 2030+ | National (High Plains) | 25,000+ |
| 4 | 2030+ | International | 100,000+ |