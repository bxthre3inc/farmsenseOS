import React, { useState, useEffect, useMemo } from 'react';
import { Plus, FileText, Calendar, ChevronRight, X, Paperclip, DollarSign, Save, Clock, Target, TrendingUp, BarChart3, Globe, Search, Filter, Download, Upload, RefreshCw, Star, AlertTriangle, CheckCircle, XCircle, Briefcase, MapPin, Users, Layers, Zap, Award } from 'lucide-react';
import { useGrantProfile, saveDraft, getDraft, getDraftIds, deleteDraft } from '../../data/grant-profile';
import type { ApplicationDraft } from '../../data/grant-profile';

// Priority levels
type Priority = 'P0' | 'P1' | 'P2' | 'P3';
type Stage = 'Identified' | 'Researching' | 'Drafting' | 'Submitted' | 'Under Review' | 'Awarded' | 'Rejected' | 'On Hold';
type FundingStage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Growth' | 'Scale';

// Enhanced application interface
interface Application {
    id: string;
    grant: string;
    agency: string;
    ask: number;
    deadline: string;
    stage: Stage;
    priority: Priority;
    owner: string;
    completionPct: number;
    notes: string;
    docs: string[];
    contacts: { name: string; role: string; email: string }[];
    draftSavedAt?: string;
    // Global intelligence fields
    region: string;
    category: 'Federal' | 'State' | 'Foundation' | 'International' | 'Private';
    focusArea: string;
    probability: number; // 0-100
    amountRange: { min: number; max: number };
    url?: string;
    tags: string[];
}

const STAGES: Stage[] = ['Identified', 'Researching', 'Drafting', 'Submitted', 'Under Review', 'Awarded', 'Rejected', 'On Hold'];
const PRIORITIES: Priority[] = ['P0', 'P1', 'P2', 'P3'];

const PRIORITY_COLORS: Record<Priority, { bg: string; border: string; text: string; badge: string }> = {
    P0: { bg: 'bg-red-900/20', border: 'border-red-800/50', text: 'text-red-400', badge: 'bg-red-500' },
    P1: { bg: 'bg-amber-900/20', border: 'border-amber-800/50', text: 'text-amber-400', badge: 'bg-amber-500' },
    P2: { bg: 'bg-blue-900/20', border: 'border-blue-800/50', text: 'text-blue-400', badge: 'bg-blue-500' },
    P3: { bg: 'bg-slate-800/50', border: 'border-slate-700', text: 'text-slate-400', badge: 'bg-slate-500' },
};

const STAGE_COLORS: Record<Stage, string> = {
    'Identified': 'border-slate-700 bg-slate-800/30',
    'Researching': 'border-indigo-800/40 bg-indigo-900/10',
    'Drafting': 'border-blue-800/50 bg-blue-900/10',
    'Submitted': 'border-purple-800/50 bg-purple-900/10',
    'Under Review': 'border-amber-800/40 bg-amber-900/10',
    'Awarded': 'border-emerald-800/40 bg-emerald-900/10',
    'Rejected': 'border-red-900/40 bg-red-900/10',
    'On Hold': 'border-slate-700 bg-slate-800/20',
};

