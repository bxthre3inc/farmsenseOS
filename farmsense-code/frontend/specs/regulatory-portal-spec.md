# Regulatory Portal — Frontend Specification V1.75

**Portal:** `regulatory-portal` | **User Type:** State Engineer / Water Rights Officer / DWR Compliance Auditor  
**Framework:** React + Vite + TypeScript | **Port:** 3002

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Compliance Reports List** | Paginated list of generated SLV 2026 compliance reports |
| **Scientific Validation** | Display of Kriging methodology validation and CSU citations |
| **Economic Impact & IP** | Economic metrics panel and intellectual property overview |
| **Drone AR Feed** | Live drone camera feed with augmented reality overlay |
| **Integrity Chain Visualizer** | AES-128 cryptographic hash chain of custody visualization |
| **Anomaly Detection Alert** | Automated cryptographic hash mismatch alert banner |
| **4 KPI Cards** | Compliance rate, critical violations, audits this month, fields monitored |

---

## V1.75 Additions — New Primary Views

### 1. Basin Command Map (DWR Macro View)

A full-basin situational awareness map giving State Engineers a live, macro-level view of groundwater conditions across the entire valley.

**Key elements:**

- **Choropleth Depletion Map** — The entire monitored basin rendered as an animated choropleth map where color intensity represents real-time aquifer drawdown rate. Colour scale from deep blue (stable, no draw) through amber (significant draw) to red (critical depletion pace). Animations show the depletion gradient spreading or contracting over user-selected time windows (24h / 7d / 30d / season).
- **Layer Toggles** — Officers can overlay: groundwater elevation contours (interpolated from well depth sensors), registered well locations with permit status, FarmSense node density heatmap, active irrigation events (currently pumping nodes pulsing on the map), and annotated water rights boundary polygons.
- **Basin Summary Statistics** — Live panel alongside the map: total active extraction rate (GPM basin-wide), cumulative season depletion vs. sustainable yield, estimated days until the seasonal allocation cap is reached at the current rate, and count of at-risk wells (within 10% of their permit ceiling).
- **Field Drill-Down** — Click any field polygon to load a sidebar with that farm's current extraction rate, season-to-date usage vs. allocation, compliance status, last VFA reading timestamps, and direct link to their compliance report history.
- **Basin Alert Feed** — Chronological list of basin-wide anomaly events, sorted by severity, with one-click escalation to the Enforcement Console.

---

### 2. Reflex Enforcement Console

Emergency drought response tool enabling State Engineers to issue basin-wide pump restrictions with legal enforceability via the hardware mesh.

**Key elements:**

- **Severity Level Selector** — Three broadcast tiers:
  - **Advisory** — Informational notification pushed to all farmer dashboards. No automatic enforcement.
  - **Warning** — Dashboard alert with 48-hour voluntary compliance window before escalation. Logged to the DHU ledger for each farm.
  - **Mandatory** — DHU Reflex Logic enforces a hard pump ceiling automatically at the field edge level. GPM caps are encoded into the mesh-wide Reflex parameter and activated within 60 seconds of broadcast.
- **Dual-Officer Co-Signature Requirement** — Mandatory broadcasts require two named officers to cryptographically co-sign using their hardware-backed credentials. The co-signature event is logged with both officer identities, badge numbers, and a hardware timestamp before the broadcast propagates to the mesh.
- **Mesh Delivery Confirmation** — Real-time map showing which DHU nodes have acknowledged the Reflex message. Any node that has not acknowledged within 5 minutes is flagged for manual intervention.
- **Broadcast History** — Full log of all Reflex broadcasts: who issued it, co-signer identity, severity, declared reason, geographic scope, mesh delivery rate, and lift date/lifting officer. Admissible record for regulatory and legal proceedings.
- **Lift & Adjust Controls** — Modify or lift an active Reflex limit with the same dual-signature workflow. Supports partial lift (lift for specific subdistricts while maintaining restrictions elsewhere).

---

### 3. Forensic Playback Engine

Historical time-travel scrub of any field's complete hydrological state — the core tool for Water Court dispute resolution.

**Key elements:**

