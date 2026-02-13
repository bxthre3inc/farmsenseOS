
import React, { useState, useEffect } from 'react';
import { ComplianceList } from './components/ComplianceList';
import Login from './components/Login';
import { FileBadge, Search, Bell, LogOut } from 'lucide-react';
import { getApiKey, removeApiKey } from './services/api';

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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <FileBadge className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">Regulatory Audit Portal</h1>
                                <p className="text-xs text-slate-500">Government Oversight & Compliance</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                            </div>
                            <button className="relative p-2 text-gray-400 hover:text-gray-600">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">Officer Demo</p>
                                    <p className="text-xs text-gray-500">Auditor Session Active</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">Compliance Rate</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{metrics ? metrics.compliance_rate_pct + '%' : '--.-%'}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">Critical Violations</p>
                        <p className="text-3xl font-bold text-red-600 mt-2">{metrics ? metrics.critical_violations : '--'}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">Audits This Month</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{metrics ? metrics.audits_this_month : '---'}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">Total Fields Monitored</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{metrics ? metrics.total_fields_monitored : '----'}</p>
                    </div>
                </div>

                <ComplianceList />
            </main>
        </div>
    );
}

export default App;
