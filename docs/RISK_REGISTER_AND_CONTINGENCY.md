# FarmSense Risk Register & Contingency Playbook

**Version:** 1.0  
**Effective Date:** March 2026  
**Review Cycle:** Weekly during pilot, monthly during scale  
**Owner:** FarmSense Engineering + Legal  

---

## Executive Summary

This document establishes the risk management framework for the FarmSense San Luis Valley deployment, specifically designed to preserve the legal admissibility of the "Digital Water Ledger" for the June 2026 Subdistrict 1 water court trial. All risks are classified by severity (1-5), likelihood (1-5), and mitigation status.

**Risk Score = Severity × Likelihood**  
- **Critical (20-25):** Requires immediate executive attention  
- **High (15-19):** Requires documented mitigation plan  
- **Medium (8-14):** Acceptable with monitoring  
- **Low (1-7):** Acceptable without action  

---

## 1. TECHNICAL RISKS

### R1: VFA Telemetry Failure (Backhaul Disconnect)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R1-TECH-001 |
| **Description** | Vertical Field Anchor (VFA) cannot transmit to District Hub (DHU) due to 900MHz LoRa → 2.4GHz LTU frequency mismatch or physical obstruction |
| **Severity** | 5 (Court evidence chain broken) |
| **Likelihood** | 3 (Already identified in manual, BOM rectified but unvalidated) |
| **Score** | **15 (HIGH)** |

**Impact:**
- 1+ hour data gaps invalidate "continuous monitoring" claims for water court
- Subdistrict 1 regulators may reject evidence as incomplete
- $25,200/pivot water savings calculation loses empirical foundation

**Detection:**
- PMT "heartbeat" packets fail to reach DHU within 5-minute window
- RSS dashboard flags "VFA_DHU_LINK_DOWN" alert
- Automated SMS to field technician via Twilio integration

**Contingency Protocol:**
1. **Immediate (0-15 min):** PMT elevates to 2.4GHz backup link (if available), buffers data in 128MB onboard SRAM
2. **Short-term (15-60 min):** Field tech dispatches to verify antenna alignment, check for foliage obstruction
3. **Medium-term (1-4 hrs):** If unrecoverable, activate **LRZ1/LRZ2 Direct Mode** — scouts chirp directly to DHU, bypassing VFA aggregator
4. **Documentation:** All gaps logged in "Chain-of-Custody Exception Report" with timestamps, root cause, and recovery method

**Prevention:**
- [x] DHU BOM includes 900MHz CSS LoRa gateway (completed per manual)
- [ ] Pre-pilot RF site survey at both CSU SLV RC fields
- [ ] Validate 2.4GHz backup path redundancy
- [ ] Install 15dBi directional antenna on VFA for marginal signal areas

---

### R2: PMT GNSS Degradation (RTK Correction Loss)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R2-TECH-002 |
| **Description** | u-blox ZED-F9P loses RTK correction stream, degrading from sub-cm to 2-3m accuracy |
| **Severity** | 4 (1m resolution map becomes 100m+) |
| **Likelihood** | 3 (Cellular/modem failures in rural areas) |
| **Score** | **12 (MEDIUM)** |

**Impact:**
- Cannot resolve which 1m spatial tiles received water
- Water court evidence precision drops below "reasonable certainty" threshold
- Farmers lose confidence in "last minute" irrigation decisions

**Detection:**
- PMT reports "RTK_FIX_LOST" — position accuracy > 10cm
- Zo Core Compute Engine flags "SPATIAL_CONFIDENCE_LOW" on worksheets
- IMU drift increases beyond 0.5°/hr baseline

**Contingency Protocol:**
1. **Immediate:** PMT switches to autonomous PPP (Precise Point Positioning) using satellite broadcast ephemeris — accuracy degrades to ~30cm but remains operational
2. **Short-term:** Field tech verifies RTK base station connectivity at RSS
3. **Medium-term:** If prolonged (> 6 hrs), pause "last minute" irrigation recommendations until RTK restored
4. **Documentation:** Accuracy degradation logged in "Spatial Confidence Audit Trail"

**Prevention:**
- [ ] Dual-RTK base station setup at CSU SLV RC (primary + backup)
- [ ] PMT firmware: Auto-fallback to PPP with confidence flagging
- [ ] Field manual: RTK base station health checks every 48 hours

---

### R3: PFA Flow Sensor Drift (Transit-Time Calibration)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R3-TECH-003 |
| **Description** | Badger Meter TFX-5000 ultrasonic sensors drift from ±0.5% accuracy due to temperature cycling, pipe fouling, or coupling gel degradation |
| **Severity** | 5 (Water volume evidence becomes legally challengeable) |
| **Likelihood** | 2 (High-quality industrial sensors, but SLV conditions extreme) |
| **Score** | **10 (MEDIUM)** |

