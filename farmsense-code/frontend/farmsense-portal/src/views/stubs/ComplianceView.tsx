import { Routes, Route } from 'react-router-dom';
import { ComplianceDashboard } from '../compliance/ComplianceDashboard';
import { IntegrityChainVisualizer } from '../regulatory/IntegrityChainVisualizer';

export default function ComplianceView() {
    return (
        <Routes>
            <Route index element={<ComplianceDashboard />} />
            <Route path="gap" element={<IntegrityChainVisualizer />} />
        </Routes>
    );
}
