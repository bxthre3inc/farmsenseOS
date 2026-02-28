'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { ShieldCheck, Lock, Activity, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [techId, setTechId] = useState('');
    const [passcode, setPasscode] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            username: techId,
            password: passcode,
            redirect: false,
        });

        if (res?.error) {
            setError('AUTHENTICATION FAILED: Invalid credentials');
            setLoading(false);
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden relative selection:bg-tactical-blue/30">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.9)),url('/grid-bg.svg')] opacity-50 bg-[length:30px_30px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tactical-blue/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="z-10 w-full max-w-[400px] p-8">
                <div className="glass-panel tactical-border p-8 bg-slate-900/80 backdrop-blur-xl animate-fade-in-up">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700/50 flex items-center justify-center mb-4 inner-glow shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <ShieldCheck className="w-8 h-8 text-tactical-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-widest uppercase text-shadow-glow">FarmSense</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] font-mono mt-1">Command & Control</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-950/40 border border-red-500/50 rounded flex items-center gap-2 animate-pulse">
                            <Lock className="w-4 h-4 text-red-500" />
                            <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">Technician ID</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={techId}
                                    onChange={(e) => setTechId(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded px-4 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-tactical-blue focus:ring-1 focus:ring-tactical-blue/50 transition-all placeholder:text-slate-700"
                                    placeholder="sysadmin OR TECH-001"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">Passcode</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded px-4 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-tactical-blue focus:ring-1 focus:ring-tactical-blue/50 transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    required
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden bg-tactical-blue hover:bg-tactical-blue-light text-slate-900 font-black uppercase tracking-widest py-3 rounded transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative flex items-center justify-center gap-2 text-[11px]">
                                {loading ? (
                                    <>
                                        <Activity className="w-4 h-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    'Initialize Session'
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Footer details */}
                    <div className="mt-8 flex justify-between items-center text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>v1.0.0-MVP</span>
                        <span>Auth: NextAuth FHE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
