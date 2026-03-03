# Research Portal — Frontend Specification V1.75

**Portal:** `research-portal` | **User Type:** University Researcher / Agronomic Data Scientist / Climate Scientist  
**Framework:** React + Vite + TypeScript | **Port:** 3004

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Matrix Data Stream** | Animated raw data feed visualization |
| **Parameter Dials** | Interactive knobs for depth range, moisture index, and pH |
| **Soil Nutrient Trend Chart** | Line chart of nutrient A/B time-series |
| **Latest Datasets List** | Fetchable list of available datasets with download |
| **Lab Connect** | Button stub for external lab system integration |
| **Export All** | Bulk dataset export trigger |

---

## V1.75 Additions — New Primary Views

### 1. Federated Learning Experiment Console

Submit, monitor, and analyze distributed model training jobs over the anonymized global sensor pool.

**Key elements:**

- **Experiment Builder** — Define a hypothesis and configure the training job: select target variable (e.g., predict NDVI decline at day+14), select input features (EC, SMP, VPD, ET, rainfall preceding days), choose anonymized field cohort (by geography, crop type, or sensor tier), and configure training parameters (epochs, learning rate, validation split).
- **Privacy Compliance Gate** — Before submission, a required dual-layer privacy review confirms: (a) the job uses only contextually anonymized data, (b) no query could reconstruct an individual farm's GPS coordinates or identity, and (c) the output model parameters do not encode individual-level information. Research coordinator must acknowledge.
- **Live Training Monitor** — Once a job is submitted to the Zo compute cluster, the researcher sees: real-time loss/accuracy curves, per-epoch metrics, estimated time to completion, and compute resource utilization.
- **Results Review Board** — Completed experiment results: model performance metrics (RMSE, R², AUC), feature importance rankings, and a plain-English summary of the hypothesis test result. The researcher annotates findings, classifies the result (Confirmed / Rejected / Inconclusive), and submits for inclusion in the Zo Worksheet candidate review queue.
- **Experiment Registry** — History of all experiments submitted by the researcher and by the broader research community (anonymized by researcher institution). Enables discovery of prior work and prevents duplication.

---

### 2. Satellite Covariate Science Suite

An interactive multi-layer satellite data explorer for conducting spectral analysis over any field zone and time period.

**Key elements:**

- **Layer Selector** — Toggle individual satellite data layers: Sentinel-1 (VV backscatter, VH backscatter, VV/VH ratio), Sentinel-2 (NDVI B8/B4, NDWI B8A/B3, false-color composite), Landsat-8 (LST surface temperature), DEM derivatives (elevation, slope, aspect, TWI).
- **Date-Range Comparison Slider** — Select any two dates within the archive. Renders both dates side by side with a blend-slider. Pixel-value tooltip shows the exact spectral value at the cursor position for each date.
- **Pixel Inspector** — Click any map cell and get a full spectral profile: all available band values for that pixel at the selected date, plus a 12-month time series chart of that pixel's NDVI and SSM (surface soil moisture). Useful for identifying long-term trends at a single location.
- **Spatial Correlation Analysis** — Draw a polygon over any area of interest. The system calculates a Pearson correlation matrix between all enabled satellite layers and all available ground sensor types (SMP, SWC, EC) for measurements within that polygon. Visualized as a heatmap.
- **Cloud Mask Overlay** — Show the cloud/shadow mask applied to each Sentinel-2 overpass. Select alternate Sentinel-1 SAR passes (cloud-penetrating) for comparison.

---

### 3. Zo Kriging Worksheet Inspector

Full transparency into the mathematical pipeline of every Kriging computation — the core of the platform's scientific defensibility.

**Key elements:**

- **Input Variable Panel** — For any field and timestamp, display all inputs fed into the Kriging model: SMP (per depth node), SWC (per VFA depth), EC, VPD (from weather station grid), solar radiation (from HUD/satellite), NDVI, NDWI, LST, elevation, slope, aspect. Each value shown with its source node ID and hardware signature hash.
- **Trend Model Coefficients** — The fitted linear regression trend model displayed in full: coefficient values for each covariate, standard errors, t-statistics, p-values, and model R². Allows researchers to evaluate whether the trend model is well-conditioned for the current field conditions.
- **Variogram Model Parameters** — The fitted spherical variogram: nugget, sill, and range parameters, plus the method-of-moments empirical variogram scatter plot vs. the fitted model curve. Critical for assessing spatial autocorrelation assumptions.
- **Residual Kriging Predictions** — The interpolated residual surface after trend removal, rendered as a 1m grid. Variance map (kriging standard error) displayed alongside predictions. Researchers can identify spatial zones where uncertainty is high (sparse sensor coverage).
- **End-to-End Prediction Grid** — The final combined 1m grid: trend + residual prediction at every grid cell. Downloadable as GeoTIFF, CSV, or NetCDF. Each file includes embedded metadata: model version, input data timestamps, and hash chain proof of input integrity.

