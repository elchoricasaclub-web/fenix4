import React, { useState, useEffect } from 'react';
import SmartAuditCenter from './SmartAuditCenter';
import ImprovementRoadmap from './ImprovementRoadmap';
import ModuleInnovationHub from './ModuleInnovationHub';
import CorporateSettingsHub from './CorporateSettingsHub';
import ExecutiveReportsCenter from './ExecutiveReportsCenter';
import UserActivityAudit from './UserActivityAudit';
import DataQualityCenter from './DataQualityCenter';
import ComplianceHeatmap from './ComplianceHeatmap';
import { ShieldAlert, TrendingUp, Cpu, Settings, Activity, FileText, Users, Database, Map } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { useAppContext } from '../../contexts/AppContext';

export default function CorporateSaasCommandCenter() {
  const [activeTab, setActiveTab] = useState('audit');
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Corporate SaaS Command Center', 'success');
  }, [logAudit]);
  
  const renderTab = () => {
    switch (activeTab) {
      case 'audit': return <SmartAuditCenter />;
      case 'roadmap': return <ImprovementRoadmap />;
      case 'innovation': return <ModuleInnovationHub />;
      case 'reports': return <ExecutiveReportsCenter />;
      case 'activity': return <UserActivityAudit />;
      case 'settings': return <CorporateSettingsHub />;
      case 'data': return <DataQualityCenter />;
      case 'heatmap': return <ComplianceHeatmap />;
      default: return <SmartAuditCenter />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-900 p-6 rounded-2xl shadow-lg text-white gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-300" />
            Corporate SaaS Command Center
          </h1>
          <p className="text-indigo-200 mt-2 text-lg">Executive Overview & Smart Audit Engine</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-indigo-800 p-4 rounded-xl text-center shadow-inner min-w-[120px]">
            <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider">Health Score</p>
            <p className="text-3xl font-black text-green-400 mt-1">92%</p>
          </div>
          <div className="bg-indigo-800 p-4 rounded-xl text-center shadow-inner min-w-[120px]">
            <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider">Total Risk</p>
            <p className="text-3xl font-black text-yellow-400 mt-1">Low</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        {[
          { id: 'audit', label: 'Smart Audit', icon: ShieldAlert },
          { id: 'data', label: 'Data Quality', icon: Database },
          { id: 'heatmap', label: 'Compliance Heatmap', icon: Map },
          { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
          { id: 'innovation', label: 'Innovation Hub', icon: Cpu },
          { id: 'reports', label: 'Executive Reports', icon: FileText },
          { id: 'activity', label: 'User Activity', icon: Users },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-100 text-indigo-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200 min-h-[500px]">
        {renderTab()}
      </div>
    </div>
  );
}
