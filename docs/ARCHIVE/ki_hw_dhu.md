# Knowledge Item: DHU (District Hub) V1.1

## Role: Edge Coordinator & Regional Router (Layer 2)

The DHU provides the "Umbrella" of connectivity. Mounted on **35-foot timber poles** or grain silos, each unit manages up to **100 center-pivot systems** simultaneously.

## Core Compute

- **Processing Engine**: NVIDIA Jetson Orin Nano (8GB LPDDR5).
- **GPU**: 1024-core NVIDIA Ampere architecture + 32 Tensor Cores (edge kriging acceleration).
- **Storage**: 128GB Swissbit pSLC Industrial SSD (Pseudo-Single Level Cell for high-write endurance).
- **OS/Stack**: JetPack 5.x/6.x + Docker (Containerized ingestion, kriging, and radio drivers).
- **Watchdog**: Hardware-timer reset every 5 min if Docker heartbeat from `FS-Mesh-Coordinator` container is missing.

## Radio Spine

- **Sector Array**: 3× Ubiquiti LTU Sector Antennas (120° each = 360° coverage).
- **Mesh Gateway**: Enterprise-grade 900MHz LoRa Mesh gateway.
- **LTE Failover**: Telit ME910G1 LTE-M/NB-IoT modem.
- **AllianceChain**: Hosts PBFT consensus shards for regional water credit validation.

## Power & Environmental Protection

- **Solar**: Dual 100W Renogy Mono panels (200W total).
- **Battery**: 200Ah Battle Born Heated LiFePO4 (internal heating pads active during Polar Vortex events).
- **Lightning Protection**: L-com GDT Gas Discharge Tube arrestors on every external N-type connector.
- **Enclosure**: Polycase NEMA 4X Polycarbonate (IK08 impact rating, UL 746C f1 UV rated).

## Civil Installation

- **Pole**: 35ft Class 4 Southern Yellow Pine, CCA-treated.
- **Installation Depth**: 8ft minimum below SLV frost line.
- **Backfill**: 3/4" minus crushed rock, mechanically tamped every 12" (prevents wind-shimmer on radios).

## Data Decimation Logic

- **Raw Buffer**: 1-second intervals.
- **Z-Wave Decimation**: Converts high-frequency surges into 15-min moving average worksheets to minimize LTE backhaul costs.

## Unit Cost: $4,594.00

- NVIDIA Jetson Orin Nano: $499
- 3× Ubiquiti LTU Sectors: $1,197
- Solar + Battery: $1,100
- Pole + Install: $1,500
- Other (Modem, SSD, Enclosure): $298
