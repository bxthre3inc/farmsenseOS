
# PART IV: THE TECHNICAL CORE

## 4.1 Tri-Layer Compute Topology

| Level | Node | Hardware | Function | Grid Resolution |
|-------|------|----------|----------|-----------------|
| 0 | Sensors (VFA, LRZ1, LRZ2, PFA) | nRF52840, nRF5340 | Raw sensing, AES-256 encryption | Point measurements |
| 1.5 | PMT (Field Hub) | ESP32-S3 | Edge-EBK, aggregation, Reflex Logic | 50m compliance |
| 2 | DHU (District) | Jetson Orin Nano | 20m/10m Kriging, PBFT consensus | 20m/10m optimization |
| 3 | RSS (Regional) | Threadripper PRO | 1m Master Grid, FHE vaulting | 1m enterprise |
| 4 | Cloud (Zo) | AWS EKS | Analytics, ML, global coordination | Multi-field synthesis |

### 4.1.1 Data Flow Architecture

```
VFA/LRZ1/LRZ2/PFA → 900MHz CSS LoRa → PMT (aggregator)
PMT → 2.4GHz/LTE-M → DHU → Fiber → RSS → Cloud (Zo)
```

All field devices report to the elevated PMT, which acts as the field-level gateway. This topology eliminates ground-level canopy attenuation.

---

## 4.2 SQL Schema: TimescaleDB & PostGIS Sovereign Vault

### 4.2.1 Sensor Telemetry Hypertable

```sql
-- High-velocity sensor data, chunked by 7 days
CREATE TABLE sensor_readings (
    time TIMESTAMPTZ NOT NULL,
    device_id UUID NOT NULL,
    field_id UUID NOT NULL REFERENCES fields(id),
    sensor_type VARCHAR(50) NOT NULL, -- 'vwc_10cm', 'temp_soil', 'ec_bulk'
    value DOUBLE PRECISION,
    quality_score FLOAT CHECK (quality_score BETWEEN 0.0 AND 1.0),
    location GEOGRAPHY(POINT, 4326),
    metadata JSONB, -- {rssi: -92, voltage: 3.7, firmware: "1.2.3"}
    PRIMARY KEY (time, device_id, sensor_type)
);

SELECT create_hypertable('sensor_readings', 'time', chunk_time_interval => INTERVAL '7 days');
CREATE INDEX idx_sensor_location ON sensor_readings USING GIST (location);
CREATE INDEX idx_sensor_field_time ON sensor_readings(field_id, time DESC);
```

### 4.2.2 Compliance Ledger (Hash-Chained)

```sql
-- Tamper-proof audit trail for Water Court
CREATE TABLE compliance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID NOT NULL REFERENCES fields(id),
    log_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_type VARCHAR(50) NOT NULL, -- 'IRRIGATION_START', 'VIOLATION', 'PBFT_COMMIT'
    details JSONB NOT NULL,
    hash VARCHAR(64) NOT NULL, -- SHA-256 of (details + previous_hash)
    previous_hash VARCHAR(64),
    device_signature BYTEA -- Ed25519 signature
);

CREATE INDEX idx_compliance_field ON compliance_logs(field_id, log_time DESC);

-- Verify chain integrity
SELECT COUNT(*) AS broken_links
FROM compliance_logs l1
JOIN compliance_logs l2 ON l1.id = l2.previous_hash
WHERE l1.hash != l2.previous_hash;
```

### 4.2.3 Core Schema Tables

| Table | Purpose | Rows (Subdistrict 1) |
|-------|---------|---------------------|
| fields | PostGIS polygons, soil series, crop type | 1,280 |
| devices | Hardware inventory, firmware, health | 25,600 |
| sensor_readings | Time-series telemetry (hypertable) | 2.2B/year |
| irrigation_events | Pump cycles, flow volumes, compliance | 50K/year |
| kriging_grids | 1m raster tiles, moisture predictions | 166M tiles |
| compliance_logs | Hash-chained audit trail | 500K/year |
| users | RBAC, permissions | 5,000 |
| worksheets | DHU-distributed prescriptions | 100K/year |

---

## 4.3 API Specifications: Nexus of Data Ingestion

### 4.3.1 Authentication

- JWT with RS256 (asymmetric signing)
- mTLS for field device authentication
- Rate limits: 1,000 req/min (read), 100 req/min (compute/write)

