import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from typing import Dict, Any
import json
import hashlib
import base64
import sys
import os

# Add common to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))
from common.crypto.signing import sign_payload

from app.services.equity_service import UFIService
from app.models.water_rights import WaterTrade, TradeStatus
from app.models.user import User

logger = logging.getLogger(__name__)

class RegulatoryAuditService:
    """
    Generates non-repudiable evidence for Water Court hearings.
    Consolidates UFI scores, high-res kriging metadata, and AllianceChain proofs.
    """
    
    @staticmethod
    def generate_field_audit_report(db: Session, field_id: str, user: User) -> Dict[str, Any]:
        """
        Creates a structured audit payload for the 'Digital Water Ledger'.
        In a production environment, this would be converted to a signed PDF.
        """
        logger.info(f"[Audit] Generating Water Court Evidence for Field: {field_id}")
        
        # 1. Fetch High-Fidelity UFI Score
        ufi_score = UFIService.get_ufi_score(db)
        
        # 2. Reconstruct Recent Transaction Chain
        recent_trades = db.query(WaterTrade).filter(
            (WaterTrade.from_field_id == field_id) | (WaterTrade.to_field_id == field_id),
            WaterTrade.status == TradeStatus.COMMITTED
        ).order_by(WaterTrade.committed_at.desc()).limit(10).all()
        
        # 3. Consolidate Metadata for Legal Non-Repudiation
        report = {
            "header": {
                "document_title": "Water Court Compliance Audit (bx3 Standard)",
                "field_id": field_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "auditor_id": user.id,
                "region": "San Luis Valley - Subdistrict 1"
            },
            "fidelity_metrics": {
                "ufi_score": ufi_score,
                "resolution_ladder": "50m Compliance / 1m Enterprise / 1cm Point Zoom",
                "ground_truth_weight": "60.0%",
                "engine_version": "UFI-V2.2-HexFusion"
            },
            "transaction_ledger": [
                {
                    "tx_id": trade.tx_id,
                    "type": "CREDIT_TRANSFER" if trade.to_field_id == field_id else "DEBIT_TRANSFER",
                    "amount_m3": trade.amount_m3,
                    "committed_at": trade.committed_at.isoformat() if trade.committed_at else None,
                    "block_hash": trade.block_hash or "PENDING_QUORUM"
                } for trade in recent_trades
            ],
            "legal_declaration": (
                "This report is generated from the FarmSense RSS Master Ledger. "
                "All spatial data is derived from deterministic sensor ground-truth. "
                "PBFT consensus via AllianceChain ensures record immutability."
            )
        }
        
        # 4. Sign the payload (Digital Seal)
        signature = sign_payload(report)
        report["signature_proof"] = signature
        
        return report

    @staticmethod
    def verify_usage_compliance(satellite_demand_m3: float, meter_actual_m3: float) -> Dict[str, Any]:
        """
        Mandate Enforcement: Cross-validates satellite ET demand vs. Ground-Truth pumping.
        Used by the Subdistrict to detect 'Unmetered Leakage'.
        """
        discrepancy_pct = abs(satellite_demand_m3 - meter_actual_m3) / max(satellite_demand_m3, 1.0) * 100.0
        is_compliant = discrepancy_pct <= 15.0 # Mandate threshold
        
        return {
            "satellite_estimate_m3": satellite_demand_m3,
            "meter_ground_truth_m3": meter_actual_m3,
            "discrepancy_pct": round(discrepancy_pct, 2),
            "compliance_status": "VALIDATED" if is_compliant else "AUDIT_REQUIRED",
            "enforcement_action": "NONE" if is_compliant else "MANDATE_VIOLATION_NOTICE"
        }
