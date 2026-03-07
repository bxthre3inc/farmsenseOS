# MASTER SOFTWARE ARCHITECTURE: FarmSense OS & Logic (V2.1)

> **The Single Source of Truth for Software Engines, APIs, and Data Flows**
> Consolidates: ARCHITECTURE.md, BLUEPRINT.md, FEATURESET.md, BACKEND_SERVICE_MAP.md, IMPLEMENTATION_GUIDE.md, and 2 Software KIs.

---

## 1. System Philosophy & Logic Mandate

FarmSense is a **Deterministic Farming Operating System**. It is engineered to replace stochastic "intuition" with a high-fidelity computational engine.

### 1.1 The Deterministic Mandate

- **No Black-Box AI**: All irrigation and trading decisions are deterministic and judgment-based. This is a non-negotiable requirement for **Water Court Admissibility**.
- **Evidence-Grade Tech**: Every packet is signed at the edge (AES-128/256), and every decision is logged in a SHA-256 hash-chained compliance ledger.
- **Explainable Logic**: Operators must be able to audit why a "Soft-Stop" or "VRI-Update" was issued back to raw sensor telemetry.

---

## 2. Tiered Lambda Architecture

FarmSense functions as a decentralized monolithic grid, balancing low-latency edge reflex with high-capacity cloud geostatistics.

| Layer | Node | Engine Grade | Role |
| :--- | :--- | :--- | :--- |
| **L0 (Field)** | Sensors | Bare-Metal C | Raw sensing & local deep-sleep management. |
| **L1 (Hub)** | PMT | RTOS / ESP32 | Reflex Logic (IMU Stall → Stop), 50m grid compute. |
| **L2 (District)** | DHU | Edge Linux (Jetson) | 20m/10m Grid Kriging, AllianceChain PBFT Consensus. |
| **L3 (Cortex)** | RSS / Cloud | Python / CUDA / FHE | 1m Master Grid, Long-term DIL, Legal Vault. |

---

## 3. Data Infrastructure & Schemas

### 3.1 TimescaleDB (Time-Series Telemetry)

Standardized monthly chunking for high-velocity sensor data.

```sql
CREATE TABLE sensor_readings (
    time          TIMESTAMPTZ NOT NULL,
    device_id     UUID NOT NULL,
    field_id      UUID NOT NULL,
    sensor_type   VARCHAR(50), -- 'moisture_10cm', 'moisture_30cm', 'flow_rate'
    value         DOUBLE PRECISION,
    quality_score FLOAT,       -- 0.0 to 1.0 confidence
    metadata      JSONB,       -- RSSI, BatVoltage, ADC_Raw
    PRIMARY KEY (time, device_id, sensor_type)
);
SELECT create_hypertable('sensor_readings', 'time');
```

### 3.2 PostgreSQL (Compliance & Ledger)

Implements blockchain-style hash chaining for tamper-proof regulatory reporting.

```sql
CREATE TABLE compliance_logs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id      UUID REFERENCES fields(id),
    log_time      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_type    VARCHAR(50), -- 'IRRIGATION_EVENT', 'VIOLATION', 'PBFT_COMMIT'
    details       JSONB NOT NULL,
    hash          VARCHAR(64), -- SHA-256 of (details + previous_hash)
    previous_hash VARCHAR(64)
);
```

---

## 4. Core Software Engines

### 4.1 The Zo Engine ("The Scientist")

Hosted at `brodiblanco.zo.computer`. Responsible for the Soil-Plant-Atmosphere Continuum (SPAC) synthesis.

- **Bayesian Priors**: Establishes moisture probability using historical Soil Functional Domain (SFD) profiles.
- **Regression Kriging**: Ordinary Kriging corrects Sentinel-2 trend bias using ground-truth LRZ/VFA nodes.
- **MAD Framework**: Management Allowable Depletion — uses the soil profile as a "Water Battery" to delay pumping.

