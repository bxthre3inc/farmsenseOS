# Knowledge Item: System Authentication & AuthContext

## Overview

Replaced the demo login system with a production-grade FastAPI + React JWT flow.

## Implementation Details

- **Backend**: `app.api.routers.auth` provides `/login` with Bcrypt validation.
- **Storage**: JWTs are stored in `sessionStorage` (stateless).
- **Role-Based Access**: The `AuthContext` extracts roles (e.g., `INTERNAL`, `FARMER`, `REGULATOR`) to gate UI components.

## Security Standards

- **Hashing**: Bcrypt (rounds=12).
- **JWT Secret**: Managed via `JWT_SECRET` env var.
- **Statelessness**: No server-side sessions; tokens are validated on every request via the `get_current_user` dependency.
