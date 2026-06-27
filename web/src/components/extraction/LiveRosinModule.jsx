import React, { useState } from 'react';
import { ArrowLeft, Droplets, Save } from 'lucide-react';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';

export default function LiveRosinModule({ onBack }) {
  const [formData, setFormData] = useState({
    batchId: '', hashBatchId: '', responsible: '', 
    initialWeight: '', micronSize: '73-159µ', pressTemp: '',
    pressTime: '', pressCount: '1', bagType: '25µ', qualityStatus: 'Pendiente', notes: ''
  });
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isRequired(formData.batchId)) newErrors.batchId = 'Obligatorio';
    if (!isRequired(formData.hashBatchId)) newErrors.hashBatchId = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (!isRequired(formData.initialWeight)) newErrors.initialWeight = 'Obligatorio';
    if (!isRequired(formData.pressTemp)) newErrors.pressTemp = 'Obligatorio';
    if (!isRequired(formData.pressTime)) newErrors.pressTime = 'Obligatorio';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      alert('Faltan campos obligatorios. Revisa la información marcada.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Registro guardado correctamente.');
      setFormData({ ...formData, batchId: '', initialWeight: '', notes: '' });
      setHasUnsavedChanges(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6 max-w-4xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Droplets className="w-6 h-6 mr-2 text-yellow-500" />
          Prensa de Live Rosin (Solventless)
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Rosin *</label>
                <input type="text" value={formData.batchId} onChange={e => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.batchId && <p className="mt-1 text-xs text-rose-400">{errors.batchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Hash Base *</label>
                <input type="text" value={formData.hashBatchId} onChange={e => handleInputChange('hashBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.hashBatchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.hashBatchId && <p className="mt-1 text-xs text-rose-400">{errors.hashBatchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input type="text" value={formData.responsible} onChange={e => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Peso Hash (g) *</label>
                <input type="number" value={formData.initialWeight} onChange={e => handleInputChange('initialWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.initialWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.initialWeight && <p className="mt-1 text-xs text-rose-400">{errors.initialWeight}</p>}
              </div>
          </div>

          <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Parámetros de Prensado</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Prensa (°C) *</label>
                  <input type="number" value={formData.pressTemp} onChange={e => handleInputChange('pressTemp', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.pressTemp ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.pressTemp && <p className="mt-1 text-xs text-rose-400">{errors.pressTemp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo (seg) *</label>
                  <input type="number" value={formData.pressTime} onChange={e => handleInputChange('pressTime', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.pressTime ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.pressTime && <p className="mt-1 text-xs text-rose-400">{errors.pressTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Bolsa (Micras)</label>
                  <select value={formData.bagType} onChange={e => handleInputChange('bagType', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option>25µ</option>
                    <option>37µ</option>
                    <option>90µ</option>
                  </select>
                </div>
              </div>
          </div>
          
          <ModuleActionBar 
            onSave={handleSubmit} 
            onCancel={onBack} 
            hasUnsavedChanges={hasUnsavedChanges} 
            backPath="/dashboard" 
          />
        </div>
      </div>
    </div>
  );
}
