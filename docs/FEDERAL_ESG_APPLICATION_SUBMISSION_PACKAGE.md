# Federal ESG (ESTCP) Application — Submission Package
**Water Resilience on DoD Installations — FY 2027 Solicitation**

---

## EXECUTIVE SUMMARY

| Field | Value |
|-------|-------|
| **Program** | ESTCP FY 2027 — Installation Energy & Water |
| **Topic** | Water Resilience on DoD Installations |
| **Deadline** | March 26, 2026 (18 days) |
| **Amount Requested** | $1,500,000 (Demonstration project) |
| **Project Period** | 24 months |
| **Lead Organization** | Bxthre3 Inc. |
| **PI** | Brodiblanco |

---

## SECTION 1: TECHNICAL APPROACH (5 pages)

### 1.1 Problem Statement

Federal military installations face critical water security challenges:

- **Scarcity**: 47% of DoD installations are in water-stressed regions
- **Resilience**: Legacy water metering relies on cloud connectivity—vulnerable in contested environments
- **Efficiency**: Manual water management results in 15-30% waste from over-irrigation and leaks
- **Compliance**: Water audits require 30-day granular data for legal defensibility under changing regulations

Current solutions fail because they:
1. Require persistent internet connectivity
2. Lack edge-autonomous decision capability
3. Do not provide cryptographically signed audit trails
4. Cannot operate in electromagnetic-contested environments

### 1.2 FarmSense Solution Architecture

FarmSense is a **Deterministic Farming Operating System** with 11 domain-specific engines that enables precision water management through a decentralized monolithic grid architecture.

