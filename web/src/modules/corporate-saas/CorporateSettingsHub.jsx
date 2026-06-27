import React, { useState } from 'react';
import { Building2, Globe, Users, Shield, BookOpen } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import ModuleActionBar from '../../components/ModuleActionBar';

export default function CorporateSettingsHub() {
  const [formData, setFormData] = useState({ companyName: 'FENIX4 Inc.', multiSite: true, exportFormat: 'pdf' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const addToast = useToast();

  const handleSave = () => {
    if(!formData.companyName) {
      addToast('Completa los campos obligatorios antes de guardar.', 'error');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast('Configuración corporativa guardada correctamente.', 'success');
    }, 800);
  };
  
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header aligned with Dashboard theme */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">SaaS Command Center</span>
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">Configuración <span className="font-bold">Corporativa</span></h1>
          <p className="text-slate-400 mt-2">Administra la estructura empresarial, sedes y parámetros globales de la organización.</p>
        </div>
      </div>
      
      {/* Tutorial Banner */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-indigo-300">Tutorial de Módulo Inteligente</h4>
          <p className="text-sm text-indigo-200/70 mt-1">
            Aquí defines la entidad legal principal. Si tienes varias fincas o instalaciones, activa la opción Multi-Sede para gestionar lotes de forma independiente pero consolidar los reportes regulatorios bajo la misma razón social.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-8 rounded-t-xl border-x border-t border-slate-700/50 shadow-sm space-y-8 backdrop-blur-sm">
        
        {/* Sección: Información Principal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Identidad Corporativa
          </h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Legal de la Empresa <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-3 bg-slate-800 text-white transition-colors" 
              value={formData.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
              placeholder="Ej. Empresa Cannabis S.A.S."
            />
          </div>
        </div>

        {/* Sección: Estructura SaaS */}
        <div className="space-y-4">
           <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            Estructura y Capacidades
          </h3>
          <div className="flex bg-slate-800/50 p-5 rounded-xl border border-slate-700 items-start gap-4 hover:border-slate-600 transition-colors">
            <div className="pt-1">
              <input 
                type="checkbox" 
                id="multisite"
                className="h-5 w-5 text-indigo-500 bg-slate-900 border-slate-600 rounded focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                checked={formData.multiSite}
                onChange={e => handleChange('multiSite', e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="multisite" className="text-base text-white font-medium cursor-pointer">Habilitar operación Multi-Predio / Multi-Sede</label>
              <p className="text-sm text-slate-400 mt-1">Permite gestionar licencias, lotes y usuarios separados por ubicación física dentro de la misma empresa.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Acción Global */}
      <ModuleActionBar 
        onSave={handleSave} 
        hasUnsavedChanges={hasUnsavedChanges} 
        isSaving={isSaving}
        backPath="/" 
      />
    </div>
  );
}
