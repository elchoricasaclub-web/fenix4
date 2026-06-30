import React, { useState } from 'react';
import { ArrowLeft, Droplets, Save, Camera, Image as ImageIcon } from 'lucide-react';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';
import BatchCameraCapture from '../BatchCameraCapture';
import ModuleTutorial from '../guided/ModuleTutorial';

export default function LiveRosinModule({ onBack }) {
  const [showCamera, setShowCamera] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
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
      setPhotoDataUrl(null);
      setHasUnsavedChanges(false);
    }
  };

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="Prensa de Live Rosin (Solventless)"
        moduleName="Live Rosin"
        objective="Registrar el prensado de Bubble Hash utilizando presión y temperatura para extraer resina (Rosin) sin uso de solventes."
        whoShouldUse="Operador de prensa o responsable de extracción sin solvente."
        whenToUse="Al procesar Hash en la prensa para extraer Rosin."
        requiredInformation={['Lote de Hash de origen', 'Peso inicial de Hash', 'Temperatura de placas', 'Presión y tiempo']}
        requiredFields={['Lote de Hash', 'Responsable', 'Micras de bolsa', 'Peso inicial', 'Peso final']}
        suggestedDocuments={['Calibración de la prensa', 'SOP Prensado Rosin']}
        steps={[
          'Ingresa el ID del lote de Hash que vas a prensar.',
          'Registra el tamaño de micra de la bolsa (ej. 37µ, 73µ).',
          'Anota las variables clave de la prensa: Temperatura, Presión y Tiempo.',
          'Registra el peso húmedo (si aplica) y el peso final curado.',
          'Selecciona la técnica de curado (Cold cure, Warm cure, etc.).',
          'Sube evidencia fotográfica del extracto obtenido.',
          'Guarda el registro.'
        ]}
        commonMistakes={[
          'No registrar la técnica de curado (afecta textura y calidad).',
          'Confundir presión de la bomba con presión real en bolsa (PLi).',
          'No registrar la micra de la bolsa de filtración (rosin bag).'
        ]}
        gacpGmpTips={[
          'La calibración de la temperatura de las placas de la prensa debe verificarse periódicamente.',
          'La limpieza de las placas con etanol antes de cada lote previene contaminación cruzada.'
        ]}
        auditRelation="Asegura el control de variables críticas (Temperatura, Presión, Tiempo) en una extracción mecánica."
      />

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6 max-w-4xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Droplets className="w-6 h-6 mr-2 text-yellow-500" />
          Prensa de Live Rosin (Solventless)
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Rosin *</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.batchId} onChange={e => handleInputChange('batchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.batchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.batchId && <p className="mt-1 text-xs text-rose-400">{errors.batchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID Lote Hash Base *</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.hashBatchId} onChange={e => handleInputChange('hashBatchId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.hashBatchId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.hashBatchId && <p className="mt-1 text-xs text-rose-400">{errors.hashBatchId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.responsible} onChange={e => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Peso Hash (g) *</label>
                <input placeholder="Ej: Valor esperado" type="number" value={formData.initialWeight} onChange={e => handleInputChange('initialWeight', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.initialWeight ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.initialWeight && <p className="mt-1 text-xs text-rose-400">{errors.initialWeight}</p>}
              </div>
          </div>

          <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Parámetros de Prensado</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Temp. Prensa (°C) *</label>
                  <input placeholder="Ej: Valor esperado" type="number" value={formData.pressTemp} onChange={e => handleInputChange('pressTemp', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.pressTemp ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.pressTemp && <p className="mt-1 text-xs text-rose-400">{errors.pressTemp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo (seg) *</label>
                  <input placeholder="Ej: Valor esperado" type="number" value={formData.pressTime} onChange={e => handleInputChange('pressTime', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500 ${errors.pressTime ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.pressTime && <p className="mt-1 text-xs text-rose-400">{errors.pressTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Bolsa (Micras)</label>
                  <select value={formData.bagType} onChange={e => handleInputChange('bagType', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-yellow-500">
                    <option>25µ</option>
                    <option>37µ</option>
                    <option>90µ</option>
                  </select>
                </div>
              </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Evidencia Fotográfica del Prensado</h3>
              
              {!photoDataUrl ? (
                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-yellow-500 hover:bg-slate-800/50 transition-colors group"
                >
                  <Camera className="w-6 h-6 text-slate-400 group-hover:text-yellow-400 mr-2" />
                  <span className="text-slate-300 group-hover:text-yellow-300 font-medium">Capturar foto del Live Rosin</span>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-600 inline-block">
                  <img src={photoDataUrl} alt="Evidencia" className="h-48 w-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setShowCamera(true)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2"
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
          
          <ModuleActionBar 
            onSave={handleSubmit} 
            onCancel={onBack} 
            hasUnsavedChanges={hasUnsavedChanges} 
            backPath="/dashboard" 
          />
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
