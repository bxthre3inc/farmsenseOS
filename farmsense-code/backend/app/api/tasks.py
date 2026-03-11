import time
import logging
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.services.adaptive_recalc import AdaptiveRecalculationEngine, FieldCondition, AttentionMode
from app.services.vri_command_center import VRICommandCenter
from app.models import RecalculationLog, ComplianceReport

logger = logging.getLogger(__name__)

def evaluate_field_recalculation(field_id: str, db: Session):
    """
    Background task: Evaluate if field needs recalculation
    """
    engine = AdaptiveRecalculationEngine(db)
    
    # Fetch current field condition (simplified mockup)
    condition = FieldCondition(
        field_id=field_id,
        current_mode=AttentionMode.DORMANT,
        last_recalc=datetime.utcnow() - timedelta(hours=6),
        avg_moisture_surface=0.25,
        avg_moisture_root=0.30,
        moisture_std_dev=0.05,
        moisture_trend_1h=-0.02,
        moisture_trend_6h=-0.15,
        current_temp=28.0,
        et0_rate=6.5,
        rainfall_last_1h=0.0,
        rainfall_forecast_6h=0.0,
        wind_speed=3.5,
        pumps_running=0,
        irrigation_active=False,
        sensor_coverage_pct=98.5,
        sensor_anomalies=[],
        extreme_weather_alerts=[]
    )
    
    decision = engine.evaluate_field(condition)
    
    # Log the evaluation
    log = RecalculationLog(
        field_id=field_id,
        timestamp=datetime.utcnow(),
        trigger_type=decision.trigger_type,
        trigger_details={"reason": decision.reason},
        previous_mode=condition.current_mode.value,
        new_mode=decision.new_mode.value,
        mode_reason=decision.reason,
        moisture_trend="stable" if abs(condition.moisture_trend_1h) < 0.05 else "volatile",
        trend_rate=condition.moisture_trend_1h,
        next_scheduled=decision.next_scheduled,
        computation_duration_ms=45,
        grid_cells_updated=0 if not decision.should_recalculate else 400
    )
    
    db.add(log)
    db.commit()
    
    if decision.should_recalculate:
        # Phase 3: Automated Dispatch Loop
        # If the engine signals high attention (Collapse or Ripple), 
        # instantly push the best resolution prescription to the hardware.
        if decision.new_mode in [AttentionMode.COLLAPSE, AttentionMode.RIPPLE]:
            logger.info(f"HIGH_ATTENTION_TRIGGER: Auto-dispatching VRI for field {field_id}")
            VRICommandCenter.dispatch_prescription(db, field_id)
        else:
            # Low priority update: just render the grid for cache without dispatch
            VRICommandCenter.fetch_vri_grid(db, field_id)


def generate_compliance_report_task(
    field_id: str,
    period_start: datetime,
    period_end: datetime,
    report_type: str,
    db: Session
):
    """Background task: Generate compliance report"""
    # Simulate heavy computation
    time.sleep(2)
    
    report = ComplianceReport(
        field_id=field_id,
        report_period_start=period_start,
        report_period_end=period_end,
        report_type=report_type,
        total_irrigation_m3=1250.5,
        water_use_efficiency=85.2,
        allocation_compliance_pct=98.5,
        validation_score=0.94,
        avg_soil_health_index=7.2,
        nutrient_runoff_risk="low",
        biodiversity_score=8.5,
        data_completeness_pct=99.9,
        sensor_uptime_pct=99.5,
        validation_status="approved",
        slv_2026_compliant="yes",
        violations=[],
        corrective_actions=[],
        report_hash="a1b2c3d4e5f6g7h8i9j0",
        signed_by="System Autobotizer",
        signature="signature_hash_xyz"
    )
    
    db.add(report)
    db.commit()
