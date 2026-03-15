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

### Additional API Endpoints (Complete Specification)

**POST /v1/compliance/report (Generate Water Court Package)**

Request:
```
{
  "field_ids": ["uuid1", "uuid2", ...],
  "start_date": "2026-03-01",
  "end_date": "2026-06-30",
  "format": "dwl",  // "dwl", "pdf", "csv"
  "include_kriging": true,
  "include_raw": false
}
```

Response (202 Accepted, async processing):
```
{
  "job_id": "job-uuid",
  "status": "processing",
  "estimated_completion": "2026-03-10T15:00:00Z",
  "callback_url": "https://api.farmsense.io/v1/jobs/job-uuid"
}
```

**GET /v1/analytics/water-balance (Field Water Accounting)**

Response:
```
{
  "field_id": "uuid",
  "period": {
    "start": "2026-03-01",
    "end": "2026-06-30"
  },
  "water_balance": {
    "precipitation_mm": 145.2,
    "irrigation_mm": 320.5,
    "et_mm": 412.8,
    "deep_percolation_mm": 28.4,
    "runoff_mm": 12.5,
    "soil_moisture_change_mm": 12.0
  },
  "confidence": 0.94,
  "methodology": "FAO-56 with ground-truth calibration"
}
```

**POST /v1/irrigation/schedule (Create Optimized Schedule)**

Request:
```
{
  "field_id": "uuid",
  "target_mad": 0.50,
  "forecast_horizon_hours": 72,
  "constraints": {
    "max_duration_minutes": 180,
    "avoid_peak_hours": true,
    "energy_cost_per_kwh": 0.12
  }
}
```

Response:
```
{
  "schedule_id": "sched-uuid",
  "recommendations": [
    {
      "start_time": "2026-03-11T02:00:00Z",
      "duration_minutes": 127,
      "expected_vwc_increase": 0.08,
      "energy_cost": 23.45,
      "confidence": 0.91
    }
  ],
  "total_water_mm": 26.4,
  "total_cost": 23.45
}
```

**WebSocket /v1/stream/alerts (Real-Time Alert Feed)**

Messages:
```
{
  "type": "alert",
  "severity": "warning",  // "info", "warning", "critical"
  "field_id": "uuid",
  "device_id": "pmt-uuid",
  "timestamp": "2026-03-10T14:35:00Z",
  "code": "LOW_BATTERY",
  "message": "PMT battery voltage 3.15V, replacement recommended within 30 days",
  "recommended_action": "Schedule maintenance visit"
}
```

---

### Financial Model Detail (10-Year Projection Tables)

**Year-by-Year Revenue Buildup:**

| Year | Fields | Base | Plus | Enterprise | Total ARR |
|------|--------|------|------|------------|-----------|
| 1 | 2 (pilot) | 0 | 0 | 2 | $11,976 |
| 2 | 1,280 | 256 | 512 | 512 | $5,360,640 |
| 3 | 3,500 | 700 | 1,400 | 1,400 | $14,658,000 |
| 4 | 7,000 | 1,400 | 2,800 | 2,800 | $29,316,000 |
| 5 | 15,000 | 3,000 | 6,000 | 6,000 | $62,820,000 |
| 6 | 30,000 | 6,000 | 12,000 | 12,000 | $125,640,000 |
| 7 | 50,000 | 10,000 | 20,000 | 20,000 | $209,400,000 |
| 8 | 75,000 | 15,000 | 30,000 | 30,000 | $314,100,000 |
| 9 | 100,000 | 20,000 | 40,000 | 40,000 | $418,800,000 |
| 10 | 125,000 | 25,000 | 50,000 | 50,000 | $523,500,000 |

**Operating Expense Detail (Year 5 Example):**

| Category | Amount | % of Revenue |
|----------|--------|--------------|
| Hardware COGS (replacement) | $12,564,000 | 20.0% |
| Field Operations (techs, vehicles) | $9,423,000 | 15.0% |
| Cloud Infrastructure | $3,141,000 | 5.0% |
| R&D (ongoing development) | $6,282,000 | 10.0% |
| Sales & Marketing | $6,282,000 | 10.0% |
| G&A | $3,141,000 | 5.0% |
| **Total OPEX** | **$40,833,000** | **65.0%** |
| **EBITDA** | **$21,987,000** | **35.0%** |

