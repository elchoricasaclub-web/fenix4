import React, { useState } from 'react';
import { ArrowLeft, ThermometerSnowflake, Save, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';

export default function LiveResinModule({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [formData, setFormData] = useState({
    batchId: '', flowerBatchId: '', responsible: '', 
    freshWeight: '', harvestToFreezeTime: '', freezerTemp: '',
    solventType: 'Butano/Propano', extractionTemp: '',
    qualityStatus: 'Pendiente', notes: ''
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
    if (!isRequired(formData.flowerBatchId)) newErrors.flowerBatchId = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (!isRequired(formData.freshWeight)) newErrors.freshWeight = 'Obligatorio';
    if (!isRequired(formData.harvestToFreezeTime)) newErrors.harvestToFreezeTime = 'Obligatorio para Live Resin';
    if (!isRequired(formData.freezerTemp)) newErrors.freezerTemp = 'Obligatorio certificar cadena de frío';
    if (formData.qualityStatus === 'Rechazado' && !isRequired(formData.notes)) newErrors.notes = 'Obligatorio';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Faltan campos obligatorios. Revisa la información marcada.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setBatches([{ ...formData, id: Date.now(), date: new Date().toISOString() }, ...batches]);
      alert('Lote Live Resin registrado.');
      setFormData({ ...formData, batchId: '', freshWeight: '' });
      setHasUnsavedChanges(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <ThermometerSnowflake className="w-6 h-6 mr-2 text-cyan-400" />
          Control Live Resin & Cadena de Frío
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Extracción *</label>
                <input type="text" value={formData.batchId} onChange={e => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.batchId && <p className="mt-1 text-xs text-rose-400">{errors.batchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Flor (FF) *</label>
                <input type="text" value={formData.flowerBatchId} onChange={e => handleInputChange('flowerBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.flowerBatchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.flowerBatchId && <p className="mt-1 text-xs text-rose-400">{errors.flowerBatchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input type="text" value={formData.responsible} onChange={e => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Peso Biomasa Fresca (g) *</label>
                <input type="number" value={formData.freshWeight} onChange={e => handleInputChange('freshWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.freshWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.freshWeight && <p className="mt-1 text-xs text-rose-400">{errors.freshWeight}</p>}
              </div>
          </div>

          <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-cyan-400 mb-4">Validación Cadena de Frío (Fresh Frozen)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo Cosecha -&gt; Congelador (min) *</label>
                  <input type="number" value={formData.harvestToFreezeTime} onChange={e => handleInputChange('harvestToFreezeTime', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.harvestToFreezeTime ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.harvestToFreezeTime && <p className="mt-1 text-xs text-rose-400">{errors.harvestToFreezeTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Congelador (°C) *</label>
                  <input type="number" placeholder="-40" value={formData.freezerTemp} onChange={e => handleInputChange('freezerTemp', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.freezerTemp ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.freezerTemp && <p className="mt-1 text-xs text-rose-400">{errors.freezerTemp}</p>}
                </div>
              </div>
          </div>

          <div className="border-t border-slate-700/50 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Estado de Calidad *</label>
                <select value={formData.qualityStatus} onChange={(e) => handleInputChange('qualityStatus', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="Pendiente">Cuarentena</option>
                  <option value="Liberado">Aprobado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Observaciones</label>
                <input type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.notes ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.notes && <p className="mt-1 text-xs text-rose-400">{errors.notes}</p>}
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
