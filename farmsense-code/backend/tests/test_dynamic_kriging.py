
import unittest
import numpy as np
from datetime import datetime, timedelta
from app.services.rss_kriging import RSSKrigingEngine

class TestDynamicKriging(unittest.TestCase):
    def setUp(self):
        self.engine = RSSKrigingEngine()
        self.sensors = [
            {'lat': 40.0, 'lon': -105.0, 'moisture': 0.3},
            {'lat': 40.1, 'lon': -105.1, 'moisture': 0.25},
            {'lat': 39.9, 'lon': -104.9, 'moisture': 0.35}
        ]

    def test_spatiotemporal_decay(self):
        results = [
            {'confidence_score': 0.9, 'computation_mode': 'RSS_1M'},
            {'confidence_score': 0.5, 'computation_mode': 'RSS_1M'}
        ]
        # 4 hours since last update
        decayed = self.engine.apply_spatiotemporal_decay(results, 4.0)
        
        # 5% decay per hour = 20% decay total
        # 0.9 * 0.8 = 0.72
        # 0.5 * 0.8 = 0.4 (marks as stale)
        self.assertAlmostEqual(decayed[0]['confidence_score'], 0.72)
        self.assertAlmostEqual(decayed[1]['confidence_score'], 0.4)
        self.assertIn('STALE', decayed[1]['computation_mode'])

    def test_differential_update(self):
        # Generate initial grid
        grid_a = self.engine.generate_1m_grid("field_1", self.sensors)
        
        # New sensors with slightly different values
        new_sensors = [
            {'lat': 40.0, 'lon': -105.0, 'moisture': 0.4},
            {'lat': 40.1, 'lon': -105.1, 'moisture': 0.3},
            {'lat': 39.9, 'lon': -104.9, 'moisture': 0.45}
        ]
        
        # Generate fresh grid with differential merging
        grid_b = self.engine.generate_1m_grid("field_1", new_sensors, prev_grid=grid_a)
        
        # Verify that grid_b values are refined (weighted between A and B)
        # Expected value approx (0.4 * 0.7 + 0.3 * 0.3) = 0.37
        self.assertTrue(any(0.35 < p['moisture_surface'] < 0.4 for p in grid_b))

if __name__ == '__main__':
    unittest.main()
