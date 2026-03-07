---
id: 3.2-Failover-Logic
title: LTE-M vs 5GHz LTU Priority Logic
owner: firmware-engineer
status: planned
priority: p1
due: 2026-03-24
deliverable: Failover-State-Machine-Specification
---

# Failover State Machine Specification: 5GHz LTU to LTE-M Backhaul

## Context

The Pivot Motion Tracker (PMT) utilizes a primary 5GHz Ubiquiti LTU backhaul to transmit data to the District Hub (DHU), with a Telit ME910G1 LTE-M modem serving as a cellular failover. This document specifies the deterministic state machine logic for seamlessly transitioning between these interfaces to maintain critical connectivity while preventing "link flapping" (rapid, continuous switching).

## Parameters & Thresholds

| Parameter | Identifier | Value | Description |
|-----------|------------|-------|-------------|
| LTU Minimum Threshold | `LTU_MIN_RSSI` | -85 dBm | The minimum Received Signal Strength Indicator (RSSI) for a stable 5GHz link. |
| LTU Quality Threshold | `LTU_MIN_CCQ` | 75% | Client Connection Quality (CCQ). If below 75%, packet loss is deemed unacceptably high. |
| LTE Minimum Threshold | `LTE_MIN_RSRP` | -115 dBm | Reference Signal Received Power for LTE-M. |
| Flapping Hysteresis | `HYST_TIMER` | 300 sec | Once failed over to LTE-M, the system will not attempt to revert to LTU for exactly 5 minutes, regardless of instantaneous LTU recovery, to prevent flapping. |
| Buffer Outage Retry | `POLL_RETRY` | 60 sec | During total blackout, wait 60s before polling both interfaces again. |

## Failover Logic (Python Pseudocode)

```python
def evaluate_backhaul_priority(ptu_telemetry):
    ltu_rssi = get_ltu_rssi()
    ltu_ccq = get_ltu_ccq()
    lte_rsrp = get_lte_rsrp()
    
    # Check if we are currently locked in Hysteresis
    if is_hysteresis_active():
        return utilize_active_backhaul()

    # Primary Decision Tree
    if ltu_rssi > LTU_MIN_RSSI and ltu_ccq > LTU_MIN_CCQ:
        return use_backhaul(LTU_5GHZ)
        
    elif lte_rsrp > LTE_MIN_RSRP:
        activate_hysteresis_timer(HYST_TIMER)
        log_event("BACKHAUL_FAILOVER: LTU degraded. Transitioning to LTE-M.")
        return use_backhaul(LTE_M)
        
    else:
        log_event("BACKHAUL_OUTAGE: Both LTU and LTE-M unreachable. Entering Buffer Mode.")
        enter_buffer_mode() # Buffer telemetry to internal PSRAM/Flash
        wait(POLL_RETRY)
        return evaluate_backhaul_priority(ptu_telemetry)
```

## Action Items

- [x] Defined `LTU_MIN_THRESHOLD` (combining RSSI and CCQ).
- [x] Defined `LTE_MIN_THRESHOLD` (-115 dBm RSRP).
- [x] Implemented a 300-second hysteresis timer to prevent link flapping.
- [ ] Test failover under controlled conditions (Pending execution at CSU SLV Pilot Site).
