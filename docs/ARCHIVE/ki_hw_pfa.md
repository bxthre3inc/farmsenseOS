# Knowledge Item: PFA (Pressure & Flow Anchor) V1.9

## Role: Layer 1 "Sentry of the Source" and Safety Actuator

**Integration**: Non-invasive (Cut-Less) wellhead/pivot mounting.
The PFA is the legal "meter" for the AllianceChain. All flow data is cryptographically signed at the edge before broadcast.

## Sensing Array

- **Energy Monitor**: 3× Magnelab 400A Split-Core CT Clamps (SCT-1250). Analyzes motor "Energy Signatures" for pump cavitation, bearing wear, and impeller imbalance.
- **Well Depth**: Dwyer Vented 316-SS PBLTX Transducer. Compensates for barometric swings → absolute hydrostatic depth.
- **Line Pressure**: TE Connectivity 250 PSI industrial transducer. Detects leaks/bursts.
- **Actuation Relay**: Omron 30A Industrial Control Relay (Dry Contact).

## Motor Signature Analysis ("Zo" Engine)

Real-time FFT on 3-phase motor current (6 ADC channels, 100ksps simultaneous sampling):

- **Bearing Wear**: Elevated spectral energy at 100–300Hz bands.
- **Impeller Imbalance**: Asymmetric phase loading >5%.
- **Cavitation**: High-frequency transients correlating with "air-gulping" hydraulic signatures.

## Core Processing

- **Processor**: NXP i.MX RT1020 (Cortex-M7 @ 500MHz). Selected for high-speed motor health FFTs.
- **ADC Channels**: 6 simultaneous (3× current phases + pressure + well depth + spare).
- **Buffer**: 40Ah LiFePO4 battery array (7-day blackout resilience).

## Actuation State Machine

| State | Condition | Action |
|:---|:---|:---|
| Safety-IDLE | Normal operation | Monitor only |
| Anticipatory-LOCK | PMT sends "Soft-Stop" intent | Prepare relay |
| Reflex-STOP | Line pressure >150 PSI OR stall detected | Relay opens, pump stops |
| Audit-COMMIT | Stop event occurs | Signed event broadcast to mesh |

## Firmware FlexPWM Register Logic (i.MX RT1020)

- `PWM_CTRL0`: 0x0040 (Independent pair mode for 3-phase timing).
- `PWM_SM0VAL1`: Motor frequency period (nominal 60Hz).
- `PWM_OUTEN`: Enables dry-contact relay driver on GPIO_AD_B0_05.

## Unit Cost: $961.50

| Component | Cost |
|:---|:---|
| Magnelab 400A CT Clamps (×3) | $110.00 |
| TE Connectivity 250 PSI Transducer | $140.00 |
| Dwyer PBLTX Well Sounder | $185.00 |
| NEMA 4X Enclosure | $55.00 |
| i.MX RT1020 Logic Board | $65.00 |
| 40Ah LiFePO4 Battery | $115.00 |
| Other (Relay, RF, Misc.) | $291.50 |
| **Total** | **$961.50** |
