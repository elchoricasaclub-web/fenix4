import React, { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, Save, Download, CheckCircle, ShieldAlert } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';

export default function FlowerPrepModule({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    batchId: '',
    flowerBatchId: '',
    responsible: '',
    initialWeight: '',
    milledWeight: '',
    decarbTemp: '',
    decarbTime: '',
    qualityStatus: 'Pendiente',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const calculateLoss = () => {
    if (!formData.initialWeight || !formData.milledWeight) return 0;
    const initial = parseFloat(formData.initialWeight);
    const milled = parseFloat(formData.milledWeight);
    return (((initial - milled) / initial) * 100).toFixed(2);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isRequired(formData.batchId)) newErrors.batchId = 'Obligatorio';
    if (!isRequired(formData.flowerBatchId)) newErrors.flowerBatchId = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (!isRequired(formData.initialWeight)) newErrors.initialWeight = 'Obligatorio';
    if (!isRequired(formData.milledWeight)) newErrors.milledWeight = 'Obligatorio';
    if (formData.qualityStatus === 'Rechazado' && !isRequired(formData.notes)) newErrors.notes = 'Obligatorio detallar motivo de rechazo';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      alert('Faltan campos obligatorios. Revisa la información marcada.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newBatch = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        lossPercentage: calculateLoss(),
        status: formData.qualityStatus === 'Rechazado' ? 'Rechazado' : 'Liberado',
      };
      setBatches([newBatch, ...batches]);
      setFormData({
        ...formData, batchId: '', initialWeight: '', milledWeight: '', decarbTemp: '', decarbTime: '', notes: ''
      });
      setHasUnsavedChanges(false);
      alert('Registro guardado correctamente.');
    }
  };

  const exportPDF = (batch) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Registro de Preparación de Flor`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Lote Preparación: ${batch.batchId} | Lote Origen: ${batch.flowerBatchId}`, 14, 30);
    doc.text(`Responsable: ${batch.responsible} | Fecha: ${new Date(batch.date).toLocaleString()}`, 14, 35);
    
    doc.autoTable({
      startY: 45,
      head: [['Métrica', 'Valor']],
      body: [
        ['Peso Inicial (g)', batch.initialWeight],
        ['Peso Post-Molienda (g)', batch.milledWeight],
        ['Pérdida (%)', `${batch.lossPercentage}%`],
        ['Descarboxilación Temp', batch.decarbTemp ? `${batch.decarbTemp} °C` : 'N/A'],
        ['Descarboxilación Tiempo', batch.decarbTime ? `${batch.decarbTime} min` : 'N/A'],
        ['Estado', batch.status]
      ],
    });
    doc.save(`Prep_${batch.batchId}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-emerald-500" />
            Preparación de Flor (Molienda & Descarboxilación)
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Preparación *</label>
                <input type="text" value={formData.batchId} onChange={(e) => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.batchId && <p className="mt-1 text-xs text-rose-400">{errors.batchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Flor Origen *</label>
                <input type="text" value={formData.flowerBatchId} onChange={(e) => handleInputChange('flowerBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.flowerBatchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.flowerBatchId && <p className="mt-1 text-xs text-rose-400">{errors.flowerBatchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input type="text" value={formData.responsible} onChange={(e) => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Molienda y Balance de Masa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Peso Inicial (g) *</label>
                  <input type="number" step="0.1" value={formData.initialWeight} onChange={(e) => handleInputChange('initialWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.initialWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.initialWeight && <p className="mt-1 text-xs text-rose-400">{errors.initialWeight}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Peso Post-Molienda (g) *</label>
                  <input type="number" step="0.1" value={formData.milledWeight} onChange={(e) => handleInputChange('milledWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.milledWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.milledWeight && <p className="mt-1 text-xs text-rose-400">{errors.milledWeight}</p>}
                </div>
                <div className="flex items-end">
                  <div className="bg-slate-800/50 px-4 py-2 border border-slate-700 rounded-lg w-full text-sm font-medium text-emerald-400">
                    Pérdida Molienda: {calculateLoss()}%
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Descarboxilación Térmica (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temperatura Horno (°C)</label>
                  <input type="number" value={formData.decarbTemp} onChange={(e) => handleInputChange('decarbTemp', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo (minutos)</label>
                  <input type="number" value={formData.decarbTime} onChange={(e) => handleInputChange('decarbTime', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Estado de Calidad *</label>
                  <select value={formData.qualityStatus} onChange={(e) => handleInputChange('qualityStatus', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="Pendiente">Cuarentena (Pendiente)</option>
                    <option value="Liberado">Liberado a Extracción</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Observaciones</label>
                  <input type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.notes ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Motivo si es rechazado" />
                  {errors.notes && <p className="mt-1 text-xs text-rose-400">{errors.notes}</p>}
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

        {/* Sidebar Batches */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-emerald-500" /> Preparaciones Recientes
            </h3>
            <div className="space-y-4">
              {batches.map(batch => (
                <div key={batch.id} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{batch.batchId}</h4>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${batch.status === 'Liberado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {batch.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">Molienda: {batch.milledWeight}g</p>
                  <button onClick={() => exportPDF(batch)} className="mt-3 w-full flex items-center justify-center px-3 py-1.5 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-md transition-colors">
                    <Download className="w-3 h-3 mr-1.5" /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
