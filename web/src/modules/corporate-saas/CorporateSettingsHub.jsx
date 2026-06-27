import React, { useState } from 'react';
import { Building2, Save, Globe, Users, Shield } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function CorporateSettingsHub() {
  const [formData, setFormData] = useState({ companyName: 'FENIX1 Inc.', multiSite: true, exportFormat: 'pdf' });
  const addToast = useToast();

  const handleSave = () => {
    if(!formData.companyName) {
      addToast('Completa los campos obligatorios antes de guardar.', 'error');
      return;
    }
    addToast('Configuración corporativa guardada correctamente.', 'success');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Configuración Corporativa SaaS</h2>
        <p className="text-gray-500 mt-1">Administra la estructura empresarial, sedes y parámetros globales.</p>
      </div>
      
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
        
        {/* Sección: Información Principal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            Identidad Corporativa
          </h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Legal de la Empresa <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-3 bg-gray-50 focus:bg-white transition-colors" 
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
              placeholder="Ej. Empresa Cannabis S.A.S."
            />
          </div>
        </div>

        {/* Sección: Estructura SaaS */}
        <div className="space-y-4">
           <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            Estructura y Capacidades
          </h3>
          <div className="flex bg-gray-50 p-4 rounded-lg border border-gray-200 items-start gap-4">
            <div className="pt-1">
              <input 
                type="checkbox" 
                id="multisite"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                checked={formData.multiSite}
                onChange={e => setFormData({...formData, multiSite: e.target.checked})}
              />
            </div>
            <div>
              <label htmlFor="multisite" className="text-base text-gray-900 font-bold cursor-pointer">Habilitar operación Multi-Predio / Multi-Sede</label>
              <p className="text-sm text-gray-500 mt-1">Permite gestionar licencias, lotes y usuarios separados por ubicación física dentro de la misma empresa.</p>
            </div>
          </div>
        </div>
        
        {/* Acciones */}
        <div className="pt-4 flex justify-end">
          <button 
            onClick={handleSave} 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-bold shadow-md"
          >
            <Save className="w-5 h-5" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
