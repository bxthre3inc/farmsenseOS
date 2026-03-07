# Knowledge Item: Water Trading Ledger

## Architecture: DHU AllianceChain

The ledger uses a PBFT (Practical Byzantine Fault Tolerance) consensus mechanism running across DHU (District Coordinator) nodes.

## Core Services

- **`WaterTradingService`**: Backend Python service that manages trade state (Pending, Finalized, Rejected).
- **Callback Loop**: Uses `POST /api/v1/trade/callback` to receive consensus results from the Go-based ledger nodes.

## Data Model

- **Allocations**: Atomically updated in the primary PostgreSQL database once the block is finalized.
- **Traceability**: Every trade refers to a specific PFA source reading.
