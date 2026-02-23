from fastapi import APIRouter, Depends, Query, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.database import get_db
from app.api.dependencies import get_current_user, RequireRole
from app.models.user import User, UserRole
from app.models.sensor_data import ComplianceReport

from app.schemas.metrics import ComplianceReportResponse

router = APIRouter()

@router.get("/reports", response_model=list[ComplianceReportResponse], tags=["Compliance"])
def list_compliance_reports(
    field_id: str = None,
    start_date: datetime = None,
    end_date: datetime = None,
    status: str = None,
    db: Session = Depends(get_db)
):
    """List compliance reports with optional filtering"""
    query = db.query(ComplianceReport)
    
    if field_id:
        query = query.filter(ComplianceReport.field_id == field_id)
    if start_date:
        query = query.filter(ComplianceReport.report_period_start >= start_date)
    if end_date:
        query = query.filter(ComplianceReport.report_period_end <= end_date)
    if status:
        query = query.filter(ComplianceReport.validation_status == status)
        
    return query.order_by(ComplianceReport.report_period_end.desc()).limit(100).all()

@router.post("/reports/generate", tags=["Compliance"])
def generate_compliance_report(
    field_id: str,
    period_start: datetime,
    period_end: datetime,
    report_type: str = "monthly",
    background_tasks: BackgroundTasks = None,
    db: Session = Depends(get_db)
):
    """
    Generate SLV 2026 compliance report for a field and time period
    Heavy computation - runs in background
    """
    from app.api.main import generate_compliance_report_task
    task_id = f"report_{field_id}_{datetime.utcnow().timestamp()}"
    
    if background_tasks:
        background_tasks.add_task(
            generate_compliance_report_task,
            field_id, period_start, period_end, report_type, db
        )
        return {"status": "accepted", "task_id": task_id, "message": "Report generation started in background"}
    else:
        # Synchronous execution if no background tasks provided
        generate_compliance_report_task(field_id, period_start, period_end, report_type, db)
        return {"status": "completed", "message": "Report generated synchronously"}
