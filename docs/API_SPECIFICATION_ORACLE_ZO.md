# FarmSense API Specification: Oracle & Zo Compute Engine

**Version:** 1.0  
**Base URL:** `https://api.farmsense.io/v1`  
**Authentication:** Bearer token (JWT)  
**Content-Type:** `application/json`  
**Last Updated:** March 2026  

---

## Executive Summary

This document defines the RESTful API interface for the FarmSense platform's two core backend systems:

- **Oracle:** The Spatial Query Engine — map data, satellite imagery, soil textures, elevation
- **Zo:** The Core Compute Engine — irrigation recommendations, predictive models, kriging

---

## AUTHENTICATION

### JWT Token Acquisition

```http
POST /auth/token
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "grant_type": "client_credentials"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:fields write:irrigation"
}
```

### Authentication Headers

All authenticated requests require:
```
Authorization: Bearer <access_token>
X-Request-ID: <uuid>  # For request tracing
```

---

## ORACLE API: SPATIAL QUERY ENGINE

### Base URL: `/oracle`

Oracle provides access to the Map Server (RDC) — the master spatial data library.

---

### Get Field Spatial Profile

Retrieve all geospatial data for a field at a specific coordinate.

```http
GET /oracle/field/{field_id}/spatial-profile
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | float | Yes | Latitude (WGS84) |
| `lon` | float | Yes | Longitude (WGS84) |
| `layers` | string | No | Comma-separated layer IDs (default: all) |

**Response:**
```json
{
  "field_id": "FARM_001_SLV",
  "query_location": {
    "lat": 37.500123,
    "lon": -105.789456,
    "elevation_m": 2341.5
  },
  "layers": {
    "elevation": {
      "value": 2341.5,
      "unit": "meters",
      "source": "USGS_3DEP_1m",
      "resolution": "1m"
    },
    "slope": {
      "value": 2.3,
      "unit": "degrees",
      "aspect": "NE"
    },
    "soil_texture": {
      "dominant_series": "San Luis",
      "classification": "Clay loam",
      "sand_pct": 28,
      "silt_pct": 42,
      "clay_pct": 30,
      "ph": 8.7,
      "ec_ds_m": 1.2
    },
    "ssurgo": {
      "mukey": "1234567",
      "muname": "San Luis loam, 0-2% slopes",
      "drainage_class": "Moderately well drained",
      "awc": 0.15
    },
    "satellite_ndvi": {
      "value": 0.67,
      "date": "2026-03-01",
      "source": "Sentinel-2",
      "cloud_cover_pct": 5
    }
  },
  "requested_at": "2026-03-07T14:30:00Z",
  "oracle_version": "1.4.2"
}
```

---

### Query Soil Properties

Retrieve detailed soil data for irrigation planning.

```http
GET /oracle/soil/query
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `field_id` | string | Yes | Field identifier |
| `depth_cm` | int | No | Soil depth (default: 30) |
| `property` | string | No | Specific property (moisture, texture, ph, ec) |

**Response:**
```json
{
  "field_id": "FARM_001_SLV",
  "query_depth_cm": 30,
  "soil_profile": [
    {
      "depth_range": "0-15cm",
      "texture": "Sandy loam",
      "bulk_density": 1.35,
      "field_capacity": 0.22,
      "wilting_point": 0.08,
      "awc": 0.14,
      "ph": 8.4,
      "ec_ds_m": 0.8
    },
    {
      "depth_range": "15-30cm",
      "texture": "Clay loam",
      "bulk_density": 1.45,
      "field_capacity": 0.35,
      "wilting_point": 0.18,
      "awc": 0.17,
      "ph": 8.9,
      "ec_ds_m": 1.4
    }
  ],
  "recommended_mad_pct": 50,
  "irrigation_strategy": "High-frequency, low-volume for sandy surface layer"
}
```

---

### Get Satellite Imagery

Retrieve NDVI/NDRE imagery tiles for a field.

