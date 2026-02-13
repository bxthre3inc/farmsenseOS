from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum as sqlalchemy_enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from .sensor_data import Base

class LetterStatus(str, enum.Enum):
    PENDING = "pending"
    SIGNED = "signed"
    VERIFIED = "verified"
    REJECTED = "rejected"

class SupportLetter(Base):
    __tablename__ = 'support_letters'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    grant_id = Column(String(50), nullable=False, index=True)
    sender_name = Column(String(100), nullable=False)
    sender_email = Column(String(255), nullable=False, index=True)
    sender_organization = Column(String(200))
    content = Column(Text, nullable=False)
    status = Column(sqlalchemy_enum(LetterStatus), default=LetterStatus.PENDING)
    signature_data = Column(Text) # Base64 or digital signature hash
    signed_at = Column(DateTime)
    verified_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

# Pydantic Schemas
class SupportLetterBase(BaseModel):
    grant_id: str
    sender_name: str
    sender_email: EmailStr
    sender_organization: Optional[str] = None
    content: str

class SupportLetterCreate(SupportLetterBase):
    pass

class SupportLetterSign(BaseModel):
    signature_data: str

class SupportLetterRead(SupportLetterBase):
    id: uuid.UUID
    status: LetterStatus
    signed_at: Optional[datetime] = None
    verified_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