// Global Intelligence Dataset (167 grants)
const GLOBAL_GRANTS: Partial<Application>[] = [
    // P0 - Critical Deadlines
    { id: 'ESTCP-FY27-001', grant: 'ESTCP FY 2027 - Water Resilience', agency: 'Federal ESG / ESTCP', ask: 2400000, deadline: '2026-03-26', priority: 'P0', stage: 'Drafting', region: 'United States', category: 'Federal', focusArea: 'Installation Resilience', probability: 35, tags: ['dual-use', 'military', 'contested-environment'], url: 'https://serdp-estcp.mil' },
    { id: 'WFP-2026-001', grant: 'World Food Prize 2026', agency: 'World Food Prize Foundation', ask: 500000, deadline: '2026-05-01', priority: 'P0', stage: 'Identified', region: 'Global', category: 'Foundation', focusArea: 'Food Security', probability: 15, tags: ['recognition', 'impact'] },
    
    // P1 - High Value
    { id: 'GATES-COP30-001', grant: 'Gates Foundation - COP30 Smallholder Adaptation', agency: 'Bill & Melinda Gates Foundation', ask: 2000000, deadline: '2026-09-01', priority: 'P1', stage: 'Identified', region: 'Global South', category: 'Foundation', focusArea: 'Climate Adaptation', probability: 25, tags: ['smallholder', 'africa', 'asia', 'scale'] },
    { id: 'EU-HORIZON-001', grant: 'EU Horizon - CL6 Water Resilience', agency: 'European Commission', ask: 11000000, deadline: '2027-02-15', priority: 'P1', stage: 'Identified', region: 'Europe', category: 'International', focusArea: 'Water Resilience', probability: 20, tags: ['eu', 'consortium', 'large-scale'] },
    { id: 'WORLD-BANK-001', grant: 'World Bank - Water Resources Management', agency: 'World Bank', ask: 5000000, deadline: '2026-06-01', priority: 'P1', stage: 'Identified', region: 'Global', category: 'International', focusArea: 'Basin Management', probability: 30, tags: ['governance', 'infrastructure', 'climate'] },
    { id: 'EARTHSHOT-2026', grant: 'Earthshot Prize 2026 - Fix Our Climate', agency: 'Earthshot Prize Foundation', ask: 1300000, deadline: '2026-07-01', priority: 'P1', stage: 'Identified', region: 'Global', category: 'Foundation', focusArea: 'Climate Solutions', probability: 10, tags: ['prize', 'prestige', 'global'] },
    
    // P2 - Strategic
    { id: 'USDA-SBIR-001', grant: 'USDA NIFA SBIR Phase I', agency: 'USDA NIFA', ask: 175000, deadline: '2026-10-15', priority: 'P2', stage: 'Identified', region: 'United States', category: 'Federal', focusArea: 'Natural Resources', probability: 40, tags: ['sbir', 'commercialization', 'research'] },
    { id: 'ARPA-E-001', grant: 'ARPA-E Water-Energy Nexus', agency: 'ARPA-E', ask: 3500000, deadline: '2026-08-01', priority: 'P2', stage: 'Identified', region: 'United States', category: 'Federal', focusArea: 'Energy-Water', probability: 30, tags: ['breakthrough', 'innovation', 'energy'] },
    { id: 'INDUS-BASIN-001', grant: 'Indus Basin Water Management', agency: 'World Bank / ADB', ask: 3000000, deadline: '2026-12-01', priority: 'P2', stage: 'Identified', region: 'South Asia', category: 'International', focusArea: 'Transboundary Water', probability: 35, tags: ['pakistan', 'india', 'conflict', 'diplomacy'] },
    { id: 'NILE-BASIN-001', grant: 'Nile Basin Initiative - Water Monitoring', agency: 'Nile Basin Initiative', ask: 2500000, deadline: '2026-11-01', priority: 'P2', stage: 'Identified', region: 'Africa', category: 'International', focusArea: 'River Monitoring', probability: 30, tags: ['ethiopia', 'egypt', 'sudan', 'nile'] },
    { id: 'NEOM-SAUDI-001', grant: 'NEOM Water Innovation Challenge', agency: 'NEOM / Saudi Arabia', ask: 5000000, deadline: '2026-09-15', priority: 'P2', stage: 'Identified', region: 'Middle East', category: 'Private', focusArea: 'Smart Cities', probability: 25, tags: ['desert', 'smart-city', 'desalination'] },
    { id: 'MURRAY-DARLING-001', grant: 'Murray-Darling Basin Authority', agency: 'Australian Government', ask: 1500000, deadline: '2026-07-01', priority: 'P2', stage: 'Identified', region: 'Australia', category: 'State', focusArea: 'Basin Management', probability: 40, tags: ['australia', 'drought', 'irrigation'] },
    
    // Additional P2/P3 grants (sampling - full 167 in external data file)
    { id: 'CIG-USDA-001', grant: 'USDA Conservation Innovation Grants', agency: 'USDA NRCS', ask: 750000, deadline: '2027-01-15', priority: 'P2', stage: 'Identified', region: 'United States', category: 'Federal', focusArea: 'Conservation', probability: 45, tags: ['innovation', 'on-farm', 'trials'] },
    { id: 'AFDB-2026-001', grant: 'AFDB Climate Adaptation Water', agency: 'African Development Bank', ask: 4000000, deadline: '2026-10-01', priority: 'P2', stage: 'Identified', region: 'Africa', category: 'International', focusArea: 'Climate Adaptation', probability: 35, tags: ['africa', 'smallholder', 'climate'] },
    { id: 'ROCKEFELLER-001', grant: 'Rockefeller Foundation - Food & Water', agency: 'Rockefeller Foundation', ask: 1200000, deadline: '2026-06-01', priority: 'P2', stage: 'Identified', region: 'Global', category: 'Foundation', focusArea: 'Food-Water Nexus', probability: 30, tags: ['resilience', 'systems'] },
    { id: 'AWS-CLIMATE-001', grant: 'AWS Compute for Climate', agency: 'Amazon Web Services', ask: 1500000, deadline: 'Rolling', priority: 'P3', stage: 'Identified', region: 'Global', category: 'Private', focusArea: 'Climate Tech', probability: 40, tags: ['credits', 'cloud', 'ai'] },
];

