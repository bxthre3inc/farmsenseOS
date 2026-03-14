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

### Detailed Installation Procedures (Step-by-Step)

**PMT Installation Procedure (Expanded):**

**Pre-Installation Checklist:**
1. Review site survey map
2. Verify pivot model and tower spacing
3. Confirm electrical tap availability (12VDC)
4. Check weather window (no precipitation forecast 24hr)
5. Gather tools and PMT kit

**Tools Required:**
| Tool | Specification | Purpose |
|------|-------------|---------|
| Torque wrench | 3/8" drive, 5-25 ft-lb | U-bolt tightening |
| Multimeter | True RMS, 600V | Voltage verification |
| GPS unit | Survey-grade, <1m accuracy | Position logging |
| Tablet | Ruggedized, farm dust rated | Configuration |
| Safety harness | OSHA compliant | Tower work |
| Fall protection | 6' lanyard | Tower work |

**Step-by-Step Installation:**

**Step 1: Tower Selection (10 minutes)**
- Inspect towers 2, 3, and 4 for structural integrity
- Check for weld cracks, rust, or deformation
- Select tower with best electrical access
- Verify clear sky view for GPS (no overhead obstructions)
- Mark selected tower with spray paint

**Step 2: Bracket Mounting (20 minutes)**
- Position stainless bracket at desired height (10-15 feet)
- Align with pivot span direction of travel
- Install U-bolts with anti-seize compound
- Torque to 15 ft-lb in star pattern
- Verify no movement with 50-lb lateral force

**Step 3: Spring Isolator Installation (15 minutes)**
- Mount 4× Vibrashock VSG-1 isolators to bracket
- Torque to 8 ft-lb
- Verify 0.5" travel range

**Step 4: Enclosure Mounting (10 minutes)**
- Attach Polycase ML-44F to isolators
- Orient with cable glands facing down
- Torque screws to 6 ft-lb

**Step 5: Antenna Installation (15 minutes)**
- Mount LoRa antenna (3ft whip) to top of bracket
- Spring base oriented for flex in wind
- Route coax through gland, seal with silicone
- Mount GPS antenna on 12" mast, clear view of sky
- Route GPS cable separately from power

**Step 6: Electrical Connection (20 minutes)**
- Locate 12V tap in pivot panel
- Verify voltage: 11.5-14.5V acceptable
- Install 5A inline fuse
- Route power cable through sealed gland
- Connect to PMT terminal block (observe polarity)
- Test: LED indicators illuminate

**Step 7: Flow Meter Installation (30 minutes)**
- Locate discharge pipe (downstream of pump, upstream of pivot)
- Clean pipe surface (remove paint, rust)
- Apply coupling compound
- Mount TFX-5000 transducers at 45° V-method
- Separation: 6" for 6" pipe, 12" for 12" pipe
- Torque clamps to 25 ft-lb
- Connect cable to PMT

**Step 8: Initial Power-On (10 minutes)**
- Switch on at pivot panel
- Observe PMT LED sequence:
  - Red solid: Booting (30 seconds)
  - Red blink: GNSS acquisition (up to 10 minutes)
  - Green solid: RTK fix achieved
  - Blue blink: LoRa transmission active

**Step 9: GNSS Configuration (20 minutes)**
- Connect tablet via BLE
- Launch FarmSense Field Config app
- Verify RTK base station connectivity
- Achieve "Fixed" solution (<2cm accuracy)
- Record position: LAT/LON/EL
- Save to device registry

**Step 10: IMU Calibration (15 minutes)**
- Command from app: "Start IMU Calibration"
- Keep PMT stationary for 30 seconds
- Verify all 9 axes report valid values
- Save calibration to flash

**Step 11: LoRa Range Test (15 minutes)**
- Command: "Test Chirp"
- Verify DHU acknowledgment
- Check RSSI: should be >-100dBm
- If weak, adjust antenna position

**Step 12: Full Rotation Test (30 minutes)**
- Start pivot in slow mode
- Monitor GNSS track on app
- Verify continuous position updates
- Verify IMU detects motion
- Stop pivot
- Verify pivot stop detected

