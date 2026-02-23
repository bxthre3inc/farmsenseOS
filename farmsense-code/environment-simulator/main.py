from fastapi import FastAPI, BackgroundTasks, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Dict, Any
import asyncio
import logging
import random
import os

# Import our custom simulators
from simulators.vfa_simulator import VFASimulator
from simulators.pmt_simulator import PMTSimulator
from simulators.pfa_simulator import PFASimulator
# from simulators.lrz_simulator import LRZSimulator # Will add when LRZ endpoint exists

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("EnvironmentSimulator")

app = FastAPI(title="FarmSense Environment Simulator", version="1.0.0")

# --- Configuration & State ---
BACKEND_URL = os.getenv("FARMSENSE_BACKEND_URL", "http://localhost:8000")
TIME_MULTIPLIER = 1.0  # 1.0 = real-time, 60.0 = 1 real hour per simulated minute
IS_SIMULATING = False
ENVIRONMENT_UUID = "env_sim_001"
# Field coordinate
FIELD_LAT = 37.742
FIELD_LON = -105.86

# Active Simulators
SIMULATORS = {}

def initialize_simulators():
    global SIMULATORS
    SIMULATORS = {
        "vfa_1": VFASimulator("VFA-1001", "field_01", BACKEND_URL, FIELD_LAT, FIELD_LON),
        "pmt_1": PMTSimulator("PMT-2001", "field_01", BACKEND_URL, FIELD_LAT, FIELD_LON),
        "pfa_1": PFASimulator("PFA-3001", "field_01", BACKEND_URL)
    }
    logger.info("Hardware simulators initialized.")

# --- Background Task ---
async def simulation_loop():
    global IS_SIMULATING, TIME_MULTIPLIER
    logger.info("Simulation loop started.")
    
    # Tick rate
    tick_interval_seconds = 5.0
    
    while True:
        if IS_SIMULATING:
            # Calculate how much simulated time has passed
            simulated_seconds_passed = tick_interval_seconds * TIME_MULTIPLIER
            simulated_hours_passed = simulated_seconds_passed / 3600.0
            
            # 1. Advance Physics / State
            # VFA Dries
            SIMULATORS["vfa_1"].dry_soil(rate_multiplier=TIME_MULTIPLIER)
            
            # PMT Moves
            SIMULATORS["pmt_1"].advance_time(simulated_hours_passed)
            
            # If PFA (Pump) is ON, we are irrigating!
            if SIMULATORS["pfa_1"].pump_on and not SIMULATORS["pfa_1"].is_broken:
                # Soil moisture goes up
                SIMULATORS["vfa_1"].irrigate(intensity=(TIME_MULTIPLIER * 0.1))
            
            # 2. Emit Telemetry
            for sim_id, sim in SIMULATORS.items():
                asyncio.create_task(sim.emit())
                
        await asyncio.sleep(tick_interval_seconds)

@app.on_event("startup")
async def startup_event():
    initialize_simulators()
    # Start the background loop
    asyncio.create_task(simulation_loop())

# --- REST API for Simulator Control ---
class ControlRequest(BaseModel):
    action: str
    target: str = None
    value: Any = None

@app.post("/api/simulator/control")
async def control_simulator(req: ControlRequest):
    global IS_SIMULATING, TIME_MULTIPLIER
    
    if req.action == "start":
        IS_SIMULATING = True
        return {"status": "started", "multiplier": TIME_MULTIPLIER}
    
    elif req.action == "stop":
        IS_SIMULATING = False
        return {"status": "stopped"}
        
    elif req.action == "set_multiplier":
        TIME_MULTIPLIER = float(req.value)
        return {"status": "success", "multiplier": TIME_MULTIPLIER}
        
    elif req.action == "toggle_pump":
        state = bool(req.value)
        SIMULATORS["pfa_1"].toggle_pump(state)
        # Assuming pivot moves when pump is on for simple demo
        SIMULATORS["pmt_1"].toggle_motion(state)
        return {"status": "success", "pump_on": state}
        
    elif req.action == "inject_fault":
        hw_id = req.target
        if hw_id in SIMULATORS:
            SIMULATORS[hw_id].break_hardware()
            return {"status": "fault_injected", "target": hw_id}
        return {"error": "target_not_found"}
        
    elif req.action == "resolve_fault":
        hw_id = req.target
        if hw_id in SIMULATORS:
            SIMULATORS[hw_id].fix_hardware()
            return {"status": "fault_resolved", "target": hw_id}
        return {"error": "target_not_found"}

    return {"error": "unknown_action"}

