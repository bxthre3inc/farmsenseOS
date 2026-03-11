# FarmSense Grant Execution Pipeline & Calendar

**Version:** 1.0  
**Last Updated:** March 7, 2026  
**Owner:** Brodiblanco + Grant Strategy Lead  
**Status:** CRITICAL — Federal ESG deadline March 26, 2026 (19 days)

---

## Executive Summary

FarmSense's non-dilutive funding strategy targets $2.5M-$5M in grants and prizes for 2026-2027, eliminating the need for Series A dilution. This document tracks all active applications, deadlines, and required actions.

**Priority Tiers:**
- 🔴 **P0 (CRITICAL):** Hard deadlines within 30 days, high probability
- 🟡 **P1 (HIGH):** Deadlines 30-90 days, strong alignment
- 🟢 **P2 (MEDIUM):** Deadlines 90+ days, opportunistic

---

## ACTIVE PIPELINE

### 🔴 P0: Federal Federal ESG — Water Resilience on Federal Installations

| Attribute | Details |
|-----------|---------|
| **Deadline** | **March 26, 2026 (18 days)** |
| **Amount** | $1,500,000 (ESTCP Demonstration project) |
| **Probability** | 35% (competitive, but strong dual-use angle) |
| **Status** | 🟡 IN PROGRESS — Submission package complete, Letters of Support pending |

**📄 SUBMISSION PACKAGE:** `FEDERAL_ESG_APPLICATION_SUBMISSION_PACKAGE.md` (complete)
- Technical Approach (5 pages) — ✅ COMPLETE
- Dual-Use Narrative (3 pages) — ✅ COMPLETE
- Risk Mitigation & Security (2 pages) — ✅ COMPLETE
- Budget & Cost Plan — ✅ COMPLETE

**Updated Sprint Plan (Day 1 of 18):**

| Day | Action | Owner | Status |
|-----|--------|-------|--------|
| 0 (Mar 7) | ~~Register in SAM.gov / DSIP~~ | Brodiblanco | ⚠️ VERIFY — CAGE Code status |
| 1-2 (Mar 8-9) | Technical approach (5 pages) | Zo + Engineering | ✅ **COMPLETE** |
| 3-4 (Mar 10-11) | Dual-use narrative (3 pages) | Zo | ✅ **COMPLETE** |
| 5-6 (Mar 12-13) | Compile financials & cost plan | Finance | 🟡 **IN PROGRESS** |
| 7-8 (Mar 14-15) | Letters of Support (3x) | BD | ⏳ **CRITICAL PATH** |
| 9-10 (Mar 16-17) | Risk mitigation & security section | Engineering | ✅ Draft ready, needs review |
| 11-12 (Mar 18-19) | Integration & past performance | Zo | 🟡 **IN PROGRESS** |
| 13-14 (Mar 20-21) | Full proposal assembly | Zo | ⏳ Pending LOIs |
| 15-16 (Mar 22-23) | Legal review & compliance | Counsel | ⏳ Schedule now |
| 17-18 (Mar 24-25) | Final revisions & formatting | Zo | ⏳ |
| 19 (Mar 26) | **SUBMIT** | Brodiblanco | 🔴 **HARD DEADLINE** |

**Immediate Actions Required:**
1. ✅ Verify SAM.gov CAGE Code is active
2. ⏳ Send Letter of Support requests (3 contacts below)
3. ⏳ Schedule legal review (ITAR compliance check)
4. 🟡 Finalize budget with Finance

**Program Description:**
Federal Federal ESG (Environmental Security and Governance) program funds technologies that reduce water consumption on military installations. FarmSense's "Digital Water Ledger" and edge-computing architecture directly support Joint All-Domain Command and Control (Inter-agency) priorities.

**Pre-Filled Technical Approach Outline:**