**Step 13: Flow Zero Calibration (15 minutes)**
- Ensure pump is off
- Command: "Calibrate Flow Zero"
- Wait for stable reading (2 minutes)
- Save zero offset

**Step 14: Documentation (10 minutes)**
- Photograph installation
- Record final GPS coordinates (decimal degrees, 8 decimal places)
- Log firmware version
- Record battery voltage
- Sign off on installation certificate
- Upload to asset management system

**Post-Installation Verification (24-hour):**
- Check for 24 hours of continuous telemetry
- Verify hourly chirps received at DHU
- Confirm battery voltage stable
- Verify flow readings (when pump operates)

**Total Installation Time:** 4-5 hours per PMT
**Crew Required:** 2 technicians (one on ground, one on tower)

---

### Additional Crop Library Entries

**Crop: Corn (Maize)**

| Stage | Days | Root Depth | MAD % | Critical kPa |
|-------|------|------------|-------|--------------|
| Germination | 0-10 | 3" | 25% | 20-30 |
| Seedling | 10-25 | 6" | 30% | 30-40 |
| Vegetative | 25-50 | 12" | 40% | 40-50 |
| Tasseling | 50-65 | 24" | 30% | 30-40 |
| Silking | 65-75 | 30" | 25% | 25-35 |
| Grain fill | 75-105 | 36" | 50% | 50-70 |
| Maturity | 105-120 | 36" | 60% | 70-90 |

**Critical Periods:**
- Tasseling/Silking: Never allow stress; yield reduction permanent
- Grain fill: Moderate stress acceptable; early stress reduces kernel depth

**Kc Values (Crop Coefficient):**
| Stage | Kc | ET₀ Multiplier |
|-------|-----|----------------|
| Initial | 0.3 | Low demand |
| Development | 0.8-1.2 | Increasing |
| Mid-season | 1.2 | Peak demand |
| Late | 0.6-0.4 | Declining |

---

**Crop: Winter Wheat**

| Stage | Calendar | MAD % | Notes |
|-------|----------|-------|-------|
| Planting | October | 50% | Establishment critical |
| Overwinter | Nov-Feb | 70% | Dormant, minimal needs |
| Green-up | March | 40% | Resume irrigation |
| Jointing | April | 30% | Stem elongation |
| Heading | May | 25% | Critical for yield |
| Grain fill | June | 40% | Moderate stress OK |
| Maturity | July | 60% | Allow dry-down |

**Frost Risk Integration:**
- Green-up irrigation delays: Account for frost risk in scheduling
- Tender growth stages: Avoid saturation before freeze events

---

**Crop: Soybean**

| Stage | Days | Root Depth | MAD % | Critical |
|-------|------|------------|-------|----------|
| Emergence | 0-10 | 3" | 30% | Establishment |
| Vegetative | 10-40 | 12" | 45% | Moderate drought OK |
| Flowering | 40-70 | 24" | 30% | Critical period |
| Pod fill | 70-100 | 36" | 40% | Seed size determined |
| Maturity | 100-120 | 36" | 50% | Allow dry-down |

**Nodulation Consideration:**
- Rhizobia activity requires moist (not saturated) soil
- First irrigation timing affects nodulation establishment

---

### Regional Dielectric Reference Tables (Additional Soils)

**Hooper Sandy Clay Loam:**
| Depth (cm) | Target VWC | Dielectric ε | Bulk Density |
|------------|------------|--------------|--------------|
| 10 | 19% | 5.50 | 1.42 |
| 30 | 22% | 6.20 | 1.44 |
| 60 | 25% | 6.90 | 1.46 |
| 90 | 28% | 7.60 | 1.48 |
| 120 | 31% | 8.30 | 1.50 |

**Olney Fine Sandy Loam:**
| Depth (cm) | Target VWC | Dielectric ε | Bulk Density |
|------------|------------|--------------|--------------|
| 10 | 14% | 4.20 | 1.38 |
| 30 | 17% | 4.80 | 1.40 |
| 60 | 20% | 5.50 | 1.42 |
| 90 | 23% | 6.20 | 1.44 |
| 120 | 26% | 6.90 | 1.46 |

