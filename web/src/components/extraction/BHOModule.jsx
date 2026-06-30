import React, { useState } from 'react';
import { ArrowLeft, Wind, Save, Download, CheckCircle, ShieldAlert, Camera, Image as ImageIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';
import BatchCameraCapture from '../BatchCameraCapture';
import ModuleTutorial from '../guided/ModuleTutorial';

export default function BHOModule({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [formData, setFormData] = useState({
    batchId: '',
    flowerBatchId: '',
    responsible: '',
    initialWeight: '',
    solventType: 'Isobutano/Propano (70/30)',
    solventVolume: '',
    solventRecovered: '',
    extractionTemp: '',
    extractionPressure: '',
    purgeTime: '',
    purgeTemp: '',
    vacuumPressure: '',
    residualSolventPPM: '',
    safetyChecklist: false,
    qualityStatus: 'Pendiente',
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

  const calculateSolventRecovery = () => {
    if (!formData.solventVolume || !formData.solventRecovered) return 0;
    return ((parseFloat(formData.solventRecovered) / parseFloat(formData.solventVolume)) * 100).toFixed(1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isRequired(formData.batchId)) newErrors.batchId = 'Obligatorio';
    if (!isRequired(formData.flowerBatchId)) newErrors.flowerBatchId = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (!isRequired(formData.initialWeight)) newErrors.initialWeight = 'Obligatorio';
    if (!isRequired(formData.solventVolume)) newErrors.solventVolume = 'Obligatorio';
    if (!formData.safetyChecklist) newErrors.safetyChecklist = 'Debe confirmar checklist de seguridad';
    if (formData.qualityStatus === 'Rechazado' && !isRequired(formData.notes)) newErrors.notes = 'Obligatorio detallar motivo';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      alert('Faltan campos obligatorios o checklist de seguridad.');
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
        recoveryRate: calculateSolventRecovery(),
        status: formData.qualityStatus === 'Rechazado' ? 'Rechazado' : 'Liberado',
        photoUrl: photoDataUrl,
      };
      setBatches([newBatch, ...batches]);
      alert('Lote BHO registrado y firmado digitalmente.');
      // Reset
      setFormData({
        ...formData, batchId: '', initialWeight: '', solventVolume: '', solventRecovered: '', safetyChecklist: false, residualSolventPPM: ''
      });
      setPhotoDataUrl(null);
      setHasUnsavedChanges(false);
    }
  };

  const exportPDF = (batch) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Certificado de Extracción - BHO`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Lote: ${batch.batchId} | Origen: ${batch.flowerBatchId}`, 14, 30);
    doc.text(`Responsable: ${batch.responsible} | Fecha: ${new Date(batch.date).toLocaleString()}`, 14, 35);
    
    doc.autoTable({
      startY: 45,
      head: [['Métrica', 'Valor']],
      body: [
        ['Peso Inicial (g)', batch.initialWeight],
        ['Solvente', batch.solventType],
        ['Recuperación Solvente', `${batch.recoveryRate}%`],
        ['Presión / Temp Extracción', `${batch.extractionPressure} PSI / ${batch.extractionTemp} °C`],
        ['Purgado', `${batch.purgeTime} hrs a ${batch.purgeTemp}°C`],
        ['Solvente Residual (PPM)', batch.residualSolventPPM || 'N/D'],
        ['Checklist Seguridad', batch.safetyChecklist ? 'Aprobado' : 'No'],
        ['Estado', batch.status]
      ],
    });
    doc.save(`BHO_${batch.batchId}.pdf`);
  };

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="Extracción BHO (Butane Hash Oil)"
        moduleName="Extracción BHO"
        objective="Registrar el proceso de extracción con solvente, controlando biomasa, equipo, solvente, seguridad, recuperación y calidad."
        whoShouldUse="Operador de extracción autorizado, responsable técnico o responsable de calidad."
        whenToUse="Antes, durante y después de cada proceso de extracción BHO."
        requiredInformation={['Lote de biomasa', 'Equipo y solvente', 'Presión, temperatura, tiempo', 'Peso inicial y volumen de solvente']}
        requiredFields={['Lote de biomasa', 'Responsable', 'Equipo', 'Solvente', 'Peso inicial', 'Estado QC']}
        suggestedDocuments={['SOP BHO', 'Certificado del solvente', 'Hoja de seguridad', 'Checklist preoperacional']}
        steps={[
          'Verifica que el lote de biomasa esté liberado para extracción.',
          'Llena los datos del equipo y solvente utilizado.',
          'Registra las variables de proceso (Temperatura, Presión, Tiempo).',
          'Calcula la recuperación de solvente.',
          'Realiza el checklist de seguridad (ventilación y detectores).',
          'Adjunta la foto de evidencia.',
          'Registra el estado de calidad final.'
        ]}
        commonMistakes={[
          'No registrar lote de solvente.',
          'No adjuntar evidencia o certificado de seguridad.',
          'Olvidar marcar el checklist de seguridad antes del proceso.'
        ]}
        gacpGmpTips={[
          'Los procesos con solvente requieren trazabilidad reforzada y control estricto de seguridad.',
          'Asegura una recuperación de solvente documentada para cumplimiento ambiental.',
          'El equipo debe estar validado.'
        ]}
        auditRelation="Demuestra el control estricto sobre solventes volátiles y las buenas prácticas de manufactura (GMP)."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Wind className="w-6 h-6 mr-2 text-orange-500" />
            Registro Extracción BHO
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Extracción *</label>
                <input type="text" value={formData.batchId} onChange={(e) => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: BHO-2023-11-001" />
                {errors.batchId && <p className="mt-1 text-xs text-rose-400">{errors.batchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Flor Origen *</label>
                <input type="text" value={formData.flowerBatchId} onChange={(e) => handleInputChange('flowerBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.flowerBatchId ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: LOTE-FLOR-005" />
                {errors.flowerBatchId && <p className="mt-1 text-xs text-rose-400">{errors.flowerBatchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input type="text" value={formData.responsible} onChange={(e) => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: Dr. A. Martínez" />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Peso Biomasa (g) *</label>
                <input type="number" step="0.1" value={formData.initialWeight} onChange={(e) => handleInputChange('initialWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.initialWeight ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: 1500" />
                {errors.initialWeight && <p className="mt-1 text-xs text-rose-400">{errors.initialWeight}</p>}
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Control de Solvente y Extracción</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tipo de Solvente</label>
                  <select value={formData.solventType} onChange={(e) => handleInputChange('solventType', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500">
                    <option>Isobutano/Propano (70/30)</option>
                    <option>N-Butano 99.5%</option>
                    <option>Propano</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Volumen Solvente (L) *</label>
                  <input type="number" step="0.1" value={formData.solventVolume} onChange={(e) => handleInputChange('solventVolume', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.solventVolume ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: 15.5" />
                  {errors.solventVolume && <p className="mt-1 text-xs text-rose-400">{errors.solventVolume}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Solvente Recuperado (L)</label>
                  <input type="number" step="0.1" value={formData.solventRecovered} onChange={(e) => handleInputChange('solventRecovered', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: 14.2" />
                </div>
                <div className="flex items-end">
                  <div className="bg-slate-800 px-4 py-2 border border-slate-600 rounded-lg w-full text-sm font-medium text-white">
                    Recuperación: {calculateSolventRecovery()}%
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Extracción (°C)</label>
                  <input type="number" value={formData.extractionTemp} onChange={(e) => handleInputChange('extractionTemp', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: -40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Presión (PSI)</label>
                  <input type="number" value={formData.extractionPressure} onChange={(e) => handleInputChange('extractionPressure', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: 45" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Purgado al Vacío</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Horas Purga</label>
                  <input type="number" value={formData.purgeTime} onChange={(e) => handleInputChange('purgeTime', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: 72" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Horno (°C)</label>
                  <input type="number" value={formData.purgeTemp} onChange={(e) => handleInputChange('purgeTemp', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: 35" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Vacío (inHg)</label>
                  <input type="number" value={formData.vacuumPressure} onChange={(e) => handleInputChange('vacuumPressure', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: -29" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">PPM Residual</label>
                  <input type="number" value={formData.residualSolventPPM} onChange={(e) => handleInputChange('residualSolventPPM', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500" placeholder="Ej: < 5000" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Evidencia Fotográfica del Extracto</h3>
              
              {!photoDataUrl ? (
                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-orange-500 hover:bg-slate-800/50 transition-colors group"
                >
                  <Camera className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mr-2" />
                  <span className="text-slate-300 group-hover:text-orange-300 font-medium">Capturar foto del extracto (BHO)</span>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-600 inline-block">
                  <img src={photoDataUrl} alt="Evidencia" className="h-48 w-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setShowCamera(true)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2"
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
              <div className="flex items-center mb-4">
                <input type="checkbox" id="safety" checked={formData.safetyChecklist} onChange={(e) => handleInputChange('safetyChecklist', e.target.checked)} className="w-5 h-5 text-orange-500 bg-slate-800 border-slate-600 rounded focus:ring-orange-500" />
                <label htmlFor="safety" className={`ml-2 block text-sm font-medium ${errors.safetyChecklist ? 'text-rose-400' : 'text-slate-300'}`}>
                  * Confirmo que se realizó el checklist de seguridad (ventilación, sensores LEL, conexiones cerradas).
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Estado de Calidad *</label>
                  <select value={formData.qualityStatus} onChange={(e) => handleInputChange('qualityStatus', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500">
                    <option value="Pendiente">Cuarentena</option>
                    <option value="Liberado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Observaciones</label>
                  <input type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-orange-500 ${errors.notes ? 'border-rose-500' : 'border-slate-600'}`} placeholder="Ej: Purga extendida 12h adicionales por..." />
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
              <ShieldAlert className="w-5 h-5 mr-2 text-orange-500" /> Lotes Recientes
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
                  <p className="text-xs text-slate-400 mb-1">Recup: {batch.recoveryRate}%</p>
                  {batch.photoUrl && (
                    <div className="mt-2 mb-3">
                      <div className="flex items-center text-xs text-orange-400 mb-1">
                        <ImageIcon className="w-3 h-3 mr-1" /> Evidencia adjunta
                      </div>
                      <img src={batch.photoUrl} alt="Evidencia" className="h-16 w-16 object-cover rounded border border-slate-600" />
                    </div>
                  )}
                  <button onClick={() => exportPDF(batch)} className="mt-3 w-full flex items-center justify-center px-3 py-1.5 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-md transition-colors">
                    <Download className="w-3 h-3 mr-1.5" /> PDF
                  </button>
                </div>
              ))}
            </div>
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
