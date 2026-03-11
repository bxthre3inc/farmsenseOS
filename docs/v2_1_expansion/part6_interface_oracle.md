
# PART VI: THE INTERFACE LAYER

## 6.1 Farmer Dashboard (3D VRI Control)

### 6.1.1 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React 19 | Component architecture |
| Language | TypeScript 5.3 | Type safety |
| Styling | Tailwind CSS 4 | Utility-first styling |
| 3D Engine | Three.js r158 | Field visualization |
| Maps | MapLibre GL JS 3.0 | Basemap, tile layers |
| State | Zustand | Global state management |
| WebSocket | Socket.io-client | Real-time updates |
| Build | Vite 5 | Fast dev, optimized builds |

### 6.1.2 Core Features

**3D Field Heatmap:**
- 1m resolution VWC overlay on 3D terrain
- Time-slider for historical playback
- Vertical profile visualization (click any point)
- Animated water infiltration simulation

**"Resolution Pop" Zoom Behavior:**
| Zoom Level | Grid | Behavior |
|------------|------|----------|
| >1:50,000 | 50m | Clear, labeled compliance view |
| 1:10,000 - 1:50,000 | 20m | Smooth transition |
| 1:5,000 - 1:10,000 | 10m | Pop trigger zone |
| <1:5,000 | 1m | Full enterprise resolution |

**Traffic-Light Status Indicators:**
| Status | Color | Meaning | Action |
|--------|-------|---------|--------|
| Green | #22c55e | Optimal, no action | Monitor |
| Yellow | #eab308 | Attention, review | Check worksheet |
| Red | #ef4444 | Critical, immediate | Execute or investigate |
| Gray | #6b7280 | Offline, no data | Field service |

**Irrigation Worksheet Viewer:**
- Prescription zones (speed, direction)
- Estimated water application
- Confidence intervals (Kriging MAPE)
- Override controls (with compliance logging)

### 6.1.3 Mobile-Responsive PWA

**Offline Capabilities:**
- Cached field data (last 24 hours)
- Stored worksheets
- Manual entry (sync on reconnection)
- Critical alerts (SMS fallback)

**Performance Targets:**
| Metric | Target | Test Device |
|--------|--------|-------------|
| First paint | <1.5s | iPhone 12 |
| Time to interactive | <3s | iPhone 12 |
| 3D render (1m grid) | >30fps | Desktop RTX 3060 |
| Battery impact | <5%/hour | Mobile Safari |

---

## 6.2 Regulatory Portal (Water Court Audit)

### 6.2.1 Purpose and Access

**Primary Users:**
- State Engineers (Colorado DWR)
- Water Court judges and clerks
- RGWCD compliance officers
- Legal counsel (read-only for farmers)

**Compliance Framework:**
- Read-only audit log (immutable)
- Hash verification on every view
- Digital signature on exports
- PBFT consensus certificate display

### 6.2.2 Export Formats

**Digital Water Ledger (DWL):**
```
.dwl package structure:
├── manifest.json (metadata, signatures)
├── ledger.csv (all events)
├── proofs/ (PBFT signatures)
├── validation_report.pdf
└── README.txt (chain verification instructions)
```

**SLV 2026 Compliance Reports:**
- Daily summaries (automated email)
- Weekly aggregation (PDF)
- Monthly trend analysis
- Annual Water Court submission package

### 6.2.3 WORM S3 Configuration

**Write-Once-Read-Many:**
- Bucket: `farmsense-compliance-vault`
- Object Lock: Compliance mode, 7-year retention
- Legal Hold: Automatic on litigation matters
- Versioning: Disabled (single version only)

---

## 6.3 Admin Dashboard (Fleet C&C)

### 6.3.1 Sled Hospital Monitor

**Real-Time Metrics:**
| Metric | Display | Alert Threshold |
|--------|---------|-----------------|
| Hospital occupancy | Progress bar | >80% |
| Processing queue | List + ETA | >24hr backlog |
| Failed diagnostics | Red count | Any |
| Battery health trend | Sparkline | <20% annual |

**Maintenance Scheduling:**
- Automatic (based on runtime hours)
- Seasonal (pre-plant, pre-harvest)
- Reactive (failure detection)
- Override (technician judgment)

---

## 6.4 Investor ROI Dashboard

### 6.4.1 Metrics Displayed

| Category | Metrics | Granularity |
|----------|---------|-------------|
| Water | Savings (AF/acre), efficiency (%) | Field, district, region |
| Energy | kWh reduction, cost savings | Field, monthly |
| Yield | CWT/acre, quality premium | Field, season |
| Financial | SaaS ARR, churn, LTV, CAC | Company-wide |
| Growth | Fields added, expansion pipeline | Quarterly |

---

# PART VII: THE HYDROLOGIC ORACLE

## 7.1 SPAC Thermodynamics: Surface Energy Balance

### 7.1.1 Fundamental Equation

The Oracle solves for every 1m grid cell:

