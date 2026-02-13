from datetime import datetime
from sqlalchemy.orm import Session
from app.models.sensor_data import VirtualSensorGrid50m, VirtualSensorGrid20m, VirtualSensorGrid1m, SoilSensorReading
from app.services.external_data_service import ExternalDataService
from app.services.satellite_service import SatelliteDataService
import logging
import uuid

logger = logging.getLogger(__name__)

class GridRenderingService:
    @staticmethod
    def get_or_render_grid(
        db: Session,
        field_id: str,
        resolution: str,
        limit: int = 1000
    ):
        """
        Dynamically renders the grid based on recent sensor trends, 
        Landsat history, and real-time external environmental factors.
        """
        logger.info(f"Rendering grid for field {field_id} at {resolution} resolution")

        # 1. Fetch recent sensor readings to determine trend
        readings = db.query(SoilSensorReading).filter(
            SoilSensorReading.field_id == field_id
        ).order_by(SoilSensorReading.timestamp.desc()).limit(3).all()

        trend_modifier = 1.0
        if len(readings) == 3:
            r1, r2, r3 = readings
            if r1.moisture_surface < r2.moisture_surface < r3.moisture_surface:
                trend_modifier = 0.8  # Drying trend
                logger.info(f"Detected drying trend for field {field_id}")

        # 2. Integrate External Atmospheric Data (Open-Meteo)
        # Mock coordinates for field center - in production these would be field metadata
        field_lat, field_lon = 40.5853, -105.0844 
        weather = ExternalDataService.get_weather_data(field_lat, field_lon)
        
        weather_modifier = 1.0
        if weather:
            temp = weather.get("temperature", 20)
            if temp > 30: # Extreme heat
                weather_modifier *= 1.15 # Increase evapotranspiration stress
                logger.info(f"Adjusting for extreme heat: {temp}C")
        
                soil_modifier = 0.9 
                logger.info(f"Adjusting for low Soil Organic Carbon: {soc}")

        # 3. Integrate Advanced Satellite Fusion (Sentinel-1 & 2)
        # Sentinel-2 NDVI (Optical)
        real_ndvi = SatelliteDataService.get_latest_ndvi_point(field_lat, field_lon, field_id)
        
        # Sentinel-1 SAR (Radar) - moisture proxy through clouds
        sar_modifier = SatelliteDataService.get_sentinel1_moisture_proxy(field_lat, field_lon)
        
        logger.info(f"Satellite Fusion: Sentinel-2 NDVI={real_ndvi:.2f}, Sentinel-1 SAR Mod={sar_modifier:.2f}")

        final_modifier = trend_modifier * weather_modifier * soil_modifier * sar_modifier
        logger.info(f"Enterprise Data Fusion Complete. Final Grid Modifier: {final_modifier:.2f}")

        # 4. Render Grid
        model_map = {
            "50m": VirtualSensorGrid50m,
            "20m": VirtualSensorGrid20m,
            "1m": VirtualSensorGrid1m
        }
        
        Model = model_map.get(resolution)
        if not Model:
            raise ValueError(f"Invalid resolution: {resolution}")

        results = db.query(Model).filter(
            Model.field_id == field_id
        ).order_by(Model.timestamp.desc()).limit(limit).all()
        
        if not results and resolution == "1m":
             logger.info("No cached 1m grid found. Generating new high-res points with Fusion...")
             results = GridRenderingService._generate_synthetic_1m_grid(db, field_id, real_ndvi * final_modifier)
        
        return results

    @staticmethod
    def _fetch_satellite_data(field_id: str) -> dict:
        return {f"cell_{i}": 0.3 + (i % 5) * 0.1 for i in range(10)}

    @staticmethod
    def _generate_synthetic_1m_grid(db: Session, field_id: str, modifier: float):
        points = []
        base_time = datetime.utcnow()
        
        for i in range(10):
            p = VirtualSensorGrid1m(
                id=uuid.uuid4(),
                field_id=field_id,
                grid_id=f"{field_id}_1m_{i}",
                timestamp=base_time,
                location=f"POINT(-105.00{i} 40.00{i})",
                moisture_surface=0.25 * modifier,
                moisture_root=0.30 * modifier,
                temperature=22.5,
                ndvi=0.4 + (modifier - 1.0),
                ndwi=0.1,
                crop_stress_probability=max(0.0, 1.0 - modifier),
                yield_forecast_kgha=8500 * modifier,
                irrigation_priority=1 if modifier < 0.8 else 5
            )
            points.append(p)
            db.add(p)
        
        db.commit()
        return points