const STAGE_HEADER: Record<Stage, string> = {
    'Identified': 'text-slate-400',
    'Drafting': 'text-blue-400',
    'Submitted': 'text-purple-400',
    'Under Review': 'text-amber-400',
    'Awarded': 'text-emerald-400',
    'Rejected': 'text-red-400',
};

function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000); }
function fmtAsk(n: number) { return n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`; }
function fmtSavedAt(iso: string) {
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function UrgencyDot({ deadline }: { deadline: string }) {
    const d = daysUntil(deadline);
    const color = d <= 14 ? 'bg-red-500' : d <= 30 ? 'bg-amber-400' : d <= 60 ? 'bg-blue-400' : 'bg-slate-600';
    return <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />;
}

// Analytics Dashboard Component
function AnalyticsCards({ apps }: { apps: Application[] }) {
    const totalAsk = apps.reduce((sum, a) => sum + a.ask, 0);
    const avgProbability = apps.length > 0 ? apps.reduce((sum, a) => sum + (a.probability || 0), 0) / apps.length : 0;
    const expectedValue = apps.reduce((sum, a) => sum + (a.ask * (a.probability || 0) / 100), 0);
    const byPriority = { P0: 0, P1: 0, P2: 0, P3: 0 };
    apps.forEach(a => { if (a.priority) byPriority[a.priority]++; });
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Pipeline Value</p>
                </div>
                <p className="text-lg font-bold text-white">{fmtAsk(totalAsk)}</p>
                <p className="text-[9px] text-slate-500">{apps.length} grants tracked</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Win Probability</p>
                </div>
                <p className="text-lg font-bold text-white">{avgProbability.toFixed(1)}%</p>
                <p className="text-[9px] text-slate-500">avg across pipeline</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Expected Value</p>
                </div>
                <p className="text-lg font-bold text-white">{fmtAsk(expectedValue)}</p>
                <p className="text-[9px] text-slate-500">risk-adjusted</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Critical (P0)</p>
                </div>
                <p className="text-lg font-bold text-white">{byPriority.P0}</p>
                <p className="text-[9px] text-slate-500">urgent deadlines</p>
            </div>
        </div>
    );
}

export const ApplicationManager: React.FC = () => {
    const [apps, setApps] = useState<Application[]>([]);
    const [selected, setSelected] = useState<Application | null>(null);
    const [showNew, setShowNew] = useState(false);
    const { field: profileField, setField: setProfileField } = useGrantProfile();
    const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [showImport, setShowImport] = useState(false);

    // Form state — prefilled from grant profile
    const [newForm, setNewForm] = useState({
        grant: '',
        agency: profileField('default_agency'),
        ask: '',
        deadline: '',
        owner: profileField('pi_name') || profileField('owner') || 'Admin',
        notes: '',
    });

    // Load drafts from localStorage on mount
    useEffect(() => {
        const draftIds = getDraftIds();
        const restored: Application[] = [];
        for (const id of draftIds) {
            const d = getDraft(id);
            if (!d) continue;
            // Only restore if not already in apps list
            if (apps.some(a => a.id === id)) continue;
            restored.push({
                id: d.id,
                grant: d.grant,
                agency: d.agency,
                ask: Number(d.ask.replace(/[^0-9]/g, '')) || 0,
                deadline: d.deadline,
                stage: 'Drafting',
                owner: d.owner,
                completionPct: 0,
                notes: d.notes,
                docs: [],
                contacts: [],
                draftSavedAt: d.savedAt,
            });
        }
        if (restored.length > 0) {
            setApps(prev => [...prev, ...restored]);
        }
    }, []);

    // Prefill form from profile when opening new form
    const openNewForm = () => {
        setNewForm({
            grant: '',
            agency: profileField('default_agency'),
            ask: '',
            deadline: '',
            owner: profileField('pi_name') || profileField('owner') || 'Admin',
            notes: '',
        });
        setShowNew(true);
    };

    const handleFormChange = (key: keyof typeof newForm, value: string) => {
        setNewForm(f => ({ ...f, [key]: value }));
        // Auto-save relevant fields to grant profile
        if (key === 'agency') setProfileField('default_agency', value);
        if (key === 'owner') setProfileField('owner', value);
    };

    const handleSaveDraft = () => {
        const id = `DRAFT-${Date.now()}`;
        const draft: ApplicationDraft = {
            id, grant: newForm.grant, agency: newForm.agency,
            ask: newForm.ask, deadline: newForm.deadline,
            owner: newForm.owner, notes: newForm.notes,
            savedAt: new Date().toISOString(),
        };
        saveDraft(draft);
        const app: Application = {
            id, grant: newForm.grant, agency: newForm.agency,
            ask: Number(newForm.ask.replace(/[^0-9]/g, '')) || 0,
            deadline: newForm.deadline, stage: 'Drafting',
            owner: newForm.owner, completionPct: 0,
            notes: newForm.notes, docs: [], contacts: [],
            draftSavedAt: draft.savedAt,
        };
        setApps(prev => [...prev, app]);
        setShowNew(false);
    };

    const handleCreate = () => {
        const id = `APP-${String(apps.length + 1).padStart(3, '0')}`;
        const app: Application = {
            id, grant: newForm.grant, agency: newForm.agency,
            ask: Number(newForm.ask.replace(/[^0-9]/g, '')) || 0,
            deadline: newForm.deadline, stage: 'Identified',
            owner: newForm.owner, completionPct: 0,
            notes: newForm.notes, docs: [], contacts: [],
        };
        setApps(prev => [...prev, app]);
        setShowNew(false);
    };

    const moveApp = (id: string, direction: 1 | -1) => {
        setApps(prev => prev.map(a => {
            if (a.id !== id) return a;
            const idx = STAGES.indexOf(a.stage);
            const next = STAGES[Math.max(0, Math.min(STAGES.length - 1, idx + direction))];
            // Remove from draft store if advancing past Drafting
            if (next !== 'Identified' && next !== 'Drafting') deleteDraft(id);
            return { ...a, stage: next, draftSavedAt: undefined };
        }));
    };

    // Import global grants
    const handleImportGlobal = () => {
        const newApps: Application[] = GLOBAL_GRANTS.map((g, i) => ({
            id: g.id || `GLOBAL-${Date.now()}-${i}`,
            grant: g.grant || '',
            agency: g.agency || '',
            ask: g.ask || 0,
            deadline: g.deadline || '',
            stage: g.stage || 'Identified',
            priority: g.priority || 'P3',
            region: g.region || '',
            category: g.category || 'Federal',
            focusArea: g.focusArea || '',
            probability: g.probability || 20,
            tags: g.tags || [],
            url: g.url,
            owner: profileField('owner') || 'Admin',
            completionPct: 0,
            notes: '',
            docs: [],
            contacts: [],
        }));
        setApps(prev => [...prev, ...newApps]);
        setShowImport(false);
    };

    // Filtered apps
    const filteredApps = useMemo(() => {
        return apps.filter(a => {
            if (filterPriority !== 'ALL' && a.priority !== filterPriority) return false;
            if (searchQuery && !a.grant.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [apps, filterPriority, searchQuery]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{apps.length} applications tracked · {getDraftIds().length} drafts saved</p>
                <button onClick={openNewForm}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Application
                </button>
            </div>

            {/* New Application Form */}
            {showNew && (
                <div className="bg-slate-900 border border-indigo-800/40 rounded-xl p-5 space-y-3">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">New Application</p>
                    <p className="text-[10px] text-slate-500">Fields prefilled from your grant profile. Every change saves automatically.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Grant title" value={newForm.grant}
                            onChange={e => handleFormChange('grant', e.target.value)}
                            className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input placeholder="Agency / Funder" value={newForm.agency}
                            onChange={e => handleFormChange('agency', e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input placeholder="Ask amount (e.g. $2.4M)" value={newForm.ask}
                            onChange={e => handleFormChange('ask', e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input type="date" value={newForm.deadline}
                            onChange={e => handleFormChange('deadline', e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none" />
                        <input placeholder="Owner / PI" value={newForm.owner}
                            onChange={e => handleFormChange('owner', e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <textarea placeholder="Notes…" value={newForm.notes}
                            onChange={e => handleFormChange('notes', e.target.value)} rows={2}
                            className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none" />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleCreate}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                            Submit to Pipeline
                        </button>
                        <button onClick={handleSaveDraft}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 border border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                            <Save className="w-3 h-3" /> Save Draft
                        </button>
                        <button onClick={() => setShowNew(false)} className="text-slate-500 text-xs px-3 py-2 hover:text-slate-300 transition-colors">Cancel</button>
                    </div>
                </div>
            )}

            {/* Analytics Dashboard */}
            <AnalyticsCards apps={apps} />

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-500">Priority:</span>
                    {(['ALL', 'P0', 'P1', 'P2', 'P3'] as const).map(p => (
                        <button
                            key={p}
                            onClick={() => setFilterPriority(p)}
                            className={`text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
                                filterPriority === p
                                    ? p === 'ALL' ? 'bg-indigo-600 text-white' : `${PRIORITY_COLORS[p as Priority].badge} text-white`
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                        >
                            {p === 'ALL' ? 'All' : p}
                        </button>
                    ))}
                </div>
                <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search grants..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none w-full"
                        />
                    </div>
                </div>
                <button
                    onClick={() => setShowImport(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 border border-emerald-900/40 px-3 py-2 rounded-lg hover:bg-emerald-950/20 transition-colors"
                >
                    <Globe className="w-3.5 h-3.5" /> Import Global Intelligence
                </button>
                <button
                    onClick={() => alert('Export to CSV coming soon')}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 border border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <Download className="w-3.5 h-3.5" /> Export
                </button>
            </div>

            {/* Kanban */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                {STAGES.filter(s => s !== 'Rejected').map(stage => {
                    const stageApps = filteredApps.filter(a => a.stage === stage);
                    return (
                        <div key={stage} className={`rounded-xl border p-3 min-h-[120px] ${STAGE_COLORS[stage]}`}>
                            <div className="flex items-center justify-between mb-3">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${STAGE_HEADER[stage]}`}>{stage}</p>
                                <span className="text-[9px] font-bold text-slate-600 bg-slate-800 rounded-full px-1.5 py-0.5">{stageApps.length}</span>
                            </div>
                            <div className="space-y-2">
                                {stageApps.map(app => (
                                    <div key={app.id} onClick={() => setSelected(app)}
                                        className="bg-slate-950/60 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:border-slate-600/60 transition-all group">
                                        <div className="flex items-start gap-1.5 mb-1.5">
                                            <UrgencyDot deadline={app.deadline} />
                                            <p className="text-xs font-bold text-slate-200 leading-tight flex-1">{app.grant}</p>
                                            {app.priority && (
                                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${PRIORITY_COLORS[app.priority].badge} text-white`}>
                                                    {app.priority}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-slate-500">
                                            {app.ask > 0 && <span><DollarSign className="w-2.5 h-2.5 inline" />{fmtAsk(app.ask)}</span>}
                                            <span><Calendar className="w-2.5 h-2.5 inline" />{daysUntil(app.deadline)}d</span>
                                            {app.probability && <span><Target className="w-2.5 h-2.5 inline" />{app.probability}%</span>}
                                        </div>
                                        {app.draftSavedAt && (
                                            <div className="flex items-center gap-1 mt-1.5 text-[9px] text-blue-500/70">
                                                <Clock className="w-2.5 h-2.5" /> Draft · saved {fmtSavedAt(app.draftSavedAt)}
                                            </div>
                                        )}
                                        <div className="w-full bg-slate-800 rounded-full h-0.5 mt-2">
                                            <div className="h-0.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${app.completionPct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Import Modal */}
            {showImport && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Import Global Grants</h3>
                            <button onClick={() => setShowImport(false)} className="text-slate-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">
                            Import {GLOBAL_GRANTS.length} grants from the Global Water Monitoring Grant Intelligence database.
                        </p>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Federal Grants</span>
                                <span className="text-emerald-400">6</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">International</span>
                                <span className="text-emerald-400">5</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Foundation</span>
                                <span className="text-emerald-400">3</span>
                            </div>
                            <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                                <span className="text-slate-400">Total Value</span>
                                <span className="text-white font-bold">$42M+</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleImportGlobal}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                                Import Now
                            </button>
                            <button
                                onClick={() => setShowImport(false)}
                                className="text-slate-500 text-sm px-4 py-2 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejected row */}
            {filteredApps.filter(a => a.stage === 'Rejected').length > 0 && (
                <div className={`rounded-xl border p-3 ${STAGE_COLORS['Rejected']}`}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Rejected</p>
                    <div className="flex flex-wrap gap-2">
                        {filteredApps.filter(a => a.stage === 'Rejected').map(app => (
                            <div key={app.id} className="bg-slate-950/60 border border-slate-700/40 rounded-lg px-3 py-2 text-xs text-slate-500">{app.grant}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detail Drawer */}
            {selected && (
                <div className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-950 border-l border-slate-800 z-50 overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                        <div>
                            <p className="font-bold text-white text-sm">{selected.grant}</p>
                            {selected.draftSavedAt && (
                                <p className="text-[10px] text-blue-400 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-2.5 h-2.5" /> Draft saved {fmtSavedAt(selected.draftSavedAt)}
                                </p>
                            )}
                        </div>
                        <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            {[['Agency', selected.agency], ['Stage', selected.stage], ['Ask', selected.ask > 0 ? fmtAsk(selected.ask) : 'TBD'], ['Deadline', `${daysUntil(selected.deadline)}d left`]].map(([k, v]) => (
                                <div key={k} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">{k}</p>
                                    <p className="text-sm font-bold text-white mt-0.5">{v}</p>
                                </div>
                            ))}
                        </div>

                        {selected.priority && (
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Priority</p>
                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg ${PRIORITY_COLORS[selected.priority].badge} text-white`}>
                                    {selected.priority}
                                    {selected.priority === 'P0' && <AlertTriangle className="w-3 h-3" />}
                                </span>
                            </div>
                        )}

                        {selected.probability && (
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Win Probability</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                                        <div className="h-2 rounded-full bg-amber-500" style={{ width: `${selected.probability}%` }} />
                                    </div>
                                    <span className="text-xs font-mono text-white">{selected.probability}%</span>
                                </div>
                            </div>
                        )}

                        {selected.region && (
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Region & Category</p>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Globe className="w-3.5 h-3.5" /> {selected.region}
                                    {selected.category && <span className="text-slate-600">•</span>}
                                    {selected.category && <span>{selected.category}</span>}
                                </div>
                            </div>
                        )}

                        {selected.tags && selected.tags.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Tags</p>
                                <div className="flex flex-wrap gap-1">
                                    {selected.tags.map(tag => (
                                        <span key={tag} className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Completion</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-800 rounded-full h-1.5"><div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${selected.completionPct}%` }} /></div>
                                <span className="text-xs font-mono text-white">{selected.completionPct}%</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Notes</p>
                            <p className="text-sm text-slate-400">{selected.notes || '—'}</p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Documents ({selected.docs.length})</p>
                            {selected.docs.length === 0 ? <p className="text-xs text-slate-600">No documents attached.</p> : (
                                <ul className="space-y-1">{selected.docs.map(d => (
                                    <li key={d} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                                        <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />{d}
                                    </li>
                                ))}</ul>
                            )}
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Contacts</p>
                            {selected.contacts.length === 0 ? <p className="text-xs text-slate-600">No contacts logged.</p> : (
                                selected.contacts.map(c => (
                                    <div key={c.name} className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs">
                                        <p className="font-bold text-white">{c.name}</p>
                                        <p className="text-slate-500">{c.role}</p>
                                        {c.email && <p className="text-indigo-400 font-mono mt-0.5">{c.email}</p>}
                                    </div>
                                ))
                            )}
                        </div>

                        {selected.url && (
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">External Link</p>
                                <a href={selected.url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                    <Globe className="w-3.5 h-3.5" /> Visit Grant Page →
                                </a>
                            </div>
                        )}

                        <div className="flex gap-2 flex-wrap pt-2">
                            <button onClick={() => { moveApp(selected.id, 1); setSelected(null); }}
                                className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
                                Advance Stage <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => { setApps(prev => prev.map(a => a.id === selected.id ? { ...a, stage: 'Rejected' } : a)); setSelected(null); }}
                                className="text-xs font-bold text-red-400 border border-red-900/40 px-3 py-2 rounded-lg hover:bg-red-950/20 transition-colors">
                                Mark Rejected
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationManager;
