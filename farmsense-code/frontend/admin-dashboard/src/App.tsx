
import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import Login from './components/Login';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { getApiKey, removeApiKey, api } from './services/api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) {
            fetchMetrics();
        }
    }, []);

    const fetchMetrics = async () => {
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        }
    };

    const handleLogout = () => {
        removeApiKey();
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Login onLogin={() => {
            setIsAuthenticated(true);
            fetchMetrics();
        }} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        Admin Panel
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Role: ADMIN</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 bg-slate-700 text-white rounded-lg">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">System Overview</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Last login: Today, 10:23 AM</span>
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">A</div>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{metrics ? metrics.active_users.toLocaleString() : '---'}</p>
                        <span className="text-green-600 text-xs font-medium">{metrics ? '+' + metrics.user_growth_pct + '%' : '---'} from last month</span>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500">System Health</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">{metrics ? metrics.system_health_pct + '%' : '---%'}</p>
                        <span className="text-gray-400 text-xs font-medium">Uptime valid</span>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500">Pending Audits</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">{metrics ? metrics.pending_audits : '--'}</p>
                        <span className="text-yellow-600 text-xs font-medium">Action required</span>
                    </div>
                </div>

                <UserList />
            </main>
        </div>
    );
}

export default App;
