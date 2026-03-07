# Knowledge Item: AlphaSled PCBA (Shared VFA/LRZ Platform)

## Overview

The AlphaSled is the shared internal PCBA used across both VFA and LRZ nodes. It standardizes the sensing, radio, and encryption stack for the entire field node family.

## Main SoC: Nordic nRF52840 (Cortex-M4F)

- LoRa Mesh via SPI to Semtech SX1262.
- Hardware AES-128/256 crypto engine.

## GPIO Pinout Map

| Pin | Function | Peripheral | Logic Level |
|:---|:---|:---|:---|
| P0.02 | AIN0 | Dielectric Sensor 1 (10") | 12-bit ADC |
| P0.03 | AIN1 | Dielectric Sensor 2 (18") | 12-bit ADC (LRZ only) |
| P0.28 | SPI_SCK | LoRa Radio Clock | High-Speed SPI |
| P0.29 | SPI_MOSI | LoRa Data In | High-Speed SPI |
| P0.30 | SPI_MISO | LoRa Data Out | High-Speed SPI |
| P0.31 | LoRa_CS | Radio Chip Select | Active Low |
| P1.01 | BMS_INT | Battery Management Interrupt | Fault Detection |
| P1.02 | AUX_EN | Auxiliary Actuator Port | PWM Control |

## LoRa Radio Sub-Module (Semtech SX1262)

- **Frequency**: 902–928 MHz (ISM Band).
- **Output Power**: +22 dBm max.
- **Sensitivity**: −148 dBm.

## Key SX1262 Register Commands

| Operation | Code | Description |
|:---|:---|:---|
| SetPacketType | 0x8A | LoRa vs GFSK mode |
| SetRfFrequency | 0x86 | 902–928MHz carrier |
| SetPaConfig | 0x95 | Powers +22dBm PA |
| SetBufferBaseAddress | 0x8F | 0x00 TX, 0x80 RX |
| GetStatus | 0xC0 | Returns chip mode |

## Crystal & Timing

- **32MHz TCXO**: ±0.5ppm stability across −40°C to +50°C.
- Essential for LoRa narrow-band ping integrity during SLV temperature extremes.
