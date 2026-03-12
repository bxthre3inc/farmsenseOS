
# PART VIII: THE PILOT MISSION SPECIFICATION

## 8.1 CSU San Luis Valley Research Center Pilot

### 8.1.1 Mission Overview

**Location:** Center, Colorado (37.7531° N, 106.0212° W)
**Partners:** Colorado State University SLV Research Center
**Fields:** 2 center-pivot fields (126 acres each)
**Timeline:** March 10 - June 29, 2026
**Primary Objective:** Generate legally admissible empirical ground truth for Water Court

### 8.1.2 Hardware Deployment

**Field 1 (Treatment):**
| Device | Qty | Notes |
|--------|-----|-------|
| PMT | 1 | Full kinematic + flow |
| PFA | 1 | Wellhead sentry |
| VFA | 2 | 48" deep profile |
| LRZ2 | 4 | Reference scouts |
| LRZ1 | 12 | Spatial truth |
| **Total** | **20** | |

**Field 2 (Control):**
| Device | Qty | Notes |
|--------|-----|-------|
| PMT | 1 | Kinematic tracking only |
| PFA | 1 | Flow measurement only |
| VFA | 0 | None (control) |
| LRZ | 0 | None (control) |
| **Total** | **2** | Minimal instrumentation |

**Purpose of Control:** Establish baseline water consumption without precision management for comparative ROI calculation.

### 8.1.3 Success Criteria

| Metric | Target | Validation Method |
|--------|--------|-------------------|
| Water savings | ≥20% | Flow meter comparison |
| Kriging accuracy | MAPE <5% | Gravimetric sampling (50 points) |
| System uptime | >99.5% | PMT heartbeat logs |
| Data integrity | 100% | Hash chain verification |
| Legal admissibility | Granted | Water Court ruling |

---

## 8.2 Timeline & Milestones

| Week | Dates | Activity | Deliverable |
|------|-------|----------|-------------|
| 1 | Mar 10-16 | Field preparation, soil coring | Baseline soil maps |
| 2 | Mar 17-23 | VFA/PFA installation | Buried infrastructure |
| 3 | Mar 24-30 | PMT installation, calibration | Kinematic tracking active |
| 4 | Mar 31-Apr 6 | DHU/RSS commissioning | Network operational |
| 5 | Apr 7-13 | Full system integration | End-to-end data flow |
| 6-12 | Apr 14-Jun 8 | Growing season monitoring | Continuous telemetry |
| 13 | Jun 9-15 | Data analysis, report drafting | Preliminary results |
| 14 | Jun 16-22 | Expert review, legal prep | Evidence package |
| 15 | Jun 29 | Water Court presentation | Admissibility ruling |

---

## 8.3 Installation Standard Operating Procedures

### 8.3.1 VFA Installation SOP

**Pre-Installation:**
1. Soil core sample to 48" (characterize texture)
2. Mark installation point (GPS waypoint)
3. Verify underground utilities clearance

**Installation:**
1. Auger 6" diameter hole to 50" depth
2. Insert HDPE SDR9 outer shell
3. Backfill annulus with native soil (tamped)
4. Seal top with locking collar
5. Log GPS coordinates (±30cm accuracy)

**Alpha-Sled Insertion:**
1. Pre-charge nitrogen to +5 PSI
2. Verify desiccant pack dry
3. Lubricate Viton seals
4. Insert sled with steady pressure
5. Lock with stainless retaining pin
6. Verify chirp acknowledgment from PMT

**Post-Installation:**
1. Pressure test (maintain +5 PSI for 24hr)
2. Calibrate dielectric against gravimetric sample
3. Document in asset management system
4. Schedule first extraction (pre-harvest)

### 8.3.2 PMT Installation SOP

**Tower Selection:**
- Preferred: Tower 2 or 3 (optimal balance of height and stability)
- Avoid: Last tower (excessive sway), first tower (motor interference)

**Mounting:**
1. Attach stainless bracket with U-bolts
2. Install spring isolators (vibration dampening)
3. Mount NEMA 4X enclosure
4. Connect pivot electrical (12V tap)
5. Install LoRa antenna (3ft whip, spring base)
6. Install GPS antenna (clear sky view)

