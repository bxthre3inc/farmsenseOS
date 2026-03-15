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

# IP_INVENTORY: Defensible Intellectual Property Portfolio

This document registers the core Intellectual Property (IP) modules of the FarmSense project. Each entry links to its primary specification and logic owner.

## 1. Physical & Core Logic
- **SFD (Soil-Fluid-Dynamics)**: The proprietary thermodynamic and hydraulic engine for moisture behavior modeling. 
  - *Spec Link*: [Master Manual §1.2](FarmSense_Master_Manual.md#12-spac-modeling-and-edaphic-variability)
- **Kriging Engine**: Advanced Gaussian Process Regression for 1m spatial grids.
  - *Spec Link*: [Master Manual §1.4](FarmSense_Master_Manual.md#14-system-architecture-overview)

## 2. Hardware Topology & Deployment
- **RSS (Regional Superstation)**: Level 3 territory master node.
  - *Spec Link*: [Master Manual §1.4](FarmSense_Master_Manual.md#14-system-architecture-overview)
- **DHU (District Hub Unit)**: Level 2 regional mesh manager.
  - *Spec Link*: [Master Manual §1.4](FarmSense_Master_Manual.md#14-system-architecture-overview)
- **PMT (Precision Mobile Terminal)**: The "Field Hub" — span-mounted primary aggregator.
  - *Spec Link*: [Master Manual §1.5](FarmSense_Master_Manual.md#15-telemetry-architecture-resolution)
- **SFD (Single Field Deployment)**: Modular hardware configurations (SFD-P, SFD-C, SFD-F).
  - *Spec Link*: [v2.1 Expansion §5.7](v2_1_expansion/part5_remaining_hardware.md#57-single-field-deployment-sfd-configurations)

## 3. Communication & Infrastructure
- **LRZN (Long-Range Zone Network)**: Proprietary RF mesh topology and 915MHz CSS modulation scheme.
  - *Spec Link*: [Master Manual §1.5](FarmSense_Master_Manual.md#15-telemetry-architecture-resolution)
- **LRZB (Long-Range Zone Bridge)**: Hardware bridge logic for cross-protocol telemetry.
- **AllianceChain**: Private PBFT consensus for agricultural non-repudiation.

## 4. Analytics & Regulatory
- **VFA/PFA (Vegetative/Physical Field Analytics)**: Proprietary multi-spectral soil health scoring.
  - *Spec Link*: [Master Manual §1.5](FarmSense_Master_Manual.md#15-telemetry-architecture-resolution)
- **CSA (Compliance & Statutory Auditing)**: The "Water Ledger" blockchain alignment logic.
  - *Spec Link*: [Master Manual §1.1](FarmSense_Master_Manual.md#11-hydro-economic-logic-and-the-deterministic-paradigm)
- **DAP (Drift Aversion Protocol)**: Modular framework for specification/implementation synchronization.
  - *Spec Link*: [MASTER_IP_LEGAL.md](MASTER_IP_LEGAL.md)

---
*Proprietary IP of bxthre3 inc. — Confidential*