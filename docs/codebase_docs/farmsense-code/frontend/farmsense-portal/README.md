# FarmSense Unified Portal — Architecture Note

> **Status (2026-03-05):** This directory contains the active React/Vite scaffold for the **unified FarmSense portal app** — a single application with RBAC (Role-Based Access Control) that consolidates all role-specific views into one deployment.

---

## Architecture Decision: Unified vs. Separate Portals

FarmSense has **two generations** of frontend portal specifications:

### Generation 1 (Legacy) — Separate Apps

Located in `frontend/specs/` and each portal's `SPECIFICATION.md`:

- `admin-dashboard/` — Admin interface
- `farmer-dashboard/` — Farmer-facing dashboard
- `investor-dashboard/` — Investor portal
- `regulatory-portal/` — Regulator/compliance portal
- `research-portal/` — Research data access
- `grant-portal/` — Grant management
- `docs-portal/` — Documentation portal
- `marketing-site/` — Public marketing page

These 8 separate apps were the original architecture — one React app per audience role, deployed independently.

### Generation 2 (Current) — This Directory

**`farmsense-portal/`** is the unified replacement: **one app, one deployment, all roles accessible via JWT-scoped RBAC.** The farmer sees farmer views; the regulator sees regulator views; the admin sees everything.

**Rationale:**

- Single deployment to Zo server (`brodiblanco.zo.computer`)
- Simplified Nginx configuration (one app, multiple route scopes)
- Consistent UX across all roles
- Easier to maintain than 8 separate React builds

---

## Status of Legacy Specs

The `SPECIFICATION.md` files in the 8 legacy portal dirs are **still useful as feature references** — they define what each role's view should contain. They should be treated as **role-specific requirements documents**, not as independent app specs.

When building out the unified portal, use those files as feature input:
> "What does the farmer role need?" → see `farmer-dashboard/SPECIFICATION.md`

---

## Deployment

The unified portal deploys at:

- **Dev:** `localhost:5173` (via `npm run dev`)
- **Production:** `brodiblanco.zo.computer/farmsense/` (see Zo routing config)

See [`docs/reference/Zo_Computer_Deployment_Architecture.md`](../../../../reference/Zo_Computer_Deployment_Architecture.md) for full routing configuration.

---

*Last updated: 2026-03-05*
