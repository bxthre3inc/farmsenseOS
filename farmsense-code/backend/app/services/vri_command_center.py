"""
vri_command_center.py — Hierarchical Zoned VRI Orchestrator

Manages the spatial fidelity hierarchy (1m, 10m/20m, 50m) based on 
field context, attention modes, and hardware availability.
"""

import logging
from typing import List, Any
from sqlalchemy.orm import Session
from datetime import datetime

from app.services.grid_renderer import GridRenderingService
from app.services.adaptive_recalc import AdaptiveRecalculationEngine, AttentionMode
from app.models import VirtualSensorGrid50m, VirtualSensorGrid20m, VirtualSensorGrid1m, RecalculationLog

logger = logging.getLogger(__name__)

class VRICommandCenter:
    @staticmethod
    def get_best_available_resolution(db: Session, field_id: str) -> str:
        """
        Determines the optimal resolution for the current field state.
        BAR (Best Available Resolution) logic.
        """
        # 1. Check current attention mode from the latest RecalculationLog
        latest_log = db.query(RecalculationLog).filter(
            RecalculationLog.field_id == field_id
        ).order_by(RecalculationLog.timestamp.desc()).first()
        
        if not latest_log:
            current_mode = AttentionMode.DORMANT
        else:
            # Map string back to AttentionMode enum
            try:
                current_mode = AttentionMode(latest_log.new_mode)
            except ValueError:
                current_mode = AttentionMode.DORMANT
        
        # 2. Logic for BAR
        # Collapse mode (emergency/high-action) -> Prefers 1m if possible, or 10m/20m
        # Anticipatory mode (pivot moving) -> 20m
        # Dormant mode -> 50m is sufficient
        
        if current_mode == AttentionMode.COLLAPSE:
            return "1m"
        elif current_mode == AttentionMode.ANTICIPATORY:
            return "20m"
        else:
            return "50m"

    @staticmethod
    def fetch_vri_grid(db: Session, field_id: str, requested_res: str = None) -> List[Any]:
        """
        Returns grid data at the Best Available Resolution (BAR).
        """
        if requested_res is None:
            resolution = VRICommandCenter.get_best_available_resolution(db, field_id)
        else:
            resolution = requested_res
            
        logger.info(f"VRICommandCenter: Delivering {resolution} resolution for field {field_id}")
        
        return GridRenderingService.get_or_render_grid(db, field_id, resolution)
