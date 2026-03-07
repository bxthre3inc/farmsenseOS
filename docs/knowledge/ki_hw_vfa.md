# Knowledge Item: VFA (Vertical Field Anchor) V1.21

## Role: Layer 1 Sub-surface Foundation Node

**Network**: Reports directly to the PMT Primary Aggregator.
**Deployment Density**: **2 per field** (2:4:12 Stereo Ratio), acting as the static spatial anchors and the deepest percolation gatekeepers.

## Structural Architecture: Dual-Cylinder Isolation

- **Outer Shell**: 2" HDPE SDR9 (High-Albedo White), 48-inch length. Remains buried **year-round** to preserve the spatial baseline.
- **Internal Sled**: 50mm Alpha-Sled co-extrusion housing the 48U modular cartridge.
- **Sealing**: Viton (FKM) O-rings + Nitrogen (+5 PSI) active internal defense.

## 48U Physical Stack — Sensor Depth Sequence

| Slot | Depth | Sensor Type | Measurement |
|:---|:---|:---|:---|
| 1–5 | Top | Desiccant + Battery (3× 21700 Li-ion) | Power |
| 10 | 10" | **Advanced** | NPK / EC / pH (Active Root Zone Proxy) |
| 18 | 18" | Basic | Evaporation Transition Monitoring |
| 25 | 25" | **Advanced** | Mature Root Zone "Pivot Point" |
| 35 | 35" | Basic | Descending Wetting Front Tracking |
| 48 | 48" | **Advanced** | Deep Percolation Anchor ("Waste" gatekeeper) |

## Sensing Physics: Non-Contact Dielectric (The Proxy Method)

- **Mechanism**: ~100MHz EM fields projected through the HDPE SDR9 wall — no direct soil contact required.
- **Calibration**: Remotely calibrated by the RSS RDC Compute cluster using Bayesian priors. **No manual field calibration needed.**
- **Sensor Controller**: ATSAMD21G18 with I2C registers (0x01 = Dielectric Count, 0x02 = Thermal Comp, 0x03 = EC Correction).

## Electronics: AlphaSled PCBA

- **Main SoC**: Nordic nRF52840 (Cortex-M4F) + SX1262 LoRa via SPI.
- **Radio**: SX1262 @ 902–928 MHz, +22 dBm output, −148 dBm sensitivity.
- **Encryption**: AES-128/256 hardware crypto; every payload is cryptographically signed before transmitting to the mesh.

## Firmware State Machine (RTOS)

1. **BOOT**: Verify AES-128 key integrity in secure flash.
2. **CALIBRATE**: Self-zero the Dielectric ADC against internal reference voltage.
3. **CHIRP-WAIT**: Listen for sync beacon from PMT.
4. **SAMPLE**: Execute synchronized dielectric ping across the full 48U stack.
5. **ENCRYPT**: Sign payload with local Private Key.
6. **TRANSMIT**: Execute LoRa Mesh burst.
7. **SLEEP**: Enter 1.5µA Deep Sleep.

## Interrupt Priority Levels

- **P0 (Emergency)**: High-speed pressure transients from PFA → triggers soft-stop.
- **P1 (Mesh Coordination)**: LoRa Mesh window sync for associated LRZ scouts.
- **P2 (Dielectric Sampling)**: ADC conversions and thermal compensation.

## Manufacturing Details

- **HDPE Shell Tolerance**: ±0.005" for precise dielectric gap consistency.
- **Nitrogen Manifold**: Chemically-etched 316-SS ports with double Viton redundancy.
- **Driving Tip**: Zinc-plated friction-formed alloy, A5-H8 hardness, oxidation-resistant.

## Unit Cost: $159.65 (OEM Scale)

| Component | Cost |
|:---|:---|
| nRF52840 PCBA | $6.50 |
| Proprietary Dielectric Stack (×5) | $50.00 |
| 21700 Li-ion Battery (×5) | $83.75 |
| HDPE SDR9 Shell (2"×48") | $2.50 |
| Driving Tip | $4.25 |
| Viton Seal Kit + N₂ Port | $0.80 |
| **Total** | **$159.65** |
