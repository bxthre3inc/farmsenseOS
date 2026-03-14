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


# PART VII: THE HYDROLOGIC ORACLE

## 7.1 SPAC Thermodynamics: Surface Energy Balance

The Oracle solves the fundamental energy balance equation for every 1m grid cell:

```
R_n - G = λE + H
```

Where:
- **R_n** = Net radiation (solar + atmospheric, W/m²)
- **G** = Soil heat flux (±1% accuracy via VFA dual-needle thermal pulse, W/m²)
- **λE** = Latent heat flux (evapotranspiration, W/m²)
- **H** = Sensible heat flux (air heating, W/m²)

### 7.1.1 Penman-Monteith Model

Calculates canopy resistance (r_c) to determine stomatal closure:

```
ET₀ = [Δ(R_n - G) + ρₐ cₐ (eₛ - eₐ)/rₐ] / [Δ + γ(1 + rₛ/rₐ)]
```

Where:
- Δ = Slope of saturation vapor pressure curve (kPa/°C)
- ρₐ = Air density (kg/m³)
- cₐ = Specific heat of air (MJ/kg·°C)
- eₛ - eₐ = Vapor pressure deficit (kPa)
- rₐ = Aerodynamic resistance (s/m)
- rₛ = Bulk surface resistance (s/m)
- γ = Psychrometric constant (kPa/°C)

**VPD Stress Thresholds:**
| VPD (kPa) | Impact | Action |
|-----------|--------|--------|
| <1.0 | Optimal | None |
| 1.0-2.5 | Mild stress | Monitor |
| 2.5-3.5 | Moderate stress | Increase irrigation |
| >3.5 | Severe stress | Emergency irrigation; 40% photosynthetic reduction predicted |

### 7.1.2 Soil Heat Flux (G) Measurement

**VFA Dual-Needle Thermal Pulse Method:**
- Upper needle: Heating element + temperature sensor
- Lower needle: Temperature sensor only
- Pulse: 8W for 30 seconds
- Measurement: Temperature rise over time
- Calculation: Thermal diffusivity → heat capacity → G

**Accuracy:** ±1% of R_n (negligible error contribution)

---

## 7.2 Mathematical Derivation: Cokriging with Matérn Kernels

### 7.2.1 Why Matérn?

Standard variogram models (exponential, spherical) assume integer smoothness. SLV soil moisture exhibits:
- Localized discontinuities (compaction ridges, wheel tracks)
- Gradual transitions (texture boundaries)
- Sharp changes (irrigation boundaries)

The Matérn family allows non-integer smoothness parameter ν:
- ν = 0.5: Rough (exponential, suitable for wheel tracks)
- ν = 1.5: Moderate (practical default)
- ν = 2.5: Smooth (suitable for uniform fields)

**Auto-Tuning:** Field Roughness Index (FRI) derived from:
- Terrain slope variability
- Historical yield CV
- Traffic pattern density
- Soil EC variability

### 7.2.2 Residual Calculation

**Universal Kriging Framework:**
```
Z(s) = m(s) + ε(s)
```

Where:
- **m(s)** = Deterministic trend (satellite covariates: NDVI, thermal, elevation)
- **ε(s)** = Spatially correlated residual (ground-truth sensor interpolation)

**Covariate Weighting:**
| Source | Weight | Rationale |
|--------|--------|-----------|
| VFA (48") | 35% | Deep truth, stable |
| LRZ2 (distributed) | 25% | Spatial coverage |
| Sentinel-2 NDVI | 20% | Vegetation stress proxy |
| Landsat thermal | 15% | ET estimation |
| Elevation/slope | 5% | Topographic wetness |

### 7.2.3 Cross-Validation Results

| Metric | Target | Achieved |
|--------|--------|----------|
| R² | >0.90 | 0.94 |
| MAPE | <5% | 3.2% |
| RMSE | <0.05 VWC | 0.042 |
| NRMSE | <10% | 7.8% |
| Bias | ±0% | +0.3% |

**Validation Method:** Leave-one-out cross-validation on 1,000 ground-truth points

---

## 7.3 Crop-Specific Calibration Libraries

### 7.3.1 Potato (Russet Burbank)

**Growth Stages:**
| Stage | Days | Root Depth | MAD % | Critical kPa |
|-------|------|------------|-------|--------------|
| Emergence | 14-21 | 6" | 30% | 30-40 |
| Tuber Initiation | 21-35 | 12" | 40% | 50-60 |
| Tuber Bulking | 35-70 | 24" | 50% | 70-80 |
| Maturation | 70-90 | 36" | 60% | 80-100 |

**Critical Period:** Tuber initiation (30-45 days post-emergence)
- Stress at this stage → permanent yield loss
- Stress avoidance: <80 kPa throughout this window

### 7.3.2 Barley (Spring)

**Drought Tolerance:** Higher than potato
| Stage | MAD % | Notes |
|-------|-------|-------|
| Tillering | 30% | Establishment critical |
| Stem elongation | 50% | Moderate stress acceptable |
| Heading | 40% | Some stress reduces lodging |
| Grain fill | 60% | Drought tolerant |

### 7.3.3 Alfalfa

**Deep Rooting Advantage:**
- Root depth: 6-15 feet
- Water extraction: Lower profile than annuals
- MAD: 60-70% acceptable during production

**Cut Timing Optimization:**
- Pre-bloom: Quality premium (dairy feed)
- Full bloom: Yield maximum, lower quality
- Stress integration: Time cuts to minimize irrigation

---

## 7.4 Forecasting Architecture

### 7.4.1 LSTM Network Specification

**Architecture:**
- Input: 168 hours (7 days) of historical weather + 72 hours forecast
- Layers: 2× LSTM (128 units each), 1× Dense (64 units), Output (1× ET₀)
- Activation: tanh (LSTM), ReLU (Dense)
- Optimizer: Adam (lr=0.001)
- Loss: MSE

**Training Data:**
- SLV weather station records (10 years)
- CSU AgWeatherNet data
- 50,000 labeled samples (hourly)

**Accuracy:**
- 24-hour forecast: 94% R²
- 72-hour forecast: 81% R²
- 168-hour forecast: 72% R² (trend only)

### 7.4.2 Ensemble Integration

**Sources:**
- NOAA GFS (global)
- HRRR (high-resolution rapid refresh)
- NAM (North American Mesoscale)
- CSU local mesonet

**Weighted Average:**
```
ET_forecast = 0.4×LSTM + 0.3×GFS + 0.2×HRRR + 0.1×Persistence
```

**Uncertainty Quantification:**
- Standard deviation across ensemble members
- Confidence intervals on irrigation recommendations
- Risk-adjusted MAD thresholds (conservative when high uncertainty)

