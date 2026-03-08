# FarmSense AllianceChain: PBFT Blockchain for Agricultural Water Rights Trading

**Specification Version:** 1.0  
**Component:** District Hub (DHU) Software Module  
**Target Release:** Q3 2026 (post-pilot)  
**Owner:** FarmSense Engineering + Legal  

---

## Executive Summary

This specification defines the implementation of a **Practical Byzantine Fault Tolerance (PBFT)** alliance-chain blockchain within the FarmSense District Hub (DHU) infrastructure. The system enables secure, peer-to-peer water rights trading between neighboring farmers without requiring centralized clearinghouses or third-party escrow.

**Key Innovation:** The DHU's existing 128GB Swissbit PSLC Industrial SSD and AES-256 encrypted "Black Box" architecture provides the hardware foundation for a geographically distributed, tamper-evident ledger of water rights transfers.

---

## 1. SYSTEM ARCHITECTURE

### 1.1 Network Topology

```
┌─────────────────────────────────────────────────────────────┐
│                    ALLIANCECHAIN MESH                        │
│                                                              │
│  ┌─────────┐      ┌─────────┐      ┌─────────┐             │
│  │  DHU-1  │◄────►│  DHU-2  │◄────►│  DHU-3  │             │
│  │ (Node A)│ 900MHz│ (Node B)│ CSS  │ (Node C)│             │
│  └────┬────┘ LoRa └────┬────┘ LoRa └────┬────┘             │
│       │                  │                  │                │
│       └──────────────────┼──────────────────┘                │
│                          │                                   │
│                    ┌─────┴─────┐                             │
│                    │  RSS      │                             │
│                    │ (Witness) │                             │
│                    └───────────┘                             │
└─────────────────────────────────────────────────────────────┘
```

**Node Roles:**
- **Primary (Leader):** Proposes new water rights transfer blocks (rotates every N blocks)
- **Replicas:** Validate and vote on proposals (minimum 3f+1 nodes for f faults)
- **Witness (RSS):** Non-voting archival node with complete chain history

### 1.2 Consensus Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Consensus Algorithm** | PBFT (Practical Byzantine Fault Tolerance) | Tolerates malicious nodes, no mining required |
| **Block Time** | 5 minutes | Balances throughput vs. finality for water trades |
| **Block Size** | 100 transactions | Accommodates peak trading periods (pre-irrigation season) |
| **Finality** | Instant (2f+1 confirmations) | No re-orgs possible — critical for legal certainty |
| **Fault Tolerance** | f ≤ (n-1)/3 | With 4 DHU nodes, tolerates 1 Byzantine node |
| **Geographic Scope** | 100-pivot radius per DHU | Matches existing DHU mesh coverage |

---

## 2. TRANSACTION TYPES

### 2.1 WaterRightsTransfer

The primary transaction type for peer-to-peer water rights trading.

```json
{
  "tx_type": "WaterRightsTransfer",
  "tx_id": "sha256_hash",
  "timestamp": "ISO8601",
  "seller": {
    "farmer_id": "FARM_001_SLV",
    "water_right_cert": "CO_WRC_1938_0447",
    "digital_signature": "ecdsa_secp256k1"
  },
  "buyer": {
    "farmer_id": "FARM_089_SLV",
    "water_right_cert": "CO_WRC_1938_0892",
    "digital_signature": "ecdsa_secp256k1"
  },
  "transfer_details": {
    "acre_feet": 15.5,
    "transfer_period_start": "2026-06-01",
    "transfer_period_end": "2026-09-30",
    "use_restriction": "AGRICULTURAL_ONLY",
    "price_usd": 7750.00,
    "price_per_af": 500.00
  },
  "compliance": {
    "rgwcd_approved": true,
    "approval_tx": "RGWCD_TX_2026_00441",
    "compact_compliant": true
  },
  "parent_block": "prev_block_hash"
}
```

### 2.2 WaterUseAttestation

Immutable record of actual water consumption (feeds into compliance verification).

```json
{
  "tx_type": "WaterUseAttestation",
  "tx_id": "sha256_hash",
  "attestor": "DHU_NODE_ID",
  "farmer_id": "FARM_001_SLV",
  "measurement": {
    "timestamp": "ISO8601",
    "flow_rate_gpm": 850.5,
    "total_volume_af": 12.3,
    "pmt_gnss_verified": true,
    "ultrasonic_meter_id": "PMT_V1_6_001"
  },
  "proof": {
    "pmt_signature": "ecdsa_signature",
    "dhu_notarization": "blake2b_hash"
  }
}
```

### 2.3 SeasonalAllocationCommit

Annual water budget allocation recorded immutably at season start.

```json
{
  "tx_type": "SeasonalAllocationCommit",
  "rgwcd_authority": "RGWCD_SUBDISTRICT_1",
  "allocation_year": 2026,
  "farm_allocations": [
    {
      "farmer_id": "FARM_001_SLV",
      "allocated_af": 252.0,
      "tier_1_rate": 45.00,
      "tier_2_rate": 500.00
    }
  ],
  "compact_compliance_hash": "merkle_root_of_all_allocations"
}
```

