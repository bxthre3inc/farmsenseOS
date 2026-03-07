# Knowledge Item: Radio Protocol & Backhaul Decisions

## Standardized Radio Terminology (Radio Glossary v1.0)

All FarmSense documentation must use the following standard terms:

| Deprecated | Standard | Rationale |
|:---|:---|:---|
| "900MHz FHSS" | **900MHz LoRa Mesh** | We use SX1262 LoRa physical layer, not FHSS |
| "LoRaWAN" | **900MHz LoRa Mesh** | We use raw LoRa physical layer, not LoRaWAN MAC |
| "FHSS Chirps" | **LoRa Bursts** | Correct modulation is CSS (Chirp Spread Spectrum) |

## EDR-001: PMT Receiver Protocol Decision (Resolved)

**Decision**: PMT uses **Semtech SX1262** for sensor mesh reception (NOT nRF52840).

- SX1262 = native LoRa compatibility with LRZ field sensors.
- $4.00 vs $6.50; 6-week vs 8-week lead time.
- PMT versioned from V1.6 → V1.7 after this change.

## EDR-002: PMT→DHU Backhaul Standardization (Resolved)

**Decision**: PMT to DHU backhaul:

- **Primary**: 5GHz Ubiquiti LTU Sector (10km+ range, avoids 2.4GHz pivot motor congestion).
- **Failover**: LTE-M (Telit ME910G1).
- **Removed**: 2.4GHz WiFi/Direct (congestion + range issues).

## PMT Backhaul Failover State Machine

Thresholds that trigger failover from LTU to LTE-M:

- `LTU_MIN_RSSI`: -85 dBm
- `LTU_MIN_CCQ`: 75% (Client Connection Quality)
- `LTE_MIN_RSRP`: -115 dBm
- `HYST_TIMER`: 300 seconds (prevents link flapping)
- `POLL_RETRY`: 60 seconds (during total blackout)

## RF Coexistence Study (Pending — CSU SLV Pilot)

A formal study is planned to validate that the PMT's 5GHz LTU and 900MHz SX1262 don't desense each other when co-located in the same IP67 enclosure.

- Acceptance: LoRa packet loss <1% while LTU at full power.
- To be executed at the CSU SLV Pilot Site.

## DHU Architecture Note

The DHU's 5GHz LTU Sector Antennas cannot receive 900MHz LoRa. The DHU **requires a separate 900MHz LoRa Mesh gateway** in addition to the sector array. This was a resolved disconnect from the telemetry stress-test.
