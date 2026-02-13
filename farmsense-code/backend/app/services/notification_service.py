
from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.sensor_data import SoilSensorReading
from enum import Enum

class AlertSeverity(Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"

class NotificationService:
    @staticmethod
    def evaluate_reading(reading: SoilSensorReading, db: Session):
        """Evaluates a sensor reading for potential alerts"""
        # Thresholds (Mock)
        CRITICAL_MOISTURE = 0.10
        WARNING_MOISTURE = 0.18
        
        alerts = []
        
        if reading.moisture_surface < CRITICAL_MOISTURE:
            alerts.append({
                "severity": AlertSeverity.CRITICAL,
                "msg": f"Critical Moisture Level: {reading.moisture_surface*100}% on Sensor {reading.sensor_id}",
                "field_id": reading.field_id
            })
        elif reading.moisture_surface < WARNING_MOISTURE:
            alerts.append({
                "severity": AlertSeverity.WARNING,
                "msg": f"Low Moisture Warning: {reading.moisture_surface*100}% on Sensor {reading.sensor_id}",
                "field_id": reading.field_id
            })
            
        for alert in alerts:
            NotificationService.send_alert(alert)

    @staticmethod
    def send_alert(alert: dict):
        """Simulates sending an alert (email/SMS/In-app)"""
        timestamp = datetime.utcnow().isoformat()
        print(f"[{timestamp}] ALERT [{alert['severity'].value.upper()}] for field {alert['field_id']}: {alert['msg']}")
        # In a real app, this would push to a message queue or Firebase/OneSignal