```http
GET /oracle/satellite/tiles
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `field_id` | string | Yes | Field identifier |
| `start_date` | string | Yes | ISO8601 date |
| `end_date` | string | Yes | ISO8601 date |
| `indices` | string | No | ndvi,ndre (default: ndvi) |
| `resolution` | string | No | 10m, 20m, 60m (default: 10m) |

**Response:**
```json
{
  "field_id": "FARM_001_SLV",
  "date_range": {
    "start": "2026-03-01",
    "end": "2026-03-07"
  },
  "available_scenes": 3,
  "scenes": [
    {
      "date": "2026-03-01",
      "satellite": "Sentinel-2A",
      "cloud_cover_pct": 3,
      "tiles": {
        "ndvi": "https://tiles.farmsense.io/oracle/ndvi/FARM_001_SLV/2026-03-01/{z}/{x}/{y}.png",
        "ndre": "https://tiles.farmsense.io/oracle/ndre/FARM_001_SLV/2026-03-01/{z}/{x}/{y}.png"
      },
      "statistics": {
        "ndvi_mean": 0.64,
        "ndvi_min": 0.12,
        "ndvi_max": 0.89,
        "anomaly_detected": false
      }
    }
  ],
  "tilejson_url": "https://api.farmsense.io/v1/oracle/tilejson/FARM_001_SLV"
}
```

---

### Query Weather Data

Retrieve historical and forecast weather for irrigation scheduling.

```http
GET /oracle/weather/forecast
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `field_id` | string | Yes | Field identifier |
| `days` | int | No | Forecast days (1-14, default: 7) |
| `variables` | string | No | temp,precip,humidity,wind,et,vpd |

**Response:**
```json
{
  "field_id": "FARM_001_SLV",
  "location": {
    "lat": 37.500123,
    "lon": -105.789456,
    "timezone": "America/Denver"
  },
  "forecast_generated": "2026-03-07T06:00:00Z",
  "model": "HRRR+ECMWF_ensemble",
  "daily": [
    {
      "date": "2026-03-07",
      "temp_max_c": 18.5,
      "temp_min_c": 2.1,
      "precip_mm": 0.0,
      "humidity_pct": 45,
      "wind_speed_ms": 3.2,
      "solar_radiation_mj_m2": 18.4,
      "et_mm": 5.2,
      "vpd_kpa": 1.8,
      "precip_probability_pct": 10
    }
  ],
  "et_forecast_7day_mm": 36.4,
  "rain_probability_7day_pct": 30
}
```

---

## ZO API: CORE COMPUTE ENGINE

### Base URL: `/zo`

Zo executes the scientific computation: irrigation recommendations, kriging, predictive models.

---

### Generate Irrigation Worksheet

The core FarmSense operation — generate a field-specific irrigation plan.

```http
POST /zo/irrigation/worksheet
```

**Request Body:**
```json
{
  "field_id": "FARM_001_SLV",
  "pivot_id": "PMT_001",
  "crop_type": "potatoes",
  "growth_stage": "tuber_initiation",
  "worksheet_type": "standard",
  "forecast_days": 7,
  "mad_override_pct": null
}
```

**Response:**
```json
{
  "worksheet_id": "WS_FARM_001_20260307_001",
  "generated_at": "2026-03-07T14:30:00Z",
  "zo_version": "2.1.0",
  "field_context": {
    "field_id": "FARM_001_SLV",
    "crop": "russet_burbank_potatoes",
    "growth_stage": "tuber_initiation",
    "critical_period": true,
    "days_since_planting": 45
  },
  "soil_state": {
    "current_vwc_avg": 0.24,
    "field_capacity": 0.35,
    "wilting_point": 0.18,
    "mad_threshold": 0.265,
    "status": "approaching_mad",
    "days_to_mad": 2.3
  },
  "weather_forecast": {
    "et_7day_mm": 36.4,
    "rain_probability_pct": 30,
    "stress_risk": "moderate"
  },
  "recommendation": {
    "action": "irrigate",
    "urgency": "high",
    "window_start": "2026-03-09T04:00:00Z",
    "window_end": "2026-03-09T10:00:00Z",
    "optimal_start_time": "2026-03-09T05:00:00Z",
    "recommended_duration_hours": 8.5,
    "target_application_mm": 28.5,
    "estimated_volume_af": 8.2,
    "estimated_cost_usd": 4100
  },
  "alternatives": [
    {
      "action": "delay_24h",
      "risk_level": "elevated",
      "conditions": "If rain >10mm materializes",
      "estimated_savings_usd": 4100
    }
  ],
  "confidence": 0.87,
  "explanation": "Field approaching MAD threshold (0.24 vs 0.265). 2-day ET forecast exceeds rainfall probability. Tuber initiation stage requires stress avoidance. Recommend immediate irrigation."
}
```

