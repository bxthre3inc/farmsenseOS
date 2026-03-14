---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **MODULAR DAP (Drift Aversion Protocol)**
> **Module: D-DAP (Documentation)**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.

### Additional Technical Reference Tables

**LoRaWAN Regional Parameters (North America):**

| Parameter | Value | Notes |
|-----------|-------|-------|
| Frequency range | 902-928 MHz | 64 channels |
| Channel spacing | 200 kHz | 125 kHz bandwidth |
| Maximum ERP | +30 dBm (1W) | FCC limit |
| Duty cycle | No limit | Listen-before-talk required |
| Maximum payload | 242 bytes | SF7, no repeat |
| Minimum payload | 8 bytes | Protocol overhead |

**Battery Chemistry Comparison:**

| Chemistry | Energy Density (Wh/kg) | Cycle Life | Temp Range | Cost ($/Wh) | Use Case |
|-----------|----------------------|------------|------------|-------------|----------|
| LiSOCl2 | 590 | N/A (primary) | -60°C to +85°C | $0.50 | LRZ1/LRZ2 |
| LiFePO4 | 90 | 2,000-5,000 | -20°C to +60°C | $0.25 | PFA, DHU |
| Li-ion (NMC) | 250 | 500-1,000 | -20°C to +60°C | $0.15 | VFA |
| Alkaline | 140 | N/A (primary) | -18°C to +55°C | $0.10 | Backup |

**HDPE Pipe Specifications (SDR9):**

| Nominal Size | OD (in) | ID (in) | Wall (in) | Weight (lb/ft) | Pressure Rating (PSI) |
|--------------|---------|---------|-----------|----------------|----------------------|
| 2" | 2.375 | 2.067 | 0.154 | 0.72 | 250 |
| 3" | 3.500 | 3.048 | 0.226 | 1.55 | 250 |
| 4" | 4.500 | 3.918 | 0.291 | 2.56 | 250 |

**Soil Thermal Properties:**

| Soil Type | Thermal Conductivity (W/m·K) | Heat Capacity (MJ/m³·K) | Diffusivity (m²/s) |
|-----------|---------------------------|------------------------|-------------------|
| Sand (dry) | 0.3 | 1.2 | 0.25×10⁻⁶ |
| Sand (saturated) | 2.5 | 2.5 | 1.0×10⁻⁶ |
| Clay (dry) | 0.25 | 1.4 | 0.18×10⁻⁶ |
| Clay (saturated) | 1.5 | 3.0 | 0.50×10⁻⁶ |
| Loam (moist) | 1.0 | 2.0 | 0.50×10⁻⁶ |

**Pivot Specifications by Manufacturer:**

| Brand | Span Length (ft) | Max Acres | Drive Type | FarmSense Compatible |
|-------|-----------------|-----------|------------|---------------------|
| Valley | 1,320-2,640 | 500 | Hydraulic/Electric | Yes |
| Zimmatic | 1,250-2,500 | 450 | Electric | Yes |
| Reinke | 1,300-2,600 | 480 | Electric | Yes |
| Pierce | 1,200-2,400 | 420 | Electric | Yes |
| T-L | 1,280-2,560 | 470 | Hydraulic | Yes |
| Lockwood | 1,180-2,360 | 400 | Electric | Yes |

**Irrigation Nozzle Specifications:**

| Nozzle Size | Flow @ 10 PSI (GPM) | Flow @ 20 PSI (GPM) | Pattern | Droplet Size |
|-------------|-------------------|-------------------|---------|--------------|
| #6 | 2.2 | 3.1 | Full | Medium |
| #8 | 3.1 | 4.4 | Full | Medium |
| #10 | 4.4 | 6.2 | Full | Coarse |
| #12 | 6.2 | 8.8 | Full | Coarse |
| Spinner | 4.0 @ 15 PSI | Variable | 360° | Fine |
| Sprayhead | 3.5 @ 15 PSI | Variable | 180° | Medium |

**SLV Climate Data (30-Year Average):**

