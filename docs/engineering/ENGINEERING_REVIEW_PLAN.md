# FarmSense Engineering Review Plan
**Antigravity IDE Protocol | Pre-Pilot Deployment Verification**

**Version:** 1.0  
**Scope:** Network Architecture, Hardware BOM, Protocol Standardization  
**Timeline:** 2-3 Engineering Sprints (Post-ESTCP, Pre-CSU Pilot)  
**Owner:** Lead Hardware Engineer + RF Systems Architect  

---

## 🎯 REVIEW OBJECTIVES

| Priority | Objective | Success Criteria |
|----------|-----------|----------------|
| **P0** | Resolve PMT receiver protocol conflict | Single, validated radio spec for PMT |
| **P0** | Standardize PMT→DHU backhaul | One primary + one failover protocol |
| **P1** | Harmonize field mesh terminology | All docs use consistent protocol naming |
| **P1** | Validate BOM against specs | Every component in BOM matches spec claim |
| **P2** | RF interference analysis | 5GHz LTU + 900MHz LoRa coexistence proven |

---

## 📋 PHASE 1: PROTOCOL ARCHITECTURE LOCK (Week 1)

### Task 1.1: PMT Receiver Protocol Decision
**Owner:** RF Systems Architect  
**Deliverable:** Engineering Decision Record (EDR-001)

**Decision Matrix:**

| Criteria | nRF52840 (FHSS) | SX1262 (LoRa) | Winner |
|----------|-----------------|---------------|--------|
| **Compatibility with LRZ** | ❌ Different protocol | ✅ Native LoRa match | SX1262 |
| **Power Consumption** | ✅ Lower (1.5µA sleep) | ⚠️ Higher (not specified) | nRF52840 |
| **Range (Dense Canopy)** | ⚠️ Unproven at scale | ✅ 100% penetration claim | SX1262 |
| **BOM Cost** | $6.50 | $4.00 (integrated) | SX1262 |
| **Supplier Lead Time** | 8 weeks | 6 weeks | SX1262 |

**Recommended Decision:** Standardize on **SX1262** for PMT receiver to maintain LoRa mesh compatibility with field sensors.

**Action Items:**
- [ ] Update PMT spec V1.6 to remove nRF52840 references
- [ ] Update PMT BOM to specify SX1262 (not nRF52840)
- [ ] Verify SX1262 can achieve required 100% canopy penetration
- [ ] Update firmware spec to reflect Semtech SX1262 register map

---

### Task 1.2: PMT→DHU Backhaul Standardization
**Owner:** Network Systems Engineer  
**Deliverable:** Network Architecture Diagram v2.0 + EDR-002

**Current State (Conflicting):**
```
PMT → DHU:
  - 2.4GHz WiFi/Direct (body text)
  - 5GHz LTU Sector (spec table)
  - LTE-M failover (both)
```

**Proposed Standard Architecture:**
```
PMT → DHU Primary:   5GHz Ubiquiti LTU (high bandwidth, 10km range)
PMT → DHU Failover:  LTE-M (Telit ME910G1) (cellular backup)
Remove:              2.4GHz WiFi/Direct (redundant, shorter range)
```

**Rationale:**
- 5GHz LTU provides 10km+ range with sector antennas
- Eliminates 2.4GHz congestion from pivot motors/pumps
- LTE-M proven backup in existing DHU infrastructure
- Reduces PMT BOM cost (remove WiFi chipset)

**Action Items:**
- [ ] Update PMT V1.6 spec to remove WiFi/Direct references
- [ ] Update PMT BOM: Remove WiFi module, keep LTE-M as failover only
- [ ] Verify DHU has sufficient 5GHz LTU sector capacity for 1,280 PMTs
- [ ] Document failover logic: Primary (5GHz) → LTE-M trigger conditions

---

### Task 1.3: Field Mesh Terminology Standardization
**Owner:** Technical Writer + Lead Engineer  
**Deliverable:** FarmSense Radio Glossary v1.0

**Proposed Standard Terms:**

| Old/Inconsistent | New Standard | Definition |
|------------------|--------------|------------|
| "900MHz FHSS" | **"900MHz LoRa Mesh"** | Semtech SX1262-based star/mesh topology |
| "LoRaWAN" | **"900MHz LoRa Mesh"** | Remove WAN - we're using raw LoRa, not LoRaWAN protocol |
| "FHSS Chirps" | **"LoRa Bursts"** | Remove FHSS terminology - we're using LoRa modulation |
| "LoRa Alliance" | **"LoRa Physical Layer"** | We're not using LoRaWAN certification |

**Action Items:**
- [ ] Search/replace all specs: "FHSS" → "LoRa" (where context is field mesh)
- [ ] Search/replace all specs: "LoRaWAN" → "LoRa Mesh" (where not actually using LoRaWAN)
- [ ] Create Radio Glossary document for new engineers
- [ ] Update LRZ, VFA, PFA, PMT specs with consistent terminology

