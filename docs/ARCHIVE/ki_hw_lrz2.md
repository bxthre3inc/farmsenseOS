# Knowledge Item: LRZ2 (Reference Node) V1.21

## Role: Cost-Optimized Grid Extension Node

**Deployment Density**: **4 per field** (2:4:12 Stereo Ratio).
The LRZ2 extends the spatial density of the moisture grid at lower cost. Its readings are mathematical normalized against adjacent LRZ1 Truth Nodes by the Kriging engine.

## Physical Stack: 18U Alpha-Sled (Reference Configuration)

- Same form factor as LRZ1 with simplified sensing (dual-depth only).
- Viton O-rings + Nitrogen (+5 PSI) internal protection.
- Designed for rapid field deployment (<60 min per field with a 3-person crew).

## Electronics

- **MCU**: ASR6601 LoRa SoC (Cortex-M4 + SX1262).
- **State Machine**: Identical to LRZ1 (1.5µA sleep / 120mA TX).
- **Battery**: 2× LiFePO4 18650 (1.5Ah) cells.

## AKP-LRZ: Airborne Ballistic Kinetic Penetrator Variant

A specialized tactical emergency-deployment version of the LRZ2.

- **Deployment**: Air-dropped from UAVs or manned aircraft.
- **Nose Cone**: Hardened Cr-Mo (Chromium-Molybdenum) steel, embeds 4–8" into soil on impact.
- **Shock Resistance**: Electronics vacuum-potted in low-durometer viscoelastic polyurethane resin (survives 500G+ terminal impact).
- **Tactical Use**: Enables rapid mesh deployment without ground crew, for emergency or contested agricultural environments.

## Unit Cost (OEM Scale): $54.30

| Component | Cost |
|:---|:---|
| nRF52840 Embedded Sled | $13.80 |
| Proprietary 18U PCBA | $8.00 |
| LiFePO4 18650 (×2) | $13.00 |
| HDPE SDR9 Shell (2"×18") | $1.20 |
| Driving Tip (HDPE) | $3.50 |
| Viton Seal Kit | $4.80 |
| 316-SS Nitrogen Check Valve | $10.00 |
| **Total** | **$54.30** |

*(Prototype <100: $67.80 | Pilot 100–1000: $59.30)*
