# FarmSense Knowledge Base

This directory contains the canonical design knowledge for the FarmSense system. It is intended to ensure **full alignment across all agent environments and developers** who work on this project.

> Any AI agent or developer reading this repo should treat these files as the authoritative source of truth for hardware specs, software architecture, communication protocols, and project strategy.

---

## Hardware Specifications

| File | Component | Role |
|:-----|:----------|:-----|
| `ki_hw_rss.md` | RSS — Regional Superstation V1.3 | Territory Cortex (Layer 3) |
| `ki_hw_dhu.md` | DHU — District Hub V1.1 | Edge Coordinator (Layer 2) |
| `ki_hw_pmt.md` | PMT — Pivot Motion Tracker V1.7 | Field Hub & Kinematic Aggregator (Layer 1.5) |
| `ki_hw_pfa.md` | PFA — Pressure & Flow Anchor V1.9 | Well Sentry & Safety Actuator (Layer 1.5) |
| `ki_hw_csa.md` | CSA — Corner-Swing Auditor V1.0 | Dual-Node Swing Resolver (Layer 1.5) |
| `ki_hw_vfa.md` | VFA — Vertical Field Anchor V1.21 | 48U Foundation Node (Layer 1) |
| `ki_hw_lrz1.md` | LRZ1 — Truth Node V1.21 | 18U High-Fidelity Ground Truth (Layer 1) |
| `ki_hw_lrz2.md` | LRZ2 — Reference Node V1.21 | 18U Cost-Optimized + AKP-LRZ Ballistic Variant |
| `ki_hw_aerial.md` | Aerial Fleet V1.3 | eBee Ag + DJI Mavic 3M (Tier 0) |
| `ki_hw_alphasled.md` | AlphaSled PCBA | Shared nRF52840 + SX1262 platform for VFA/LRZ |

## System Architecture

| File | Topic |
|:-----|:------|
| `ki_sys_hierarchy.md` | Full data flow hierarchy, VRI tiers, Fisherman's Attention scale, Frost Defense |
| `ki_comms_protocols.md` | Radio glossary, EDR-001/002 decisions, PMT backhaul failover state machine |
| `ki_software_engines.md` | Zo engine, SPAC model, adaptive recalc modes, service map, performance targets |
| `ki_legal_crypto.md` | Water Court defense, PBFT signing, WORM storage, Schnorr multi-sigs, Black Box cache |

## Water Trading

| File | Topic |
|:-----|:------|
| `ki_water_ledger.md` | DHU AllianceChain ledger architecture |
| `ki_water_consensus.md` | PBFT consensus and callback mechanism |
| `ki_water_resilience.md` | Offline mesh dropout and pending trade handling |

## Security & Auth

| File | Topic |
|:-----|:------|
| `ki_sys_auth.md` | JWT/Bcrypt authentication flow, AuthContext, role-based access |

## Project

| File | Topic |
|:-----|:------|
| `ki_project_strategy.md` | Deployment roadmap, CSU 2-field pilot, SLV market data, funding pipeline, DoD dual-use |
| `ki_ip_portfolio.md` | 50 patent claims with filing timeline and priority tiers |
