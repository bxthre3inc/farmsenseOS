# Knowledge Item: CSA (Corner-Swing Auditor) V1.0

## Role: Dual-Node Kinematic Resolver for Swing Arms (Layer 1.5)

The CSA consists of **two PMT-derived nodes** that resolve the exact GPS coordinate and water balance for center-pivot swing arms (corners), enabling precise VRI in square field corners.

## Configuration: PST + SAT

- **PST (Primary Span Tracker)**: Mounted on the **last fixed span** of the pivot.
- **SAT (Swing-Arm Tracker)**: Mounted on the **swinging corner arm**.
- **BLE Synchronization**: BLE 5.2 RSSI + Angle of Arrival (AoA) cross-verifies GNSS positioning.
- **Angular Resolution**: ±0.05° (±0.1° BLE ranging), critical for 1m VRI in SLV square corners.

## Elbow Trigonometry Logic

`CSAAlignmentService` ingests dual-node angular payload (PST angle + SAT angle) to:

1. Calculate the GPS coordinates of the "elbow" (junction) from the pivot center.
2. Calculate exact nozzle GPS coordinates relative to the elbow using SAT angle.
3. Place audited water volume into the 1m virtual grid (`map_to_kriging_grid()`).

## Hydraulic Hammer Detection

The SAT unit detects the vibration signature of end-gun solenoid firing via IMU, timestamping the surge event and logging actual applied volume in the Digital Ledger.

## Unit Cost: $2,224.00 (PST + SAT combined)

| Component | Qty | Unit Cost | Extended |
|:---|:---:|:---:|:---:|
| ATSAMD51 / BNO055 Core Sled | 2 | $105.00 | $210.00 |
| u-blox ZED-F9P GNSS | 2 | $185.00 | $370.00 |
| Badger Meter Ultrasonic Array | 2 | $680.00 | $1,360.00 |
| Corner-Arm V-Mount Bracket | 2 | $42.00 | $84.00 |
| 20W Solar + 20Ah Battery (per node) | 2 | $100.00 | $200.00 |
| **Total** | | | **$2,224.00** |
