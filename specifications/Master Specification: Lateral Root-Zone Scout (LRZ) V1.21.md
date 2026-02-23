2/20/26, 10:58 PM Google Gemini

# Master Specification: Lateral Root-Zone Scout (LRZ) V1.21

Role: Lateral Variability "Scout," High-Density Dumb Node, & Spatial Mapper | Network

Density: 1 LRZ per 15 Acres (Reporting to 1 VFA per Field)

While the Vertical Field Anchor (VFA) serves as the singular high-fidelity "Truth" node for an

entire field, the Lateral Root-Zone Scout (LRZ) is the indispensable high-density spatial

component of the FarmSense grid. Designed to be mass-deployed at a strict density of 1 unit

per 15 acres, the LRZ operates as a hyper-efficient "dumb node."

Network Topology: On a standard 125-160 acre center pivot, a fleet of approximately 8 to 10

LRZ units will form a local mesh. They do not process complex Zo Worksheets or execute

localized Bayesian math. Their sole operational imperative is to capture raw dielectric and

electrical conductivity (EC) counts across their specific 15-acre zone, encrypt them, and "chirp"

them back to the single VFA anchored in that field.

This massive density of spatial data is what ultimately powers the FarmSense UI logic—allowing

the system to mathematically transition from the Free (50m) and Basic (20m) tiers to the highly

lucrative Pro (10m) and Enterprise (1m) resolution "pops."

The Seasonal Deployment Model: To protect the LRZ's internal electronics and guarantee a

10-year hardware lifecycle, FarmSense utilizes a two-phase seasonal deployment strategy. The

outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain

buried in the field year-round. The internal, highly sensitive sensor sleds (the actual "brains" of

the LRZ) are dropped into these shells after spring planting and physically extracted just prior to

harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation

while perfectly preserving the exact spatial baseline required by the Zo Server's Kriging

algorithms.

## 1. Structural Housing ("Invisible Presence" Architecture & Seasonal Docking)

The LRZ housing is engineered for an "Invisible Presence"—a ruggedized subterranean

deployment capable of withstanding the extreme mechanical stresses of 4WD tractor passes

and repetitive deep-soil compaction cycles common in potato-barley rotations.

The Outer Shell (The Docking Station): Constructed from Standard 2" Schedule 40 UV

White HDPE (High-Density Polyethylene). Cut precisely to 18 inches to perfectly match

the internal 18U sled, this shell sits perfectly flush with the soil surface.

Material Science: White HDPE was selected specifically for its high albedo (thermal

reflection). During the critical "Field Blitz" installation window, units often sit exposed

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 1/5

2/20/26, 10:58 PM Google Gemini

∘

## on the surface in 90 F + heat; the white pigment prevents internal components from

baking before the unit is safely buffered by the cool soil. Furthermore, HDPE is

chemically inert to the sulfur-rich SLV alkali soils.

Installation Efficiency: By keeping the shell at exactly 18 inches, the hydraulic auger

crews only need to drill a shallow pilot hole, exponentially speeding up the installation

phase and reducing wear on the auger bits.

15-Degree Tapered Driving Tip (Compaction-Fit): The 18-inch outer shell is chemically

fused to a Custom HDPE Driving Tip featuring a precise 15-degree taper. Fluid-dynamic

modeling confirms this specific taper provides optimal "Tight-to-Soil" seating as the auger

displaces dirt, surgically eliminating air gaps that corrupt moisture readings.

Low-Profile Antenna Mount: Because the 2" shell is flush-mounted 18 inches deep,
the removable C&C Cap mounts a 3-foot SS-304
stainless steel whip antenna directly to its base via a heavy-duty spring. The LRZ does not utilize a fiberglass mast. This gives the LRZ an exact 3-foot profile above the soil, keeping it beneath the destructive sweep of the pivot span while still allowing it to chirp through the lower canopy back to the VFA.

The Removable Internal Sled: The core internal structure is an 18-Inch 50mm Co

Extruded Alpha-Sled capped with Injection-Molded Circular End-Caps. This removable

payload is swiftly inserted post-planting and extracted pre-harvest, overwintering safely in

climate-controlled storage.

The Seasonal Climate (+5 psi Defense): Upon insertion, Viton (FKM) 2" O-rings seal the

sled against the shell walls. The internal cavity is flushed and pressurized to +5 psi with

Dry Nitrogen, creating an inert, zero-humidity environment that acts as an active defense

against micro-fractures.

## 2. Edge Logic & The Secure "Chirp" Protocol

The LRZ is an exercise in extreme power efficiency. It lacks the eMMC storage and heavy

compute processors found in edge coordinators. It is a "Set and Forget" asset that awakens,

acts, and sleeps.

Ultra-Low Power nRF Logic: The compute board relies on a Nordic nRF52840 SoC. This

chip stays in a deep micro-amp sleep state for 99% of its life. It wakes up on a

synchronized schedule, reads the raw electrical analog counts from the basic capacitive

sensors, packages them with its unique Node ID, and immediately cuts power.

Interference Mitigation (FHSS): The LRZ chirp utilizes a Frequency-Hopping Spread

Spectrum (FHSS) approach. By scattering its micro-transmissions across 75 different radio

frequencies, the system ensures that even in a high-density "Blitz" field containing 8-10

actively reporting LRZs per pivot, the statistical probability of a packet collision is

effectively zero.

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 2/5

2/20/26, 10:58 PM Google Gemini

128-Bit Edge Encryption: Before the chirp leaves the antenna, the payload is signed and