@app.get("/api/simulator/state")
async def get_simulator_state():
    return {
        "is_simulating": IS_SIMULATING,
        "time_multiplier": TIME_MULTIPLIER,
        "simulators": {
            k: {
                "broken": v.is_broken,
                "class": v.__class__.__name__,
            } for k, v in SIMULATORS.items()
        }
    }


# --- HTML Dashboard (God Mode) ---
@app.get("/", response_class=HTMLResponse)
async def god_mode_dashboard():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>FarmSense Environment Simulator Dashboard</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 2rem; background: #0f172a; color: #e2e8f0; }
            h1 { color: #38bdf8; }
            .panel { background: #1e293b; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #334155; }
            button { background: #38bdf8; color: #0f172a; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; margin-right: 0.5rem; }
            button:hover { background: #7dd3fc; }
            .btn-danger { background: #f87171; color: white;}
            .btn-danger:hover { background: #fca5a5; }
            .btn-success { background: #4ade80; color: #022c22; }
            .btn-success:hover { background: #86efac; }
            select, input { padding: 0.5rem; border-radius: 4px; border: 1px solid #475569; background: #0f172a; color: white; margin-right: 0.5rem;}
        </style>
    </head>
    <body>
        <h1>FarmSense Engine: Environment Simulator</h1>
        
        <div class="panel">
            <h3>Global Controls</h3>
            <button onclick="sendAction('start')">Start Simulation</button>
            <button onclick="sendAction('stop')" class="btn-danger">Stop Simulation</button>
            
            <span style="margin-left: 1rem;">Time Multiplier:</span>
            <input type="number" id="multiplier" value="1.0" step="0.5" style="width: 80px;">
            <button onclick="setMultiplier()">Apply Multiplier</button>
            <p id="sim-status">Status: Checking...</p>
        </div>
        
        <div class="panel">
            <h3>Hardware Targets</h3>
            <button onclick="sendAction('toggle_pump', null, true)" class="btn-success">Turn PUMP ON (Irrigate)</button>
            <button onclick="sendAction('toggle_pump', null, false)" class="btn-danger">Turn PUMP OFF</button>
            
            <h4 style="margin-top:2rem;">Chaos Engineering (Fault Injection)</h4>
            <select id="fault-target">
                <option value="vfa_1">VFA-1001 (Soil Sensor)</option>
                <option value="pmt_1">PMT-2001 (Pivot Tracker)</option>
                <option value="pfa_1">PFA-3001 (Pump Anchor)</option>
            </select>
            <button onclick="injectFault()" class="btn-danger">Inject Fault</button>
            <button onclick="resolveFault()" class="btn-success">Resolve Fault</button>
        </div>

        <script>
            async function postCmd(action, target=null, value=null) {
                const res = await fetch('/api/simulator/control', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({action, target, value})
                });
                refreshState();
            }
            
            function sendAction(act, target=null, val=null) { postCmd(act, target, val); }
            function setMultiplier() { postCmd('set_multiplier', null, document.getElementById('multiplier').value); }
            function injectFault() { postCmd('inject_fault', document.getElementById('fault-target').value); }
            function resolveFault() { postCmd('resolve_fault', document.getElementById('fault-target').value); }

            async function refreshState() {
                try {
                    const res = await fetch('/api/simulator/state');
                    const state = await res.json();
                    document.getElementById('sim-status').innerText = 'Status: ' + (state.is_simulating ? 'RUNNING' : 'STOPPED') + ' @ ' + state.time_multiplier + 'x Speed';
                } catch(e) {}
            }
            setInterval(refreshState, 2000);
            refreshState();
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

if __name__ == "__main__":
    import uvicorn
    # Make sure we import environment-simulator parent folder modules correctly
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