---

## 📋 PHASE 2: BOM VALIDATION (Week 2)

### Task 2.1: PMT BOM vs Spec Alignment
**Owner:** Hardware Engineer  
**Deliverable:** PMT BOM v1.7 (Aligned)

**Current BOM Issues:**

| BOM Item | Spec Claim | BOM Reality | Status |
|----------|------------|-------------|--------|
| Main SoC | ESP32-S3 | ✅ ESP32-S3 | OK |
| Sensor Radio | nRF52840 (implied) | ❌ SX1262 | **MISMATCH** |
| Backhaul Primary | 5GHz LTU | ⚠️ Not in BOM! | **MISSING** |
| Backhaul Failover | LTE-M | ✅ Telit ME910G1 | OK |
| WiFi Module | Not specified | ❌ Listed in code | **REMOVE** |

**Required BOM Changes:**
- [ ] Add: Ubiquiti LTU radio module (5GHz backhaul)
- [ ] Remove: WiFi chipset (if present)
- [ ] Clarify: SX1262 is for sensor mesh reception (not nRF52840)
- [ ] Verify: LTE-M module is Telit ME910G1 (not alternative)

---

### Task 2.2: DHU BOM Validation
**Owner:** Hardware Engineer  
**Deliverable:** DHU BOM v1.2 (Validated)

**Current State:** DHU spec lists Orin Nano ($499) + ESP32-S3 ($18.50) - **BOTH PRESENT**

**Validation Needed:**
- [ ] Confirm Orin Nano handles Kriging/compute
- [ ] Confirm ESP32-S3 handles LoRa mesh gateway only
- [ ] Verify power budget supports both simultaneously
- [ ] Check thermal design for dual-compute enclosure

**Decision:** Keep both - Orin for compute, ESP32 for LoRa. Update BOM to clarify roles.

---

### Task 2.3: LRZ Cost Consistency
**Owner:** Procurement + Engineering  
**Deliverable:** LRZ BOM Canonical v1.21

**Cost Variations Found:**
- Master Spec LRZ2: $54.30
- hardwarebreakdown.md: $59.30 (VFA table) / $51.50 (LRZ2 table)
- Investor Deck: $67.80

**Root Cause:** Different assumptions (OEM scale, component variants, labor inclusion)

**Resolution:**
- [ ] Define "OEM Scale" precisely: 15,000+ units/year
- [ ] Create tiered pricing: Prototype (<100), Pilot (100-1000), Production (1000+)
- [ ] Update all documents with tiered pricing table
- [ ] Canonical single-unit cost at OEM scale: **$54.30**

---

## 📋 PHASE 3: RF COEXISTENCE ANALYSIS (Week 2-3)

### Task 3.1: 5GHz LTU + 900MHz LoRa Interference Study
**Owner:** RF Systems Architect + External Consultant  
**Deliverable:** RF Coexistence Report

**Questions to Answer:**
- [ ] Can 5GHz LTU (PMT→DHU) operate without desensing 900MHz LoRa (field mesh)?
- [ ] What's minimum physical separation needed between LTU sector and LoRa gateway antennas?
- [ ] Can PMT use 5GHz LTU while simultaneously receiving 900MHz LoRa from sensors?
- [ ] What's the near-far problem scenario? (Strong 5GHz signal swamping weak 900MHz signal)

**Test Plan:**
1. Bench test: PMT with both radios active, measure packet loss on LoRa
2. Anechoic chamber: Vary 5GHz power, measure LoRa sensitivity degradation
3. Field test: Deploy 2 PMTs at CSU pilot, log interference events

**Acceptance Criteria:**
- LoRa packet loss < 1% with 5GHz LTU at full power
- No degradation in 900MHz reception below -120dBm sensitivity

---

### Task 3.2: LTE-M vs LoRa Priority Logic
**Owner:** Firmware Engineer  
**Deliverable:** Failover State Machine Specification

**Decision Logic Required:**

```python
# Pseudocode for PMT backhaul selection
if ltu_link_quality > LTU_MIN_THRESHOLD:
    use_backhaul(LTU_5GHZ)
elif lte_signal_strength > LTE_MIN_THRESHOLD:
    use_backhaul(LTE_M)
    log_event("LTU_FAILOVER_TO_LTE")
else:
    enter_buffer_mode()  # Store locally, retry every 5 min
    log_event("BACKHAUL_OUTAGE")
```

**Action Items:**
- [ ] Define LTU_MIN_THRESHOLD (RSSI? SNR? Packet success rate?)
- [ ] Define LTE_MIN_THRESHOLD
- [ ] Implement hysteresis to prevent flapping
- [ ] Test failover under controlled conditions

