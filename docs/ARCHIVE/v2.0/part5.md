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

# PART VI: THE INTERFACE LAYER

## 6.1 Farmer Dashboard (3D VRI Control Center)

### 6.1.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 (Next.js App Router) |
| 3D Rendering | Three.js + React Three Fiber |
| Maps | MapLibre GL JS (self-hosted, STAC-integrated) |
| Styling | TailwindCSS 4 |
| State | Zustand + TanStack Query |
| Build | Vite 6 |

### 6.1.2 Core Features

**3D Field Visualization:**
- Elevation model from LiDAR/DEM
- Moisture heatmap overlay (1m resolution)
- Pivot kinematics (live position from PMT GNSS)
- Section control zones (color-coded by status)

**Resolution Pop (Conversion Mechanism):**
- Base user (50m): Full field view at native resolution
- Zoom to anomaly: High-contrast 1m grid blurred with "Locked" overlay
- Trigger: Clicking suspected nozzle leak or dry zone
- Conversion: "High-Resolution Proof Available" CTA

**Traffic-Light Status System:**
| Color | Meaning | Action |
|-------|---------|--------|
| Green | Optimal moisture | No action |
| Yellow | Approaching MAD | Prepare for irrigation |
| Red | Below MAD threshold | Irrigate immediately |
| Blue | Active irrigation | Monitor completion |
| Gray | No data / offline | Check sensors |

**Irrigation Worksheet Viewer:**
- Real-time prescription from DHU
- Zone-by-zone timing and rate
- Override controls (emergency stop)
- History log (compliance)

### 6.1.3 Technical Specifications

**WebSocket Real-Time:**
- Protocol: Socket.io
- Frequency: 1Hz updates during irrigation
- Fallback: Long-polling for legacy browsers

**Mobile PWA:**
- Offline cache: Last 7 days of field data
- Background sync: Queue actions for connectivity restoration
- Push notifications: Irrigation complete, alerts

**Performance Targets:**
| Metric | Target | Minimum |
|--------|--------|---------|
| First paint | <1.5s | 3s |
| Time to interactive | <3s | 5s |
| 3D frame rate | 60fps | 30fps |
| API response (p95) | <200ms | 500ms |

---

## 6.2 Regulatory Portal (Water Court Audit)

### 6.2.1 Purpose

Read-only compliance reporting interface for legal proceedings and regulatory audits.

### 6.2.2 Features

**Immutable Audit Log:**
- Hash verification display for each record
- Chain integrity status ("Verified" / "Broken Link Detected")
- Digital signature validation (Ed25519)

**Export Formats:**
- PDF: Formatted for legal submission
- CSV: Raw data for analysis
- DWL (Digital Water Ledger): Complete package with proofs
- JSON: API-compatible for state systems

**Multi-Field Aggregation:**
- Subdistrict-level summaries
- Trend analysis (seasonal, annual)
- Violation tracking (if any)
- Compact compliance scoring

### 6.2.3 SLV 2026 Compliance

**WORM Storage:** Write-Once Read-Many S3 bucket configuration
- Object Lock: Compliance mode, 7-year retention
- Versioning: Enabled with MFA delete protection
- Encryption: AES-256-SSE with CMK

**Automated Reporting:**
- Daily summaries (pushed to regulators)
- Weekly compliance dashboards
- Monthly detailed reports
- Annual Water Court packages

---

## 6.3 Admin Dashboard (Fleet C&C)

### 6.3.1 Sled Hospital Monitor

Real-time sensor health across entire fleet:
- Battery voltage (predictive replacement)
- Last chirp timestamp (connectivity check)
- Firmware version (OTA update status)
- Nitrogen pressure (seal integrity)
- Temperature (thermal stress detection)

### 6.3.2 Maintenance Scheduling

| Task | Frequency | Trigger |
|------|-----------|---------|
| Battery replacement | 4 years | Voltage <3.0V |
| Nitrogen purge | Annual | Pressure <3 PSI |
| Seal inspection | Bi-annual | O-ring degradation |
| Full extraction | Pre-harvest | Field schedule |
| Firmware update | Quarterly | Security patches |

### 6.3.3 Fleet Operations Map

- All 1,280 fields with status indicators
- DHU coverage overlap visualization
- RSS connectivity health
- Active irrigation events (live)

---

## 6.4 Investor ROI Dashboard

**Key Performance Indicators:**
| Metric | Unit | Display |
|--------|------|---------|
| Water savings | AF/acre | Trend line, rolling 30-day |
| Energy reduction | kWh/acre | Comparison to baseline |
| Yield improvement | CWT/acre | Season-over-season |
| SaaS ARR | $ | Real-time pipeline |
| Gross margin | % | By tier (Base/Plus/Enterprise) |
| CAC | $/customer | By acquisition channel |
| LTV | $ | Predictive model |
| NRR | % | Logo + expansion - churn |

**Regional Expansion Pipeline:**
- Heat map of target subdistricts
- Pipeline stages (Prospect → Pilot → Contract)
- Revenue forecast by quarter

---

## 6.5 Grant & Research Portals

### 6.5.1 NRCS Conservation Credit Calculator

Auto-maps FarmSense metrics to NRCS Resource Concern categories:
- Water Quality (nutrient leaching reduction)
- Soil Health (organic matter, compaction)
- Water Quantity (aquifer depletion mitigation)
- Energy (pumping efficiency)

**LaTeX Export:**
- Academic paper formatting
- Bibliography integration
- Data tables (CSV embed)
- Figure generation (high-res maps)

### 6.5.2 Federated Learning Interface

**Privacy-Preserving ML:**
- Model training on distributed data
- No raw sensor data leaves field
- Differential privacy (ε=1.0, δ=10⁻⁶)
- Secure aggregation protocols

**Research Collaboration:**
- CSU SLV Research Center integration
- Controlled data access for peer review
- Attribution and citation tracking