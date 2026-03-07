# FarmSense Documentation Reconciliation Report

**Critical Misalignments Identified & Resolved**
*Last Updated: 2026-03-06*

## 1. 🔴 SENSOR RADIO CONFLICTS (Resolved)

- Original PMT Spec Table: nRF52840 (BLE/Thread/Zigbee)
- Original LRZ Spec: SX1262 (LoRa) + ASR6601
**RESOLUTION**: Standardized PMT and LRZ on **Semtech SX1262 (LoRa)**. EDR-001 created. PMT V1.7 updated.

## 2. 🔴 BACKHAUL ARCHITECTURE CONFLICTS (Resolved)

- Original Text: PMT to DHU: WiFi/Direct (2.4GHz)
- Original Spec Table: PMT to DHU: 5GHz LTU
**RESOLUTION**: Standardized on **5GHz Ubiquiti LTU** as primary backhaul and **LTE-M** as failover. WiFi removed due to canopy interference. EDR-002 created. PMT V1.7 updated. Failover State Machine logic defined (Task 3.2).

## 3. 🔴 TERMINOLOGY INCONSISTENCIES (Resolved)

- Conflicting terms used for mesh architecture: "FHSS", "900MHz FHSS", "LoRaWAN", "LoRa Alliance".
**RESOLUTION**: Established the `FarmSense-Radio-Glossary-v1.0.md`. Standardized entirely on **"LoRa Mesh"** (physical layer, proprietary routing). Replaced all instances of "FHSS" and "LoRaWAN" across all specifications and project documents via global script replacement.

## 4. 🔴 BOM AND COSTING DISCREPANCIES (Resolved)

- PMT BOM: Was missing LTU ($45) and LTE-M ($110) backhaul modules.
- DHU BOM: Was conflating the Orin Nano with the Mesh gateway role.
- LRZ Costing: Conflicting prices found ranging from $51.50 to $67.80 across specs and investor decks.
**RESOLUTION**:
- PMT BOM corrected to $1,140.50 in `hardwarebreakdown.md`.
- DHU BOM explicitly defined Jetson Orin Nano (Kriging Engine) and ESP32-S3 (LoRa Gateway).
- LRZ OEM Canonical Cost established at **$54.30**. All specs, BOMs, Business Plans, and Grant Proposals corrected via global script replacement to reflect this tier.

*Report Finalized. All known engineering ambiguities from V1 specs have been reconciled via the Engineering Review Plan.*
