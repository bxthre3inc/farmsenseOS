import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool, X, ShieldCheck, Download, FileText, Activity, RefreshCw } from 'lucide-react';

interface AgreementProps {
    shares: number;
    price: number;
    onSigned: (signature?: string) => void;
    onCancel: () => void;
}

export const SeedAgreementPortal: React.FC<AgreementProps> = ({ shares, price, onSigned, onCancel }) => {
    const sigPad = useRef<SignatureCanvas | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const total = shares * price;

    const save = async () => {
        if (sigPad.current && sigPad.current.isEmpty()) return;
        setIsProcessing(true);
        try {
            const signature = sigPad.current?.getTrimmedCanvas().toDataURL('image/png');
            // Mock API call for agreement signing
            setTimeout(() => {
                onSigned(signature);
                setIsProcessing(false);
            }, 1500);
        } catch (error) {
            console.error('Failed to sign:', error);
            setIsProcessing(false);
        }
    };

    const clear = () => {
        sigPad.current?.clear();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]">
                {/* Left: Summary Panel */}
                <div className="w-full md:w-1/3 bg-slate-900 p-8 text-white space-y-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-indigo-400">
                            <ShieldCheck className="w-8 h-8" />
                            <span className="font-black tracking-widest uppercase text-xs">Agreement Vault</span>
                        </div>
                        <h2 className="text-3xl font-black leading-tight">Investment Summary</h2>
                        <div className="space-y-4 pt-6">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-slate-400 font-bold">Equity Units</span>
                                <span className="font-mono text-xl">{shares.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-slate-400 font-bold">Unit Price</span>
                                <span className="font-mono text-xl">${price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-4">
                                <span className="text-indigo-400 font-black uppercase text-xs">Total Commitment</span>
                                <span className="text-2xl font-black text-indigo-400">${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                            <Activity className="w-4 h-4" /> Real-time Attestation
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            This signature will be cryptographically bound to your session ID and the current block hash.
                        </p>
                    </div>
                </div>

                {/* Right: Signature Area */}
                <div className="flex-1 p-8 flex flex-col bg-slate-50 relative overflow-y-auto">
                    <button
                        onClick={onCancel}
                        className="absolute right-8 top-8 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="flex-1 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900">Legal Attestation</h3>
                            <p className="text-slate-500 font-medium">Please review and sign the Seed Investment Agreement below.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none h-64 overflow-y-auto text-xs text-slate-600 space-y-4">
                            <h4 className="font-black text-slate-900 uppercase">1. Investment Terms</h4>
                            <p>The Investor hereby agrees to subscribe for and purchase the designated Equity Units of FarmSense OS (the "Company") at the specified Unit Price. This purchase is subject to the terms and conditions set forth in this Seed Investment Agreement and the Company's Bylaws.</p>
                            <h4 className="font-black text-slate-900 uppercase">2. Representations</h4>
                            <p>The Investor represents that they have such knowledge and experience in financial and business matters as to be capable of evaluating the merits and risks of this investment and are able to bear the economic risk of loss of their entire investment.</p>
                            <h4 className="font-black text-slate-900 uppercase">3. Governing Law</h4>
                            <p>This Agreement shall be governed by and construed in accordance with the laws of the State of Colorado, without giving effect to any choice or conflict of law provision or rule.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                        I have read and agree to be bound by the terms above.
                                    </span>
                                </label>
                                <button
                                    onClick={clear}
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                >
                                    <RefreshCw className="w-3 h-3" /> Clear Pad
                                </button>
                            </div>

                            <div className="relative bg-white rounded-3xl border-2 border-dashed border-slate-200 p-4 h-48 group hover:border-indigo-400 transition-colors">
                                <SignatureCanvas
                                    ref={sigPad}
                                    canvasProps={{ className: "w-full h-full cursor-crosshair" }}
                                />
                                {!agreed && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <PenTool className="w-4 h-4" /> Please Agree to terms first
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-4 bg-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-300 transition-all active:scale-95"
                        >
                            Decline & Exit
                        </button>
                        <button
                            disabled={!agreed || isProcessing}
                            onClick={save}
                            className={`flex-[2] py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl
                                ${agreed && !isProcessing
                                    ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
                                    : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'}`}
                        >
                            {isProcessing ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Attesting Identity...
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
                                    Execute Agreement
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
