"""
noise.py — Hardware Physics Noise Library

Replicates the real-world signal degradation, sensor drift, and RF attenuation
characteristics of the physical FarmSense hardware nodes. All values are
derived from the hardware datasheets referenced in the Master Specifications.
"""

import random
import math


# --- Gaussian Sensor Noise ---

def apply_gaussian_noise(value: float, sigma: float) -> float:
    """
    Apply zero-mean Gaussian noise to a clean physics value.
    Used to simulate sensor measurement uncertainty (e.g. VFA GroPoint
    moisture probes have a stated ±2% accuracy band).
    """
    return value + random.gauss(0, sigma)


def apply_bounded_noise(value: float, sigma: float, min_val: float, max_val: float) -> float:
    """Gaussian noise with hard physical bounds to prevent impossible readings."""
    return max(min_val, min(max_val, apply_gaussian_noise(value, sigma)))


# --- Battery Drain Model ---

def simulate_battery_drain(voltage: float, active_tx: bool, solar_charging: bool = False) -> float:
    """
    Model the voltage drop on a LiFePO4 / LiSOCl2 battery pack over one tick.

    - LiFePO4 operating range: 12.8V (full) → 11.0V (depleted)
    - TX (900MHz FHSS transmission) draws ~120mA peak
    - Idle draw is ~2mA

    Returns the new battery voltage after one tick.
    """
    drain_rate = 0.008 if active_tx else 0.0005
    charge_rate = 0.004 if solar_charging else 0.0
    new_voltage = voltage - drain_rate + charge_rate
    # Hard bounds: LiFePO4 never drops below ~10.5V before BMS cutoff
    return max(10.5, min(13.0, new_voltage))


# --- RF Stack Models ---

def simulate_fhss_packet_loss(rssi_dbm: float) -> bool:
    """
    Simulate whether a 900MHz FHSS packet survives the air-gap.

    Based on Semtech SX1276 LoRa link budget specs:
    - Receiver sensitivity at SF7/BW125: -123 dBm
    - Packet survives if RSSI > sensitivity + Gaussian fade margin

    Returns True if the packet is received successfully.
    """
    # Sensitivity floor for LoRaWAN 900MHz at SF7
    sensitivity_floor = -123.0
    # Add a stochastic fade margin (multipath fading, reflections)
    effective_floor = sensitivity_floor + random.gauss(0, 3.0)
    return rssi_dbm > effective_floor


def calculate_rssi(distance_m: float, tx_power_dbm: float = 20.0, environment: str = "field") -> float:
    """
    Calculate approximate RSSI using free-space path loss with an environment correction.

    Environments: 'free_space', 'field' (dense crop), 'snowpack' (winter, heavy attenuation)
    """
    # Free-space path loss at 900MHz: FSPL = 20*log10(d) + 20*log10(f) - 147.55
    freq_mhz = 915.0
    if distance_m <= 0:
        distance_m = 1.0
    fspl_db = 20 * math.log10(distance_m) + 20 * math.log10(freq_mhz) - 147.55

    # Environment-specific attenuation coefficients (dB/100m)
    env_loss = {
        "free_space": 0.0,
        "field": 6.5,      # Dense corn/potato canopy, high water content
        "snowpack": 12.0,  # 2ft SLV snowpack over winter dormancy
    }.get(environment, 6.5)

    attenuation = env_loss * (distance_m / 100.0)
    rssi = tx_power_dbm - fspl_db - attenuation
    return rssi


# --- GNSS Error Model ---

def apply_gnss_position_error(lat: float, lon: float, fix_quality: int) -> tuple[float, float]:
    """
    Simulate GNSS position uncertainty.

    Fix quality levels (u-blox ZED-F9P):
      1 = GNSS fix (3-5m accuracy)
      2 = DGPS fix (1-2m accuracy)
      4 = RTK Fixed (<2.5cm accuracy)
      5 = RTK Float (5-50cm accuracy)

    Returns (noisy_lat, noisy_lon).
    """
    accuracy_map = {1: 0.00005, 2: 0.00002, 4: 0.0000002, 5: 0.000002}
    sigma = accuracy_map.get(fix_quality, 0.00005)
    noisy_lat = lat + random.gauss(0, sigma)
    noisy_lon = lon + random.gauss(0, sigma)
    return noisy_lat, noisy_lon


# --- IMU Vibration Model (Pivot Span) ---

def simulate_pivot_vibration(span_speed_mph: float) -> dict:
    """
    Simulate the vibration harmonics measured by the Bosch BNO055 9-Axis IMU
    mounted on the pivot span. At higher speeds, harmonic amplitude increases
    non-linearly with span flex resonance.

    Returns a dict with accel_x, accel_y, accel_z in m/s² (offset from gravity).
    """
    base_vib = span_speed_mph * 0.15  # Empirical coefficient from SLV pivot data
    return {
        "accel_x": apply_gaussian_noise(0.0, base_vib),
        "accel_y": apply_gaussian_noise(0.0, base_vib * 1.2),  # Lateral flex dominant
        "accel_z": apply_gaussian_noise(9.81, base_vib * 0.5),  # Gravity + vertical bounce
    }


# --- PFA Current Harmonic Analysis Simulation ---

def simulate_current_harmonics(pump_on: bool, cavitation: bool = False, bearing_wear: float = 0.0) -> list[float]:
    """
    Simulate the 400A CT Clamp output and Fast Fourier Transform (FFT) harmonics
    of the 480V/3-phase wellhead pump motor.

    Returns a 16-bin FFT array (Hz amplitudes). The backend's
    PredictiveMaintenanceService.analyze_harmonics() expects this exact format.

    - Healthy pump: clean 60Hz fundamental, low harmonics
    - Cavitation: elevated 3rd and 5th harmonics (180Hz, 300Hz bins)
    - Bearing wear: elevated odd harmonics + broadband noise floor
    """
    if not pump_on:
        return [0.0] * 16

    # Bin 0 = DC offset, Bin 1 = 60Hz fundamental, Bin 2 = 120Hz, Bin 3 = 180Hz...
    bins = [0.0] * 16
    bins[0] = apply_gaussian_noise(0.5, 0.05)         # DC offset
    bins[1] = apply_gaussian_noise(95.0, 2.0)          # 60Hz fundamental (dominant)
    bins[2] = apply_gaussian_noise(4.0, 0.5)           # 120Hz (2nd harmonic, always present)
    
    if cavitation:
        # Cavitation signature: spiked 3rd (180Hz) and 5th (300Hz) harmonics
        bins[3] = apply_gaussian_noise(28.0, 3.0)      # 180Hz spike — cavitation flag
        bins[5] = apply_gaussian_noise(18.0, 2.5)      # 300Hz spike
    else:
        bins[3] = apply_gaussian_noise(1.5, 0.3)
        bins[5] = apply_gaussian_noise(0.8, 0.2)

    if bearing_wear > 0.0:
        # Bearing wear: elevated broadband noise floor + odd harmonics
        for i in [7, 9, 11, 13]:
            bins[i] = apply_gaussian_noise(bearing_wear * 5.0, bearing_wear * 1.5)

    # Thermal noise floor on all bins
    for i in range(16):
        bins[i] += abs(random.gauss(0, 0.1))

    return bins
