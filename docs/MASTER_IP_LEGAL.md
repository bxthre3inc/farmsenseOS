# MASTER IP & LEGAL SOVEREIGNTY: FarmSense Assets & Proof (V2.1)

> **The Single Source of Truth for Patents, Legal Strategy, and Cryptographic Proof**
> Consolidates: 5 Legal/Water KIs, IP Portfolio, and the FarmSense Reconciliation Report.

---

## 1. Legal Mandate: Sensors as Financial Instruments

The FarmSense architecture operates on the principle that every sensor reading is a **financial transaction** with absolute legal weight in Colorado Water Court.

- **Non-Repudiation**: Data is "Self-Authenticating." No human witness is required to verify the integrity of the PFA wellhead readings.
- **Evidence-Grade Accuracy**: Standardized ±1.0% flow and <5% Kriging error bars provide the empirical backbone for groundwater limit enforcement.
- **Admissibility**: All decision logic (Zo Engine, Recalc) is deterministic and auditable, explicitly avoiding "Black-Box" AI to ensure survival under legal cross-examination.

---

## 2. IP Portfolio & Patent Pipeline

**Total Pipeline**: 50 Claims | **Category Split**: 16 Hardware, 11 Software, 5 Process (P1 Core).

### 2.1 Hardware Patents (Priority P1)

| ID | Claim | Status |
| :--- | :--- | :--- |
| **H1** | Seasonal Sled Architecture (Extraction/Docking) | File Now |
| **H2** | 2:4:12 Stereo Sensor Field Density | File Now |
| **H5** | Cut-Less "Band-It" Mounting System | File Now |
| **H10** | Triple-Redundant Backhaul (LTU + LoRa + LTE-M) | File Now |
| **H12** | 30-Day Physical "Black Box" SSD Cache (DHU) | File Now |
| **H14** | Sled Hospital Refurbishment (N2 Purge/Pressure Decay) | File Now |

### 2.2 Core IP Deep Dives (Priority P1)

| ID | Claim Name | Category | Innovation Strategy |
| :--- | :--- | :--- | :--- |
| **H1** | **Seasonal Sled Architecture** | Hardware | Permanent outer shells with seasonally extracted internal electronics. Nitrogen +5 PSI pressurization prevents groundwater ingress during storage. |
| **H2** | **2:4:12 Stereo Ratio** | Hardware | Stratified density (2 VFA Truth, 4 LRZ2 Scout, 12 LRZ1 Ground) for 1m accuracy at 1/10th the cost of uniform grids. |
| **H12** | **30-Day Black Box Cache** | Hardware | 128GB Swissbit pSLC Industrial SSD maintains cryptographically signed audit packets during total backhaul failure. |
| **S1** | **Fisherman's Attention** | Algorithm | Adaptive recalculation (Dormant → Collapse) based on real-time field volatility scoring and hydraulic anomalies. |
| **S3** | **Empirical Bayesian Kriging** | Algorithm | Spatial interpolation combining sparse ground-truth sensors with satellite NDVI priors for 1m moisture mastering. |
| **S5** | **Dual-Layer Spatial Privacy** | Algorithm | Layer 1: Geometric jitter/grid-snapping. Layer 2: Contextual k-anonymity and differential privacy (ε=0.5). |
| **P1** | **Resolution Pop UI** | Process | Zoom-triggered preview of 1m data with Enterprise CTA—converting high-resolution demand to revenue via "FOMO" mechanics. |
| **P2** | **Digital Water Ledger** | Process | Immutable blockchain-style audit chain for every gallon of water, admissible as empirical evidence without human testimony. |

> [!NOTE]
> The full 50-claim inventory, including Tier 3 and "Potential" claims, is maintained in the internal Legal Vault and tracked via the `ip-portfolio-agent`.

---

## 3. Cryptographic Chain of Truth

### 3.1 Moment of Capture (MOC) Signing

Every telemetry packet is signed at the Silicon layer before it touches the mesh.

- **Hardware Security Module (HSM)**: Nodes (VFA/LRZ) use the **Nordic nRF52840 CryptoCell-310**; PFA uses **i.MX RT1020 HSM**.
- **Root-of-Trust**: 256-bit Private Keys are generated inside the silicon at the RSS Sled Hospital and **never leave the node**.
- **Tamper Detection**: Internal enclosure light sensors trigger instant certificate revocation in the DHU if the shell is opened.

### 3.2 Time & Consensus

- **Stratum-1 Timing**: DHUs use GPS-disciplined oscillators for ±1ms temporal anchoring across the district.
- **Schnorr Multi-Signatures**: DHUs condense attestations of 1,280 nodes into a single, compact regional block every 15 minutes to ensure legal efficiency.

---

## 4. AllianceChain: The Water Ledger

The **AllianceChain** is a localized blockchain providing peer-to-peer water rights trading and state audit trails.

### 4.1 PBFT Consensus Mechanism

- **Protocol**: Practical Byzantine Fault Tolerance (PBFT) running across DHU coordinators.
- **Quorum**: Requires >2/3 node agreement to finalize a trade or pumping commit.
- **Consensus Loop**: `WaterTradingService` (Python) → `DHU Go-Node` → PBFT Commit → Signed Callback → DB Update.

### 4.2 Legal Persistence

- **WORM Storage**: Compliance logs are archived on Write-Once-Read-Many media at the RSS Vault.
- **Immutable State Replay**: The legal engine can reconstruct any historical field state for dispute resolution or Water Court testimony.

---

## 5. Data Sovereignty & Privacy

### 5.1 Dual-Layer Contextual Anonymization

1. **Geometric Layer**: GPS Jitter (±50m noise) and grid-cell snapping for public/aggregate research.
2. **Contextual Layer**: k-anonymity (suppress if <k sensors/cell) and Differential Privacy (ε=0.5) for moisture data.
3. **Private Vault**: 100% accurate, unmodified spatial data is locked within the RSS for the farmer's private legal defense and never leaves the subdistrict vault.

---

## 6. Budget & Filing Timeline

| Phase | Activity | Estimated Cost | Timeline |
| :--- | :--- | :--- | :--- |
| **Phase 1** | 12x Provisional Patent Applications (PPAs) | $12,480 | Q2 2026 |
| **Phase 2** | 8x Non-provisional Utility Conversions | $78,800 | 2027 |
| **Phase 3** | PCT International Filings | $98,000 | 2028 |

---

## 7. Historical Reconciliation: Conflict Resolutions

The following ambiguities from V1 legacy documentation have been officially resolved via the **Engineering Review Plan (2026-03-07)**:

| Conflict | Resolved Standard |
| :--- | :--- |
| **V1 Radio Confusion** | Standardized on **900MHz LoRa Mesh (SX1262)**. ("FHSS" deprecated). |
| **Backhaul Standard** | Standardized on **5GHz Ubiquiti LTU** as primary. ("WiFi" deprecated). |
| **LRZ OEM Cost** | Canonical cost established at **$54.30**. |
| **SDR Specification** | Standardized on **HDPE SDR9** (High-Albedo White) for all pipe foundations. |
| **PMT Version** | PMT V1.6 → V1.7 upgrade to include SX1262 and LTU modules. |

---
*Classification: Master Project Asset | Single Source of Truth | Approved 2026-03-07*