---

### Execute Kriging Interpolation

Generate high-resolution soil/parameter maps from sparse sensor data.

```http
POST /zo/compute/kriging
```

**Request Body:**
```json
{
  "field_id": "FARM_001_SLV",
  "variable": "soil_moisture_vwc",
  "resolution_m": 1,
  "input_points": [
    {"lat": 37.500123, "lon": -105.789456, "value": 0.28, "source": "LRZ1_001"},
    {"lat": 37.500234, "lon": -105.789567, "value": 0.22, "source": "LRZ2_003"}
  ],
  "variogram_model": "spherical",
  "n_lags": 20,
  "anisotropy": false,
  "satellite_prior": "sentinel_ndvi_2026-03-01"
}
```

**Response:**
```json
{
  "kriging_id": "KG_FARM_001_20260307_001",
  "field_bounds": {
    "bbox": [-105.79, 37.50, -105.78, 37.51],
    "crs": "EPSG:4326"
  },
  "resolution_m": 1,
  "grid_dimensions": {
    "width": 126,
    "height": 110,
    "total_cells": 13860
  },
  "variogram_fit": {
    "model": "spherical",
    "nugget": 0.0012,
    "sill": 0.0085,
    "range_m": 245,
    "r_squared": 0.94
  },
  "output_tiles_url": "https://tiles.farmsense.io/zo/kriging/KG_FARM_001_20260307_001/{z}/{x}/{y}.png",
  "statistics": {
    "mean": 0.245,
    "std": 0.032,
    "min": 0.18,
    "max": 0.31,
    "dry_zones": 3,
    "wet_zones": 2
  },
  "confidence_map_url": "https://tiles.farmsense.io/zo/kriging/KG_FARM_001_20260307_001_confidence/{z}/{x}/{y}.png",
  "anomaly_regions": [
    {
      "region_id": 1,
      "bounds": [[37.5005, -105.789], [37.5007, -105.7888]],
      "mean_vwc": 0.19,
      "status": "below_wilting_point",
      "recommendation": "Immediate spot irrigation or inspect for compaction"
    }
  ]
}
```

---

### Predictive Maintenance Analysis

Analyze pump/motor health from current harmonic signatures.

```http
POST /zo/predictive/maintenance
```

**Request Body:**
```json
{
  "pfa_id": "PFA_001",
  "field_id": "FARM_001_SLV",
  "analysis_window_hours": 168,
  "current_signature": {
    "waveform_samples": [12.4, 12.6, 12.3, ...],  // Array of 10k samples
    "sample_rate_hz": 1000,
    "timestamp_start": "2026-03-01T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "analysis_id": "PM_FARM_001_20260307_001",
  "pfa_id": "PFA_001",
  "pump_health_score": 78,
  "status": "attention_required",
  "anomalies_detected": [
    {
      "type": "cavitation_signature",
      "confidence": 0.82,
      "frequency_band_hz": [120, 240],
      "severity": "moderate",
      "recommended_action": "Check intake screen for debris, verify NPSH"
    },
    {
      "type": "bearing_wear_early",
      "confidence": 0.65,
      "frequency_band_hz": [60, 180],
      "severity": "low",
      "estimated_time_to_failure_days": 90,
      "recommended_action": "Schedule bearing inspection within 60 days"
    }
  ],
  "historical_trend": {
    "health_score_30d_ago": 85,
    "health_score_60d_ago": 88,
    "degradation_rate_per_month": -3.5
  },
  "maintenance_window_recommendation": "2026-04-15 to 2026-04-30 (pre-irrigation season)",
  "estimated_avoided_cost": 15000
}
```

---

### Federated Learning Update (Privacy-Preserving)

Submit model gradients without exposing raw field data.

```http
POST /zo/federated/gradient
```

