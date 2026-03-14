---
Status: Active
Last Audited: 2026-03-14
Drift Aversion: REQUIRED
---

> [!IMPORTANT]
> **D-DAP (Documentation Drift Aversion Protocol)**
> 1. **Single Source of Truth**: This document is the authoritative reference for its subject matter.
> 2. **Synchronized Updates**: Any change to corresponding code or system behavior MUST be reflected here immediately.
> 3. **AI Agent Compliance**: Agents MUST verify the current implementation against this document before proposing changes.
> 4. **No Ghost Edits**: All significant modifications must be documented in the project's audit trail.

\n# DAP Framework (Agent Guide)\n\nThis skill mandates that all AI agents acting within the FarmSense repository adhere to the **DAP (Drift Aversion Protocol)** framework, comprising **D-DAP** and **E-DAP**.\n\n## Core Mandates\n\n### 1. D-DAP: Documentation Drift Aversion\nBefore proposing or implementing any changes, you MUST read the corresponding documentation in the `docs/` directory to understand the "Single Source of Truth."\n\n### 2. E-DAP: Engineering Drift Aversion\nEvery implementation change MUST be synchronized with documentation updates in the same transaction. "Ghost Edits" (code changes without documentation updates) are a violation of D-DAP. Architectural deviations and file sprawl (e.g., `.bak` files) are violations of E-DAP.\n\n### 3. Maintain Metadata\nEnsure all documentation files have the required metadata header:\n```yaml\n---\nStatus: Active\nLast Audited: [Today's Date]\nDrift Aversion: REQUIRED\n---\n```\n\n### 4. Continuous Audit\nRun the `scripts/verification/verify_drift_protocol.py` script frequently to ensure the repository remains compliant.\n\n## Implementation Examples\n\n### Wrong:\n1. Update `backend/api/router.py` to add a new endpoint.\n2. Notify user.\n\n### Right:\n1. Update `backend/api/router.py` to add a new endpoint.\n2. Update `docs/MASTER_SOFTWARE_ARCH.md` with the new endpoint details.\n3. Update `docs/MASTER_SOFTWARE_ARCH.md` metadata header `Last Audited` date.\n4. Run `python3 scripts/verification/verify_drift_protocol.py`.\n5. Notify user.