```
R_n - G = λE + H

Where:
R_n = Net radiation (W/m²)
G   = Soil heat flux (W/m²)
λE  = Latent heat flux (evapotranspiration, W/m²)
H   = Sensible heat flux (W/m²)
```

**Component Sources:**
| Variable | Source | Accuracy |
|----------|--------|----------|
| R_n | Solar + atmospheric radiation models | ±5% |
| G | VFA dual-needle thermal pulse | ±1% |
| λE | Penman-Monteith calculation | ±10% |
| H | Residual (closure check) | Balance |

### 7.1.2 Penman-Monteith Model

**Reference ET (ET₀) Calculation:**
```
ET₀ = [0.408Δ(R_n - G) + γ(900/(T+273))u₂(eₛ - eₐ)] / [Δ + γ(1 + 0.34u₂)]

Where:
Δ   = Slope of vapor pressure curve (kPa/°C)
γ   = Psychrometric constant (0.665×10⁻³ kPa/°C)
T   = Mean air temperature (°C)
u₂  = Wind speed at 2m (m/s)
eₛ  = Saturation vapor pressure (kPa)
eₐ  = Actual vapor pressure (kPa)
```

**Crop-Specific ETc:**
```
ETc = Kc × ET₀
```

### 7.1.3 VPD Stress Thresholds

| VPD (kPa) | Stomatal Response | Photosynthetic Impact |
|-----------|-------------------|----------------------|
| <1.0 | Wide open | 100% capacity |
| 1.0-2.0 | Slight closure | 95% capacity |
| 2.0-3.5 | Moderate closure | 80% capacity |
| 3.5-5.0 | Significant closure | 40% capacity |
| >5.0 | Near-complete closure | <10% capacity |

---

## 7.2 Mathematical Derivation: Cokriging with Matérn Kernels

### 7.2.1 Why Matérn?

**Flexibility in Smoothness:**
```
Matérn variogram: γ(h) = σ²[1 - (2^(1-ν)/Γ(ν))(√(2ν)h/ρ)^ν K_ν(√(2ν)h/ρ)]

Where:
ν (nu) = Smoothness parameter (0.5, 1.5, 2.5 typical)
ρ (rho) = Range parameter
σ²      = Sill (variance)
K_ν     = Modified Bessel function of second kind
```

**Smoothness Values:**
| ν | Interpretation | Use Case |
|---|----------------|----------|
| 0.5 | Exponential, rough | Highly variable soils (sand lenses) |
| 1.5 | Medium | Typical agricultural fields |
| 2.5 | Gaussian, smooth | Uniform clay soils |

### 7.2.2 Field Roughness Index (FRI)

**Automatic ν Selection:**
```
FRI = std(NDVI) / mean(NDVI) + std(elevation) / mean(elevation)

If FRI > 0.3: ν = 0.5 (rough/exponential)
If 0.1 < FRI ≤ 0.3: ν = 1.5 (medium)
If FRI ≤ 0.1: ν = 2.5 (smooth/Gaussian)
```

### 7.2.3 Residual Calculation

**Regression Component:**
```
Z(s) = m(s) + ε(s)

m(s) = β₀ + β₁×NDVI(s) + β₂×Elevation(s) + β₃×SoilType(s)

ε(s)  = Spatially correlated residual (Kriged)
```

**Validation:**
- Leave-one-out cross-validation
- Target: MAPE <5% vs. VFA ground truth
- R² > 0.94 for all fields

---

## 7.3 Crop-Specific Calibration Libraries

### 7.3.1 Potato (Russet Burbank)

**Growth Stages:**
| Stage | Days | GDD | Critical Management |
|-------|------|-----|---------------------|
| Planting | 1 | 0 | Seed piece depth, spacing |
| Emergence | 10-20 | 100 | Soil temperature >50°F |
| Tuber Initiation | 40-50 | 500 | Water stress <80 kPa |
| Tuber Bulking | 50-80 | 800 | MAD 50%, steady moisture |
| Maturation | 80-110 | 1200 | Vines senescence |
| Harvest | 110-130 | 1400 | Skin set before digging |

**Stress Avoidance:**
- Tuber initiation: <80 kPa (water stress causes knobbiness)
- Bulking: Avoid >100 kPa (reduced yield)
- Never exceed 120 kPa (hollow heart, internal defects)

### 7.3.2 Barley (2-Row Malting)

**Drought Tolerance:** Higher than potato
**Critical Periods:**
- Tillering: 30% MAD (establishment sensitive)
- Stem elongation: 50% MAD
- Heading: 40% MAD (yield determination)
- Grain fill: 60% MAD (quality formation)

**Quality Parameters:**
- Protein: <12% for malting (irrigation affects)
- Plump: >90% (water stress reduces)
- Germination: >95%

### 7.3.3 Alfalfa

**Deep Rooting Advantage:**
- Taproot to 10+ feet
- Exploits deep moisture
- Higher MAD tolerance (60-70%)

**Cut Timing Strategy:**
- Pre-bloom: Maximum quality, lower yield
- Early bloom: Yield/quality balance
- Full bloom: Maximum yield, lower quality
- Stress timing: Avoid before 3rd cut