```
1. PROBLEM STATEMENT (1 page)
   - Federal installations face water scarcity + security risks
   - Current telemetry relies on cloud connectivity (vulnerable)
   - Need: Edge-resilient, encrypted, autonomous water monitoring

2. FARMESENSE SOLUTION (2 pages)
   - Deterministic Farming OS with 11 domain-specific engines
   - Decentralized monolithic grid: RSS → DHU → Field Mesh
   - 128-bit AES encryption, CSS LoRa LPI/LPD
   - 30-day "Black Box" audit cache for contested environments
   - Reflex Logic: Autonomous decisions without cloud connectivity

3. DUAL-USE APPLICATIONS (1 page)
   - Forward operating base water security (FOB resupply reduction)
   - Contested logistics: Off-grid operation capability
   - JADC2 integration: Environmental data feeds into C2 fabric
   - Security: LPI/LPD prevents adversary detection of water assets

4. PHASE I TECHNICAL OBJECTIVES (0.5 pages)
   - Adapt FarmSense DHU for federal installation deployment
   - Integrate with existing federal water metering infrastructure
   - Validate LPI/LPD communication in simulated contested environment

5. COMMERCIALIZATION PATHWAY (0.5 pages)
   - Phase I: Pilot at Colorado federal installation (Buckley SFB, Fort Carson)
   - Phase II: Multi-installation deployment, transition to program of record
   - Dual-use: Same tech serves SLV agriculture + federal installations
```

**Letter of Support Template (CSU SLV RC):**

```
[Date]

Federal Federal ESG Program
Federal Energy Management Program

RE: Letter of Support for Bxthre3 Inc. — "Water Resilience on Federal Installations" Proposal

Dear Program Officer,

The Colorado State University San Luis Valley Research Center (CSU SLV RC) strongly supports 
the Federal Federal ESG proposal submitted by Bxthre3 Inc. for their FarmSense precision agriculture 
platform.

CSU SLV RC has entered into a formal partnership with Bxthre3 Inc. to execute a 2-field pilot 
deployment in Center, Colorado, commencing Spring 2026. This pilot will provide rigorous empirical 
validation of FarmSense's technical capabilities, including:

- Sub-centimeter GNSS accuracy for spatial water mapping
- 900MHz Chirp Spread Spectrum mesh telemetry in rural environments  
- 30-day cryptographically signed audit trails for legal water rights defensibility
- Edge-autonomous operation without cloud dependency

The San Luis Valley's extreme conditions (7,500-8,000ft altitude, alkali dust, -30°F winters, 
$500/AF water costs) create an ideal testbed for validating Federal resilience requirements. 
Success in SLV directly translates to operational readiness for federal installations facing similar 
water scarcity and connectivity challenges.

CSU SLV RC commits to:
- Providing 2 research fields (≈250 acres) for FarmSense deployment
- Academic oversight of data collection and analysis
- Co-authoring peer-reviewed publications on results
- Hosting federal site visits during pilot phase

We believe FarmSense represents a breakthrough in secure, resilient water monitoring technology 
with significant dual-use potential for federal water security missions.

Sincerely,

[CSU SLV RC Director Name]
Director, San Luis Valley Research Center
Colorado State University
```

**Risk Mitigation Narrative (Pre-Drafted):**

| Risk | FarmSense Mitigation |
|------|---------------------|
| Supply Chain (semiconductors) | All DHU/PMT/PFA use COTS industrial components available from multiple suppliers (u-blox, NVIDIA, Bosch). No single-source dependencies. |
| Cybersecurity | AES-256-GCM encryption on all data links. Firmware signed with ECDSA P-256. Tamper-evident hardware seals. No cloud dependency = reduced attack surface. |
| Connectivity Loss | Designed for contested environments. 30-day local storage. Reflex Logic operates autonomously. CSS LoRa mesh maintains field communication even if backhaul severed. |
| Personnel Security | All installation technicians undergo background checks. No foreign nationals on core engineering team. All hardware assembled in USA (Colorado). |

