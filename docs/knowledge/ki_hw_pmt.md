# Knowledge Item: PMT (Pivot Motion Tracker) V1.7

## Role: Primary Field & Kinematic Aggregator (Layer 1.5)

The PMT aggregates data from all field Source Nodes (LRZ1, LRZ2, VFA, CSA) via **900MHz LoRa Mesh (SX1262, CSS modulation)** AND captures its own internal kinematic, hydraulic, and positional telemetry before performing unified backhaul to the DHU via **5GHz Ubiquiti LTU (primary) / LTE-M failover**.

- **Mounting**: Cut-Less (Band-It stainless steel straps) on the main galvanized pivot span.

## Internal Sensor Suite

- **GNSS**: u-blox ZED-F9P Multi-Band RTK (<5cm absolute accuracy). Backup: Saft LS14500 LiSOCl2 hibernation pack for RTC/ephemeris preservation during winter.
- **IMU**: Bosch BNO055 9-Axis sensor. Monitors for "Crabbing" (structural misalignment) and vibration harmonics at 200Hz.
- **Flow**: Badger Meter TFX-5000 clamp-on ultrasonic transit-time pair (±1.0% accuracy, non-invasive, no pressure drop).

## Sensor Fusion: Motion Differentiation

The PMT determines whether the pivot is "Walking" (dry movement) or "Irrigating" by correlating:

1. **GNSS Velocity**: >0.05 m/s threshold.
2. **IMU Vibration**: High-frequency (200Hz) spectral analysis of galvanized pipe signature.
3. **Ultrasonic Flow**: If flow >100 GPM, confirms "Irrigation-On" state.

## Core Processing

- **CPU**: ESP32-S3-WROOM-1 (Dual-Core 240MHz + vector acceleration).
- **SRAM**: 512KB internal + 2MB Octal PSRAM for IMU/GNSS buffering.
- **Flash**: 8MB dual-banked (OTA update support).
- **Edge Grid Math**: Calculates 50m-resolution spatial probability grid (16×16 matrix) natively for failover VRI operations if DHU link drops.

## Bus Architecture

| Bus | Peripheral | Details |
|:---|:---|:---|
| I²C | Bosch BNO055 | Address 0x28, 400kHz |
| UART 1 | u-blox ZED-F9P | 921,600 bps |
| UART 2 | Badger TFX-5000 | 9600-8-N-1 |
| SPI | SX1262 LoRa | Sensor Mesh Radio |

## Reflex Hierarchy (Firmware State Machine)

- **Layer 0 (Reflex)**: IMU >5.0g (Stall/Collision) → immediately broadcast "Soft-Stop" to DHU/PFA.
- **Layer 1 (Hydraulic)**: Correlate flow Δt (picoseconds) with GNSS velocity.
- **Layer 2 (Mesh)**: Acts as local Time-Server for entire field sensor fleet.

## RTK GNSS State Machine

| State | Accuracy | Condition |
|:---|:---|:---|
| RTK-FIBER | <2cm | Full correction lock |
| DR-FLOAT | ~1m | Dead-reckoning fallback (GPS obstructed by pivot span) |
| Cold Start | 35s | First power-on |
| Warm Start | <5s | With LS14500 backup battery |

## Unit Cost: $985.50 (BOM Scale) / $1,112 (Installed)

| Component | Cost |
|:---|:---|
| ESP32-S3 Logic Board | $18.50 |
| u-blox ZED-F9P | $140.00 |
| Badger Meter TFX-5000 | $648.00 |
| Bosch BNO055 IMU | $32.00 |
| 10W Solar + Saft LS14500 | $120.00 |
| Polycase IP67 Housing | $45.00 |
| SX1262 LoRa + 5GHz LTU Bridge + LTE-M | $167.00 |
| **Total BOM** | **$985.50** |
