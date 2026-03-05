# CSU SLV RC Pilot: Single-Unit Deployment Budget

This document outlines the estimated procurement costs for standard, single-unit retail purchases of the FarmSense components required for the Center, Colorado Pilot with CSU SLV RC.

Unlike the mass-manufactured OEM bulk pricing found in the Master Specifications, these estimates account for low-volume procurement markups, individual shipping, and single-run PCB fabrication premiums.

*Per the deployment requirements, the District Hub (DHU) and Regional Superstation (RSS) compute node are omitted from this budget.*

### 1. Single-Field Deployment (SFD) Component Costs

*Each SFD controls a standard 150-acre pivot. For this pilot, we are employing a "Lean Tracker" MVP strategy. We utilize exact "Silicon-Matched" COTS developer boards (Adafruit/SparkFun nRF52840s and SAMD51s) but substitute high-cost industrial mechanicals (like ultrasonic flow meters and custom potting) with commercially-available functional equivalents to prove the logic at a fraction of the cost.*

| Component | Role | Estimated MVP Cost | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **PMT** | Field Hub & Auditor | **$950.00** | Replaces the $950 industrial ultrasonic flow meter with a $35 paddle-wheel flow switch. Proves the GNSS fusion logic ("Flow=True -> Irrigating") perfectly. **Crucially, acts as the central Field Hub, receiving FHSS telemetry from the VFA, LRZs, and PFA.** |
| **VFA** | Advanced Peer Node | **$200.00** | Uses standard Schedule 40 PVC pipe and caps from a hardware store instead of Polycase extrusions. PCBs are treated with $15 conformal coat spray instead of custom two-part resin vacuum potting. Relays soil data to the PMT. |
| **LRZ (x5)**| Spatial Mappers | **$325.00** | Reduced density from 10 to 5 nodes. At 5 nodes, we still prove the 1m Kriging integration and FHSS mesh capabilities. Uses the same DIY PVC and conformal coating strategy ($65/ea). Reports directly to the PMT. |
| **PFA** | Well Sentry | **$550.00** | Monitors a single phase of current (to prove FFT cavitation detection logic) instead of all three, and uses a generic $25 analog pressure transducer instead of the 316-SS Dwyer industrial sounder. Interacts with the PMT for soft-stops. |

**Total Cost per MVP SFD:** **$2,025.00**

### 2. District Hub (DHU) MVP Variant

*For the pilot, we do NOT need the 10-mile range, 35' CCA timber poles, or 200Ah heated battery banks. We will use a COTS (Commercial Off-The-Shelf) MVP design that retains the exact NVIDIA Jetson Nano compute architecture, ensuring the software environment perfectly matches the production unit, but drastically scales down the RF and civil engineering costs.*

| Component | MVP Substitution | Estimated Single-Unit Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Compute Node** | **NVIDIA Jetson Nano Dev Kit** | **$120.00** | Retains the exact edge-processing environment. Adds 128GB high-endurance SD ($35). |
| **LoRa Gateway** | RAK Wireless WisGate Edge Lite | **$185.00** | Replaces the $650 Enterprise RAK7249. Still provides 8-channel LoRaWAN coverage for the pilot radius. |
| **Antenna** | 8 dBi Omni-Directional | **$65.00** | Replaces the $850 120° Sector Array. Perfectly adequate for a 1-2 mile line-of-sight pilot radius. |
| **Backhaul** | Sixfab 4G/LTE USB Modem | **$80.00** | Replaces dual Starlink/Cellular. A single LTE connection is fine for pilot data throughput. |
| **Power System** | 50W Solar + 50Ah SLA/LiFePO4 | **$150.00** | Scaled down from the 200W/200Ah Battle Born behemoth since we aren't running heaters in the pilot. |
| **Mounting** | 10' Galvanized TV Mast / Tripod | **$120.00** | Replaces the $1,500 35' treated timber pole. Can be strapped to an existing shed or standard tripod. |
| **Enclosure** | NEMA 3R/4X Polycarbonate | **$50.00** | Standard weatherproof box. |

**Total MVP DHU Cost:** **$770.00**

### 3. Total Pilot Budget (2 SFDs + 1 MVP DHU)

* **Cost per MVP SFD:** $2,025.00
* **Total for Two (2) MVP SFDs:** $4,050.00
* **Total MVP DHU Cost:** $770.00

**Grand Total Hardware Cost:** **$4,820.00**

---

*Note: This is a raw materials and component procurement estimate. It assumes the use of "Silicon-Matched COTS" development boards (e.g., Adafruit/SparkFun nRF52840s and SAMD51s) mounted in custom functional housings to avoid PCBA NRE costs while entirely preserving firmware and IP parity.*
