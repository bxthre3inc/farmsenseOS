# FarmSense OS

**Precision agriculture operating system for water-constrained regions.**  
Pilot: San Luis Valley, Subdistrict 1 — CSU Partnership | June 2026

---

## 📂 Documentation

**Start here:** [`docs/00_NAVIGATION.md`](docs/00_NAVIGATION.md)

The navigation index routes you to the right documents by role:

- 🤖 **AI Agent / Developer** — Architecture, API specs, task board
- 🏗️ **Hardware Engineer** — Master Specs, hardwarebreakdown, firmware details
- 💼 **Investor** — Business plan, market intel, seed proposals
- 🏛️ **Grant / DoD Reviewer** — Active proposals, funding pipeline
- ⚖️ **Regulator / Water Court** — Master Manual, due diligence
- 🌾 **Project Manager** — Roadmap, pilot milestones

---

## 🏗️ Repository Layout

```
farmsense-main/
├── docs/
│   ├── 00_NAVIGATION.md          ← Start here
│   ├── architecture/             ← FarmSense_Internal_Guide, hardwarebreakdown
│   ├── specifications/           ← 9 canonical Master Specs (hardware + firmware)
│   ├── management/               ← AGENTS.md, ROADMAP.md, FUNDING_PIPELINE.md
│   └── reference/                ← Deployment, regulatory, IP docs
├── backend/                      ← FastAPI, PostgreSQL, PostGIS
├── edge-processing/              ← Go-based IDW interpolation
├── cloud-processing/             ← Python Regression Kriging, FHE
└── farmsense-portal/             ← Unified React/Vite frontend (RBAC)
```

---

*Current phase: Pilot deployment prep (June 2026)*
