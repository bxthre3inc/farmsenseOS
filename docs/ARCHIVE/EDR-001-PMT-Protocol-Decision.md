---
id: 1.1-PMT-Receiver-Protocol
title: PMT Receiver Protocol Decision
owner: rf-systems-architect
status: resolved
priority: p0
due: 2026-03-20
deliverable: EDR-001
---

# EDR-001: PMT Receiver Protocol Decision

## Context

The Pivot Motion Tracker (PMT) specification (V1.6) had conflicting radio claims for its sensor mesh reception, alternating between `nRF52840` (FHSS) and `SX1262` (LoRa).

## Decision

Standardize on the **Semtech SX1262** for the PMT receiver.

## Rationale

* **Compatibility with LRZ**: The SX1262 provides a native LoRa match, ensuring mesh compatibility with field sensors, whereas the nRF52840 uses a different protocol.
* **Range (Dense Canopy)**: The SX1262 provides a proven 100% penetration claim through potato/corn canopies.
* **BOM Cost & Lead Time**: The SX1262 is integrated, cheaper ($4.00 vs $6.50), and has a shorter lead time (6 weeks vs 8 weeks).

## Resulting Action Items Completed

- [x] PMT spec updated from V1.6 to V1.7 to remove nRF52840 references and incorporate Semtech SX1262.
* [x] PMT BOM verified to specify SX1262 (not nRF52840).
* [x] Firmware spec updated in PMT V1.7 to reflect Semtech SX1262 SDK.
