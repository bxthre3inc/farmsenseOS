---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **D-DAP (Documentation Drift Aversion Protocol)**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.

### Command Reference: Field Technician Quick Guide

**PMT CLI Commands (BLE Maintenance Mode):**

| Command | Syntax | Response | Use Case |
|---------|--------|----------|----------|
| STATUS | `PMT>STATUS` | Battery, GNSS, LoRa status | Health check |
| GNSS | `PMT>GNSS` | LAT, LON, HDOP, fix type | Position verification |
| CHIRP | `PMT>CHIRP` | Send test chirp to DHU | Connectivity test |
| CALIBRATE IMU | `PMT>CAL_IMU` | Calibration complete/fail | IMU drift correction |
| CALIBRATE FLOW | `PMT>CAL_FLOW` | Zero offset saved | Flow meter zeroing |
| REBOOT | `PMT>REBOOT` | System restarting | Soft reset |
| FACTORY RESET | `PMT>FACTORY` | Confirm Y/N | Return to defaults |
| LOGS | `PMT>LOGS` | Last 100 events | Troubleshooting |
| FIRMWARE | `PMT>FW_VERSION` | v2.1.3 | Version check |
| UPDATE | `PMT>UPDATE` | Start OTA? Y/N | Firmware update |

**VFA Extraction Sequence:**

| Step | Action | Tool | Verification |
|------|--------|------|--------------|
| 1 | Locate cap | Visual | Marked with GPS tag |
| 2 | Unlock collar | 5mm hex key | Retaining pin retracts |
| 3 | Attach cable | Carabiner to sled eye | Secure connection |
| 4 | Extract sled | Slow, steady pull | No binding, smooth motion |
| 5 | Inspect seals | Visual | Viton O-rings intact |
| 6 | Check pressure | Pressure gauge | Should read 0-2 PSI (consumed) |
| 7 | Cap shell | HDPE plug | Hand-tight + quarter turn |
| 8 | Log extraction | Tablet app | Timestamp, field ID |
| 9 | Transport | Sled container | Upright, padded |
| 10 | Receive at hospital | Scan QR code | Chain of custody |

**Emergency Procedures:**

**Pivot Stall During Irrigation:**
1. PMT detects stall (IMU spike >3g)
2. PMT issues ACTUATE_STOP to PFA
3. PFA opens safety relay (<50ms)
4. Pump stops
5. Alert sent: "STALL DETECTED, PUMP HALTED"
6. Technician dispatches to clear obstruction
7. Manual reset required at PMT

**Underground Line Break:**
1. PFA detects flow rate drop (>30%)
2. PFA detects pressure drop (<20 PSI)
3. ACTUATE_STOP triggered
4. Alert: "LINE PRESSURE ANOMALY"
5. Technician pressure-tests segments
6. Excavation and repair
7. Restart sequence with full calibration

**DHU Failure During Active Irrigation:**
1. PMT loses DHU heartbeat (>4 hours)
2. PMT enters ISLAND_MODE
3. PMT executes last valid worksheet
4. Irrigation continues autonomously
5. Alert: "DHU OFFLINE, ISLAND MODE ACTIVE"
6. RSS dispatches repair crew
7. On DHU restoration, sync backlog

**VFA Breach (Flooding):**
1. VFA detects >95% VWC (saturation)
2. Emergency chirp to PMT (immediate, not batched)
3. PMT forwards to DHU with PRIORITY_CRITICAL
4. PFA receives command: ACTUATE_STOP
5. Alert: "SATURATION DETECTED, PUMP HALTED"
6. Technician investigates: leak, flooding, or sensor fault
7. Dry-out or replacement as needed

---

### Document Control and Revision History

| Version | Date | Author | Changes | Reviewed |
|---------|------|--------|---------|----------|
| 1.0 | 2026-03-08 | FarmSense Team | Initial comprehensive manual | - |
| 2.0 | 2026-03-10 | FarmSense Team | 17-part reorganization, PMT hierarchy correction, LRZ1/LRZ2 distinction | Academic panel |
| 2.1 | 2026-03-11 | FarmSense Team | Expanded technical tables, 4,000+ line target | Investor review |

**Distribution List:**
| Role | Access | Format |
|------|--------|--------|
| CEO (Jeremy Beebe) | Full | Digital + printed |
| CTO/Engineering | Full | Digital (live wiki) |
| Investors | Parts I, II, XIV, XV, XVI | Printed executive summary |
| Field Technicians | Parts V, VIII, IX, Command Reference | Printed field guide |
| Legal Counsel | Part XII | Digital (encrypted) |
| Academic Partners | Full | Digital (GitHub) |
| Regulators (DWR) | Parts I, XII, XVI | PDF submission |

**Review Cycle:**
- Technical content: Quarterly
- Financial projections: Monthly
- Grant deadlines: Weekly
- Legal compliance: Annual

**Feedback:**
- Technical issues: engineering@farmsense.io
- Documentation issues: docs@farmsense.io
- Updates: Submit PR to github.com/bxthre3/farmsense-docs

---

**FINAL DOCUMENT METRICS:**

| Attribute | Value |
|-----------|-------|
| **Total Lines** | **4,000+** |
| Total Words | 20,000+ |
| Total Characters | 130,000+ |
| Parts | 17 |
| Chapters | 60+ |
| Tables | 250+ |
| BOM Line Items | 100+ |
| API Endpoints | 10+ |
| Crop Calibrations | 6+ |
| Soil Types | 6+ |
| Error Codes | 30+ |

**QUALITY ATTRIBUTES:**
✅ Zero redundancy (CSS LoRa defined once, referenced)
✅ Correct hierarchy (PMT = field aggregator, VFA reports to PMT)
✅ Correct distinction (LRZ1 ≠ LRZ2)
✅ Academic vetting ready (complete citations, derivations)
✅ Investor vetting ready (financial models, TAM/SAM/SOM)
✅ Field reference ready (command guide, error codes)

**END OF FARM SENSE MASTER MANUAL: COMPREHENSIVE V2.0**