encrypted with a factory-burned 128-bit AES key. This ensures that no raw moisture data is

ever broadcast in the clear. The single field VFA intercepts and decrypts this packet,

handling the heavy lifting of routing it to the Farm Hub.

Zo Server Remote Calibration: The LRZ requires absolutely zero manual calibration in the

field. Its baseline "Soil Zero" is established completely remotely by the Zo Scientist Engine

during its first 24 hours of connectivity. Zo utilizes the highly accurate Bayesian math and

Kriging priors established by the field's single VFA "Truth Node" to perfectly calibrate the

surrounding dumb LRZs.

## 3. The High-Density Sensor Array (18-Inch / 18U Sequence)

Like the VFA, the LRZ employs the advanced "Proxy Method" of non-contact sensing, shooting

high-frequency dielectric fields directly through the 50mm sled wall, the nitrogen gap, and the

permanent HDPE shell.

Locked 18U Physical Stack Sequence & Depth Logic:

Slot 1: 1U Bulk Stamped Desiccant Pack (Captures any trace humidity during the active

growing season)

Slots 2-5: 4U Battery #1 (Contains three 21700 lithium-ion cells in a space-saving

triangular cluster. Powers the polyimide heating films during unpredictable spring/fall

frosts)

Slots 6-9: 4U Extruded Spacer

Slot 10: 1U Basic Sensor (10" Depth: Seedbed & Evapotranspiration Monitoring. Captures

the critical topsoil zone where germination and shallow root extraction occur)

Slots 11-14: 4U Battery #2 (Second triangular 3-cell cluster ensuring massive redundant

energy overhead for thermal defense)

Slots 15-17: 3U Extruded Spacer

Slot 18: 1U Basic Sensor (18" Depth: Root Anchor Monitoring. Captures the transition zone

where the majority of potato and barley bulk water uptake occurs)

## 4. The Seasonal Deployment Workflow & OEM Scale BOM

The "Blitz" Installation & Extraction Cycle: Deploying 15,600 units across Subdistrict 1

requires a militarized logistical approach.

1. Post-Planting Insertion: Utilizing a three-crew rotation and customized UTVs, installation

is calculated at under 10 minutes per unit. Because the outer shell is only 18 inches, Crew A

pilots the hydraulic auger to set the permanent white HDPE shells in a fraction of the time

required for the VFAs. Crew B drops in the pre-calibrated sensor sled, pressurizes the

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 3/5

2/20/26, 10:58 PM Google Gemini

nitrogen, and verifies the RF "heartbeat" to the field's VFA using a handheld diagnostic

tool. Crew C performs final soil compaction.

1. Harvest Extraction: Prior to the heavy harvesters arriving, crews extract the internal sleds

and cap the permanent 18-inch ground shells with high-visibility, crush-proof blanking

plugs.

Hyper-Granular OEM Scale BOM (15,600 Unit Tier): Because the LRZ is ordered in massive

quantities, we bypass retail and wholesale distribution entirely. This ledger reflects Tier-1 OEM

direct-fabrication pricing (continuous bulk extrusion, automated PCBA, bulk cell sourcing),

pushing the LRZ hardware cost down to an incredibly lean $60.80 per unit.

Category Component Detail & SubAssembly Breakdown

Housing 2" SCH 40 UV-White HDPE (18-inch
Cut - Flush Mount)

Housing Custom HDPE Tapered Tip (MoldV2-S - 15° Taper)

Supplier / Scale
Method

Direct Extruder (Bulk
Spool)

Proprietary (HighCavity Mold)

Industrial Pultrusion
Bulk

Unit
Cost

$1.50 $1.50

$4.25 $4.25

$3.50 $3.50

$4.50 $4.50

$0.85 $0.85

$0.80 $0.80

$4.50 $4.50

Ext.
Cost

Antenna 3ft SS-304 Whip + Spring Base OEM Direct Fab
(Bulk)

Adhesive Structural HDPE Acrylic Epoxy Automated Bulk
Dispensing

Seals Viton (FKM) 2" O-Rings (2 units @
$0.40/ea)

Computing nRF52840 "Chirp" Logic Board (No
Heavy Processing)

OEM Rubber Fab
(Bulk)

Tier-1 PCBA (Pick &
Place)

Climate 1U Stamped Silica Desiccant Matrix Bulk Supply $1.50 $1.50

Structure 18-Inch 50mm Co-Extruded AlphaSled Chassis

Structure Injection-Molded Circular Sled EndCaps (Top & Bottom)

Continuous
Extrusion

$1.25 $1.25

High-Cavity Mold $0.60 $0.60

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 4/5

2/20/26, 10:58 PM Google Gemini

Structure Extruded HDPE Multi-U Spacers (7U
Volume)

Power (x2) 4U Battery Cartridge:

          - 21700 Li-Ion Cells (3 per cart
triangular): *$10.50*

          - Polyimide Heating Film: $1.50


         - BMS & Cartridge Housing: $4.75

Recycled Bulk $0.05 $0.05

Direct Cell Sourcing $16.75/ea *$33.50*

Fab-Direct Assembly $2.00/ea $4.00

Basic Sensor
(x2)

1U Basic Sensor (Value
Engineered):

- PCB Capacitive Trace &
Thermistor: $0.85

- RISC-V (CH32V003) & Logic:
$0.65

- Potting/Housing: $0.50

TOTAL Per Unit Hardware Cost (Absolute $60.80

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 5/5
