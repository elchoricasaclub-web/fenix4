import React, { useState } from 'react';
import { ArrowLeft, Beaker, CheckCircle, Save, AlertTriangle, Download, Plus, Camera, Image as ImageIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';
import BatchCameraCapture from '../BatchCameraCapture';
import ModuleTutorial from '../guided/ModuleTutorial';

export default function BubbleHashModule({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [formData, setFormData] = useState({
    batchId: '',
    flowerBatchId: '',
    responsible: '',
    initialWeight: '',
    qualityStatus: 'Pendiente',
    waterTemp: '',
    agitationTime: '',
    washCount: '1',
    microns: {
      m220: '', m190: '', m160: '', m120: '', m90: '', m73: '', m45: '', m25: ''
    },
    dryingMethod: 'Liofilización',
    finalMoisture: '',
    waterActivity: '',
    notes: '',
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

  const handleMicronChange = (micron, value) => {
    setFormData(prev => ({
      ...prev,
      microns: { ...prev.microns, [micron]: value }
    }));
    setHasUnsavedChanges(true);
    if (errors.microns) {
      setErrors(prev => ({ ...prev, microns: null }));
    }
  };

  const calculateYield = () => {
    if (!formData.initialWeight) return 0;
    const totalExtract = Object.values(formData.microns).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return ((totalExtract / parseFloat(formData.initialWeight)) * 100).toFixed(2);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isRequired(formData.batchId)) newErrors.batchId = 'Obligatorio';
    if (!isRequired(formData.flowerBatchId)) newErrors.flowerBatchId = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (!isRequired(formData.initialWeight)) newErrors.initialWeight = 'Obligatorio';
    if (!isRequired(formData.qualityStatus)) newErrors.qualityStatus = 'Obligatorio';
    if (formData.qualityStatus === 'Rechazado' && !isRequired(formData.notes)) newErrors.notes = 'Obligatorio detallar motivo de rechazo';
    
    const hasMicronData = Object.values(formData.microns).some(val => parseFloat(val) > 0);
    if (!hasMicronData) newErrors.microns = 'Debe ingresar peso en al menos una malla';

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
        totalYield: calculateYield(),
        status: formData.qualityStatus === 'Rechazado' ? 'Rechazado' : 'Liberado',
        photoUrl: photoDataUrl,
      };
      setBatches([newBatch, ...batches]);
      // Reset form (partial)
      setFormData({
        ...formData,
        batchId: '',
        initialWeight: '',
        microns: { m220: '', m190: '', m160: '', m120: '', m90: '', m73: '', m45: '', m25: '' },
        notes: ''
      });
      setPhotoDataUrl(null);
      setHasUnsavedChanges(false);
      alert('Lote de Bubble Hash registrado exitosamente (Firma Digital Simulada).');
    }
  };

  const exportPDF = (batch) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Certificado de Extracción - Bubble Hash`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Lote de Extracción: ${batch.batchId}`, 14, 30);
    doc.text(`Lote Origen (Flor): ${batch.flowerBatchId}`, 14, 35);
    doc.text(`Responsable: ${batch.responsible}`, 14, 40);
    doc.text(`Fecha: ${new Date(batch.date).toLocaleString()}`, 14, 45);
    
    doc.autoTable({
      startY: 55,
      head: [['Métrica', 'Valor']],
      body: [
        ['Peso Inicial (g)', batch.initialWeight],
        ['Temp Agua (°C)', batch.waterTemp],
        ['Lavadas', batch.washCount],
        ['Tiempo Agitación (min)', batch.agitationTime],
        ['Secado', batch.dryingMethod],
        ['Rendimiento Total (%)', `${batch.totalYield}%`],
        ['Estado Calidad', batch.status]
      ],
    });

    doc.text('Rendimiento por Micraje (g)', 14, doc.lastAutoTable.finalY + 15);
    const micronBody = Object.entries(batch.microns).map(([k, v]) => [k.replace('m', '') + 'µ', v || '0']);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Malla (Micras)', 'Peso (g)']],
      body: micronBody,
    });

    doc.save(`BubbleHash_${batch.batchId}.pdf`);
  };

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="Extracción Bubble Hash (Ice Water)"
        moduleName="Bubble Hash"
        objective="Registrar el lavado con agua y hielo, la separación por mallas (micras), los pesos obtenidos en cada malla y el proceso de secado."
        whoShouldUse="Operador de extracción sin solvente o responsable de calidad."
        whenToUse="Cada vez que se procese biomasa fresca o curada mediante separación mecánica con agua y hielo."
        requiredInformation={['Lote de biomasa', 'Temperaturas del agua', 'Tiempos de lavado', 'Pesos por malla (micras)']}
        requiredFields={['ID Lote', 'Lote Origen', 'Responsable', 'Peso Inicial', 'Rendimiento total']}
        suggestedDocuments={['Registro de temperatura del agua', 'Calibración de balanza', 'Registro de liofilizador (secado)']}
        steps={[
          'Ingresa el lote de flor y peso inicial.',
          'Configura las condiciones del lavado (Temperatura, cantidad de hielo).',
          'Registra los pesos húmedos y/o secos recuperados en cada malla (220µ a 25µ).',
          'Detalla el método de secado utilizado.',
          'Calcula el rendimiento total.',
          'Sube evidencia fotográfica.',
          'Guarda el registro con estado de calidad.'
        ]}
        commonMistakes={[
          'No registrar la temperatura del agua.',
          'Omitir el tiempo total de secado (liofilizador).',
          'Error en cálculo de rendimiento por mezclar peso húmedo con seco.'
        ]}
        gacpGmpTips={[
          'El agua utilizada debe cumplir con estándares de agua purificada según farmacopea si es grado médico.',
          'Mantener cadena de frío es crucial para evitar oxidación de tricomas.'
        ]}
        auditRelation="Trazabilidad del rendimiento por micra y control estricto de las condiciones mecánicas de extracción limpia."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Beaker className="w-6 h-6 mr-2 text-blue-500" />
              Nuevo Lote de Bubble Hash (Ice Water Hash)
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Extracción *</label>
                  <input placeholder="Ej: Valor esperado" type="text" value={formData.batchId} onChange={(e) => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.batchId && <p className="text-rose-400 text-xs mt-1">{errors.batchId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Flor Origen *</label>
                  <input placeholder="Ej: Valor esperado" type="text" value={formData.flowerBatchId} onChange={(e) => handleInputChange('flowerBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500 ${errors.flowerBatchId ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.flowerBatchId && <p className="text-rose-400 text-xs mt-1">{errors.flowerBatchId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                  <input placeholder="Ej: Valor esperado" type="text" value={formData.responsible} onChange={(e) => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.responsible && <p className="text-rose-400 text-xs mt-1">{errors.responsible}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Peso Inicial (g) *</label>
                  <input placeholder="Ej: Valor esperado" type="number" step="0.01" value={formData.initialWeight} onChange={(e) => handleInputChange('initialWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500 ${errors.initialWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.initialWeight && <p className="text-rose-400 text-xs mt-1">{errors.initialWeight}</p>}
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-md font-semibold text-white mb-4">Parámetros de Lavado</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Agua (°C)</label>
                    <input placeholder="Ej: Valor esperado" type="number" step="0.1" value={formData.waterTemp} onChange={(e) => handleInputChange('waterTemp', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo Agitación (min)</label>
                    <input placeholder="Ej: Valor esperado" type="number" value={formData.agitationTime} onChange={(e) => handleInputChange('agitationTime', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Número de Lavadas</label>
                    <input placeholder="Ej: Valor esperado" type="number" value={formData.washCount} onChange={(e) => handleInputChange('washCount', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-md font-semibold text-white mb-4 flex justify-between">
                  Fracciones por Micraje (Peso Seco g)
                  {errors.microns && <span className="text-rose-400 text-xs font-normal">{errors.microns}</span>}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['220', '190', '160', '120', '90', '73', '45', '25'].map(micron => (
                    <div key={micron}>
                      <label className="block text-xs font-medium text-slate-400 mb-1">{micron}µ</label>
                      <input placeholder="Ej: Valor esperado" 
                        type="number" 
                        step="0.01" 
                        value={formData.microns[`m${micron}`]} 
                        onChange={(e) => handleMicronChange(`m${micron}`, e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg text-sm focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" 
                        placeholder="0.00"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-md font-semibold text-white mb-4">Evidencia Fotográfica del Extracto</h3>
                
                {!photoDataUrl ? (
                  <button
                    type="button"
                    onClick={() => setShowCamera(true)}
                    className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-colors group"
                  >
                    <Camera className="w-6 h-6 text-slate-400 group-hover:text-blue-400 mr-2" />
                    <span className="text-slate-300 group-hover:text-blue-300 font-medium">Capturar foto del extracto (Bubble Hash)</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-600 inline-block">
                    <img src={photoDataUrl} alt="Evidencia" className="h-48 w-auto object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setShowCamera(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2"
                      >
                        <Camera className="w-4 h-4 inline mr-1" /> Retomar
                      </button>
                      <button 
                        onClick={() => setPhotoDataUrl(null)}
                        className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-md font-semibold text-white mb-4">Secado y Calidad</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Método de Secado</label>
                    <select value={formData.dryingMethod} onChange={(e) => handleInputChange('dryingMethod', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500">
                      <option>Liofilización</option>
                      <option>Secado al Aire (Cuarto Frío)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Humedad Final (%)</label>
                    <input placeholder="Ej: Valor esperado" type="number" step="0.1" value={formData.finalMoisture} onChange={(e) => handleInputChange('finalMoisture', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Actividad de Agua (aw)</label>
                    <input placeholder="Ej: Valor esperado" type="number" step="0.01" value={formData.waterActivity} onChange={(e) => handleInputChange('waterActivity', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Estado de Calidad *</label>
                    <select value={formData.qualityStatus} onChange={(e) => handleInputChange('qualityStatus', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg font-medium focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500">
                      <option value="Pendiente">Cuarentena / Pendiente</option>
                      <option value="Liberado">Liberado (Aprobado)</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Observaciones / Desviaciones</label>
                    <input type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-blue-500 ${errors.notes ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Requerido si es rechazado" />
                    {errors.notes && <p className="text-rose-400 text-xs mt-1">{errors.notes}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 mb-4">
                <div className="bg-slate-800 text-blue-400 px-4 py-2 rounded-lg font-bold border border-slate-700">
                  Rendimiento Estimado: {calculateYield()}%
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

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" /> Historial de Lotes
            </h3>
            {batches.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No hay lotes registrados.</p>
            ) : (
              <div className="space-y-4">
                {batches.map(batch => (
                  <div key={batch.id} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{batch.batchId}</h4>
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${batch.status === 'Liberado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Flor: {batch.flowerBatchId}</p>
                    <p className="text-xs text-slate-400 mb-1">Rendimiento: {batch.totalYield}%</p>
                    <p className="text-xs text-slate-500 mb-3">{new Date(batch.date).toLocaleString()}</p>
                    {batch.photoUrl && (
                      <div className="mt-2 mb-3">
                        <div className="flex items-center text-xs text-blue-400 mb-1">
                          <ImageIcon className="w-3 h-3 mr-1" /> Evidencia adjunta
                        </div>
                        <img src={batch.photoUrl} alt="Evidencia" className="h-16 w-16 object-cover rounded border border-slate-600" />
                      </div>
                    )}
                    <button onClick={() => exportPDF(batch)} className="w-full flex items-center justify-center px-3 py-1.5 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-md transition-colors">
                      <Download className="w-3 h-3 mr-1.5" /> Exportar CoA
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCamera && (
        <BatchCameraCapture 
          onPhotoCaptured={(dataUrl) => {
            setPhotoDataUrl(dataUrl);
            setShowCamera(false);
            setHasUnsavedChanges(true);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
