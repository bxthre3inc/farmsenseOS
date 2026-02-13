from sqlalchemy import Column, String, Enum, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
import enum
from .base import Base

class SubscriptionTier(str, enum.Enum):
    FREE = "FREE"             # 50 meters
    BASIC = "BASIC"           # + 20 meters
    PRO = "PRO"               # + 1 meter
    ENTERPRISE = "ENTERPRISE" # + 1 meter + Drone

class UserRole(str, enum.Enum):
    FARMER = "FARMER"
    AUDITOR = "AUDITOR"
    ADMIN = "ADMIN"
    RESEARCHER = "RESEARCHER"
    INVESTOR = "INVESTOR"
    REVIEWER = "REVIEWER"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    api_key = Column(String, unique=True, index=True, nullable=False)
    tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.FARMER, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
