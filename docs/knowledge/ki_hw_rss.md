# Knowledge Item: RSS (Regional Site Station) V1.3

## Role: Territory Cortex (Layer 3)
The RSS is the master command hub for an entire subdistrict. It is housed in a **modified 40-foot High-Cube shipping container**, engineered for alpine desert survival (SLV).

## Container Zone Architecture
The interior is divided into 3 operational zones:
- **Zone A (Sled Hospital)**: 20' x 7'8" with a 12' stainless steel workbench, Nitrogen manifold, and a multi-channel pressure-decay QC station (±0.1 PSI tolerance window). Fleet Polaris Ranger-HD UTV + hydraulic auger stored here.
- **Zone B (Ready-Rack)**: Industrial racking for 500 "Pivot Kits" (1 VFA + 5 LRZ2 + 20 LRZ1). Every u-blox ZED-F9P module is burn-in verified for sub-meter RTK lock before field deployment.
- **Zone C (Oracle Cortex)**: Server vault with Mitsubishi Hyper-Heat HVAC (operational to −40°F), dual-stage HEPA air scrubbing, and spring-dampened server rack baseplates.

## Computational Architecture (RDC Compute)
- **GPU Array**: Dual NVIDIA RTX A6000 (48GB VRAM each) for FP16-accelerated spatial statistics.
- **Storage**: 50TB WD Gold NVMe Array (RAID-10).
- **Networking**:
  - Uplink A: Fiber ONT (Symmetrical Gigabit)
  - Uplink B: Starlink Business (High-Performance Tilt-Base Dish)
  - Mesh Spine: 900MHz P2MP radio to all 25 DHUs
  - Security: Port-based NAC + Hardware Security Modules (HSM) for block signing.

## Parallel Kriging Workflow
1. **Ingestion**: Normalizes LoRa bursts from 25 DHUs (up to 1.2M points/day).
2. **Trend-Filtering**: CUDA kernels remove pivot "splash-zone" moisture noise.
3. **Variogram Cloud Analysis**: Calculates spatial auto-correlation against Soil Variability Maps.
4. **Kriging Map Generation**: Renders 1m-resolution Enterprise Tile (Layer 12 PNGs) every 15 min.
5. **XR Pipeline**: Streams frustum-culled map data to fieldXR headsets.

## Sled Hospital Refurbishment Logic
1. Intake via RFID scan (battery SoC archived).
2. Ultrasonic solvent bath to remove SLV mineral deposits.
3. 15-min Pressure Decay Test (Pass = <0.1 PSI drop).
4. Automated cycle: Vacuum to -10 PSI → Flush N₂ → Pressurize to +5 PSI.

## Unit Cost
- **Total System Cost**: $212,000.00
- **Deployment**: 1 per subdistrict.