**Customer Acquisition Economics:**

| Metric | Value |
|--------|-------|
| CAC (Customer Acquisition Cost) | $2,400 |
| LTV (Lifetime Value, 7-year) | $35,280 |
| LTV/CAC Ratio | 14.7x |
| Payback Period | 4.8 months |
| Annual Churn (expected) | 3% |
| Expansion Revenue (% of base) | 15% |
| Net Revenue Retention | 112% |

**Funding Rounds Projection:**

| Round | Date | Amount | Valuation | Use of Funds |
|-------|------|--------|-----------|--------------|
| Seed | Q1 2026 | $2M | $10M | Pilot completion, team build |
| Series A | Q1 2027 | $15M | $60M | Subdistrict 1 scale |
| Series B | Q1 2028 | $50M | $250M | Multi-state expansion |
| Series C | Q2 2029 | $100M | $600M | National + international |
| IPO/Exit | 2030 | - | $1-2B | Public or strategic |

---

### Grant Application Detail (Sample USDA SBIR Phase I)

**Project Title:** "Low-Cost Distributed Soil Sensing for Precision Agriculture Water Management"

**Technical Approach (Excerpt):**

Phase I Objectives:

1. Validate $54.30 LRZ2 sensor accuracy vs. $500 laboratory-standard probes
2. Demonstrate 4-year battery life in field conditions
3. Achieve <5% MAPE kriging accuracy with 16-node field density

Innovation: Novel capacitive dielectric measurement through molded HDPE wall, eliminating corrosion and enabling 10-year field lifespan.

**Commercialization Plan:**

Market Entry: SLV Subdistrict 1 (1,280 fields, captive market due to $500/AF pumping fees)

Go-to-Market:

- Year 1-2: Direct sales to early adopters (CSU validation)
- Year 3-5: NRCS Conservation Innovation Grants fund 50% farmer cost
- Year 5+: Channel partnerships with irrigation dealers

**Team Qualifications:**

- PI: [CSU hydrology PhD, 20 years SLV research]
- Hardware Lead: [20 years RF/embedded, AgTech background]
- Commercialization: [Jeremy Beebe, proven AgTech exit]

**Budget Detail ($300,000):**

| Category | Amount |
|----------|--------|
| Personnel (PI, RA, tech) | $180,000 |
| Equipment (sensors, test fixtures) | $45,000 |
| Travel (field sites, conferences) | $15,000 |
| Indirect (20%) | $48,000 |
| Fee (7%) | $12,000 |
| **Total** | **$300,000** |

**Milestones:**

| Month | Deliverable |
|-------|-------------|
| 3 | 50 LRZ2 prototypes fabricated |
| 6 | Field deployment at 3 SLV farms |
| 9 | Accuracy validation complete |
| 12 | Final report, Phase II proposal |

---

### Security Implementation Detail

**mTLS Configuration:**

Field Device Certificates:

- Issuer: FarmSense Private CA (offline root, online intermediate)
- Key type: ECDSA P-256
- Validity: 2 years with auto-renewal
- SAN: Device UUID, MAC address
- Chain: Device → Intermediate CA → Root CA (embedded)

Service Mesh (Istio):

- Strict mTLS: All pod-to-pod communication
- Certificate rotation: 24 hours before expiry
- Revocation: OCSP stapling, CRL distribution

**Field Device Security:**

Boot Sequence:

1. Secure boot: Signed firmware only (ECDSA verification)
2. Key derivation: Hardware PUF (Physical Unclonable Function)
3. Certificate provisioning: JIT during manufacturing
4. Network join: Mutual auth with DHU gateway

Runtime Protections:

- JTAG disabled (fuse-blown)
- Debug UART: Requires physical access + password
- Firmware updates: Signed, encrypted, rollback-protected
- Side-channel resistance: Constant-time crypto implementations

**Key Management:**

| Key Type | Storage | Rotation |
|----------|---------|----------|
| Device private key | nRF5340 ARM TrustZone | Never (PUF-derived) |
| Session keys | RAM only (ephemeral) | Per session |
| Database encryption | AWS KMS + HSM | Quarterly |
| Backup keys | Offline HSM (bank vault) | Annually |

