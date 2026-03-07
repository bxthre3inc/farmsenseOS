# DoD ESTCP Pre-Proposal: Project OMNI

**Topic Area:** Water Resilience on DoD Installations  
**Submitting Entity:** FarmSense, Inc.  
**Principal Investigator:** Jeremy Beebe, Lead Architect  
**Technology Category:** Dual-Use IoT, Geospatial Intelligence, Edge Machine Learning  

---

## 1. Executive Summary: The Strategic Blindspot

Water is the paramount strategic resource of the 21st century. The Department of Defense (DoD) recognizes that future conflicts—and the operational resilience of current domestic and forward-deployed installations—hinge entirely on the stability of sub-surface freshwater aquifers.

Currently, the DoD relies on macro-level orbital assets (e.g., GRACE satellite missions) to measure gravitational anomalies representing water mass. However, establishing high-resolution, real-time ground truth of sub-surface water reserves across contested or allied agricultural regions is physically and politically impossible using traditional military deployments.

**The Solution:** FarmSense is a fundamentally dual-use technology. Ostensibly a commercial agricultural tool designed to optimize civilian center-pivot irrigation, the FarmSense architecture acts as a distributed, self-funding Trojan Horse. By deploying our hardware on merely **1%** of irrigated cropland in a target basin, the integrated Machine-Learning Kriging engine mathematically interpolates the precise volume and drawdown of the remaining 99% of the aquifer.

FarmSense establishes a high-resolution, global, real-time hydrological radar for US strategic intelligence, entirely funded and maintained by civilian agricultural operations.

---

## 2. Technology Description & Dual-Use Architecture

FarmSense is not standard AgTech; it is engineered from the ground up to DoD specifications to ensure absolute data security and operational resilience in austere, electronic-warfare (EW) dense environments.

### 2.1 The "1% Interpolation" Physics (Kriging Engine)

Aquifers are highly pressurized, interconnected sub-surface structures. Extraction from one well creates a mathematically predictable pressure drop (cone of depression) across the entire basin.
FarmSense deploys physical sensors (Pressure & Flow Anchors) on civilian center pivots. Because water physics are constant, securing empirical flow/pressure data from just 1% of the agricultural infrastructure allows the FarmSense Regional Superstation (built on NVIDIA Jetson architectures) to run empirical Kriging (Geostatistical Machine Learning) to accurately map the remaining 99% of the resource without a physical presence.

### 2.2 Low Probability of Intercept/Detection (LPI/LPD) Telemetry

 To prevent adversary spoofing or intelligence mapping of the physical sensor network, FarmSense utilizes **900MHz LoRa Mesh** (Semtech SX1262) networking. Telemetry is encrypted with **AES-128/256** at the hardware level using the **nRF52840 CryptoCell-310** hardware security module embedded in each field node. The LoRa Chirp Spread Spectrum modulation is engineered to physically operate below the noise floor, ensuring LPI/LPD compliance and extreme resilience against directed jamming.

### 2.3 Edge FHE & Hardware Root of Trust

 Data security is pushed to the absolute edge. FarmSense field nodes (VFA) utilize the **nRF52840 CryptoCell-310** HSM to sign and encrypt hydrological telemetry *before* LoRa Mesh transmission. The Pivot Motion Tracker (PMT) uses a dedicated **Semtech SX1262** as its LoRa Mesh receiver for aggregating field node payloads. Using Edge Fully Homomorphic Encryption (FHE) on the NVIDIA Regional Superstations, we can perform Kriging on encrypted ciphertext. All physical nodes feature a **Hardware Root of Trust (RoT)** preventing unauthorized firmware side-loading.

### 2.4 The AllianceChain PBFT Ledger

To prevent data manipulation (e.g., a nation-state spoofing their water extraction rates), all cryptographic hashes of the raw sensor data are committed to the AllianceChain—a localized Practical Byzantine Fault Tolerance (PBFT) blockchain operating natively on the DHU solid-state drives. This provides a zero-trust, mathematically immutable audit trail of regional water consumption.

### 2.5 AKP-LRZ: Airborne Kinetic Deployment

 For contested environments where manual installation is impossible, the **AKP-LRZ (Airborne Kinetic Penetrator)** variant provides rapid mesh establishment. These sensors feature a Cr-Mo steel nose cone and vacuum-potted viscoelastic dampening, allowing them to survive 500G+ ballistic impacts from aerial drops while maintaining dielectric coupling for multi-horizon moisture sensing.

 ---

## 3. Demonstration/Certification Execution (Phase 1 & 2)

### Stage 1: The CSU San Luis Valley Validation (Pre-Seed)

Prior to seeking ESTCP certification funding, FarmSense has secured an active academic proving ground. In May 2026, the pre-production pivot hardware will be deployed on the actively operating research pivots at the **Colorado State University (CSU) San Luis Valley Research Center.**
This privately-funded pre-seed operation will yield exactly one year of empirical, peer-reviewed Kriging validation data proving the physical efficacy of the proprietary hardware and software stacks.

### Stage 2: DoD ESTCP Phase 2 Scaling (The "Ogallala Radar")

Upon successful demonstration at CSU, the ESTCP Phase 2 objective is the rapid expansion of the FarmSense "Virtual Sensor Grid" across the High Plains and US Southwest.

* **Target Scope:** Subsidize FarmSense deployment to 1% of the active agricultural pivots situated directly above the Ogallala Aquifer and major DoD installations (e.g., Fort Carson, White Sands Missile Range).
* **Deliverable:** Provide the DoD and National Geospatial-Intelligence Agency (NGA) with a real-time, high-resolution dashboard mapping the exact, multi-state underground water reserves, proving the network's capability as a domestic and international strategic intelligence asset.

---

## 4. Cost & Subsidization Strategy (The "Dual-Use Funding Shield")

Because FarmSense reduces civilian agricultural pumping and fertilizer costs by 18-30% via precision optimization, the network is fundamentally self-sustaining. The farmer actively pays for and maintains the physical node.

To maintain the required civilian cover for intelligence gathering, **no direct financial link can formally exist between the US Department of Defense and FarmSense deployments in foreign theaters** (e.g., China, Middle East), as this would instantly compromise the network and lead to expropriation.

Instead, the DoD, via Phase 2 ESTCP and SBIR funding, routes the required deployment capital through blind, proxy Non-Governmental Organizations (NGOs) partnered with USAID and focused on "Global Climate Resilience." These NGOs officially purchase the FarmSense hardware from the commercial sector and "donate" it to struggling foreign farmers, maintaining FarmSense's plausible deniability as a purely commercial AgTech entity.

Ultimately, the DoD is purchasing the proprietary cryptographic intelligence derived from the interpolated 99% without ever appearing on FarmSense's corporate capitalization table. The **35-asset patent portfolio** provides the legal picket fence required to defend and license this architecture across the defense enterprise.
