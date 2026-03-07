# Knowledge Item: Software Engine Architecture (Zo & Decision Engines)

## Core Philosophy: Deterministic, NOT AI

All FarmSense decision logic is deterministic and judgment-based. No black-box AI models.

- Required for Water Court admissibility (AI decisions are inadmissible).
- All logic must be explainable and auditable.
- Future AI: Post-beta Digital Twin simulations only, sandboxed.

## The Zo Engine ("The Scientist")

The Core Compute Server is named "Zo" (hosted at `brodiblanco.zo.computer`). It executes:

1. **Bayesian Priors**: Establishes initial soil moisture probability distributions using historical data and Soil Functional Domain (SFD) profiles as priors.
2. **Localized Kriging (EBK)**: Geostatistical interpolation — fills spatial gaps between sensors with statistically valid confidence intervals.
3. **MAD Framework**: Management Allowable Depletion — delays irrigation to the "last possible minute," using deep soil profile as a dynamic water battery.
4. **SPAC Modeling**: Synthesizes Soil Layer (moisture, EC, pH), Plant Layer (CWSI, NDVI), and Atmosphere Layer (VPD, ET0, ET forecasting via LSTM, 4.5–7.7mm/day potato demand).

## Adaptive Recalculation Engine — "Fisherman's Attention" Scale

| Mode | Interval | Trigger |
|:---|:---|:---|
| DORMANT | 4 hours | Stable soil + parked pivot |
| ANTICIPATORY | 60 min | Rising ET trend detected |
| RIPPLE | 15 min | Water moving or active trend |
| COLLAPSE | 1 min | Critical anomaly |

## Key Decision Thresholds

```python
moisture_stable_band: 0.05      # ±5% considered stable
moisture_active_threshold: 0.15  # >15% = active recalc
moisture_critical_threshold: 0.30 # >30% drop in 6h = immediate
trend_volatile_threshold: 2.0    # >2%/hr = volatile
temp_stress_threshold: 35.0      # >35°C = heat stress flag
rainfall_event_threshold: 10.0   # >10mm = significant event
```

## Worksheet Cycle

1. **Ingestion & Fusion**: Map Servers + Query Engine synthesize satellite + atmospheric data.
2. **Model Generation**: Kriging models compare telemetry against Soil Variability Maps.
3. **Refinement**: Observed wetting front vs. predicted → updates Virtual Sensor Grid.
4. **OTA Update**: Optimized Worksheet sent to DHU.
5. **Local Execution**: DHU calculates gallonage per LRZ — auditable and accurate to the gallon.

## Services Map (`backend/app/services/`)

| Service | Purpose |
|:---|:---|
| `adaptive_recalc_engine.py` | Judgment-based recalc scheduling |
| `decision_engine.py` | Deterministic irrigation logic |
| `rss_kriging.py` | RSS 1m Kriging pipeline |
| `csa_alignment.py` | Corner-Swing kinematic resolver |
| `trading_service.py` | PBFT water market trading |
| `globalGAP_compliance.py` | GLOBALG.A.P. compliance engine |
| `predictive_maintenance.py` | Current Harmonic Analysis |
| `satellite_service.py` | Sentinel-2 / Landsat STAC fusion |
| `spatial_privacy.py` | Dual-layer spatial privacy |
| `jadc2_adapter.py` | Inter-agency / DoD data fabric |
| `vri_command_center.py` | VRI actuation orchestrator |
| `terrain.py` | DEM and slope analysis |

## Performance Targets

| Metric | Target | Critical |
|:---|:---|:---|
| API Response (p95) | <200ms | <500ms |
| 20m Grid Compute | <30 sec | <60 sec |
| 1m Grid Compute | <5 min | <10 min |
| Sensor Ingestion | 10K/sec | 5K/sec |