### 4.3.2 Core Endpoints

```
POST   /v1/ingest/telemetry       # Sensor data ingestion from DHU
GET    /v1/fields/{id}/moisture   # Retrieve 1m kriging grid
POST   /v1/irrigation/worksheet   # Generate VRI prescription
GET    /v1/compliance/report      # Export Digital Water Ledger
POST   /v1/analytics/kriging      # On-demand kriging computation
WS     /v1/stream/field/{id}       # Real-time WebSocket (1Hz)
```

### 4.3.3 Response Schema Example

```json
{
  "field_id": "uuid",
  "timestamp": "2026-03-10T14:30:00Z",
  "grid_resolution": "1m",
  "moisture_map": "base64_encoded_float32_grid",
  "confidence_interval": 0.95,
  "kriging_variance": 0.023,
  "worksheet": {
    "recommended_action": "irrigate",
    "zones": [
      {"zone_id": 1, "duration_min": 45, "rate_mm_hr": 12.5}
    ]
  }
}
```

---

## 4.4 Interpolation Methodology

### 4.4.1 Edge-EBK (Empirical Bayesian Kriging)

**Level 1.5 (PMT):** 50m resolution, IDW fallback
- Hardware: ESP32-S3, FPU accelerated
- Algorithm: Modified IDW with anisotropic distance
- Latency: <50ms for 16x16 matrix

**Level 2 (DHU):** 20m/10m resolution, Ordinary Kriging
- Hardware: Jetson Orin Nano (CUDA)
- Algorithm: Ordinary Kriging with spherical variogram
- Parameters:
  - Nugget: 0.0012
  - Sill: 0.0085
  - Range: 245m

**Level 3 (RSS):** 1m resolution, Regression Kriging
- Hardware: Threadripper PRO (64 cores)
- Algorithm: Regression Kriging with Sentinel-2 NDVI covariates
- Covariates: Satellite NDVI, thermal, elevation, slope, aspect
- Cross-validation: R² = 0.94, MAPE <5%

### 4.4.2 Matérn Kernel Specification

**Why Matérn over exponential/spherical:**
- Allows non-integer smoothness parameter ν
- SLV soil moisture exhibits localized discontinuities (compaction ridges, wheel tracks)
- ν auto-tunes 0.5 (rough/exponential) to 2.5 (smooth) based on Field Roughness Index (FRI)

**Formula:**
```
Z(s) = m(s) + ε(s)
```
Where m(s) = deterministic trend (satellite covariates), ε(s) = spatially correlated residual

---

## 4.5 Adaptive Recalculation Engine: "Fisherman's Attention"

| Mode | Trigger | Frequency | Power Draw |
|------|---------|-----------|------------|
| **SLEEP** | Stable moisture, pivot parked | 4 hours | 8µA |
| **PULSE** | LNA wake, scheduled chirp | 15 min | 15mA |
| **SENSE** | ADC sampling active | On-demand | 45mA |
| **COMPUTE** | EBK calculation burst | Event-driven | 80mA |
| **TX** | LoRa backhaul transmission | Batch | 120mA |
| **FOCUS RIPPLE** | Anomaly detected (>5% deviation) | 15 min | 80mA |
| **FOCUS COLLAPSE** | Pressure spike, motion detected | 5 seconds | 120mA |

**Volatility Score Calculation:**
```
Score = (Moisture_Δ_1h × 0.4) + (Irrigation_Active × 0.3) + (VPD_Stress × 0.2) + (Wind_Stress × 0.1)
```
- Score > 0.7 → COLLAPSE mode
- Score > 0.3 → FOCUS RIPPLE mode
- Default → PULSE/SLEEP cycling

---

## 4.6 Decision Engine: Reflex Logic

**Condition → Action Mapping:**

| Condition | Sensor | Action | Latency |
|-----------|--------|--------|---------|
| PMT stall | IMU (acceleration >3g) | ACTUATE_STOP | <100ms |
| Line pressure <5 PSI | PFA (Dwyer transducer) | ACTUATE_STOP | <50ms |
| Saturation at 48" | VFA (GroPoint) | ACTUATE_STOP | <500ms |
| Cavitation detected | PFA (CT clamp FFT) | ACTUATE_STOP + Alert | <1s |
| DHU link lost >4hr | PMT (watchdog) | ISLAND_MODE (cached worksheet) | Immediate |