---

## 3. PBFT CONSENSUS IMPLEMENTATION

### 3.1 Consensus Phases (per block)

```
Phase 1: REQUEST
  Client (farmer app) → Primary DHU node
  Submit signed WaterRightsTransfer

Phase 2: PRE-PREPARE
  Primary → All Replicas
  Broadcast: <PRE-PREPARE, v, n, d, m>
  v = view number, n = sequence number, d = digest, m = message

Phase 3: PREPARE
  Replicas → All Nodes
  Broadcast: <PREPARE, v, n, d, i>
  i = node ID
  Node waits for 2f PREPARE messages matching PRE-PREPARE

Phase 4: COMMIT
  Replicas → All Nodes
  Broadcast: <COMMIT, v, n, d, i>
  Node waits for 2f+1 COMMIT messages
  → Block is FINAL, append to local ledger

Phase 5: REPLY
  All Nodes → Client
  Return: Transaction receipt with merkle proof
```

### 3.2 View Changes (Leader Rotation)

If primary node is faulty or unresponsive:

```
1. Replica detects primary failure (timeout: 3× block time = 15 min)
2. Replica broadcasts VIEW-CHANGE <v+1, n, C, P, i>
   C = checkpoint proof, P = prepared certificates
3. New primary (deterministic: (v+1) mod n) collects 2f VIEW-CHANGE messages
4. New primary broadcasts NEW-VIEW <v+1, V, O>
   V = view-change set, O = pre-prepare set
5. Normal operation resumes with new primary
```

---

## 4. SECURITY MODEL

### 4.1 Threat Vectors & Mitigations

| Threat | Mitigation |
|--------|------------|
| **Double-spending water rights** | Instant finality prevents re-orgs; UTXO-style input tracking |
| **Sybil attacks (fake DHU nodes)** | Hardware-attested node identity (engraved serial + TPM) |
| **51% attacks** | Permissioned network; node addition requires RGWCD + FarmSense signature |
| **Eclipse attacks** | 900MHz LoRa mesh redundancy; RSS witness node archival |
| **Smart contract bugs** | No Turing-complete contracts; fixed transaction types only |
| **Quantum computing** | Post-quantum signatures (Dilithium) planned for V2.0 |

### 4.2 Key Management

```
Hierarchy:
├── Master Key (HSM in RSS, offline)
│   └── Signs: Annual root certificates, emergency revocation
├── DHU Node Keys (TPM-generated, never leaves hardware)
│   └── Signs: Block proposals, transaction notarizations
└── Farmer Keys (mobile app, encrypted backup to DHU)
    └── Signs: Transaction intents, delegation authorizations
```

---

## 5. INTEGRATION WITH FARMSTACK

### 5.1 DHU Software Stack

```
┌────────────────────────────────────────────┐
│           FarmStack Application Layer       │
│  ┌──────────────────────────────────────┐  │
│  │     AllianceChain Consensus Module    │  │
│  │  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │  PBFT Engine │  │  Merkle Tree │  │  │
│  │  │  (Go/Rust)   │  │  Store       │  │  │
│  │  └──────────────┘  └──────────────┘  │  │
│  │  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │  Transaction │  │  Wallet      │  │  │
│  │  │  Pool        │  │  Manager     │  │  │
│  │  └──────────────┘  └──────────────┘  │  │
│  └──────────────────────────────────────┘  │
├────────────────────────────────────────────┤
│           Storage Layer                     │
│  ┌────────────────────────────────────┐   │
│  │  Swissbit 128GB PSLC SSD           │   │
│  │  ├── Blockchain Ledger (ledger.db) │   │
│  │  ├── State Trie (state.db)         │   │
│  │  └── Archive Snapshots (daily)     │   │
│  └────────────────────────────────────┘   │
├────────────────────────────────────────────┤
│           Networking Layer                  │
│  ┌────────────────────────────────────┐   │
│  │  900MHz LoRa Mesh (CSS)            │   │
│  │  └── PBFT message gossip            │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### 5.2 API Endpoints (DHU-local REST)

```http
# Submit transaction intent
POST /api/v1/tx/submit
Content-Type: application/json
X-Farmer-Signature: <ecdsa_sig>

# Query transaction status
GET /api/v1/tx/{tx_id}/status

# Get account water rights balance
GET /api/v1/account/{farmer_id}/balance

# Query block by height
GET /api/v1/block/{height}

# Get merkle proof for transaction
GET /api/v1/tx/{tx_id}/proof

# List pending transactions in mempool
GET /api/v1/mempool/pending

