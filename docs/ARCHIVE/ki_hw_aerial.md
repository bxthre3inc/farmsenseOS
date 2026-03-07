# Knowledge Item: Aerial Fleet — Tier 0 Spatial Auditing

## Role: Multispectral Spatial Auditor (Tier 0)

The Aerial Fleet provides broad-acre NDVI/NDWI mapping that the RSS uses as **Spatial Priors** to mathematically stretch and interpolate live soil telemetry into the continuous 1m Virtual Sensor Network.

## Platforms

### eBee Ag (Fixed-Wing) — Broad-Acre Mapping

- **Platform**: senseFly EPP Foam Airframe + Servos.
- **Sensor**: Duet M (RGB + Thermal/Multispectral).
- **Avionics**: SenseFly Autopilot + integrated RTK.
- **Use**: Phase 1 broad-acre mapping sorties across the whole subdistrict. Cloud shadow removal via upward-looking pyranometers.
- **Unit Cost**: $14,500.00
- **Subdistrict 1 Fleet**: 2 units.

### DJI Mavic 3M (Multi-Rotor) — Targeted Resolution Pop

- **Platform**: Mavic 3 Enterprise RTK Airframe.
- **Sensor**: Integrated 4-Band Multispectral.
- **Use**: Targeted "Resolution Pop" orbits at 10m AGL when C&C Portal detects high NDVI stress corridors.
- **Unit Cost**: $4,999.00
- **Subdistrict 1 Fleet**: 4 units.

## Phase 2 Strategy: BVLOS Automation

Beyond Visual Line of Sight (BVLOS) automated sorties will be launched directly from RSS hangars when Phase 2 regulatory approval is granted.

## Data Fusion Logic (Agronomic Layer)

1. **Spectral-to-Soil Correlation**: RSS RDC Compute fuses NDVI/NDWI with static Soil Variability Maps (sand/clay ratios + EC zones).
2. **Multispectral Warping**: Orthomosaic tiles georeferenced against RTK-anchored VFAs to eliminate drift.
3. **Kriging Enhancement**: Aerial spectral data used as spatial priors in the RSS Kriging workflow, expanding the 1m grid beyond physical sensor density alone.