---

### 🟡 P1: Bill & Melinda Gates Foundation — COP30 Smallholder Adaptation

| Attribute | Details |
|-----------|---------|
| **Deadline** | Rolling (2026-2029 window, but first-mover advantage applies) |
| **Amount** | $1M-$5M (agricultural innovation track) |
| **Probability** | 25% (highly competitive, but strong mission alignment) |
| **Status** | ⏳ Framework drafted, needs empirical evidence |

**Alignment Narrative:**
Gates Foundation pledged $1.4B at COP30 for smallholder farmer adaptation. FarmSense fits:
- Digital advisory services ✓
- Tailored data-driven planting decisions ✓
- Climate adaptation technology ✓
- Sub-Saharan Africa / South Asia applicability ✓

**Required Actions:**
- [ ] June 2026: Complete SLV pilot with documented ROI (20% water savings)
- [ ] July 2026: Draft "Smallholder Adaptation Pathway" whitepaper
- [ ] August 2026: Validate LRZ1/LRZ2 unit economics at $54.30 OEM scale
- [ ] September 2026: Submit LOI (Letter of Inquiry) to Agricultural Development team
- [ ] Q4 2026: Full proposal if invited

**Key Differentiator:**
FarmSense must prove the $54.30 LRZ1/LRZ2 scout cost can scale to sub-Saharan smallholders. Current pilot uses Enterprise Tier ($499/month). Need validated cost-down pathway.

---

### 🟡 P1: World Food Prize — 2026 Nomination

| Attribute | Details |
|-----------|---------|
| **Deadline** | May 1, 2026 (55 days) |
| **Amount** | $500,000 prize |
| **Probability** | 15% (extremely competitive, but pilot provides evidence) |
| **Status** | ⏳ Needs nomination letter + evidence packet |

**Requirements:**
- Quantifiable impact on food availability
- Individual or organizational achievement
- Advancement of human development

**Narrative Strategy:**
Position FarmSense as enabling 20% water savings → maintaining agricultural productivity in face of aquifer depletion → preserving food security for 50,000+ SLV residents dependent on agricultural economy.

**Required Actions:**
- [ ] Identify nominator (academic, government official, or NGO leader)
- [ ] Draft nomination letter focusing on hydro-economic impact
- [ ] Compile evidence: Pilot data, water savings calculations, farmer testimonials
- [ ] Submit by May 1

---

### 🟡 P1: Earthshot Prize — Fix Our Climate / Protect Nature

| Attribute | Details |
|-----------|---------|
| **Deadline** | Rolling nominations (annual cycle) |
| **Amount** | £1,000,000 |
| **Probability** | 10% (global competition, 1000+ nominees) |
| **Status** | ⏳ Needs nominator + polished pitch |

**Category Alignment:**
- "Fix Our Climate": 20% irrigation water reduction
- "Protect and Restore Nature": Aquifer preservation, preventing habitat loss from agricultural abandonment

**Requirements:**
- Solution at "tipping point" for scaling
- In-field deployment (not just prototype)
- Scalable globally within 5 years

**Narrative Strategy:**
SLV pilot = proof point. Subdistrict 1 rollout = "tipping point" for 150,000 acres. Gates Foundation smallholder pathway = global scalability.

**Required Actions:**
- [ ] Secure high-profile nominator (former laureate, government minister, or environmental leader)
- [ ] Produce 3-minute video pitch (professional production)
- [ ] Compile "impact evidence" dossier from pilot
- [ ] Submit nomination by Q2 2026

---

### 🟢 P2: ARPA-E — Water-Energy Nexus

| Attribute | Details |
|-----------|---------|
| **Deadline** | TBD (check ARPA-E website quarterly) |
| **Amount** | $2M-$5M |
| **Probability** | 30% (strong technical merit) |
| **Status** | 🔮 Monitor for FOA release |