---

### 4. Field Trial Design Engine

Define, run, and statistically analyze spatial A/B agronomic experiments within instrumented fields.

**Key elements:**

- **Treatment Zone Mapper** — Draw experimental and control zone polygons directly on the field map. Assign each zone a treatment label: irrigation protocol, fertilizer variant, cover crop species, or custom label. Minimum zone size enforced (must contain ≥3 sensor nodes) to ensure statistical validity.
- **Pre-Trial Power Analysis** — Before the trial starts, calculate required sample size (sensor nodes × time periods) to detect a hypothesized effect size at a chosen power level (e.g., 80%) and significance level (α=0.05). Warns if the zone configuration is underpowered.
- **Trial Dashboard** — Live tracking during the trial: sensor readings per zone, NDVI per zone (from satellite or drone), irrigation event log per zone, and soil health metrics per zone. Shows whether zones are diverging as expected.
- **Statistical Analysis Suite** — At trial conclusion: automated Mann-Whitney U test (non-parametric, appropriate for small agricultural datasets), Cohen's d effect size, bootstrapped confidence intervals. Results table with interpretation labels (significant / not significant at chosen α). Option to download the raw data and statistical results as a structured CSV for publication.
- **Results Visualization** — Box plots of primary outcome variables per zone, overlaid with NDVI treatment-effect maps at 1m resolution. Before/after composite views.

---

### 5. SPAC Continuum Model Sandbox

An interactive environment for exploring and validating the Soil-Plant-Atmosphere Continuum model that underpins all irrigation decisions.

**Key elements:**

- **7-Variable Input Panel** — Sliders or numeric inputs for all SPAC model variables: Soil Matric Potential (bars), Volumetric Water Content (%), Electrical Conductivity (dS/m), Vapor Pressure Deficit (kPa), Solar Radiation (W/m²), NDVI (0–1), and LSTM ET Forecast (mm/day). Each slider has a tooltip explaining the physical significance of the variable.
- **Live Decision Recalculation** — As variables are adjusted, the model deterministic output updates in real time: the MAD battery % remaining, the irrigation recommendation (PUMP / HOLD boolean), the projected time-to-critical if HOLD is maintained, and the estimated water application rate if PUMP is triggered.
- **Threshold Sensitivity Map** — Vary any single input while holding others constant. Renders a 1D sensitivity chart: x-axis is the input range, y-axis is the model output (e.g., MAD %). Identifies which variables most strongly control the decision boundary at current conditions.
- **Calibration Mode** — Toggle into calibration mode: load actual sensor readings from a specified field and date, compare the model's prediction to actual measured outcomes (e.g., did soil moisture recover after irrigation as predicted?). Supports crop-specific and geography-specific model calibration.
- **Export Configuration** — Save the current set of SPAC parameters as a named configuration file. Researchers can propose new configurations for evaluation against the global dataset, which then enters the Zo Worksheet candidate review process.

---

### 6. Open Data Repository

A publicly accessible, privacy-preserving catalog of research datasets generated by the FarmSense platform.

**Key elements:**

- **Dataset Catalog** — Full listing of available anonymized research datasets. Each entry: dataset name, geographic region, date range, sensor types included, spatial resolution, record count, file size, DOI (for publication citation), license (CC-BY for academic use), and version history.
- **Filter & Discovery** — Filter datasets by: geography (basin, state, climate zone), date range, sensor type (soil, atmospheric, satellite, drone), crop category, and data completeness (% of expected readings present).
- **Data Preview** — Before downloading, view a statistical summary: variable distributions, missing data rates, and a sample scatter plot of key variables. Helps researchers assess dataset fitness before investing in a full download.
- **API Access** — For programmatic access: authenticated API endpoint for querying datasets with selectable spatial bounds, time windows, and output format (JSON / CSV / NetCDF-4 / GeoTIFF). Rate-limited per research institution credential.
- **Citation & Attribution** — Auto-generated APA and BibTeX citation strings for each dataset. Tracks usage: how many papers have cited each dataset (based on DOI lookup). Builds FarmSense's academic impact profile.
- **Data Quality Badges** — Each dataset carries quality indicators: sensor calibration status, field maintenance record completeness, percentage of readings that passed automated QA/QC flags, and whether the dataset has been independently validated by a university partner.

