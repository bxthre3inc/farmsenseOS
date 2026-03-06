# FarmSense Radio Glossary v1.0

## Standardized Terminology

To maintain consistency and accuracy across all FarmSense documentation, hardware specifications, and engineering plans, the following standardized terminology must be used. We rely on the physical LoRa layer (via Semtech SX1262 and similar transceivers) to create our own proprietary mesh networking structure, rather than adhering to wide-area network protocols.

| Deprecated / Inconsistent Term | New Standard Term | Definition / Rationale |
|--------------------------------|-------------------|----------------------|
| "900MHz FHSS" | **"900MHz LoRa Mesh"** | Refers to the Semtech SX1262-based star/mesh topology used by our field sensors. |
| "LoRaWAN" | **"900MHz LoRa Mesh"** (or simply "LoRa Mesh") | We use raw LoRa physical layer modulation, not the LoRaWAN MAC protocol layer or its network architecture. |
| "FHSS Chirps" | **"LoRa Bursts"** | Removes FHSS terminology; we use LoRa chirp spread spectrum (CSS) modulation. |
| "LoRa Alliance" | **"LoRa Physical Layer"** | We are not seeking LoRaWAN certification, so references shouldn't imply Alliance adherence. |

*Last Updated: 2026-03-06*
