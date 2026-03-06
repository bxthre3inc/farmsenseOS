---
id: 3.1-RF-Coexistence-Study
title: 5GHz LTU + 900MHz LoRa Interference Study
owner: rf-systems-architect
status: planned
priority: p1
due: 2026-03-24
deliverable: RF-Coexistence-Report
---

# RF Coexistence Report: 5GHz LTU & 900MHz LoRa

## Objectives

Since the Pivot Motion Tracker (PMT) unifies a 5GHz Ubiquiti LTU backhaul and a 900MHz Semtech SX1262 LoRa sensor gateway within the same IP67 polycarbonate enclosure, this study verifies that their simultaneous operation does not cause desensitization (desense) or adjacent-channel interference.

* Can the PMT use 5GHz LTU while simultaneously receiving 900MHz LoRa bursts from field sensors?
* What is the minimum physical separation needed between the LTU sector and LoRa gateway antennas on the DHU architecture?

## Methodology & Test Plan

### 1. Bench "Worst-Case" Test

* **Procedure**: Activate PMT 5GHz LTU radio at full Tx power (+22 dBm) transmitting a continuous UDP flood to a dummy DHU node. Concurrently, use an RF signal generator to feed -120 dBm LoRa test packets directly into the SX1262 receiver.
* **Expected Result**: Measure packet loss on the LoRa receiver.

### 2. Anechoic Chamber Desense Measurement

* **Procedure**: Vary the 5GHz LTU power from 0 dBm to +22 dBm while measuring the noise floor on the SX1262 using a spectrum analyzer.
* **Expected Result**: Document any degradation in the 900MHz reception floor (baseline is -148 dBm).

### 3. Field Test (CSU Pilot Site)

* **Procedure**: Deploy 2 PMTs at the CSU SLV Pilot site. Track LTE-M failover events correlating with LTU activity and simultaneously log LoRa packet success rates from VFA anchors.
* **Expected Result**: Assess the near-far problem scenario under real-world canopy conditions.

## Acceptance Criteria

- LoRa packet loss < 1% with 5GHz LTU at full power.
* No degradation in 900MHz reception below -120dBm sensitivity.

*Pending execution at CSU SLV Pilot Site.*
