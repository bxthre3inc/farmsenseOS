
import numpy as np
import random
from datetime import datetime, timedelta

def predict_yield(field_id: str, history_days: int = 30):
    """
    Mock yield prediction based on historical stability.
    In production, this would use a Random Forest or LSTM model.
    """
    # Simulate a baseline yield and some variability
    base_yield = 180.0 # bushels/acre
    variability = random.uniform(-15.0, 15.0)
    confidence = random.uniform(0.85, 0.96)
    
    return {
        "field_id": field_id,
        "predicted_yield_bu_acre": round(base_yield + variability, 2),
        "confidence_score": round(confidence, 3),
        "prediction_date": datetime.utcnow().isoformat(),
        "model_version": "yield-v1.2.0-baseline"
    }

def predict_moisture_trend(sensor_readings: list):
    """
    Mock moisture trend prediction for the next 48 hours.
    """
    if not sensor_readings:
        return []
    
    current_avg = sum(r['moisture'] for r in sensor_readings) / len(sensor_readings)
    predictions = []
    
    for i in range(1, 49):
        # Apply a simple decay and some noise
        decay = 0.002 * i
        noise = random.uniform(-0.005, 0.005)
        predicted_val = max(0, current_avg - decay + noise)
        
        predictions.append({
            "hour": i,
            "moisture_predicted": round(predicted_val, 4),
            "timestamp": (datetime.utcnow() + timedelta(hours=i)).isoformat()
        })
        
    return predictions

def predict_7_14_day_forecast(field_id: str):
    """
    Mock 14-day forecast for yield, moisture, and temperature.
    """
    predictions = []
    base_moisture = random.uniform(0.20, 0.40)
    base_temp = random.uniform(15.0, 30.0)
    
    for i in range(1, 15):
        # Add realistic noise/trends for daily forecast
        moisture_noise = random.uniform(-0.02, 0.02)
        temp_noise = random.uniform(-2.0, 2.0)
        
        predictions.append({
            "day": i,
            "date": (datetime.utcnow() + timedelta(days=i)).date().isoformat(),
            "avg_moisture": round(max(0, base_moisture + (i * -0.005) + moisture_noise), 3),
            "avg_temperature": round(base_temp + temp_noise, 1),
            "stress_index": round(random.uniform(0.1, 0.8), 2)
        })
        
    return {
        "field_id": field_id,
        "forecast_days": 14,
        "predictions": predictions
    }