**Incident Response Plan:**

| Severity | Example | Response Time | Action |
|----------|---------|---------------|--------|
| Critical | Unauthorized device join | 15 minutes | Revoke certificate, isolate |
| High | Unusual data exfiltration | 1 hour | Investigate, capture packets |
| Medium | Failed auth attempts | 24 hours | Review logs, alert owner |
| Low | Scanning detected | 72 hours | Monitor, document |

---

### Case Study: Detailed Event Log (Week 12 Breach Detection)

**Event Timeline:**

June 15, 2026 (all times MDT):

| Time | Event | Source | Data |
|------|-------|--------|------|
| 02:34:15 | Normal chirp | VFA-12 | VWC stable, all zones |
| 03:00:00 | Scheduled pump start | PFA-1 | Flow: 850 GPM, pressure: 42 PSI |
| 03:47:23 | Flow spike detected | PFA-1 | Flow: 1,247 GPM (+47%) |
| 03:47:24 | Cavitation signature | PFA-1 (FFT) | 3rd harmonic: 18% (threshold: 15%) |
| 03:47:24 | **Reflex Halt triggered** | PFA-1 | Pump stopped |
| 03:47:26 | Alert sent to DHU | PFA-1 | Priority: CRITICAL |
| 03:47:30 | Alert forwarded to farmer | DHU → SMS | "Possible breach detected, pump halted" |
| 03:48:15 | Farmer on-site | Visual | Sinkhole forming near wellhead |
| 04:15:00 | Repair crew dispatched | Farmer | Excavator, pipe crew |
| 08:30:00 | Repair complete | Crew | Broken coupling replaced |
| 09:00:00 | System restart | PFA-1 | Flow: 850 GPM, normal pressure |

**Water Saved Calculation:**

Without detection:

- Duration until farmer's morning check: ~6 hours (09:00 - 03:00)
- Excess flow: 397 GPM above baseline
- Water lost: 397 GPM × 360 min = 143,000 gallons = 0.44 AF
- Cost at $500/AF: $220

With FarmSense detection:

- Detection to halt: 1 second
- Water lost: 397 GPM × 0.017 min = 6.7 gallons = negligible
- Cost: $0

**Net savings in single event: $220**

**Annual projection:** 3-5 similar events per field = $660-$1,100 saved

---

### Complete Nomenclature Glossary

**Acronyms (Alphabetical):**