---

### 7. Anonymized Basin Analytics

Research-grade aggregated basin statistics for climate science and aquifer sustainability research.

**Key elements:**

- **Basin Extraction Time-Series** — Total groundwater extraction volume (acre-feet/day) across the monitored basin for the full data archive. Seasonally decomposed to show annual patterns and long-term trend. Compared against historical basin-level pumping permit data.
- **ET Demand vs. Precipitation Surplus/Deficit** — Multi-year chart of basin-aggregated ET demand from the SPAC model vs. precipitation input from the weather grid. The gap between ET demand and precipitation is the "irrigation necessity signal" — shows why the basin depends on groundwater.
- **Crop Health Basin Trends** — Average NDVI time-series for each major crop type in the basin. Identifies years or periods of basin-wide crop stress, correlated with precipitation, temperature, and aquifer drawdown data. Enables climate impact attribution research.
- **Sensor Network Coverage Map** — Shows which areas of the basin have high node density (good coverage) vs. sparse coverage. Identifies geographic gaps where Kriging uncertainty is highest. Useful for guiding future hardware deployment strategy.
- **Cross-Basin Comparison** — When multiple basins are monitored, researchers can overlay the extraction and crop health time-series from different basins. Supports comparative aquifer hydrology research.

---

### 8. Instrument & Lab Integration Bridge

Connect and calibrate external laboratory instruments and measurement systems to contribute additional ground-truth data into the platform.

**Key elements:**

- **Integration Registry** — List of connected external data sources: soil spectrometers (LIBS, XRF), LIMS (Laboratory Information Management Systems), third-party weather station networks, eddy covariance flux towers, and custom IoT sensors. Each integration shows: last sync time, record count contributed, and data quality score.
- **New Integration Wizard** — Step-by-step setup for connecting a new instrument: select instrument type, configure API endpoint or file upload format, map instrument data fields to FarmSense schema variables, set contribution frequency, and define geographic assignment (which fields this instrument acts as ground truth for).
- **Calibration Dashboard** — For each integrated instrument: view the offset correction currently applied before data enters the model. See the residual error between the instrument's readings and the primary FarmSense sensor network for the same field. Accept or reject proposed auto-calibration corrections.
- **Contribution Quality Scoring** — Each instrument's contributed data is scored on: timeliness (% of expected readings present), agreement with primary sensors (mean absolute error), drift detection (is the instrument calibration changing over time?). Instruments below a quality threshold are flagged and excluded from model training until recalibrated.

---

## Data & API Dependencies (V1.75 Additions)

| Feature | Backend Endpoint(s) |
|---|---|
| Federated Learning Console | `POST /research/experiments`, `GET /research/experiments/{id}` |
| Satellite Suite | `GET /satellite/layers`, `GET /satellite/pixel/{lat}/{lon}` |
| Zo Worksheet Inspector | `GET /analytics/kriging/worksheet?field_id=&timestamp=` |
| Field Trial Engine | `POST /research/trials`, `GET /research/trials/{id}/results` |
| SPAC Sandbox | `POST /analytics/spac/simulate` |
| Open Data Repository | `GET /research/datasets`, `GET /research/datasets/{id}/download` |
| Basin Analytics | `GET /basin/analytics/extraction`, `GET /basin/analytics/ndvi` |
| Lab Integration Bridge | `POST /integrations/instruments`, `PUT /integrations/instruments/{id}/calibrate` |

---

## Design Notes

- **Privacy Architecture:** All data accessible through this portal has passed through dual-layer contextual anonymization. Individual farm GPS coordinates, farmer identities, and specific field boundaries are not accessible. Research queries that attempt to reconstruct individual-level data through aggregation are rate-limited and flagged.
- **Scientific Transparency:** The Zo Worksheet Inspector is designed specifically to enable peer review of the platform's scientific methodology. All model parameters and training data provenance are exposed at the level of detail required for a journal paper supplementary methods section.
- **Collaboration:** Experiment results and dataset citations are cross-linked to the academic publication record wherever DOI references are available, building an evidence base for the platform's scientific impact.
