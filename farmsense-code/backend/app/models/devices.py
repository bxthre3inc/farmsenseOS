from sqlalchemy import Column, String, Float, DateTime, Integer, JSON, Index, ForeignKey, Enum as sqlalchemy_enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum
from .sensor_data import Base

class DeviceType(str, enum.Enum):
    SENSOR = "sensor"
    MACHINERY = "machinery"
    ROBOTICS = "robotics"
    IRRIGATION = "irrigation"

class Device(Base):
    """Unified model for any hardware device in the field"""
    __tablename__ = 'devices'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    external_id = Column(String(100), unique=True, index=True) # ID from vendor
    field_id = Column(String(50), nullable=False, index=True)
    device_type = Column(sqlalchemy_enum(DeviceType), nullable=False)
    vendor = Column(String(100))
    model = Column(String(100))
    
    # Generic status and health
    status = Column(String(50), default="active")
    battery_level = Column(Float)
    last_communication = Column(DateTime)
    
    # Flexible configuration
    config = Column(JSON) 
    
    # Telemetry data (Latest)
    latest_telemetry = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class RoboticsMission(Base):
    """Tracking autonomous robotic tasks (weeding, seeding, spraying)"""
    __tablename__ = 'robotics_missions'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    device_id = Column(UUID(as_uuid=True), ForeignKey('devices.id'))
    status = Column(String(50)) # scheduled, in-progress, completed, failed
    mission_type = Column(String(100))
    
    # Path telemetry
    path_data = Column(JSON) # List of coordinates
    coverage_area_m2 = Column(Float)
    
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    
    # Result data
    mission_report = Column(JSON)