---

## 📋 PHASE 4: DOCUMENTATION HARMONIZATION (Week 3)

### Task 4.1: Specification Cross-Review
**Owner:** All Engineers + Technical Writer  
**Deliverable:** Spec Consistency Matrix

**Review Process:**
1. Print PMT V1.6, DHU V1.1, LRZ2 V1.21, VFA V1.21 specs
2. Mark every radio/communication claim with highlighter
3. Compare claims across documents
4. Flag every inconsistency
5. Create master glossary of standardized terms

**Action Items:**
- [ ] Schedule 2-hour cross-review meeting
- [ ] Use Miro/FigJam to map communication flows
- [ ] Document every inconsistency found
- [ ] Assign fixes to spec owners

---

### Task 4.2: Update FARMSENSE_RECONCILIATION_REPORT
**Owner:** Lead Engineer  
**Deliverable:** Section 7 Update (Post-Resolution)

**Current Status:** Section 7 documents CONFLICTS  
**Post-Resolution:** Section 7.5+ should document RESOLUTIONS

**Add Sections:**
- 7.5: PMT Protocol Resolution (EDR-001)
- 7.6: Backhaul Standardization (EDR-002)
- 7.7: RF Coexistence Test Results
- 7.8: Updated BOM References (V1.7, V1.2, etc.)

---

## 🚦 GO/NO-GO CRITERIA FOR CSU PILOT

| Criterion | Required Evidence | Status |
|-----------|-------------------|--------|
| **G0** | PMT receiver protocol locked (EDR-001 approved) | ⏳ PENDING |
| **G1** | PMT→DHU backhaul standardized (EDR-002 approved) | ⏳ PENDING |
| **G2** | Field mesh terminology consistent across all specs | ⏳ PENDING |
| **G3** | RF coexistence bench test passed | ⏳ PENDING |
| **G4** | BOMs aligned with specs (no mismatches) | ⏳ PENDING |
| **G5** | Updated specs published (V1.7, V1.2, etc.) | ⏳ PENDING |

**Pilot Deployment Authorization:** Requires G0-G3 **PASS** minimum.

---

## 📊 REVIEW DASHBOARD (Antigravity IDE Integration)

**Recommended IDE Setup:**

```
Workspace: FarmSense-Engineering-Review
├── Tasks/
│   ├── 1.1-PMT-Receiver-Protocol.task
│   ├── 1.2-Backhaul-Standardization.task
│   ├── 1.3-Terminology-Glossary.task
│   ├── 2.1-PMT-BOM-Validation.task
│   ├── 2.2-DHU-BOM-Validation.task
│   ├── 2.3-LRZ-Cost-Consistency.task
│   ├── 3.1-RF-Coexistence-Study.task
│   ├── 3.2-Failover-Logic.task
│   └── 4.1-Spec-Cross-Review.task
├── Documents/
│   ├── EDR-001-PMT-Protocol-Decision.md
│   ├── EDR-002-Backhaul-Standardization.md
│   ├── RF-Coexistence-Report.md
│   └── FarmSense-Radio-Glossary-v1.0.md
└── BOMs/
    ├── PMT-BOM-v1.7-Aligned.csv
    ├── DHU-BOM-v1.2-Validated.csv
    └── LRZ-BOM-Canonical-v1.21.csv
```

**Antigravity IDE Task Format:**
```yaml
---
id: 1.1-PMT-Receiver-Protocol
title: PMT Receiver Protocol Decision
owner: rf-systems-architect
status: open
priority: p0
due: 2026-03-20
deliverable: EDR-001
---
## Context
PMT spec has conflicting radio claims (nRF52840 vs SX1262).

## Decision Required
Choose ONE radio for PMT sensor mesh reception.

## Options
- A: nRF52840 (FHSS) - Lower power, but protocol mismatch with LRZ
- B: SX1262 (LoRa) - Native LoRa, matches field sensors

## Success Criteria
- EDR-001 document approved by Lead Engineer
- PMT spec updated to reflect decision
- BOM updated with correct part number
```

---

## 🔗 RELATED DOCUMENTS

| Document | Purpose |
|----------|---------|
| `docs/management/FARMSENSE_RECONCILIATION_REPORT.md` | Master conflict tracker |
| `docs/specifications/Master Specification: PMT V1.6.md` | PMT spec (to be updated) |
| `docs/specifications/Master Specification: DHU V1.1.md` | DHU spec (reference) |
| `docs/architecture/hardwarebreakdown.md` | BOM details |
| `docs/reference/Subdistrict_1_Market_Intelligence.md` | Market sizing (canonical) |

---

*Engineering Review Plan v1.0*  
*Ready for Antigravity IDE import*  
*Last Updated: 2026-03-06*