- **Time Slider Interface** — Scrub any date and time within the stored data range (up to 5 years). The interface renders the 20m IDW grid and 1m Kriging grid as they existed at the selected timestamp, along with all active sensor readings and pump telemetry.
- **Satellite Cross-Reference** — For any selected timestamp, the system fetches the nearest Sentinel-2 (optical) and Sentinel-1 SAR (radar) overpasses and overlays them alongside the ground sensor data for corroboration.
- **"Frozen Moment" Legal Package Generator** — For any selected timestamp and field: auto-compile a court-ready evidence package. Contents: (a) 1m Kriging grid PDF map; (b) raw sensor readings table with hardware-signed hash; (c) pump flow telemetry for the period; (d) satellite imagery with source metadata; (e) Zo Kriging CU calculation for the period; (f) cryptographic hash chain proving data integrity from that exact moment. Package is watermarked with the generating officer's ID and session timestamp.
- **Anomaly Replay** — Replays a flagged anomaly event in real time. Shows how the ground sensor readings and satellite moisture index diverged — the exact data that triggered the anomaly detection.
- **Chain of Custody Trace** — For any data point in the playback, display the full provenance: which hardware node generated it, the hardware signing key used, the DHU that received and countersigned it, and the cloud timestamp — an unbroken chain from sensor to evidence package.

---

### 4. Water Court Submission Workflow

A guided, multi-step wizard that takes a detected violation or anomaly and produces a complete, legally admissible evidence package ready for Water Court filing.

**Steps:**

1. **Case Setup** — Select field(s), date range, and violation type (unmetered extraction, permit ceiling breach, illegal diversion, data tampering attempt). Assign case reference number.
2. **Evidence Auto-Population** — System automatically pulls: cryptographic ledger data (hash chain), Zo Kriging CU calculations for the period, anomaly detection records with confidence scores, satellite corroboration imagery, and pump flow telemetry. All linked to the specific date range.
3. **Narrative Builder** — Officer adds a plain-language case summary (pre-filled with AI-drafted language from the telemetry). Flags which evidence items are being cited in the submission.
4. **Legal Package Preview** — Full preview of the court-ready PDF: cover page, case summary, evidence index, sensor data appendix, and hash chain appendix. Officer can annotate specific pages before finalizing.
5. **Officer Signature & Submission** — Sign with hardware-backed credentials. If dual-officer filing is required by the court, second officer receives a countersignature request. System tracks submission status: Drafted → Signed → Filed → Docketed → Adjudicated.
6. **Status Tracker** — All active cases listed with court status, next hearing date, and required follow-on filings dashboard.

---

### 5. Consumptive Use (CU) Science Panel

A transparency layer allowing officers to interrogate the Zo Kriging CU calculation and compare it directly against legacy Blaney-Criddle estimates.

**Key elements:**

- **Dual CU Calculator** — Input any field, crop type, and date range. Left panel shows the traditional Blaney-Criddle CU estimate (static formula, historical averages). Right panel shows the Zo Kriging real-time CU (multi-layer: SMP, SWC, VPD, solar radiation, NDVI, NDWI, LST, elevation). Both produce a final acre-inches/day figure.
- **Discrepancy Analysis** — Automatic comparison: how much does the Zo CU differ from Blaney-Criddle and why? Breakdown of which variables drove the difference (e.g., lower CU because VPD was suppressed by cloud cover; higher because anomalous soil temperature). Supports expert witness testimony on methodology superiority.
- **Input Factor Decomposition** — Bar chart showing the contribution weight of each input variable to the final Zo CU estimate. Officers can verify that the model is using physically reasonable weights for local conditions.
- **Confidence Interval Display** — The Kriging variance output is displayed as a confidence band around all CU estimates. Supports the argument that FarmSense CU calculations are statistically bounded to a defensible precision level.
- **Methodology Citation Export** — One-click PDF export of the full methodology note: variogram model used, training data sources, seasonal calibration log, and CSU SLV RC 2026 validation reference. Ready for attachment to Water Court filings.

---

### 6. Water Credit Registry & PBFT Ledger

Basin-wide view of all PBFT-verified peer-to-peer groundwater trading activity.

**Key elements:**

- **Active Credit Listings** — All open buy/sell offers for groundwater rights within the subdistrict. Each listing shows: listing farm (anonymized alias), volume (acre-inches), price, listing expiry, and PBFT proposal hash.
- **Executed Trade Log** — Complete history of all settled trades: buyer, seller, volume, price, settlement timestamp, PBFT consensus round proof hash, and officer validation hash. Every trade requires regulatory acknowledgement before settlement is final.
- **Officer Validation Workflow** — Proposed trades are held in a "pending officer review" state for up to 24 hours. Officers can approve with a cryptographic signature or block with a documented reason (e.g., trade would push buyer above their seasonal permit ceiling).
- **Credit Issuance & Invalidation** — Officers can issue new credits (when a farm verifiably conserves beyond their baseline) or invalidate credits (if supporting data is found to be fraudulent). Both actions require a case reference and an officer signature.
- **Basin Trading Volume Analytics** — Monthly and seasonal charts of trading volume (acre-inches exchanged), average price, number of participating farms, and total credit value in circulation. Trends inform future allocation policy decisions.

