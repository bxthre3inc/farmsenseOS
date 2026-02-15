
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, LogOut, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Login from './components/Login';
import { EquityBuyIn } from './components/EquityBuyIn';
import { getApiKey, removeApiKey, api } from './services/api';

const mockRoiData = [
    { name: 'Q1 2024', value: 1.2 },
    { name: 'Q2 2024', value: 2.5 },
    { name: 'Q3 2024', value: 4.8 },
    { name: 'Q4 2024', value: 6.3 },
    { name: 'Q1 2025', value: 9.1 },
    { name: 'Q2 2025', value: 12.5 },
];

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) {
            fetchMetrics();
        }
    }, []);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            setLoading(false);
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
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-sans">
            <header className="bg-neutral-800 border-b border-neutral-700">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Activity className="text-green-400" />
                        FarmSense <span className="text-neutral-400 font-light">Investor Relations</span>
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 text-sm text-neutral-400">
                            <span>NASDAQ: FSNS</span>
                            <span className="text-green-400">+2.4% Today</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-neutral-500 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Financial Performance</h2>
                    <button onClick={fetchMetrics} className="text-neutral-400 hover:text-white transition-colors">
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-neutral-400">Total Acreage Managed</h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                            {metrics ? (metrics.total_acreage / 1000000).toFixed(1) + 'M' : '---'}
                        </p>
                        <p className="text-sm text-green-500 mt-1">+150k this quarter</p>
                    </div>
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-neutral-400">Yield Increase Avg</h3>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                            {metrics ? (metrics.yield_increase_pct * 100).toFixed(1) + '%' : '---'}
                        </p>
                        <p className="text-sm text-blue-500 mt-1">Platform Average</p>
                    </div>
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-neutral-400">Platform ARR</h3>
                            <DollarSign className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                            {metrics ? '$' + (metrics.arr_usd / 1000000).toFixed(1) + 'M' : '---'}
                        </p>
                        <p className="text-sm text-yellow-500 mt-1">Annual Recurring Revenue</p>
                    </div>
                </div>

                <div className="mb-10">
                    <EquityBuyIn />
                </div>

                <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
                    <h3 className="text-lg font-semibold text-white mb-6">Growth Trajectory (Millions USD)</h3>
                    <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockRoiData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
