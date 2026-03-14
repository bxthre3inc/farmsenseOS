---
name: drift-aversion
description: Protocol for maintaining documentation consistency and preventing drift.
---

# Documentation Drift Aversion Protocol (Agent Guide)

This skill mandates that all AI agents acting within the FarmSense repository adhere to the **Sovereign Documentation Drift Aversion Protocol (SDDAP)**.

## Core Mandates

### 1. Verify Before Execution
Before proposing or implementing any changes, you MUST read the corresponding documentation in the `docs/` directory to understand the "Single Source of Truth."

### 2. Synchronized Atomic Updates
Every time you modify code or system behavior, you MUST update the relevant documentation in the same transaction. "Ghost Edits" (code changes without documentation updates) are a violation of the protocol.

### 3. Maintain Metadata
Ensure all documentation files have the required metadata header:
```yaml
---
Status: Active
Last Audited: [Today's Date]
Drift Aversion: REQUIRED
---
```

### 4. Continuous Audit
Run the `scripts/verification/verify_drift_protocol.py` script frequently to ensure the repository remains compliant.

## Implementation Examples

### Wrong:
1. Update `backend/api/router.py` to add a new endpoint.
2. Notify user.

### Right:
1. Update `backend/api/router.py` to add a new endpoint.
2. Update `docs/MASTER_SOFTWARE_ARCH.md` with the new endpoint details.
3. Update `docs/MASTER_SOFTWARE_ARCH.md` metadata header `Last Audited` date.
4. Run `python3 scripts/verification/verify_drift_protocol.py`.
5. Notify user.
