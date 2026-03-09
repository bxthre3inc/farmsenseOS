import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, TrendingUp, FileSignature, 
  Settings, ChevronRight, BarChart3, ShieldCheck
} from 'lucide-react';
import { AdminMetrics } from './AdminMetrics';
import { UserList } from './UserList';
import { InvestorManagement } from './InvestorManagement';

const AdminView: React.FC = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/investors', label: 'Investor Relations', icon: ShieldCheck },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="text-white font-bold">FarmSense</div>
                <div className="text-xs text-slate-500">Admin Console</div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="font-bold text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-3 hover:bg-slate-800 rounded-xl transition-all"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/investors" element={<InvestorManagement />} />
          <Route path="/settings" element={<div className="p-8 text-slate-500">Settings coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Platform Overview</h1>
        <p className="text-slate-500 mt-1">System health, user activity, and investor pipeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AdminMetrics />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-black uppercase">Investor Pipeline</span>
            </div>
            <p className="text-3xl font-black text-slate-900 mb-2">$2.4M</p>
            <p className="text-sm text-slate-500">Active buy-in intents across 4 investors</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
              <div className="bg-emerald-500 h-full rounded-full w-[18%]" />
            </div>
            <p className="text-xs text-slate-400 mt-2">18% of Group 100 seats claimed</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <FileSignature className="w-5 h-5" />
              <span className="text-xs font-black uppercase">NDA Status</span>
            </div>
            <p className="text-3xl font-black text-slate-900 mb-2">12 / 14</p>
            <p className="text-sm text-slate-500">NDAs signed for approved investors</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Investor Relations Active</h3>
            <p className="text-sm text-slate-600">3 pending access requests require your approval</p>
          </div>
        </div>
        <Link 
          to="/admin/investors" 
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
        >
          Review Requests
        </Link>
      </div>
    </div>
  );
};

export default AdminView;