
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Cpu,
  Database,
  Settings,
  Bell,
  Search,
  User,
  Activity,
  Droplets,
  Thermometer,
  CloudRain,
  Zap,
  Navigation,
  Satellite
} from 'lucide-react';
import AgriMap from './components/AgriMap';
import TelemetryOverlay from './components/TelemetryOverlay';
import Login from './components/Login';
import { getApiKey, removeApiKey } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setIsAuthenticated(!!getApiKey());
  }, []);

  const handleLogout = () => {
    removeApiKey();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden text-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#020617] border-r border-white/5 flex flex-col p-6 space-y-8 z-20">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">FARMSENSE<span className="text-emerald-500">.</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full nav-item ${activeTab === 'dashboard' ? 'nav-item-active' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`w-full nav-item ${activeTab === 'map' ? 'nav-item-active' : ''}`}
          >
            <MapIcon className="w-5 h-5" /> AgriMap Explorer
          </button>
          <button className="w-full nav-item">
            <Satellite className="w-5 h-5" /> Satellite Insights
          </button>
          <button className="w-full nav-item">
            <Navigation className="w-5 h-5" /> Robotics Fleet
          </button>
          <button className="w-full nav-item">
            <Database className="w-5 h-5" /> Historical Data
          </button>
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <button className="w-full nav-item"><Settings className="w-5 h-5" /> System Config</button>
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={handleLogout}>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-white">Enterprise User</p>
              <p className="text-[10px] text-slate-500">Log Out</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Global Header */}
        <header className="h-20 bg-[#0b1120]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-96">
            <Search className="w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search fields, sensors, or alerts..." className="bg-transparent text-sm border-none focus:outline-none w-full" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 glow-active"></div> System Operational</div>
              <div className="flex items-center gap-2"><CloudRain className="w-4 h-4" /> Precipitation: 12mm</div>
            </div>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Dashboard / Map View */}
        <div className="flex-1 relative">
          {activeTab === 'dashboard' ? (
            <div className="p-10 space-y-8 overflow-y-auto h-full pb-32">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight mb-2">OPERATIONS COMMAND</h2>
                  <p className="text-slate-400">Holistic overview of all field ecosystems and autonomous assets.</p>
                </div>
                <div className="flex gap-4">
                  <button className="glass-button-primary"><Satellite className="w-4 h-4" /> Request Sentinel Update</button>
                  <button className="glass-button-secondary"><Navigation className="w-4 h-4" /> Dispatch Robotic Fleet</button>
                </div>
              </div>

              {/* Hero Stat Grid */}
              <div className="grid grid-cols-4 gap-6">
                <div className="glass-card p-6 border-l-4 border-emerald-500">
                  <div className="flex justify-between items-start mb-4">
                    <Droplets className="text-emerald-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Optimal</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Avg. Moisture</p>
                  <p className="text-3xl font-black text-white mt-1">32.4<span className="text-sm font-normal text-slate-500 ml-1">%</span></p>
                </div>
                <div className="glass-card p-6 border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-4">
                    <Thermometer className="text-orange-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full uppercase">High</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Temperature</p>
                  <p className="text-3xl font-black text-white mt-1">28.5<span className="text-sm font-normal text-slate-500 ml-1">°C</span></p>
                </div>
                <div className="glass-card p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-4">
                    <Activity className="text-blue-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase">Nominal</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pump Pressure</p>
                  <p className="text-3xl font-black text-white mt-1">4.2<span className="text-sm font-normal text-slate-500 ml-1">bar</span></p>
                </div>
                <div className="glass-card p-6 border-l-4 border-slate-500">
                  <div className="flex justify-between items-start mb-4">
                    <Zap className="text-slate-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-500/10 px-2 py-0.5 rounded-full uppercase">Standby</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Robotic Battery</p>
                  <p className="text-3xl font-black text-white mt-1">88<span className="text-sm font-normal text-slate-500 ml-1">%</span></p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 glass-card overflow-hidden h-96 relative group">
                  <div className="absolute top-6 left-6 z-10">
                    <h3 className="text-lg font-bold text-white shadow-sm">Real-time Field Dynamics</h3>
                    <p className="text-xs text-slate-400 font-sans tracking-tight">Sentinel-2 Overlay - LV Model 1m Grid</p>
                  </div>
                  <AgriMap />
                  <div className="absolute bottom-6 right-6 z-10">
                    <button className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold border border-white/10 hover:bg-slate-800 transition-all" onClick={() => setActiveTab('map')}>
                      Expand Map View
                    </button>
                  </div>
                </div>

                <div className="glass-card p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Live Telemetry</h3>
                    <p className="text-xs text-slate-400 mb-6">Aggregated from IoT sensor array and machinery telematics.</p>
                    <TelemetryOverlay />
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Alerts</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <p className="text-[11px] font-medium text-orange-200">Moisture drop detected in Quad C4</p>
                      </div>
                      <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <p className="text-[11px] font-medium text-emerald-200">Robotic Unit 07 Mission Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (activeTab === 'map' && (
            <div className="w-full h-full">
              <AgriMap />
              <div className="absolute top-10 right-10 z-10">
                <TelemetryOverlay />
              </div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="absolute top-10 left-10 z-10 glass-card px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" /> Back to Operations
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