---

### 7. Multi-Constellation Anomaly Engine

Cross-spectral anomaly detection fusing Sentinel-1 SAR radar with Sentinel-2 optical to achieve cloud-free continuous monitoring.

**Key elements:**

- **Cloud-Free Detection Architecture** — Sentinel-2 NDWI provides optical moisture anomalies when skies are clear. Sentinel-1 SAR (VV/VH backscatter) detects soil moisture anomalies through cloud cover. Both signals are fused; the system flags an anomaly only when at least one constellation corroborates the ground sensor data — or when they contradict each other in a way that implies the ground sensor may have been tampered with.
- **Anomaly Confidence Scores** — Each flagged event receives a confidence score (0–100%) based on: number of corroborating data sources, delta magnitude, historical baseline deviation, and proximity to other confirmed events. High-confidence anomalies trigger automatic officer notification.
- **Anomaly Event Cards** — Each event card shows: field ID, date/time, anomaly type (unexpected moisture gain, pump data vs. satellite divergence, sensor blackout), confidence score, satellite imagery thumbnail for the date, and ground sensor readings at the time. One-click escalation path to the Water Court Submission Workflow.
- **False Positive Feedback Loop** — Officers can mark any anomaly as a false positive (with reason: known irrigation event, sensor maintenance, etc.). False positive data feeds back into model calibration to reduce future noise.
- **Temporal Anomaly Patterns** — Long-range pattern detection: identifies fields with recurring anomaly events at similar intervals or conditions. Flags systematic patterns for potential systematic non-compliance investigation.

---

### 8. Predictive Aquifer Modeling

30/60/90/365-day aquifer depletion trajectory forecasting to support proactive regulatory policy.

**Key elements:**

- **Depletion Forecast Charts** — Multi-horizon time-series forecast for basin-wide aquifer level. Three scenario lines: (a) Current Trajectory — no policy change; (b) Moderate Conservation — 10% extraction reduction (e.g., from Reflex Warnings); (c) Emergency Conservation — 25% reduction (Mandatory Reflex). Each line shows projected aquifer level vs. the legally designated critical drawdown threshold.
- **Well-Level Projections** — Drill into any specific well to see its individual projected level under each scenario, given its current extraction rate and allocated permit ceiling.
- **Policy Impact Simulator** — Adjust policy parameters (extraction reduction %, Reflex limit values, seasonal cap changes) and immediately see the effect on the forecast chart. Designed for use in planning meetings with legislators and DWR administrators.
- **Precipitation Sensitivity Analysis** — The forecast incorporates NOAA seasonal precipitation outlooks. Show the projected depletion range under dry / average / wet precipitation scenarios to communicate forecast uncertainty.
- **Regulatory Trigger Alerts** — Pre-set notification thresholds: when the forecast model predicts the aquifer will breach the critical drawdown level within a specified number of days, an automatic alert escalates to the Reflex Enforcement Console for proactive action.

---

## Data & API Dependencies (V1.75 Additions)

| Feature | Backend Endpoint(s) |
|---|---|
| Basin Command Map | `GET /basin/map`, `GET /basin/extraction-rate`, `GET /fields` |
| Reflex Console | `POST /mesh/reflex/broadcast`, `GET /mesh/reflex/history` |
| Forensic Playback | `GET /fields/{id}/grid/20m?timestamp=`, `GET /fields/{id}/grid/1m?timestamp=` |
| Water Court Wizard | `GET /ledger/extractions`, `GET /analytics/cku`, `POST /court/submissions` |
| CU Science Panel | `GET /analytics/cku/compare`, `GET /analytics/kriging/metadata` |
| PBFT Registry | `GET /marketplace/trades`, `PUT /marketplace/trades/{id}/validate` |
| Anomaly Engine | `GET /anomalies`, `POST /anomalies/{id}/feedback` |
| Aquifer Modeling | `GET /basin/aquifer/forecast`, `POST /basin/aquifer/simulate` |

---

## Design Notes

- **Access Control:** All views are read-only by default. Write actions (Reflex broadcast, court submission, trade validation, credit issuance) require hardware-backed officer credential co-signature.
- **Evidence Integrity:** All evidence packages generated by this portal carry a portal-level countersignature separate from and in addition to the hardware-level sensor signatures. The dual-signature chain establishes both data origin and officer integrity.
- **Privacy Architecture:** The Basin Command Map and Anomaly Engine display only anonymized or aggregated data. Individual farm data is visible only in the Forensic Playback and Court Submission views, which require case-level authorization logging.