**Calibration:**
1. RTK base station initialization (10 minutes)
2. Fixed solution confirmation (<2cm accuracy)
3. Pivot end-stop mapping (full rotation)
4. Flow meter zero calibration (pump off)
5. IMU bias calibration (static 30 seconds)
6. Test chirp to DHU (signal strength >-100dBm)

---

# PART IX: OPERATIONS & EXECUTION

## 9.1 Seasonal Operations Cycle

### 9.1.1 Spring: Post-Planting Insertion (April-May)

**Trigger:** Crops planted, emergence imminent
**Window:** 2-4 weeks post-planting
**Duration:** 15 minutes per sensor
**Crew Size:** 2 technicians per field

**Workflow:**
1. Extract Alpha-Sleds from Sled Hospital (winter storage)
2. Diagnose batteries (voltage check)
3. Nitrogen recharge to +5 PSI
4. Insert into permanent HDPE shells
5. Verify chirp acknowledgment
6. Log deployment in system

### 9.1.2 Summer: Active Monitoring (June-August)

**Monitoring:**
- Telemetry: Continuous (1-hour chirp default)
- Anomaly response: 15-minute "Focus Ripple" mode
- Irrigation events: Real-time tracking

**Maintenance:**
- Weekly: DHU solar panel cleaning
- Bi-weekly: Pressure-decay tests (VFA nitrogen)
- Monthly: PMT battery voltage checks

### 9.1.3 Fall: Pre-Harvest Extraction (September-October)

**Trigger:** 2 weeks before projected harvest
**Duration:** 10 minutes per sensor
**Storage:** Sled Hospital facility (RSS)

**Workflow:**
1. Unlock retaining pins
2. Extract Alpha-Sleds with stainless cable
3. Cap HDPE shells with blanking plugs
4. Transport to Sled Hospital
5. Deep-diagnostics (full sensor validation)
6. Trickle-charge batteries
7. Store at 15°C, 40% RH

### 9.1.4 Winter: Hibernation (November-March)

**Sled Hospital Operations:**
- Temperature: Maintained 15-20°C
- Battery: Trickle charge (0.1C rate)
- Diagnostics: Monthly health checks
- Firmware: Quarterly updates (if needed)
- Calibration: Annual recertification

**Permanent Shells:**
- Blanking plugs prevent water ingress
- No maintenance required
- Visual inspection only (annual)

---

## 9.2 Maintenance Operations

### 9.2.1 Sled Hospital

**Facility:** Modified 20' container at RSS
**Capacity:** 500 Alpha-Sleds (phased inventory)

**Workflow:**
| Step | Action | Duration |
|------|--------|----------|
| 1 | Receiving (from field) | 5 min |
| 2 | External cleaning | 10 min |
| 3 | Deep-diagnostic (full test) | 30 min |
| 4 | Battery analysis/replacement | 15 min |
| 5 | Nitrogen recharge | 5 min |
| 6 | Firmware update (if needed) | 10 min |
| 7 | Storage assignment | 5 min |
| **Total** | | **80 min per sled** |

### 9.2.2 Field Service Protocol

**Response Times:**
| Severity | Issue | Response | Resolution |
|----------|-------|----------|------------|
| 1 | PMT failure | 4 hours | Replacement |
| 2 | VFA/LRZ offline | 24 hours | Diagnosis |
| 3 | PFA fault | 2 hours | Emergency stop verification |
| 4 | DHU offline | 8 hours | Field visit |

---

## 9.3 Fleet Operations Scale

**Subdistrict 1 (1,280 fields):**
| Metric | Value |
|--------|-------|
| Total nodes | 25,600 |
| Sled Hospital throughput | 80 sleds/day |
| Extraction window | 30 days |
| Technicians required | 6 FTE |
| Vehicles | 3 (service trucks) |

**Annual Cycles:**
- Insertion: 25,600 sleds (April)
- Extraction: 25,600 sleds (September)
- Hospital processing: 51,200 operations/year