### 4.2 Adaptive Recalculation Engine ("Fisherman's Attention")

Controls when and at what resolution the spatial grid recalculates.

| Mode | Trigger | Interval | Action |
| :--- | :--- | :--- | :--- |
| **DORMANT** | Variance < 5% / Parked | 4-12 hours | Low-power background trend. |
| **ANTICIPATORY** | Rising ET / Rain < 2mm | 1 hour | Hourly predictive sweep. |
| **RIPPLE** | Pump = ON / Active flow | 15 min | Standard active grid recalculation. |
| **COLLAPSE** | PMT IMU > 5.0g / Anomaly | 5 sec - 1 min | Primary reflex logic & alert dispatch. |

### 4.3 Decision Engine (Reflex Logic)

Sub-cloud orchestrator evaluation field-state conditions.

- `PMT_STALL` → Issue `ACTUATE_STOP` to PFA Relay.
- `LINE_PRESSURE_MAX` → Issue `REFLEX_STOP`.
- `NOZZLE_DROP` → Trigger VRI recalculation at 1m.

---

## 5. Backend Service Map (`app/services/`)

| Service Module | Function | Algorithm/Tech |
| :--- | :--- | :--- |
| `rss_kriging.py` | 1m Mastering | Scikit-learn GPR (RBF + WhiteKernel). |
| `csa_alignment.py` | Corner Resolver | Law of Cosines: `θ = arccos((d1²+d2²-d3²)/(2·d1·d2))`. |
| `trading_service.py` | Water Market | PBFT AllianceChain Consensus. |
| `predictive_maint.py` | Pump Health | 1,024-point FFT on Phase harmonics. |
| `spatial_privacy.py` | Data Obfuscation | Differential Privacy (ε=0.5) + k-anonymity. |
| `globalGAP_compliance` | Certification | Automated GLOBALG.A.P. Audit Trails. |
| `jadc2_adapter.py` | Inter-agency | JADC2 STANAG-aligned data tactical translation. |
| `satellite_service` | NDVI/NDWI | Sentinel-2 / Landsat-9 STAC Catalog Fusion. |

---

## 6. Security, Authentication & Roles

### 6.1 Authentication (JWT Flow)

- **Backend**: FastAPI + Bcrypt (Cost Rounds = 12).
- **Storage**: `sessionStorage` (Stateless).
- **Secret**: Managed via `JWT_SECRET` environment variable.

### 6.2 Role-Based Access Control (RBAC)

- **INTERNAL**: Full system admin & OTA management.
- **FARMER**: Own field telemetry, VRI command center, trading dashboard.
- **REGULATOR**: Compliance audit viewer, non-repudiable ledger access.
- **INVESTOR**: Regional equity scores, depletion risk, Water-ROI analytics.

---

## 7. Strategic Feature Set

- **Resolution Pop**: Dynamic UI blur/unlock between 50m (Free) and 1m (Enterprise) spatial tiers.
- **AllianceChain**: Peer-to-peer water credit trading rights executed via DHU PBFT consensus.
- **Dual-Layer Contextual Anonymization**: Segregates Hyper-accurate Legal Ledger (Private) from Federated Learning Models (Public/Aggregate).
- **Rapid Deployment/Dual-Use**: JADC2 adapters translate soil trafficability into tactical terrain maps.

---

## 8. 20-Week Implementation Roadmap (SLV Pilot)

### Phase 1: Foundation (Weeks 1-4)

- **Week 1-2**: Deploy unified CSE stack on `brodiblanco.zo.computer`. Setup Monitoring (Prometheus/Grafana).
- **Week 3-4**: Implement JWT Auth & core SQLAlchemy models for sensor readings.

### Phase 2: Ingestion & Kriging (Weeks 5-8)

- **Week 5**: Implement high-velocity Sensor Ingestion API (Target: 10K pings/sec).
- **Week 6-8**: Deploy 20m Edge Kriging on Jetson Hubs. Integrate Sentinel-2 cloud-filtering (30% threshold).

