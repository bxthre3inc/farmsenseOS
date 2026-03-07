# FarmSense OS

**Precision agriculture operating system for water-constrained regions.**  
Pilot: San Luis Valley, Subdistrict 1 — CSU Partnership | June 2026

---

## 📂 Master Documentation (Single Source of Truth)

Every piece of project documentation has been consolidated into four authoritative Master Documents. **Start here** based on your role:

- 🤖 **Developer / AI Agent**  
  👉 [`docs/MASTER_SOFTWARE_ARCH.md`](docs/MASTER_SOFTWARE_ARCH.md) — *Architecture, Service Maps, Schemas, Roadmap.*
  
- 🏗️ **Hardware / RF Engineer**  
  👉 [`docs/MASTER_SYSTEM_SPEC.md`](docs/MASTER_SYSTEM_SPEC.md) — *Specs, Network, Hierarchy, BOM, Pinouts.*

- 🌾 **Project Manager / Founder**  
  👉 [`docs/MASTER_PROJECT_ROADMAP.md`](docs/MASTER_PROJECT_ROADMAP.md) — *Development Phases, Funding, Market, Milestones.*

- ⚖️ **Regulator / Legal / IP**  
  👉 [`docs/MASTER_IP_LEGAL.md`](docs/MASTER_IP_LEGAL.md) — *Water Court Evidence, Patents, AllianceChain, Ledger.*

---

## 🏗️ Repository Layout

```
farmsense-main/
├── docs/
│   ├── MASTER_SYSTEM_SPEC.md      ← Hardware & Infrastructure
│   ├── MASTER_SOFTWARE_ARCH.md    ← Backend & Software Logic
│   ├── MASTER_PROJECT_ROADMAP.md  ← Funding & Milestones
│   ├── MASTER_IP_LEGAL.md         ← Legal & Patent Portfolio
│   ├── 00_NAVIGATION.md           ← Comprehensive Index
│   └── ARCHIVE/                   ← Superseded legacy documents
├── backend/                       ← FastAPI, PostgreSQL, PostGIS
├── edge-processing/               ← Go-based IDW interpolation
├── cloud-processing/              ← Python Regression Kriging, FHE
└── farmsense-portal/              ← Unified React/Vite frontend (RBAC)
```

---

*Current phase: Pilot deployment prep (June 2026)*