**Impact:**
- Reported AF volumes contested by opposing counsel in water court
- $500/AF fee calculations become disputable
- RGWCD may reject FarmSense data for compliance reporting

**Detection:**
- Daily cross-reference with mechanical flow meter at wellhead (if available)
- Statistical anomaly: Flow rate changes > 10% without pump speed change
- Monthly calibration drift check against certified transfer standard

**Contingency Protocol:**
1. **Immediate:** Flag PFA for "CALIBRATION_REQUIRED" — data marked as "probationary" in ledger
2. **Short-term:** Field tech recalibrates using portable clamp-on reference meter
3. **Medium-term:** If drift > ±2%, replace sensor module and document serial number chain
4. **Documentation:** Calibration certificates stored in "Black Box" SSD with tamper-evident hash

**Prevention:**
- [ ] Pre-installation flow loop calibration at CSU hydrology lab
- [ ] Quarterly recalibration schedule (not just annual)
- [ ] Use high-temperature coupling gel rated for -30°F to +140°F

---

### R4: DHU "Black Box" SSD Failure (Audit Trail Loss)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R4-TECH-004 |
| **Description** | Swissbit PSLC 128GB SSD fails, destroying 30-day cryptographically signed audit cache |
| **Severity** | 5 (Immutable ledger becomes mutable — court evidence destroyed) |
| **Likelihood** | 2 (Industrial-grade PSLC, but write cycles accumulate) |
| **Score** | **10 (MEDIUM)** |

**Impact:**
- Chain of custody broken during backhaul outages
- Opposing counsel argues data integrity compromised
- Gates Foundation/DoD grant eligibility questioned (data sovereignty claims)

**Detection:**
- SMART monitoring: Reallocated sector count > threshold
- Weekly "Black Box" health check via DHU maintenance port
- Write endurance counter > 80% of rated TBW (Total Bytes Written)

**Contingency Protocol:**
1. **Immediate:** DHU escalates to RSS, initiates emergency backup to RSS 50TB NVMe array
2. **Short-term:** Replace SSD with hot-spare, restore from RSS mirror
3. **Medium-term:** If unrecoverable, reconstruct ledger from redundant PMT SRAM logs + RSS database
4. **Documentation:** SSD failure analysis report, recovery method, data integrity verification

**Prevention:**
- [ ] RAID-1 mirror configuration in DHU (2× 128GB PSLC SSDs)
- [ ] Weekly automated backup to RSS
- [ ] Annual SSD replacement regardless of health (scheduled maintenance)

---

### R5: Regional Internet/Cellular Blackout (RSS Isolation)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R5-TECH-005 |
| **Description** | Total backhaul failure (fiber cut + cellular tower down) isolates RSS from cloud intelligence |
| **Severity** | 4 (Zo "scientist" engine offline, reflex logic only) |
| **Likelihood** | 2 (Monte Vista has redundant connectivity, but SLV rural) |
| **Score** | **8 (MEDIUM)** |

**Impact:**
- No 1-9 day ensemble ET forecasts
- Cannot update MAD worksheets with new weather data
- System degrades to "edge-only" mode with frozen decision parameters

**Detection:**
- RSS connectivity watchdog: No heartbeat to cloud for > 5 minutes
- DHU mesh reports "UPSTREAM_ISOLATED" 
- Automated satellite phone alert to operations center

**Contingency Protocol:**
1. **Immediate:** DHU continues autonomous operation using last-valid "Zo Worksheet" (cached locally)
2. **Short-term:** System switches to "Conservative Mode" — earlier irrigation triggers to avoid crop stress
3. **Medium-term:** If outage > 24 hrs, dispatch field agronomist for manual verification
4. **Documentation:** Blackout event logged with duration, affected fields, recovery method

**Prevention:**
- [ ] Starlink backup terminal at RSS (low-latency satellite)
- [ ] 48-hour Zo Worksheet cache pre-loaded on all DHUs
- [ ] Mesh network: DHU-to-DHU relay for redundant backhaul paths

---

## 2. LEGAL/REGULATORY RISKS

### R6: Chain of Custody Breach (Evidence Inadmissibility)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R6-LEGAL-001 |
| **Description** | Unauthorized access to sensor data, firmware modification, or unlogged maintenance invalidates evidence chain |
| **Severity** | 5 (Complete loss of water court case) |
| **Likelihood** | 2 (AES-256 encryption, physical tamper detection, but human error possible) |
| **Score** | **10 (MEDIUM)** |

**Impact:**
- June 2026 trial evidence ruled inadmissible
- FarmSense reputation destroyed in agricultural legal community
- $7.6M Subdistrict 1 contract voided

