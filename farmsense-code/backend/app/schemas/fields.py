from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class FieldBase(BaseModel):
    field_id: str
    field_name: str
    farm_id: str
    crop_type: Optional[str] = None
    soil_type: Optional[str] = None
    irrigation_system: Optional[str] = None

class FieldCreate(FieldBase):
    # GeoJSON Polygon Geometry
    # Expects: {"type": "Polygon", "coordinates": [[[lon, lat], ...]]}
    boundary_geojson: Dict[str, Any]

class FieldResponse(FieldBase):
    area_hectares: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