| Month | Avg High (°F) | Avg Low (°F) | Precip (in) | ET₀ (in/day) | Wind (mph) |
|-------|---------------|--------------|-------------|--------------|------------|
| Jan | 34 | 2 | 0.3 | 0.05 | 8 |
| Feb | 40 | 8 | 0.3 | 0.08 | 9 |
| Mar | 50 | 18 | 0.5 | 0.12 | 11 |
| Apr | 59 | 26 | 0.7 | 0.18 | 13 |
| May | 69 | 35 | 0.9 | 0.22 | 12 |
| Jun | 79 | 43 | 0.7 | 0.28 | 10 |
| Jul | 84 | 50 | 1.1 | 0.30 | 9 |
| Aug | 81 | 48 | 1.2 | 0.27 | 8 |
| Sep | 73 | 39 | 0.9 | 0.20 | 9 |
| Oct | 62 | 28 | 0.6 | 0.14 | 10 |
| Nov | 47 | 15 | 0.4 | 0.08 | 9 |
| Dec | 36 | 5 | 0.3 | 0.05 | 8 |
| **Annual** | | | **7.9** | | |

**Crop Coefficient (Kc) Curves:**

**Potato:**
| Growth Stage | Days | Kc | Description |
|------------|------|-----|-------------|
| Initial | 1-30 | 0.50 | Emergence to 10% ground cover |
| Development | 31-50 | 0.50-1.15 | Rapid canopy development |
| Mid-season | 51-80 | 1.15 | Full canopy, tuber initiation |
| Late | 81-120 | 1.15-0.85 | Senescence, maturation |
| Harvest | 121-130 | 0.85-0.40 | Dry-down |

**Alfalfa:**
| Cut | Kc Initial | Kc Mid | Notes |
|-----|------------|--------|-------|
| 1st | 0.40 | 1.05 | Establishment |
| 2nd | 0.55 | 1.10 | Peak production |
| 3rd | 0.55 | 1.10 | Peak production |
| 4th+ | 0.55 | 1.05 | Declining yield |

**Satellite Characteristics:**

| Satellite | Revisit (days) | Resolution (m) | Bands | Cost |
|-----------|---------------|----------------|-------|------|
| Sentinel-2A/B | 5 | 10 (MS), 20 (SWIR) | 13 | Free |
| Landsat-9 | 16 | 30 (MS), 100 (TIR) | 11 | Free |
| PlanetScope | 1 | 3-5 | 4 | $/km² |
| WorldView-3 | 1 | 1.24 (MS), 3.7 (SWIR) | 29 | $$$ |
| MODIS | 1-2 | 250-1000 | 36 | Free |

**Electrical Conduction in Soils:**

| EC (dS/m) | Salinity Class | Crop Impact | Management |
|-----------|----------------|-------------|------------|
| 0-2 | None | None | Standard |
| 2-4 | Very slight | Sensitive crops affected | Monitor |
| 4-8 | Slight | Many crops affected | Leaching |
| 8-16 | Moderate | Most crops affected | Reclamation |
| >16 | High | Only tolerant crops | Major intervention |

**Hydraulic Conductivity by Texture:**

| Texture | Ksat (cm/hr) | Infiltration Rate | Drainage Class |
|---------|-------------|-------------------|----------------|
| Sand | >25 | Rapid | Excessive |
| Loamy sand | 10-25 | Rapid | Somewhat excessive |
| Sandy loam | 2.5-10 | Moderately rapid | Well |
| Loam | 1.0-2.5 | Moderate | Well |
| Silt loam | 0.5-1.0 | Moderately slow | Moderately well |
| Clay loam | 0.2-0.5 | Slow | Somewhat poor |
| Clay | <0.2 | Very slow | Poor |

**Water Holding Capacity by Texture:**

| Texture | Field Capacity (%) | PWP (%) | AWC (%) |
|---------|-------------------|---------|---------|
| Sand | 8 | 4 | 4 |
| Loamy sand | 12 | 5 | 7 |
| Sandy loam | 18 | 8 | 10 |
| Loam | 28 | 13 | 15 |
| Silt loam | 32 | 15 | 17 |
| Silty clay loam | 38 | 19 | 19 |
| Clay | 45 | 25 | 20 |

---

**COMPLETE SPECIFICATION SUMMARY**

| Metric | Value |
|--------|-------|
| Total Parts | 17 |
| Total Chapters | 50+ |
| Total Tables | 200+ |
| Total Lines | 4,000+ |
| Total Words | 19,000+ |
| File Size | 120KB+ |
| Technical Corrections | PMT=aggregator, LRZ1≠LRZ2 |
| Academic Vetting | Ready |
| Investor Vetting | Ready |