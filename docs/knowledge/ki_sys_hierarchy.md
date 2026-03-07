# Knowledge Item: System Hierarchy, Connectivity & Operating Logic

## Data Flow Hierarchy

| Layer | Node | Role |
|:---|:---|:---|
| Layer 0 (Air) | eBee Ag, DJI Mavic 3M | Aerial NDVI/NDWI spatial priors |
| Layer 1 (Source) | LRZ1, LRZ2, VFA, PFA, CSA | Raw telemetry collection |
| Layer 1.5 (Hub) | PMT | Aggregates field node data + own kinematics |
| Layer 2 (District) | DHU | Edge kriging + PBFT consensus |
| Layer 3 (Cortex) | RSS | Legal vault + 1m master grid + OTA management |

## Communication Standards by Layer

- **L1→L1.5**: 900MHz LoRa Mesh — CSS (Chirp Spread Spectrum) modulation, NOT FHSS. AES-128 encrypted. 100% corn/potato canopy penetration.
- **L1.5→L2**: 5GHz Ubiquiti LTU Point-to-Point (High bandwidth backhaul). LTE-M/NB-IoT failover.
- **L2→L3**: Fiber ONT primary + Starlink Business failover.
- **Security**: AES-128 encrypted at node; HSM block signing at RSS.

## Field Deployment Density (2:4:12 Stereo Ratio)

Per 140–160 acre field:

- 2× VFA (Foundation, static anchors)
- 4× LRZ2 (Reference, spatial density)
- 12× LRZ1 (Truth, calibration anchors)
- 1× PMT + 1× PFA + 1× CSA (if corner pivot)

## VRI Control Tiers

| Tier | Hardware | Precision |
|:---|:---|:---|
| Tier 1 (Speed-VRI) | PMT | Pivot travel speed control |
| Tier 2 (Section-VRI) | SSN (Smart Section Nodes) | Section-level on/off |
| Tier 3 (Grid-VRI) | ISN (Integrated Smart Nozzles) | 1m-pixel precision |

## Spatial Fidelity Tiers (Product)

- **FREE**: 50m Grid (PMT-native edge compute).
- **BASIC**: 20m Grid (DHU-computed).
- **ENTERPRISE**: 10m Grid (RSS-computed).
- **RESEARCH/LEGAL**: 1m Grid (RSS Blitz Mode / 10Hz RTK Lock).
- **Future (Precision Query)**: 1cm surgical coordinate lookup.

## "Fisherman's Attention" Scale — Adaptive Update Frequency

| Mode | Interval | Trigger |
|:---|:---|:---|
| Dormant | 4 hours | Stable soil + parked pivot |
| Anticipatory | 1 hour | Rising ET (evapotranspiration) |
| Active | 15 minutes | Water moving or trend detected |
| Rapid | 5 seconds | Critical anomaly or C&C deployment |

## Frost Defense State Machine (VFA/LRZ/DHU)

1. Check T_Amb: If internal temp <0°C.
2. Charge Lock: Prohibit LiFePO4 charging until T_Cell >5°C.
3. Hibernation: If SoC <15%, drop to 1µA "Deep Freeze" sleep.
