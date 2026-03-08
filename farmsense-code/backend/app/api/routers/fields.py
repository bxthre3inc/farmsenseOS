from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from geoalchemy2.shape import from_shape
from shapely.geometry import shape
import json

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.fields import Field
from app.models.user import User
from app.schemas.fields import FieldCreate, FieldResponse

router = APIRouter()

@router.post("/", response_model=FieldResponse, status_code=status.HTTP_201_CREATED)
def register_field(
    field_in: FieldCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Registers a new field boundary.
    Converts GeoJSON Polygon to PostGIS Geometry.
    """
    # 1. Check if field already exists
    existing_field = db.query(Field).filter(Field.field_id == field_in.field_id).first()
    if existing_field:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Field with ID {field_in.field_id} already exists."
        )

    # 2. Convert GeoJSON to Shapely then to GeoAlchemy2 Geometry
    try:
        polygon_shape = shape(field_in.boundary_geojson)
        if polygon_shape.geom_type != 'Polygon':
            raise ValueError("Provided geometry must be a Polygon.")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid GeoJSON: {str(e)}"
        )

    # 3. Create Field record
    new_field = Field(
        field_id=field_in.field_id,
        farm_id=field_in.farm_id,
        field_name=field_in.field_name,
        boundary=from_shape(polygon_shape, srid=4326),
        crop_type=field_in.crop_type,
        soil_type=field_in.soil_type,
        irrigation_system=field_in.irrigation_system,
        # Area calculation would ideally happen in the DB via ST_Area
        # but we can do a rough estimate or let a trigger handle it
        area_hectares=0.0 
    )

    db.add(new_field)
    db.commit()
    db.refresh(new_field)
    
    return new_field

@router.get("/{field_id}", response_model=FieldResponse)
def get_field(
    field_id: str,
    db: Session = Depends(get_db)
):
    field = db.query(Field).filter(Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    return field
