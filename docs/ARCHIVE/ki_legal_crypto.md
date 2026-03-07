# Knowledge Item: Legal Defense & Cryptographic Architecture

## Primary Purpose

Every sensor reading in FarmSense is treated as a **financial transaction** with legal weight in Colorado Water Court.

## Immutable Chain of Truth (MOC — Moment of Capture)

1. **Hardware Signing**: nRF52840 (VFA) and i.MX RT1020 (PFA) use the onboard **CryptoCell-310** hardware accelerator.
   - 256-bit Private Key generated inside HSM at the RSS Sled Hospital — **never leaves the silicon**.
   - If a node is tampered with (detected by internal enclosure light sensor), the DHU revokes its certificate → all subsequent data marked "UNCERTIFIED."
2. **Timestamp Anchoring**: DHUs use Stratum-1 NTP (GPS-disciplined oscillators) for ±1ms temporal accuracy on every mesh transaction.

## PBFT Legal Consensus (Pump Stop Verification)

Three-node attestation to prevent "Flood-Spoofing":

1. **Event Detected**: PFA (Well Sentry) detects surge.
2. **Attestation**: PMT (Pivot Hub) verifies motion halt via IMU.
3. **Finalization**: DHU requires 2-of-3 node signatures to "Finalize" the stop in the regional ledger.

## Schnorr Multi-Signatures

DHUs use Schnorr multi-signatures to condense the attestations of 1,280 VFA nodes into a **single compact regional block** every 15 minutes. This makes the block efficient and legally compact for Water Court submission.

## WORM Storage

- All compliance logs are stored on Write-Once-Read-Many media at the RSS RDC.
- Data is "Self-Authenticating" in Water Court — no witness testimony needed.
- Historical replay: any past state of the field can be reconstructed for dispute resolution.

## 30-Day "Black Box" Cache (DHU)

- 128GB Swissbit pSLC SSD in each DHU.
- If total backhaul fails (fiber cut + cellular), the DHU continuously records AES-128 signed "Audit Packets."
- Guarantees an unbroken chain of custody even during full regional outages.

## "Gas Logic" (Congestion Prevention)

Every transaction consumes "Compute Credits" from the subdistrict levy, preventing mesh flooding from malformed sensor pings.