### Phase 3: Analytics & Reflex (Weeks 9-12)

- **Week 9-10**: Adaptive Recalculation Engine validation (Dormant → Collapse).
- **Week 11-12**: Decision Engine "Soft-Stop" field trials.

### Phase 4: Portals & Compliance (Weeks 13-16)

- **Week 13-14**: Farmer Dashboard (React 18 + MapLibre GL JS).
- **Week 15**: Regulatory Portal for SLV 2026 Water Court hearings.
- **Week 16**: Security penetration testing & UAT with pilot farmers.

### Phase 5: Optimization & Rollout (Weeks 17-20)

- **Week 17-18**: Performance tuning (Kriging < 5 min/field).
- **Week 19**: Trainer-the-trainer manual generation.
- **Week 20**: **CSU SLV Research Center Pilot Launch** (2 Center Pivots, Full Stack).

---

## 9. Performance & Health Targets

| Metric | Target | Critical Threshold |
| :--- | :--- | :--- |
| **API Response (p95)** | < 200ms | 500ms |
| **20m Grid Calc** | < 30 sec | 60 sec |
| **1m Grid Master** | < 5 min | 10 min |
| **Sensor Ingestion** | 10,000 / sec | 5,000 / sec |
| **System Uptime** | 99.9% | 99.5% |

---

## 10. CI/CD & Deployment Strategy

Automated deployment is managed via GitHub Actions to the CSE/Zo stack.

### 10.1 Environment Configuration

- **RDC (Oracle)**: Public IP for Map Database. Requires `POSTGRES_USER`, `POSTGRES_PASSWORD`.
- **Zo.computer**: Core Application Server. Requires `MAP_DATABASE_URL` pointing to the RDC.

### 10.2 Deployment Workflow

1. **Push to `main`**: Triggers GitHub Action.
2. **Step 1 (Validate)**: Lints and unit tests (Pytest/Jest).
3. **Step 2 (Deploy-RDC)**: Deploys `docker-compose.oracle.yml` to the map stack.
4. **Step 3 (Deploy-Zo)**: Deploys `docker-compose.zo.yml` to the core platform.

---

## 11. AI Agent Coordination (SOP)

This section contains critical invariants for AI Assistants (antigravity/cortex) operating within the FarmSense codebase.

### 11.1 The "Before Creating" Rule

Before creating ANY new file, route, or service:

1. **Audit Documentation**: Start at `README.md` → 4 Masters.
2. **Verify Routes**: Check `app/api/main.py` for existing endpoint definitions.
3. **Grep Search**: Sweep the workspace for similar logic/classes. **Assumption is always that it already exists.**

### 11.2 Core Invariants

- **No Dependencies**: Do not add external Python or JS libraries without explicit architectural review.
- **Deterministic Logic**: Never propose or implement black-box ML for irrigation or ledger decision points.
- **Version Integrity**: Maintain the Master Documents as the *only* authoritative technical specifications. Any engineering change must be reflected in the relevant Master first.

## 12. Hybrid Cloud Deployment (Zo + RDC)

FarmSense utilizes a split-deployment architecture to separate compute-heavy processing from geospatial data services.

### 12.1 RDC Cloud (Map Stack)

Hosts the PostGIS database and tile-service engine.

- **Port 5432**: Database access.
- **Port 8001**: Tile serving.
- **Path**: `farmsense-code/deployment/docker/docker-compose.rdc.yml`

### 12.2 Zo Server (Core Platform)

Hosts the FastAPI engine, React frontend, and Audit ledger.

- **Environment**: `MAP_DATABASE_URL` must point to the RDC instance.
- **Path**: `farmsense-code/deployment/docker/docker-compose.cse.yml`

---
*Classification: Master Software Asset | Single Source of Truth | Approved 2026-03-07*
