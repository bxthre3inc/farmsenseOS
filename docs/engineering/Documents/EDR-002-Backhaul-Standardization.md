---
id: 1.2-Backhaul-Standardization
title: PMT→DHU Backhaul Standardization
owner: network-systems-engineer
status: resolved
priority: p0
due: 2026-03-20
deliverable: EDR-002
---

# EDR-002: PMT to DHU Backhaul Standardization

## Context

The PMT specification had conflicting claims for its primary backhaul to the District Hub (DHU), stating both 2.4GHz WiFi/Direct and 5GHz LTU. LTE-M was listed as a failover.

## Decision

Standardize the PMT to DHU Backhaul structure:

* **Primary Backhaul**: 5GHz Ubiquiti LTU Sector
* **Failover Backhaul**: LTE-M (Telit ME910G1)
* **Action**: Remove 2.4GHz WiFi/Direct backhaul from use.

## Rationale

* The 5GHz LTU provides 10km+ range with sector antennas.
* Eliminates 2.4GHz congestion from pivot motors and pumps.
* LTE-M is a proven backup for the DHU infrastructure.
* Simplifies BOM by consolidating radio intent (though ESP32-S3 retains WiFi natively, we will not utilize the external WiFi bridging for this critical backhaul). Added the dedicated 5GHz LTU Module.

## Resulting Action Items Completed

- [x] PMT V1.7 Spec updated to remove WiFi/Direct references for DHU backhaul.
* [x] PMT BOM updated: Added 5GHz Ubiquiti LTU module ($45) and incremented per-unit cost up to $1,080.50.
* [x] Failover correctly documented as LTE-M.
