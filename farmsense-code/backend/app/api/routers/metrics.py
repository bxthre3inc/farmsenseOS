from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.dependencies import get_current_user, RequireRole
from app.models.user import UserRole, User

from app.schemas.metrics import (
    ResearchDatasetResponse, InvestorMetricsResponse,
    GrantImpactResponse, ComplianceMetricsResponse, AdminMetricsResponse
)

router = APIRouter()

@router.get("/research/datasets", response_model=list[ResearchDatasetResponse], tags=["Stakeholders"])
def get_research_datasets(
    db: Session = Depends(get_db),
    researcher: User = Depends(RequireRole([UserRole.RESEARCHER, UserRole.ADMIN]))
):
    """Retrieve raw datasets for CSU Partners (Research only)"""
    return [
        {"id": "ds_01", "name": "San_Luis_Valley_Aquifer_Drawdown_2024", "size_mb": 1450.2, "rows": 8500000, "created_at": "2024-01-15T00:00:00Z", "type": "timeseries"},
        {"id": "ds_02", "name": "Alfalfa_Evapotranspiration_VS_Yield_Q1", "size_mb": 320.5, "rows": 1200000, "created_at": "2024-04-01T00:00:00Z", "type": "spatial_grid"}
    ]

@router.get("/investor/metrics", response_model=InvestorMetricsResponse, tags=["Stakeholders"])
def get_investor_metrics(
    db: Session = Depends(get_db),
    investor: User = Depends(RequireRole([UserRole.INVESTOR, UserRole.ADMIN]))
):
    """Retrieve high-level business/growth metrics (Investor only)"""
    return {
        "total_acreage": 45000.5,
        "enterprise_clients": 12,
        "total_users": 3450,
        "arr_usd": 2450000.0,
        "growth_pct": 18.5,
        "retention_rate": 98.2
    }

@router.get("/grant/impact/{grant_id}", response_model=GrantImpactResponse, tags=["Stakeholders"])
def get_grant_impact(
    grant_id: str,
    db: Session = Depends(get_db),
    reviewer: User = Depends(RequireRole([UserRole.REVIEWER, UserRole.ADMIN]))
):
    """Retrieve impact metrics for grant review (Reviewer only)"""
    return {
        "grant_id": grant_id,
        "water_saved_liters": 15000000.0,
        "co2_reduced_tons": 450.5,
        "yield_increase_pct": 12.4,
        "soil_health_index": 82.5,
        "funding_disbursed_usd": 750000.0
    }

@router.get("/compliance/metrics", response_model=ComplianceMetricsResponse, tags=["Stakeholders"])
def get_compliance_metrics(
    db: Session = Depends(get_db),
    auditor: User = Depends(RequireRole([UserRole.REVIEWER, UserRole.ADMIN]))
):
    """Retrieve aggregated compliance stats (Auditor/Admin only)"""
    return {
        "compliance_rate_pct": 94.5,
        "critical_violations": 2,
        "audits_this_month": 45,
        "total_fields_monitored": 320
    }

@router.get("/admin/metrics", response_model=AdminMetricsResponse, tags=["Stakeholders"])
def get_admin_metrics(
    db: Session = Depends(get_db),
    admin: User = Depends(RequireRole([UserRole.ADMIN]))
):
    """Retrieve high-level system metrics (Admin only)"""
    return {
        "active_users": 850,
        "system_health_pct": 99.9,
        "pending_audits": 12,
        "user_growth_pct": 5.2
    }
