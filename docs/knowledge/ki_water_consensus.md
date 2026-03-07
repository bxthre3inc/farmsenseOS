# Knowledge Item: Water Trading Consensus (PBFT)

## Protocol: PBFT

Practical Byzantine Fault Tolerance (PBFT) ensures that water court evidence is immutable and agreed upon by >2/3 of district nodes even if some nodes are compromised or offline.

## Callback Mechanism

1. **Initiate**: `WaterTradingService` broadcasts trade.
2. **Consensus**: AllianceChain nodes run PBFT.
3. **Notify**: Ledger sends a signed callback to the backend.
4. **Finalize**: Backend verifies signature and updates `test.db` / `production_pg`.

## Rationale

This ensures that the "Digital Water Court" has a legally defensible audit trail independent of any single server.
