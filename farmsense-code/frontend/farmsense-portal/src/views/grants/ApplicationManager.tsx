import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useGrantProfile } from '../../data/grant-profile';
import { saveDraft, getDraft, getDraftIds, deleteDraft } from '../../data/grant-profile';
import type { ApplicationDraft } from '../../data/grant-profile';

// Modular imports
import { Application, Stage } from './application-manager/types';
import { STAGES, SEED_APPS } from './application-manager/constants';
import { NewApplicationForm } from './application-manager/components/NewApplicationForm';
import { KanbanBoard } from './application-manager/components/KanbanBoard';
import { ApplicationDetailDrawer } from './application-manager/components/ApplicationDetailDrawer';

export const ApplicationManager: React.FC = () => {
    const [apps, setApps] = useState<Application[]>(SEED_APPS);
    const [selected, setSelected] = useState<Application | null>(null);
    const [showNew, setShowNew] = useState(false);
    const { field: profileField, setField: setProfileField } = useGrantProfile();

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

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{apps.length} applications tracked · {getDraftIds().length} drafts saved</p>
                <button onClick={openNewForm}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Application
                </button>
            </div>

            {showNew && (
                <NewApplicationForm
                    newForm={newForm}
                    handleFormChange={handleFormChange}
                    handleCreate={handleCreate}
                    handleSaveDraft={handleSaveDraft}
                    setShowNew={setShowNew}
                />
            )}

            <KanbanBoard
                apps={apps}
                setSelected={setSelected}
                moveApp={moveApp}
            />

            {/* Rejected row */}
            {apps.filter(a => a.stage === 'Rejected').length > 0 && (
                <div className={`rounded-xl border p-3 border-red-900/40 bg-red-900/10`}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Rejected</p>
                    <div className="flex flex-wrap gap-2">
                        {apps.filter(a => a.stage === 'Rejected').map(app => (
                            <div key={app.id} className="bg-slate-950/60 border border-slate-700/40 rounded-lg px-3 py-2 text-xs text-slate-500">{app.grant}</div>
                        ))}
                    </div>
                </div>
            )}

            {selected && (
                <ApplicationDetailDrawer
                    selected={selected}
                    setSelected={setSelected}
                    moveApp={moveApp}
                    setApps={setApps}
                />
            )}
        </div>
    );
};

export default ApplicationManager;