| Acronym | Full Term | Definition |
|---------|-----------|------------|
| ADR | Adaptive Data Rate | LoRa SF adjustment algorithm |
| AES | Advanced Encryption Standard | Symmetric encryption (128/256-bit) |
| AF | Acre-Foot | Volume: 1 acre × 1 foot deep = 325,851 gallons |
| BNO | Bosch Nucleo Output | IMU product line |
| BOM | Bill of Materials | Component cost list |
| CA | Certificate Authority | Digital certificate issuer |
| CAPEX | Capital Expenditure | Upfront hardware investment |
| CSS | Chirp Spread Spectrum | LoRa modulation technique |
| CT | Current Transformer | Non-invasive current measurement |
| CWT | Hundredweight | 100 lbs (crop yield unit) |
| DHU | District Hub | Level 2 regional coordinator |
| DIL | Data Integration Layer | Spatial query engine |
| EC | Electrical Conductivity | Soil salinity indicator (dS/m) |
| EBK | Empirical Bayesian Kriging | Geostatistical interpolation method |
| ESP | Espressif Systems | MCU manufacturer (ESP32) |
| ET | Evapotranspiration | Combined evaporation + transpiration |
| ET₀ | Reference ET | Standardized grass reference |
| FAO | Food and Agriculture Organization | UN agency |
| FAT | Factory Acceptance Test | Pre-shipment quality check |
| FFT | Fast Fourier Transform | Frequency analysis algorithm |
| FRI | Field Roughness Index | Spatial variability metric |
| GNSS | Global Navigation Satellite System | GPS + GLONASS + Galileo + BeiDou |
| GPIO | General Purpose Input/Output | MCU pin control |
| GPS | Global Positioning System | US satellite constellation |
| GPU | Graphics Processing Unit | Parallel computation hardware |
| HDPE | High-Density Polyethylene | Plastic material (shells) |
| HPC | Hybrid Pulse Capacitor | Burst current supply |
| HVAC | Heating, Ventilation, Air Conditioning | Climate control |
| IMU | Inertial Measurement Unit | Accelerometer + gyroscope + magnetometer |
| IP | Ingress Protection | Enclosure sealing rating |
| IP67 | Protection rating | Dust-tight, immersion to 1m |
| ISM | Industrial, Scientific, Medical | Unlicensed frequency bands |
| JIT | Just-In-Time | Manufacturing/delivery timing |
| JSON | JavaScript Object Notation | Data interchange format |
| Kriging | Geostatistical method | Optimal spatial interpolation |
| LNA | Low Noise Amplifier | RF front-end component |
| LoRa | Long Range | Low-power wide-area radio |
| LoRaWAN | LoRa Wide Area Network | Network protocol layer |
| LRZ1 | Lateral Root-Zone Basic | Entry-level spatial scout |
| LRZ2 | Lateral Root-Zone Reference | Advanced spatial scout |
| LTE | Long-Term Evolution | Cellular standard (4G) |
| LTE-M | LTE for Machines | IoT-optimized cellular |
| MAD | Management Allowable Depletion | Irrigation scheduling threshold |
| MAPE | Mean Absolute Percentage Error | Accuracy metric |
| MCU | Microcontroller Unit | Embedded processor |
| MPPT | Maximum Power Point Tracking | Solar optimization |
| MRV | Measurement, Reporting, Verification | Carbon accounting |
| NEMA | National Electrical Manufacturers Association | Enclosure standard |
| NREP | Non-Repudiable Evidence Prime | Legal admissibility standard |
| NRR | Net Revenue Retention | SaaS metric |
| NVMe | Non-Volatile Memory Express | SSD interface |
| OPEX | Operating Expenditure | Ongoing costs |
| PBFT | Practical Byzantine Fault Tolerance | Consensus algorithm |
| PCBA | Printed Circuit Board Assembly | Electronics module |
| PFA | Pressure & Flow Anchor | Wellhead safety device |
| PMT | Pivot Motion Tracker | **Field aggregator hub** |
| PUF | Physical Unclonable Function | Hardware security primitive |
| RAM | Random Access Memory | Volatile working memory |
| RBAC | Role-Based Access Control | Permission system |
| RF | Radio Frequency | Electromagnetic spectrum |
| RGWCD | Rio Grande Water Conservation District | Local regulatory |
| ROM | Read-Only Memory | Non-volatile storage |
| RPoD | Resilience Point of Delivery | Recovery target |
| RSS | Regional Superstation | Level 3 master node |
| RTK | Real-Time Kinematic | Centimeter-accurate GPS |
| SAT | Site Acceptance Test | Post-installation verification |
| SDI-12 | Serial Digital Interface at 1200 baud | Sensor standard |
| SLV | San Luis Valley | Colorado geographic region |
| SMA | SubMiniature version A | RF connector type |
| SOM | Serviceable Obtainable Market | Addressable market segment |
| SOP | Standard Operating Procedure | Documented workflow |
| SPAC | Soil-Plant-Atmosphere Continuum | Integrated system model |
| SPI | Serial Peripheral Interface | MCU communication bus |
| SQL | Structured Query Language | Database language |
| SS | Stainless Steel | Corrosion-resistant metal |
| TAM | Total Addressable Market | Entire market size |
| TDD | Time Division Duplexing | RF communication method |
| TFX | Transit-Time Flow X | Badger meter model |
| U-blox | Swiss GNSS company | GPS receiver manufacturer |
| UART | Universal Asynchronous Receiver-Transmitter | Serial communication |
| UFI | Unified Freshwater Index | Proprietary water metric |
| USB | Universal Serial Bus | Standard interface |
| UV | Ultraviolet | Solar radiation component |
| VFA | Vertical Field Anchor | Deep soil sensor |
| VPD | Vapor Pressure Deficit | Atmospheric moisture demand |
| VPN | Virtual Private Network | Secure tunnel |
| VRI | Variable Rate Irrigation | Precision water application |
| VWC | Volumetric Water Content | % soil volume water |
| WORM | Write Once Read Many | Immutable storage |
| Zo | Core Compute Server | FarmSense cloud brain |