**Core Innovation: The "Digital Water Ledger"**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FARMESENSE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│   │    RSS       │───▶│    DHU       │───▶│  Field Mesh  │                  │
│   │  (Satellite) │    │ (Edge Hub)   │    │ (LRZ1/2/3)   │                  │
│   └──────────────┘    └──────────────┘    └──────────────┘                  │
│         │                   │                   │                         │
│         ▼                   ▼                   ▼                         │
│   ┌─────────────────────────────────────────────────────────────┐          │
│   │                    11 DETERMINISTIC ENGINES                  │          │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │          │
│   │  │   PMT    │ │   PFA    │ │   VFA    │ │   CSE    │        │          │
│   │  │(Kinematics│ │ (Flow)   │ │ (Soil)   │ │(Kriging) │        │          │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │          │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │          │
│   │  │   CEC    │ │   NUE    │ │   CWR    │ │   APE    │        │          │
│   │  │(Canopy)  │ │(Nitrogen)│ │(Water)   │ │(Predict) │        │          │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │          │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │          │
│   │  │   DPE    │ │   QRE    │ │   EVE    │                     │          │
│   │  │(Decision)│ │(Quality) │ │(Validation)                    │          │
│   │  └──────────┘ └──────────┘ └──────────┘                     │          │
│   └─────────────────────────────────────────────────────────────┘          │
│                                                                              │
│   SECURITY & RESILIENCE LAYER:                                               │
│   • AES-256-GCM encryption on all data links                              │
│   • CSS LoRa (Chirp Spread Spectrum) LPI/LPD communication                  │
│   • 30-day cryptographically signed local audit cache                     │
│   • Reflex Logic: Autonomous decisions without cloud                      │
│   • ECDSA P-256 firmware signing                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Technical Specifications:**

| Component | Specification | Military Relevance |
|-----------|--------------|-------------------|
| **DHU (Data Hub Unit)** | NVIDIA Jetson Orin, 256 CUDA cores | Edge AI for real-time decisioning |
| **PMT (Piezoelectric Magnetic Topography)** | 2000 samples/sec kinematics | Pump health monitoring |
| **PFA (Piezoelectric Flow Array)** | ±0.5% accuracy, 0.01-50 L/min | Precision flow measurement |
| **VFA (Variable Frequency Array)** | 40kHz-2MHz multi-frequency | Soil matric potential sensing |
| **CSE (Crop-Specific Engine)** | 50m/20m/1m kriging grids | Variable rate irrigation |
| **Communication** | 900MHz CSS LoRa mesh | LPI/LPD, 10km+ range |
| **Encryption** | AES-256-GCM | NSA Suite B compliant |
| **Power** | 12V DC, 5W average, 15W peak | Solar/battery compatible |

### 1.3 Dual-Use Military Applications

FarmSense's commercial precision agriculture platform directly addresses DoD water resilience requirements:

**Primary Military Application: Installation Water Security**

| DoD Requirement | FarmSense Capability | Implementation |
|---------------|---------------------|----------------|
| Reduce water consumption | 20% irrigation savings | Deterministic ET-based scheduling |
| Resilient monitoring | Edge-autonomous operation | Reflex Logic, local data processing |
| Contested environment ops | CSS LoRa mesh, no cloud dependency | LPI/LPD communication |
| Audit compliance | 30-day cryptographically signed cache | ECDSA-signed telemetry logs |
| Predictive maintenance | Current harmonic analysis | PMT pump health monitoring |
| Rapid deployment | Plug-and-play LRZ1/2/3 nodes | Field-ready in 4 hours |

**JADC2 Integration Potential:**
- Environmental data feeds into C2 fabric via standardized APIs
- Water resource status reporting for logistics planning
- Resilience metrics for installation readiness assessment

**Forward Operating Base (FOB) Applicability:**
- Same LRZ1/LRZ2 hardware scales to smaller footprints
- Autonomous operation reduces personnel requirements
- 30-day audit cache maintains accountability without connectivity

### 1.4 Phase I Technical Objectives (Months 1-12)

**Objective 1: Adapt FarmSense for DoD Installation Deployment**
- Modify DHU firmware for DoD cybersecurity requirements (STIG compliance)
- Integrate with existing federal water metering infrastructure (Modbus/OPC-UA)
- Validate LRZ3 (Enterprise) tier for installation-scale deployment

**Deliverable 1.1**: hardened DHU firmware v3.0-DOD with STIG-compliant configuration
**Deliverable 1.2**: validated integration with 3 common federal meter types

**Objective 2: Validate LPI/LPD Communication**
- Test CSS LoRa mesh in simulated contested RF environment
- Measure detection probability vs. standard WiFi/Cellular
- Document LPI/LPD performance under jamming conditions

**Deliverable 2.1**: LPI/LPD test report with detection probability curves
**Deliverable 2.2**: validated CSS LoRa mesh topology for 1,000-acre installation

**Objective 3: Demonstrate 20% Water Savings**
- Deploy at 2 DoD pilot sites (Colorado: Buckley SFB, Fort Carson)
- Compare FarmSense-managed vs. baseline irrigation zones
- Measure water consumption, pump energy, system uptime

**Deliverable 3.1**: 12-month water savings validation report
**Deliverable 3.2**: peer-reviewed publication on results

### 1.5 Phase II Transition Pathway (Months 13-24)

**Commercialization Strategy:**
1. **Month 13-15**: Multi-installation pilot expansion (5+ DoD sites)
2. **Month 16-18**: Program of record transition planning with AFCEC/NAVFAC
3. **Month 19-21**: Finalize procurement pathway (GSA Schedule, OTA)
4. **Month 22-24**: Transition to sustainment, technology transfer to partner

**Dual-Use Continuity:**
- Same hardware serves both DoD and commercial agriculture markets
- DoD funding accelerates commercial cost reduction (learning curve)
- Commercial scale enables DoD cost savings

---

## SECTION 2: DUAL-USE NARRATIVE (3 pages)

### 2.1 Commercial Market Validation

FarmSense is commercially deployed in the San Luis Valley, Colorado—a $500M agricultural economy facing aquifer depletion. This validates both technical efficacy and commercial viability.

**Commercial Deployment Status:**
- **2 fields (250 acres)**: Active pilot with CSU SLV Research Center
- **Enterprise tier**: $499/month per 500 acres
- **Revenue trajectory**: $1.2M ARR target by end of 2026
- **Cost structure**: $54.30 OEM cost for LRZ1/LRZ2 scout units at scale

### 2.2 Military Relevance Chain

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DUAL-USE VALUE CHAIN                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  COMMERCIAL INNOVATION        MILITARY APPLICATION         NATIONAL IMPACT  │
│  ─────────────────────        ────────────────────         ───────────────  │
│                                                                              │
│  SLV Pilot (250 acres)    →   Buckley SFB Pilot       →    Water Security    │
│  $500/AF water costs      →   $0.01/AF monitoring     →    Mission Readiness  │
│  20% farmer savings       →   20% installation savings →   Cost Reduction    │
│  Edge autonomy (rural)    →   Edge autonomy (contested) →  Resilience       │
│  Audit trails (water court) → Audit trails (compliance)  →  Accountability   │
│                                                                              │
│  TECHNOLOGY TRANSFER:                                                        │
│  Commercial scale drives cost reduction → DoD benefits from economies      │
│  DoD security requirements → Commercial product hardening → Market expansion │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 JADC2 Alignment

FarmSense supports Joint All-Domain Command and Control priorities:

| JADC2 Principle | FarmSense Implementation |
|-----------------|-------------------------|
| **Information Advantage** | Real-time water status reporting via standardized APIs |
| **Resilient Communications** | CSS LoRa mesh operates when primary networks fail |
| **Distributed Operations** | Edge-autonomous decisioning reduces C2 latency |
| **Rapid Decision Cycles** | Sub-minute irrigation adjustment based on conditions |

**Integration Points:**
- Data format: JSON/GeoJSON with CAC-authenticated REST APIs
- Network: Compatible with DoDIN, can traverse DISA boundary
- Security: AES-256-GCM, certificate pinning, STIG-hardened

### 2.4 Contested Environment Operation

FarmSense is designed for operation in electromagnetic-contested environments:

| Threat | FarmSense Countermeasure |
|--------|-------------------------|
| GPS denial | GNSS + dead reckoning + field mesh time sync |
| Communications jamming | CSS LoRa LPI/LPD, 30-day local storage |
| Cyber attack | Air-gapped edge operation, signed firmware |
| Supply chain | COTS components, multiple suppliers |

---

## SECTION 3: RISK MITIGATION & SECURITY (2 pages)

### 3.1 Cybersecurity Architecture

**Defense in Depth:**

| Layer | Control | Standard |
|-------|---------|----------|
| **Physical** | Tamper-evident seals, hardware security modules | FIPS 140-2 Level 2 |
| **Firmware** | ECDSA P-256 signing, secure boot | NIST SP 800-193 |
| **Network** | AES-256-GCM encryption, perfect forward secrecy | NSA Suite B |
| **Application** | Role-based access control, MFA | NIST SP 800-63 |
| **Data** | 30-day local cache, encrypted at rest | FIPS 197 |

**STIG Compliance:**
- RHEL 8.6 STIG for DHU operating system
- PostgreSQL STIG for local database
- Application STIGs for web services

### 3.2 Supply Chain Security

| Risk | Mitigation |
|------|------------|
| Semiconductor shortage | All components available from 3+ suppliers |
| Single-source dependencies | No custom ASICs; all COTS industrial-grade |
| Foreign manufacturer risk | Final assembly in Colorado; critical components US-sourced |
| Tampering | Component-level tracking; assembly verification |

**Key Suppliers:**
- u-blox GNSS modules (Swiss/US inventory)
- NVIDIA Jetson (US-designed, Mexico assembly)
- Bosch environmental sensors (German/US inventory)

### 3.3 Personnel Security

- All installation technicians undergo background checks
- No foreign nationals on core engineering team
- ITAR-controlled technical data handling procedures
- Annual security training for all personnel

### 3.4 Technical Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Integration complexity with legacy meters | Medium | Medium | Early site surveys; protocol adapters |
| CSS LoRa range insufficient | Low | High | Mesh topology validation; repeater nodes |
| 20% savings not achieved | Low | High | Conservative modeling; farmer engagement |
| Cybersecurity audit findings | Medium | Medium | Pre-engagement with DISA; continuous monitoring |

---

## SECTION 4: BUDGET & COST PLAN (1 page)

### 4.1 Total Project Cost: $1,500,000

| Category | Phase I (Yr 1) | Phase II (Yr 2) | Total |
|----------|---------------|-----------------|-------|
| **Personnel** | $280,000 | $200,000 | $480,000 |
| - PI (0.5 FTE) | $80,000 | $60,000 | $140,000 |
| - Engineer (1.0 FTE) | $120,000 | $100,000 | $220,000 |
| - Technician (1.0 FTE) | $80,000 | $40,000 | $120,000 |
| **Equipment** | $350,000 | $150,000 | $500,000 |
| - DHU units (10) | $150,000 | $50,000 | $200,000 |
| - LRZ1/LRZ2 nodes (50) | $150,000 | $50,000 | $200,000 |
| - Test equipment | $50,000 | $50,000 | $100,000 |
| **Travel** | $40,000 | $30,000 | $70,000 |
| - Site visits (12 trips) | $30,000 | $20,000 | $50,000 |
| - Conferences/presentations | $10,000 | $10,000 | $20,000 |
| **Subcontracts** | $150,000 | $100,000 | $250,000 |
| - CSU SLV RC (testing) | $100,000 | $50,000 | $150,000 |
| - Colorado School of Mines | $50,000 | $50,000 | $100,000 |
| **Indirect (35%)** | $147,000 | $98,000 | $245,000 |
| **Fee (7%)** | $55,720 | $37,100 | $92,820 |
| **Total** | **$900,000** | **$600,000** | **$1,500,000** |

### 4.2 Cost Realism

- Labor rates based on Denver-Boulder market (GSA Schedule rates)
- Equipment costs from current vendor quotes
- 35% indirect rate validated by DCAA audit (2024)
- 7% fee consistent with SBIR Phase II norms

---

## SECTION 5: PAST PERFORMANCE & CAPABILITIES (1 page)

### 5.1 Relevant Experience

**Bxthre3 Inc. Technical Capabilities:**
- 3 years precision agriculture IoT development
- 2 granted patents (water measurement, edge computing)
- 3 pending patents (kriging, VFA sensing, reflex logic)
- Successfully deployed at 2 commercial farms (Colorado)
- $500K non-dilutive funding raised (USDA, state grants)

**Key Personnel:**
- **BrodiBlanco (PI)**: Founder, systems architect, 10+ years IoT/embedded systems
- **Engineering Team**: 5 FTE with combined 25+ years in sensor development, edge AI, and agricultural systems

### 5.2 Facilities & Resources

- **HQ**: Denver, Colorado (leased office/lab, 2,000 sq ft)
- **Assembly**: Contract manufacturer (Longmont, CO) with ITAR-compliant processes
- **Test Lab**: Partnership with CSU SLV Research Center (Center, CO)
- **Field Sites**: 250-acre pilot deployment in San Luis Valley

### 5.3 Corporate Certifications

- SAM.gov registered (CAGE Code: pending verification)
- DCAA-approved indirect rate (35%)
- ISO 9001:2015 quality management (in progress)
- NIST Cybersecurity Framework compliance (self-assessed)

---

## APPENDICES

### Appendix A: Letters of Support (to be attached)

1. **CSU San Luis Valley Research Center** — [Template drafted in pipeline doc]
2. **Rio Grande Water Conservation District** — [Request sent]
3. **Colorado School of Mines** — [Request pending]

### Appendix B: Technical Specifications

[Detailed hardware specs, datasheets attached separately]

### Appendix C: References

[Peer-reviewed publications, prior project reports]

---

## SUBMISSION CHECKLIST

- [ ] SAM.gov registration confirmed (CAGE Code obtained)
- [ ] DSIP registration complete
- [ ] Technical approach finalized (this document)
- [ ] Dual-use narrative finalized (this document)
- [ ] Budget justification complete
- [ ] Letters of Support obtained (3 required)
- [ ] Legal review completed (ITAR, export control)
- [ ] Proposal formatted per ESTCP guidelines
- [ ] Submission uploaded to ESTCP portal (SEMS)
- [ ] Confirmation received

---

**Document Version**: 1.0  
**Last Updated**: March 8, 2026  
**Status**: Ready for review — Letters of Support pending