**Request Body:**
```json
{
  "field_id_hash": "sha256:abc123...",  // Anonymized
  "model_version": "zo-irrigation-v2.1.0",
  "gradient_update": "encrypted_gradient_blob",
  "sample_count": 45,
  "validation_loss": 0.0234,
  "regional_context": "san_luis_valley_subdistrict_1"
}
```

**Response:**
```json
{
  "status": "accepted",
  "aggregation_round": 127,
  "global_model_delta": "received",
  "incentive_credits": 12.5,
  "privacy_guarantee": "epsilon_1.0_dp_applied"
}
```

---

## WEBSOCKET API: REAL-TIME DATA

### Connect to Field Stream

For real-time sensor monitoring and alerts.

```javascript
const ws = new WebSocket('wss://api.farmsense.io/v1/stream/field/FARM_001_SLV');

ws.onopen = () => {
  ws.send(JSON.stringify({
    auth: 'Bearer <token>',
    subscriptions: ['sensors', 'alerts', 'irrigation_events']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time updates
};
```

**Message Types:**

| Type | Payload | Description |
|------|---------|-------------|
| `sensor_update` | `{sensor_id, timestamp, reading, quality}` | New sensor reading |
| `irrigation_start` | `{pivot_id, timestamp, flow_rate, estimated_duration}` | Pivot started moving |
| `irrigation_end` | `{pivot_id, timestamp, total_volume_af, efficiency_score}` | Pivot completed pass |
| `alert` | `{severity, type, message, recommended_action}` | System alert |
| `worksheet_generated` | `{worksheet_id, timestamp, summary}` | New recommendation available |

---

## ERROR HANDLING

### HTTP Status Codes

| Code | Meaning | Retry Strategy |
|------|---------|----------------|
| 200 | Success | N/A |
| 400 | Bad Request | Check request body, don't retry |
| 401 | Unauthorized | Refresh token, retry once |
| 403 | Forbidden | Check permissions, don't retry |
| 404 | Not Found | Check field_id, don't retry |
| 422 | Validation Error | Check parameters, don't retry |
| 429 | Rate Limited | Exponential backoff |
| 500 | Server Error | Retry with backoff |
| 503 | Service Unavailable | Retry with backoff |

### Error Response Format

```json
{
  "error": {
    "code": "FIELD_NOT_FOUND",
    "message": "Field FARM_999_SLV does not exist or you lack access",
    "request_id": "req_abc123",
    "timestamp": "2026-03-07T14:30:00Z",
    "documentation_url": "https://docs.farmsense.io/errors/FIELD_NOT_FOUND"
  }
}
```

---

## RATE LIMITING

| Endpoint Type | Requests/Min | Burst |
|---------------|--------------|-------|
| Oracle (read) | 1000 | 100 |
| Zo (compute) | 100 | 20 |
| WebSocket | 1 connection/field | N/A |

**Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1646670000
```

---

## SDK & CLIENT LIBRARIES

| Language | Package | Installation |
|----------|---------|--------------|
| Python | `farmsense-python` | `pip install farmsense` |
| JavaScript | `farmsense-js` | `npm install @farmsense/api` |
| Go | `farmsense-go` | `go get github.com/farmsense/go-sdk` |
| Rust | `farmsense-rs` | `cargo add farmsense` |

### Python SDK Example

```python
from farmsense import FarmSenseClient

client = FarmSenseClient(api_key="your_key")

# Get irrigation recommendation
worksheet = client.zo.generate_worksheet(
    field_id="FARM_001_SLV",
    crop_type="potatoes",
    growth_stage="tuber_initiation"
)

print(f"Recommend: {worksheet.recommendation.action}")
print(f"Optimal start: {worksheet.recommendation.optimal_start_time}")

# Subscribe to real-time alerts
@client.on_alert
def handle_alert(alert):
    if alert.severity == "critical":
        send_sms(farmer_phone, alert.message)

client.stream.connect(field_id="FARM_001_SLV")
```

---

## REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | Zo (AI) | Initial API specification for Oracle spatial engine and Zo compute engine |

---

*This API enables developers, agronomists, and integrators to build on the FarmSense platform — from custom dashboards to automated irrigation systems to third-party compliance tools.*
