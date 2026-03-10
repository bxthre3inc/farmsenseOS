
import time
import numpy as np
import unittest
from app.services.rss_kriging import FHEVector, TENSEAL_AVAILABLE

class TestFHEPerformance(unittest.TestCase):
    def test_precision_and_batching(self):
        if not TENSEAL_AVAILABLE:
            print("TenSEAL not available, skipping hardware-level FHE test.")
            return

        # 1. Setup high-res 1m grid data (100x100 points)
        data = np.random.rand(100)
        
        # 2. Benchmark Encryption
        start_enc = time.time()
        fhe_vec = FHEVector(data)
        end_enc = time.time()
        print(f"Encryption latency for 100 points: {(end_enc - start_enc)*1000:.2f}ms")

        # 3. Benchmark Homomorphic Addition
        other_data = np.random.rand(100)
        fhe_other = FHEVector(other_data)
        
        start_add = time.time()
        fhe_result = fhe_vec + fhe_other
        end_add = time.time()
        print(f"Homomorphic Addition latency: {(end_add - start_add)*1000:.2f}ms")

        # 4. Homomorphic Aggregation
        start_agg = time.time()
        fhe_agg = fhe_vec.aggregate_spatial_regions(region_size=100)
        end_agg = time.time()
        print(f"Homomorphic Aggregation latency: {(end_agg - start_agg)*1000:.2f}ms")

        # 5. Verify Decryption Precision (CKKS ε)
        decrypted = fhe_result.decrypt()
        expected = data + other_data
        
        # ε tolerance for CKKS floating point
        np.testing.assert_allclose(decrypted, expected, atol=1e-5)
        print("FHE Precision Verified within ε=1e-5")

if __name__ == '__main__':
    unittest.main()
