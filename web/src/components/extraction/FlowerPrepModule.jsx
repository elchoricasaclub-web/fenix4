import React, { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, Save, Download, CheckCircle, ShieldAlert, Camera, Image as ImageIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';
import BatchCameraCapture from '../BatchCameraCapture';
import GuidedInput from '../guided/GuidedInput';
import GuidedTextarea from '../guided/GuidedTextarea';
import GuidedSelect from '../guided/GuidedSelect';
import ModuleTutorial from '../guided/ModuleTutorial';

export default function FlowerPrepModule({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  
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

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
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
        photoUrl: photoDataUrl,
      };
      setBatches([newBatch, ...batches]);
      setFormData({
        ...formData, batchId: '', initialWeight: '', milledWeight: '', decarbTemp: '', decarbTime: '', notes: ''
      });
      setPhotoDataUrl(null);
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
      <ModuleTutorial
        title="Preparación de Flor (Molienda)"
        moduleName="Preparación de Flor"
        objective="Registrar la molienda, descarboxilación y balance de masa antes de la extracción, controlando las pérdidas de proceso."
        whoShouldUse="Operador de extracción o encargado de preparación."
        whenToUse="Antes de iniciar cualquier proceso de extracción que requiera flor molida."
        requiredInformation={['ID del lote origen', 'Peso inicial y final (g)', 'Temperaturas si aplica descarboxilación']}
        requiredFields={['ID Lote', 'Lote Origen', 'Responsable', 'Pesos', 'Estado']}
        suggestedDocuments={['Registro de limpieza de molino', 'Verificación de balanza']}
        steps={[
          'Identifica el lote de flor origen.',
          'Pesa la biomasa antes y después de la molienda para calcular pérdida.',
          'Registra la temperatura de descarboxilación si el SOP lo requiere.',
          'Adjunta evidencia fotográfica de la biomasa.',
          'Define el estado de calidad y guarda el registro.'
        ]}
        commonMistakes={[
          'No registrar la pérdida de masa.',
          'Olvidar adjuntar evidencia fotográfica.',
          'Guardar el lote como "Liberado" sin revisión del supervisor.'
        ]}
        gacpGmpTips={[
          'La balanza utilizada debe tener calibración vigente documentada.',
          'La pérdida de molienda no debería superar el 5% según estándares GMP.',
          'Todo rechazo requiere una observación detallada.'
        ]}
        auditRelation="Este registro demuestra el control de merma y el correcto acondicionamiento de la materia prima antes de la extracción."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-emerald-500" />
            Preparación de Flor (Molienda & Descarboxilación)
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GuidedInput
                name="batchId"
                label="ID Lote Preparación"
                value={formData.batchId}
                onChange={handleInputChange}
                isRequired={true}
                placeholder="Ej: PREP-2026-001"
                exampleValue="PREP-052026-001"
                helpText="Código único para trazabilidad de esta molienda."
              />
              <GuidedInput
                name="flowerBatchId"
                label="ID Lote Flor Origen"
                value={formData.flowerBatchId}
                onChange={handleInputChange}
                isRequired={true}
                placeholder="Ej: LOT-CUL-2026"
                exampleValue="LOT-CULT-2026-102"
                helpText="Código del lote cosechado y secado."
              />
              <div className="md:col-span-2">
                <GuidedInput
                  name="responsible"
                  label="Responsable Operativo"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  isRequired={true}
                  placeholder="Nombre o ID del operador"
                  exampleValue="Juan Pérez - OP001"
                  draftValue="Operador Autorizado Extracción"
                  gacpGmpTip="El responsable debe tener capacitación documentada vigente en este SOP."
                />
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Molienda y Balance de Masa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GuidedInput
                  name="initialWeight"
                  label="Peso Inicial (g)"
                  type="number"
                  step="0.1"
                  value={formData.initialWeight}
                  onChange={handleInputChange}
                  isRequired={true}
                  placeholder="0.0"
                />
                <GuidedInput
                  name="milledWeight"
                  label="Peso Post-Molienda (g)"
                  type="number"
                  step="0.1"
                  value={formData.milledWeight}
                  onChange={handleInputChange}
                  isRequired={true}
                  placeholder="0.0"
                  gacpGmpTip="La balanza utilizada debe estar calibrada diariamente."
                />
                <div className="flex flex-col justify-end">
                  <div className="bg-slate-800/50 px-4 py-2 mb-4 border border-slate-700 rounded-lg w-full text-sm font-medium text-emerald-400">
                    Pérdida Molienda: {calculateLoss()}%
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Descarboxilación Térmica (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GuidedInput
                  name="decarbTemp"
                  label="Temperatura Horno (°C)"
                  type="number"
                  value={formData.decarbTemp}
                  onChange={handleInputChange}
                  placeholder="Ej: 110"
                  exampleValue="110"
                  draftValue="105"
                />
                <GuidedInput
                  name="decarbTime"
                  label="Tiempo (minutos)"
                  type="number"
                  value={formData.decarbTime}
                  onChange={handleInputChange}
                  placeholder="Ej: 45"
                  exampleValue="45"
                  draftValue="40"
                />
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Evidencia Fotográfica</h3>
              
              {!photoDataUrl ? (
                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-emerald-500 hover:bg-slate-800/50 transition-colors group"
                >
                  <Camera className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 mr-2" />
                  <span className="text-slate-300 group-hover:text-emerald-300 font-medium">Capturar foto de la flor procesada</span>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-600 inline-block">
                  <img src={photoDataUrl} alt="Evidencia" className="h-48 w-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setShowCamera(true)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GuidedSelect
                  name="qualityStatus"
                  label="Estado de Calidad"
                  value={formData.qualityStatus}
                  onChange={handleInputChange}
                  isRequired={true}
                  options={[
                    { value: 'Pendiente', label: 'Cuarentena (Pendiente)' },
                    { value: 'Liberado', label: 'Liberado a Extracción' },
                    { value: 'Rechazado', label: 'Rechazado' }
                  ]}
                  gacpGmpTip="La liberación requiere revisión del supervisor de calidad."
                />
                <GuidedTextarea
                  name="notes"
                  label="Observaciones"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Motivo de rechazo o condición especial"
                  isRequired={formData.qualityStatus === 'Rechazado'}
                  draftValue="El proceso se ejecutó bajo condiciones controladas, sin desviaciones visibles al momento del registro."
                  helpText="Obligatorio detallar si el lote es rechazado."
                  rows={2}
                />
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
            {batches.length === 0 ? (
               <p className="text-sm text-slate-400 italic">No hay preparaciones registradas en este lote.</p>
            ) : (
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
                    {batch.photoUrl && (
                      <div className="mt-2 mb-3">
                        <div className="flex items-center text-xs text-emerald-400 mb-1">
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
