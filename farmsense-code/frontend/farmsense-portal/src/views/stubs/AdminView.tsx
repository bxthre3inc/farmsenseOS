import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserList } from '../admin/UserList';
import { AdminMetrics } from '../admin/AdminMetrics';

export default function AdminView() {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route index element={
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-black text-white uppercase tracking-tighter">Admin Dashboard</h1>
                            <p className="text-xs text-slate-500 mt-0.5">Hardware fleet, tenant management & system metrics</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/admin/metrics')}
                                className="text-xs font-bold text-indigo-400 bg-indigo-900/10 border border-indigo-500/20 px-4 py-2 rounded-xl hover:bg-indigo-900/20 transition-all uppercase tracking-widest">
                                View Clusters
                            </button>
                        </div>
                    </div>

                    <UserList />
                </div>
            } />
            <Route path="users" element={<UserList />} />
            <Route path="metrics" element={<AdminMetrics />} />
        </Routes>
    );
}