# Export ledger segment (for water court evidence)
GET /api/v1/ledger/export?start={height}&end={height}
```

---

## 6. LEGAL & COMPLIANCE

### 6.1 Colorado Water Law Integration

| Requirement | Implementation |
|-------------|----------------|
| **Prior appropriation doctrine** | Timestamps establish priority; first-in-time, first-in-right encoded |
| **Beneficial use limitation** | Smart restriction: `use_restriction: AGRICULTURAL_ONLY` |
| **No speculative water rights** | Max transfer = 90% of proven beneficial use (12-month trailing average) |
| **RGWCD approval** | Multi-sig requirement: Seller + Buyer + RGWCD_Notary |
| **Change of use prohibition** | Transaction rejected if `use_restriction` differs from original decree |

### 6.2 Audit Trail for Water Court

```
Evidence Package (per transaction):
├── Block header with PBFT signatures
├── Full transaction payload
├── Merkle proof path
├── DHU attestation logs
├── PMT flow meter readings (linked via WaterUseAttestation)
└── RGWCD approval certificate

Format: JSON-LD with SHA-256 checksums
Retention: 40 years (matching hardware enclosure lifespan)
```

---

## 7. IMPLEMENTATION ROADMAP

| Phase | Milestone | Deliverable | ETA |
|-------|-----------|-------------|-----|
| 1 | Core PBFT Engine | Go implementation, unit tests | May 2026 |
| 2 | DHU Integration | Embedded deployment on Jetson Orin Nano | June 2026 |
| 3 | 2-Node Testnet | DHU-1 ↔ DHU-2 (CSU pilot fields) | July 2026 |
| 4 | 4-Node Mainnet | Subdistrict 1 production rollout | Sept 2026 |
| 5 | RGWCD Integration | Official notary node deployment | Oct 2026 |
| 6 | Mobile Wallet | Farmer-facing iOS/Android app | Nov 2026 |

---

## 8. ECONOMIC MODEL

### 8.1 Transaction Fees

| Operation | Fee (USD) | Rationale |
|-----------|-----------|-----------|
| WaterRightsTransfer | $25 + 0.5% of value | Deters spam, funds DHU infrastructure |
| WaterUseAttestation | $0 (subsidized) | Critical for compliance; no barrier to entry |
| SeasonalAllocationCommit | $0 (RGWCD-funded) | Public good, funded by district |
| LedgerExport (court) | $50 flat | Expert witness preparation fee |

**Fee Distribution:**
- 60% → DHU node operators (infrastructure maintenance)
- 30% → FarmSense development fund
- 10% → Emergency reserve (chain upgrades, security audits)

### 8.2 Revenue Projection

Assuming 1,280 fields in Subdistrict 1, 20% annual trading rate, avg 10 AF per trade:

```
Trades per year: 1,280 × 0.20 = 256 trades
Avg value per trade: 10 AF × $500/AF = $5,000
Fee per trade: $25 + ($5,000 × 0.005) = $50
Annual transaction revenue: 256 × $50 = $12,800
```

Small but symbolic — the real value is **lock-in**: farmers using the trading platform become FarmSense SaaS subscribers for life.

---

## 9. APPENDICES

### A. PBFT Message Formats (Binary)

```c
// PrePrepare message structure
struct PrePrepare {
    uint8_t  msg_type = 0x01;
    uint32_t view;
    uint64_t sequence;
    uint8_t  digest[32];    // SHA-256 of block
    uint64_t timestamp;
    uint8_t  signature[64]; // ECDSA secp256k1
} __attribute__((packed));

// Prepare message structure
struct Prepare {
    uint8_t  msg_type = 0x02;
    uint32_t view;
    uint64_t sequence;
    uint8_t  digest[32];
    uint8_t  node_id[16];
    uint8_t  signature[64];
} __attribute__((packed));

// Commit message structure
struct Commit {
    uint8_t  msg_type = 0x03;
    uint32_t view;
    uint64_t sequence;
    uint8_t  digest[32];
    uint8_t  node_id[16];
    uint8_t  signature[64];
} __attribute__((packed));
```

### B. Reference Implementations

- **Tendermint:** Cosmos SDK PBFT implementation (Go)
- **Hyperledger Fabric:** Practical BFT for enterprise (Go)
- **HotStuff:** Linear communication complexity BFT (research)

### C. Glossary

| Term | Definition |
|------|------------|
| **PBFT** | Practical Byzantine Fault Tolerance — consensus algorithm tolerating malicious nodes |
| **AllianceChain** | Permissioned blockchain for trusted consortiums (farmers + RGWCD) |
| **View** | Logical time period with a designated primary node |
| **Finality** | Guarantee that confirmed transaction will never be reversed |
| **Merkle Proof** | Cryptographic proof that a transaction exists in a specific block |

---

## REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | Zo (AI) | Initial PBFT blockchain specification for water rights trading |

---

*This specification enables FarmSense to become the infrastructure layer for agricultural water markets — not just a sensor company, but the operating system for water rights in the American West.*
