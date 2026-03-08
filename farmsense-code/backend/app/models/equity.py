from sqlalchemy import Column, DateTime, ForeignKey, Float, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from .base import Base

class EquityStake(Base):
    __tablename__ = 'equity_stakes'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    shares = Column(Integer, default=0)
    purchase_price = Column(Float)
    purchased_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", backref="equity_stakes")
