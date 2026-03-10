import React, { useState } from 'react';
import { api } from '../../services/api';
import { Drawer } from '../../components/ui/Drawer';

// Modular imports
import { User } from './user-list/types';
import { UserEditForm } from './user-list/components/UserEditForm';
import { UserModalSidebar } from './user-list/components/UserModalSidebar';

interface UserModalProps {
    user: User;
    onClose: () => void;
    onUpdate: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        organization: user.organization || '',
        phone: user.phone || '',
        notes: user.notes || '',
        role: user.role,
        tier: user.tier,
        is_active: user.is_active
    });
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.admin.updateUser(user.id, formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onUpdate();
            }, 1500);
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Drawer
            isOpen={true}
            onClose={onClose}
            title="Management Suite"
        >
            <div className="flex flex-col gap-8">
                {/* Header Info */}
                <div className="flex items-center gap-4 bg-indigo-950/20 p-4 rounded-xl border border-indigo-900/30">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-indigo-900/40 shrink-0">
                        {user.email[0].toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">{formData.name || 'Anonymous User'}</h3>
                        <p className="text-slate-500 text-xs font-mono">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <UserEditForm
                        formData={formData}
                        onFormChange={setFormData}
                    />

                    <UserModalSidebar
                        formData={formData}
                        onFormChange={setFormData}
                        user={user}
                        isSaving={isSaving}
                        success={success}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </Drawer>
    );
};