**Detection:**
- Hardware tamper switches triggered on PFA/DHU/PMT enclosures
- Firmware hash mismatch on boot verification
- Unauthorized maintenance logged via missing digital signature

**Contingency Protocol:**
1. **Immediate:** Isolate affected device, halt data collection, preserve physical state
2. **Short-term:** Forensic analysis: Review access logs, verify cryptographic signatures, check enclosure integrity
3. **Medium-term:** If breach confirmed, legal counsel drafts "Chain-of-Custody Affidavit" explaining scope, impact, and remediation
4. **Documentation:** Incident report with timestamps, forensic findings, legal opinion on admissibility

**Prevention:**
- [ ] All maintenance requires dual-authorized digital signatures
- [ ] Enclosure tamper-evident seals with serial number logging
- [ ] Firmware signed with Bxthre3 private key, verified on every boot
- [ ] Annual third-party security audit (SOC 2 Type II equivalent)

---

### R7: Rio Grande Compact Interpretation Shift

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R7-LEGAL-002 |
| **Description** | Water court rules that digital monitoring data is insufficient for compliance; physical meter reading required |
| **Severity** | 5 (FarmSense core value proposition invalidated) |
| **Likelihood** | 2 (Precedent exists for telemetry in Colorado water law, but conservative judges exist) |
| **Score** | **10 (MEDIUM)** |

**Impact:**
- RGWCD rejects FarmSense for official compliance reporting
- Farmers forced to maintain parallel mechanical meter systems
- SaaS subscription value drops by ~60% (compliance is key driver)

**Detection:**
- Legal monitoring: Colorado Water Court rulings in similar cases
- Regulatory monitoring: RGWCD board meeting minutes
- Stakeholder feedback: Farmers report pressure to install backup meters

**Contingency Protocol:**
1. **Immediate:** Engage water rights attorney to file "Friend of the Court" brief supporting digital telemetry
2. **Short-term:** Partner with State Engineer to establish FarmSense as "approved method" via administrative rulemaking
3. **Medium-term:** If ruling adverse, pivot to "supplemental" monitoring with hybrid certification path
4. **Documentation:** Legal strategy memos, regulatory correspondence, alternative compliance pathways

**Prevention:**
- [ ] Pre-trial consultation with Colorado Supreme Court water law specialists
- [ ] Invite State Engineer to witness pilot deployment
- [ ] Document FarmSense accuracy vs. certified mechanical meters in pilot

---

## 3. OPERATIONAL RISKS

### R8: CSU SLV RC Partnership Disruption

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R8-OPS-001 |
| **Description** | CSU San Luis Valley Research Center withdraws support, access revoked, or key personnel leave |
| **Severity** | 5 (Pilot loses credibility, empirical ground truth unavailable) |
| **Likelihood** | 2 (Strong institutional partnership, but personnel changes happen) |
| **Score** | **10 (MEDIUM)** |

**Impact:**
- Cannot generate court-admissible "ground truth" from academic partner
- Gates Foundation application loses credibility (academic validation required)
- 2-field pilot collapses, delaying full Subdistrict 1 rollout

**Detection:**
- Regular check-ins with CSU SLV RC Director and lead agronomist
- Contract monitoring: Notice periods, renewal dates
- Personnel monitoring: LinkedIn alerts for key academic partners

**Contingency Protocol:**
1. **Immediate:** Activate backup academic partner (Colorado School of Mines hydrology program, or private agronomy firm)
2. **Short-term:** Negotiate transition period, data sharing agreement for collected data
3. **Medium-term:** Restructure pilot to use multiple private farms with notarized data custody agreements
4. **Documentation:** Partnership agreements, transition plans, data ownership clarification

**Prevention:**
- [ ] Formal MOU with 12-month notice period
- [ ] Cross-train FarmSense staff on CSU protocols (reduce single-point-of-failure)
- [ ] Secondary academic partnership letter of intent already secured

---

### R9: Pilot Field Destruction (Weather/Event)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R9-OPS-002 |
| **Description** | Hail, flood, or equipment incident destroys sensors in 2-field pilot |
| **Severity** | 4 (Pilot data incomplete, timeline at risk) |
| **Likelihood** | 3 (SLV weather extreme, limited planting window) |
| **Score** | **12 (MEDIUM)** |

**Impact:**
- Cannot present complete growing season data at June 2026 trial
- Need to delay to 2027 growing season (12-month setback)
- Investor confidence drops, funding at risk

**Detection:**
- Weather monitoring: Severe weather alerts from NOAA
- Insurance monitoring: Crop insurance claims in pilot area
- Sensor monitoring: Sudden offline of multiple devices in same field