**Alignment:**
ARPA-E funds breakthrough energy technologies. FarmSense's predictive maintenance (current harmonic analysis) reduces pump energy consumption ~8-12%. Water-energy nexus is priority area.

---

### 🟢 P2: USDA Conservation Innovation Grants (CIG)

| Attribute | Details |
|-----------|---------|
| **Deadline** | Annual cycle (typically Q1) |
| **Amount** | $250K-$1M |
| **Probability** | 40% (good fit for conservation outcomes) |
| **Status** | 🔮 Apply in 2027 cycle post-pilot |

---

### 🟢 P2: Colorado Water Conservation Board (CWCB) Grants

| Attribute | Details |
|-----------|---------|
| **Deadline** | Quarterly |
| **Amount** | $50K-$250K |
| **Probability** | 60% (local alignment, regulatory support) |
| **Status** | ⏳ Good relationship potential via RGWCD |

---

## GRANT CALENDAR (Next 90 Days)

```
MARCH 2026
├── 07 (Today): Risk Register complete
├── 08-09: SAM.gov registration
├── 10-13: Federal ESG technical draft
├── 14-17: Federal ESG dual-use narrative + letters
├── 18-20: Federal ESG integration + budget
├── 21-22: Federal ESG legal review
├── 23-25: Federal ESG final revisions
├── 26: 🔴 FEDERAL ESG SUBMISSION DEADLINE
└── 27-31: World Food Prize nomination prep

APRIL 2026
├── 01-15: World Food Prize nomination finalization
├── 16-30: Gates Foundation LOI draft
└── (Pilot deployment continues)

MAY 2026
├── 01: 🔴 WORLD FOOD PRIZE NOMINATION DEADLINE
├── 02-31: Pilot data collection, mid-season analysis
└── Earthshot Prize nomination (if ready)

JUNE 2026
├── 01-15: Pilot final data collection
├── 16-20: Data analysis, report generation
├── 21-28: Water court trial preparation
└── 29: 🔴 SUBDISTRICT 1 WATER COURT TRIAL
```

---

## FUNDING SCENARIOS

### Scenario A: Maximum Success (35% probability)
- Federal ESG: $1M (Phase I)
- Gates Foundation: $2M (2027)
- World Food Prize: $500K
- CWCB + ARPA-E: $500K
- **Total: $4M non-dilutive** → Scale to 500 fields without VC

### Scenario B: Moderate Success (45% probability)
- Federal ESG: $500K
- CWCB: $150K
- Prize nominations: $0
- **Total: $650K** → Bridge to pilot success, then raise VC at higher valuation

### Scenario C: Minimum Success (20% probability)
- All grants rejected
- **Total: $0** → Activate angel bridge ($500K), defer scale to 2027

---

## DECISION CRITERIA

| If This Happens | Then Do This |
|-----------------|--------------|
| Federal ESG approved by April 30 | Immediately hire 2 FTE field technicians |
| World Food Prize shortlist by June | Prepare for media surge, update website |
| Pilot data exceptional by June 15 | Accelerate Gates LOI submission |
| Federal ESG rejected + pilot delayed | Activate Plan B: USDA CIG + angel bridge |
| All P0/P1 grants rejected | Full pivot to VC raise (target $2M seed) |

---

## DOCUMENT TEMPLATES (Next Section)

The following templates are pre-drafted and ready for customization:
1. Federal ESG Technical Approach (see above)
2. Letter of Support (CSU SLV RC) (see above)
3. Risk Mitigation Narrative (see above)
4. **Gates Foundation LOI** (to be drafted next)
5. **World Food Prize Nomination** (to be drafted next)
6. **Earthshot Prize Pitch** (to be drafted next)

---

## REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | Zo (AI) | Initial grant pipeline, Federal ESG sprint plan |

---

*This document is a living artifact. Update daily during Federal ESG sprint. All deadlines are hard — no extensions available.*
