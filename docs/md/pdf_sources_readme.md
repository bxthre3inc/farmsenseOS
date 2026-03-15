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

# FarmSense Investor Materials Generator

Beautiful PDF/HTML generation system for investor documents. Matches the FarmSense portal's dark theme with emerald/cyan accents.

## Quick Start

```bash
npm install
npm run build:all
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Generate all documents (PDF + HTML) |
| `npm run build:pdf` | PDFs only |
| `npm run build:html` | HTML only |
| `npm run serve` | Preview HTML output locally |
| `npm run watch` | Auto-rebuild on file changes |

## Documents

Configured in `build.js`:

| ID | Source | Output |
|----|--------|--------|
| `executive-summary` | `SECRET_CLEARANCE_BRIEF.md` | Strategic brief for cleared investors |
| `technical-overview` | `MASTER_SOFTWARE_ARCH.md` | FS-1 architecture documentation |
| `financial-projections` | `MASTER_PROJECT_ROADMAP.md` | Revenue model & growth |
| `team-leadership` | TBD | Founding team & advisors |

## Adding New Documents

1. Add config to `documents` array in `build.js`:

```javascript
{
  id: 'my-doc',
  title: 'My Document',
  subtitle: 'Description',
  source: '../path/to/source.md',
  classification: 'CONFIDENTIAL',
  icon: 'icon-name'
}
```

2. Run `npm run build`

## Output

- **HTML**: ../html/`dist/*.html` — view in browser, includes interactive elements
- **PDF**: ../html/`dist/*.pdf` — print-ready, A4 format
- **Index**: ../html/`dist/index.html` — data room landing page

## Templates

| Template | Purpose |
|----------|---------|
| ../html/`base.html` | Wrapper with Tailwind + Lucide |
| ../html/`cover.html` | Title page with gradients |
| ../html/`content.html` | Main document body |
| ../html/`section-divider.html` | Chapter break pages |

## Design System

- **Background**: `slate-950`
- **Primary accent**: `emerald-500` (buttons, highlights)
- **Secondary**: `cyan-400` (gradients)
- **Typography**: Inter (headings), JetBrains Mono (code)
- **Icons**: Lucide

## Hosting

Documents are automatically available at:

- **Data Room**: https://brodiblanco.zo.space/investors (private, requires login)
- **Individual PDFs**: ../html/https://brodiblanco.zo.space/investors/docs/*.pdf

## Regeneration

After editing source markdown:

```bash
npm run build:all
```

PDFs auto-copy to `../FarmSense/Investor_Materials/data_room/` for version control.