**Weld Clay:**
| Depth (cm) | Target VWC | Dielectric ε | Bulk Density |
|------------|------------|--------------|--------------|
| 10 | 24% | 7.10 | 1.48 |
| 30 | 27% | 8.00 | 1.50 |
| 60 | 30% | 8.90 | 1.52 |
| 90 | 33% | 9.80 | 1.54 |
| 120 | 36% | 10.70 | 1.56 |

---

### Expanded Quality Assurance Test Results

**Salt Fog Corrosion (ASTM B117):**
- Duration: 1,000 hours continuous
- Concentration: 5% NaCl, 35°C
- Result: No corrosion on SS-304, minimal on SS-316
- Coating degradation: None on PVDF-coated enclosures
- Status: PASS for SLV alkali environment

**Thermal Shock (MIL-STD-810H Method 503.7):**
- Range: -40°C to +70°C
- Rate: 10°C/minute
- Cycles: 100
- Result: All seals intact, no delamination
- Status: PASS

**Solar Radiation (MIL-STD-810H Method 505.7):**
- Irradiance: 1,120 W/m² (simulated 8,000ft altitude)
- Duration: 500 hours
- UV-B enhanced
- Result: Uncoated PC yellowed 15%, PVDF-coated unchanged
- Status: PASS (coated), CONDITIONAL (uncoated)

**Dust (MIL-STD-810H Method 510.7):**
- Dust composition: Arizona road dust (alkali-rich)
- Concentration: 10 g/m³
- Duration: 6 hours
- Result: No ingress (IP67 maintained)
- Status: PASS

**Icing/Freezing Rain (MIL-STD-810H Method 521.4):**
- Ice accumulation: 6mm
- Duration: 4 hours
- Result: Antenna ice loading acceptable, heating elements effective
- Status: PASS

**Combined Environmental (Sequential):**
- Low temp storage: -40°C, 24hr
- High temp storage: +70°C, 24hr
- Temperature shock: -40°C to +70°C, 5 cycles
- Random vibration: 3hr per axis
- Result: Zero failures
- Status: PASS

---

### Maintenance Schedule Detailed

**Daily (Automated Monitoring):**
| Check | Threshold | Alert |
|-------|-----------|-------|
| PMT last chirp | >1 hour ago | WARNING |
| Battery voltage | <3.3V | WARNING |
| Battery voltage | <3.0V | CRITICAL |
| Flow rate anomaly | >120% baseline | ALERT |
| IMU stall event | Any detection | CRITICAL |
| DHU link status | >4 hours down | CRITICAL |

**Weekly (Field Technician):**
| Task | Duration | Tools |
|------|----------|-------|
| DHU solar panel cleaning | 15 min | Soft brush, distilled water |
| Visual inspection (all nodes) | 30 min | Binoculars |
| Chirp log review | 10 min | Dashboard |
| Backup battery check | 5 min | Multimeter |

**Monthly (Service Visit):**
| Task | Duration |
|------|----------|
| PMT battery voltage log download | 15 min |
| VFA nitrogen pressure check | 20 min |
| Antenna connection torque check | 15 min |
| Enclosure seal inspection | 10 min |
| Firmware version audit | 5 min |

**Quarterly (Maintenance Crew):**
| Task | Duration |
|------|----------|
| Deep diagnostics on 10% sample | 4 hours |
| Nitrogen top-off (as needed) | 30 min per VFA |
| O-ring inspection | 1 hour per field |
| Calibration drift check | 2 hours per field |

**Annually (Factory Service):**
| Task | Duration |
|------|----------|
| Full extraction and Sled Hospital processing | 2 days per 100 fields |
| Battery replacement (predictive) | Included in extraction |
| Firmware major updates | Overnight batch |
| Calibration recertification | 30 min per VFA |
| Structural inspection (enclosures) | Visual only |