**Contingency Protocol:**
1. **Immediate:** Activate "Hot Spar" reserve — pre-staged replacement sensors at RSS
2. **Short-term:** Insurance claim documentation, photo evidence, police report if vandalism
3. **Medium-term:** Replant if season allows, or pivot to "partial season" analysis with statistical confidence intervals
4. **Documentation:** Incident photos, insurance claims, recovery timeline

**Prevention:**
- [ ] Comprehensive insurance policy covering $150K equipment value
- [ ] Weather monitoring integration: Auto-retract PMT during hail warnings
- [ ] Redundant pilot fields: If 2-field minimum, deploy 3 fields (33% over-provision)

---

### R10: Farmer Adoption Resistance (Post-Pilot)

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R10-OPS-003 |
| **Description** | Subdistrict 1 farmers reject FarmSense despite pilot success (trust, complexity, cost concerns) |
| **Severity** | 4 (TAM unrealized, revenue model fails) |
| **Likelihood** | 3 (Conservative agricultural community, tech skepticism common) |
| **Score** | **12 (MEDIUM)** |

**Impact:**
- Only 10-20% adoption vs. projected 80%
- $7.6M TAM shrinks to <$1M
- Gates Foundation/DoD scale claims become unsubstantiated

**Detection:**
- Pilot farmer Net Promoter Score (NPS) surveys
- Pre-order commitment tracking (target: 100 fields before full build)
- Town hall feedback in Monte Vista, Center, Alamosa

**Contingency Protocol:**
1. **Immediate:** Deploy "Farmer Champion" program — pilot participants become paid ambassadors
2. **Short-term:** Simplify onboarding: White-glove installation, 90-day success guarantee
3. **Medium-term:** If slow adoption, pivot to "mandate pathway" — RGWCD requires digital monitoring for all groundwater withdrawals
4. **Documentation:** Adoption metrics, feedback synthesis, messaging adjustments

**Prevention:**
- [ ] Farmer advisory board: 5 respected SLV growers with input on UX/features
- [ ] Transparent ROI calculator: Farmer inputs their actual costs, sees savings
- [ ] Financing partnership: $0 down, pay from water savings (performance contract)

---

## 4. FINANCIAL/GRANT RISKS

### R11: Non-Dilutive Funding Pipeline Collapse

| Attribute | Value |
|-----------|-------|
| **Risk ID** | R11-FIN-001 |
| **Description** | Federal Federal ESG, Gates Foundation, and prize nominations all fail; no funding for scale |
| **Severity** | 4 (Must raise dilutive VC on worse terms) |
| **Likelihood** | 3 (Competitive funding landscape, but strong pilot helps) |
| **Score** | **12 (MEDIUM)** |

**Impact:**
- Forced to raise Series A at lower valuation
- Brodiblanco dilution increases
- Timeline pressure creates technical shortcuts

**Detection:**
- Grant application status tracking
- Program officer feedback calls
- Prize nomination shortlist announcements

**Contingency Protocol:**
1. **Immediate:** Activate "Plan B" pipeline: ARPA-E, USDA Conservation Innovation Grants, Colorado Water Conservation Board
2. **Short-term:** Secure bridge financing from angel network ($500K for 6-month runway)
3. **Medium-term:** If grants fail, position for strategic acquisition by AgTech incumbent (John Deere, Trimble, CropX)
4. **Documentation:** Funding pipeline tracker, rejection analysis, pivot strategy

**Prevention:**
- [ ] Grant writer retainer with federal proposal expertise
- [ ] Parallel application strategy: 5+ grants in flight simultaneously
- [ ] Investor warm relationships maintained even if pursuing non-dilutive

---

## 5. CONTINGENCY ACTIVATION WORKFLOW

When any HIGH or CRITICAL risk materializes:

```
1. DETECT (Automated monitoring or field report)
   ↓
2. NOTIFY (Slack #risk-alerts, SMS to engineering lead + brodiblanco)
   ↓
3. ASSESS (15-minute triage: severity, scope, legal impact)
   ↓
4. ACTIVATE (Execute contingency protocol from this document)
   ↓
5. DOCUMENT (Create incident ticket, timestamp all actions)
   ↓
6. RECOVER (Return to normal operations)
   ↓
7. REVIEW (Post-incident analysis, update playbook if needed)
```

**Emergency Contacts:**
- Engineering Lead: [REDACTED]
- Legal Counsel (Water Rights): [REDACTED]
- CSU SLV RC Director: [REDACTED]
- RGWCD Liaison: [REDACTED]

---

## 6. REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | Zo (AI) | Initial risk register for June 2026 pilot |

---

*This document is a living artifact. Review weekly during pilot phase. All risk scores must be recalculated after any major incident or system change.*
