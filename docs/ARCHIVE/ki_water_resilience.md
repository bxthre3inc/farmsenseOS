# Knowledge Item: Water Trading Resilience

## Strategy: Local Finality & Post-Sync

The FarmSense architecture assumes frequent internet and mesh blackouts in rural environments.

## Resilience Features

- **Stateless Retries**: All DHU handshakes are queued and retried.
- **Pending trades**: Trades are held in the local DB and synchronized once the mesh heartbeat is detected.
- **DHU Buffering**: Individual DHUs can buffer signed PFA data for up to 72 hours before backhaul is required for finality.
