import { UserList } from '../admin/UserList';
import { useNavigate } from 'react-router-dom';

export default function AdminView() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Hardware fleet, tenant management &amp; system metrics</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/admin/metrics')}
                        className="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg hover:text-white transition-colors">
                        Metrics
                    </button>
                </div>
            </div>

            <UserList />
        </div>
    );
}
