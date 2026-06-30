import React, { useState } from 'react';
import { ArrowLeft, Beaker, Save, Download, AlertTriangle, ShieldAlert } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModuleActionBar from '../ModuleActionBar';
import { isRequired } from '../../core/utils/validators';
import ModuleTutorial from '../guided/ModuleTutorial';

export default function SolventControlModule({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    logId: '',
    solventType: 'Butano',
    actionType: 'Recepción',
    volume: '',
    responsible: '',
    supplierBatch: '',
    purity: '',
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

  const validateForm = () => {
    const newErrors = {};
    if (!isRequired(formData.logId)) newErrors.logId = 'Obligatorio';
    if (!isRequired(formData.volume)) newErrors.volume = 'Obligatorio';
    if (!isRequired(formData.responsible)) newErrors.responsible = 'Obligatorio';
    if (formData.actionType === 'Recepción' && !isRequired(formData.supplierBatch)) newErrors.supplierBatch = 'Obligatorio para recepción';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      alert('Faltan campos obligatorios. Revisa la información marcada.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newLog = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      setLogs([newLog, ...logs]);
      setFormData({
        ...formData, logId: '', volume: '', supplierBatch: '', purity: '', notes: ''
      });
      setHasUnsavedChanges(false);
      alert('Registro guardado correctamente.');
    }
  };

  const exportPDF = (log) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Registro de Control de Solvente`, 14, 20);
    doc.setFontSize(10);
    doc.text(`ID Registro: ${log.logId} | Tipo: ${log.actionType}`, 14, 30);
    doc.text(`Responsable: ${log.responsible} | Fecha: ${new Date(log.date).toLocaleString()}`, 14, 35);
    
    doc.autoTable({
      startY: 45,
      head: [['Métrica', 'Valor']],
      body: [
        ['Solvente', log.solventType],
        ['Volumen (L)', log.volume],
        ['Lote Proveedor', log.supplierBatch || 'N/A'],
        ['Pureza Declarada (%)', log.purity || 'N/A'],
        ['Observaciones', log.notes || 'Ninguna']
      ],
    });
    doc.save(`Solvente_${log.logId}.pdf`);
  };

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="Control y Trazabilidad de Solventes"
        moduleName="Control de Solventes"
        objective="Registrar la recepción, consumo, recuperación y merma de solventes (Butano, Etanol, etc.) utilizados en las extracciones."
        whoShouldUse="Responsable de almacén, encargado de laboratorio o director técnico."
        whenToUse="Cada vez que ingresa solvente nuevo o se reporta consumo/recuperación en un proceso de extracción."
        requiredInformation={['Tipo de solvente', 'Volumen/Peso', 'Certificado de análisis (COA) si es recepción']}
        requiredFields={['ID Registro', 'Tipo de solvente', 'Acción', 'Volumen/Peso', 'Responsable']}
        suggestedDocuments={['COA del fabricante', 'Hoja de seguridad (MSDS)', 'Factura de compra']}
        steps={[
          'Selecciona la acción: Recepción (nuevo) o Consumo/Recuperación.',
          'Elige el tipo de solvente.',
          'Registra el volumen operado y el proveedor (si es recepción).',
          'Adjunta el COA y hoja de seguridad en caso de ser lote nuevo.',
          'Guarda el registro para actualizar el inventario.'
        ]}
        commonMistakes={[
          'Recibir solvente sin exigir el Certificado de Análisis (COA) del lote específico al proveedor.',
          'No registrar la merma (evaporación) durante la extracción.'
        ]}
        gacpGmpTips={[
          'El solvente utilizado para extracciones grado farma debe ser grado reactivo o alimenticio (dependiendo de la regulación local).',
          'Almacenar los registros de MSDS es obligatorio por seguridad laboral.'
        ]}
        auditRelation="Los inspectores auditarán que no ingresen solventes industriales tóxicos a la cadena de producción médica."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Beaker className="w-6 h-6 mr-2 text-purple-500" />
            Control y Trazabilidad de Solventes
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ID de Registro *</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.logId} onChange={(e) => handleInputChange('logId', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500 ${errors.logId ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.logId && <p className="mt-1 text-xs text-rose-400">{errors.logId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Responsable *</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.responsible} onChange={(e) => handleInputChange('responsible', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500 ${errors.responsible ? 'border-rose-500' : 'border-slate-600'}`} />
                {errors.responsible && <p className="mt-1 text-xs text-rose-400">{errors.responsible}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tipo de Solvente</label>
                <select value={formData.solventType} onChange={(e) => handleInputChange('solventType', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500">
                  <option>Butano</option>
                  <option>Propano</option>
                  <option>Etanol</option>
                  <option>Isobutano</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Acción</label>
                <select value={formData.actionType} onChange={(e) => handleInputChange('actionType', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500">
                  <option>Recepción (Ingreso a Inventario)</option>
                  <option>Merma / Purga (Pérdida)</option>
                  <option>Retiro / Descarte</option>
                </select>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-md font-semibold text-white mb-4">Detalles de la Acción</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Volumen (L) *</label>
                  <input placeholder="Ej: Valor esperado" type="number" step="0.1" value={formData.volume} onChange={(e) => handleInputChange('volume', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500 ${errors.volume ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.volume && <p className="mt-1 text-xs text-rose-400">{errors.volume}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Lote Proveedor (CoA)</label>
                  <input placeholder="Ej: Valor esperado" type="text" value={formData.supplierBatch} onChange={(e) => handleInputChange('supplierBatch', e.target.value)} className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500 ${errors.supplierBatch ? 'border-rose-500' : 'border-slate-600'}`} />
                  {errors.supplierBatch && <p className="mt-1 text-xs text-rose-400">{errors.supplierBatch}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Pureza %</label>
                  <input placeholder="Ej: Valor esperado" type="number" step="0.1" value={formData.purity} onChange={(e) => handleInputChange('purity', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Observaciones / Evidencias</label>
                <input placeholder="Ej: Valor esperado" type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-purple-500" />
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

        {/* Sidebar Logs */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-purple-500" /> Historial de Movimientos
            </h3>
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{log.logId}</h4>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${log.actionType.includes('Recepción') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {log.actionType.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{log.solventType}: {log.volume}L</p>
                  <p className="text-xs text-slate-500 mb-2">{new Date(log.date).toLocaleString()}</p>
                  <button onClick={() => exportPDF(log)} className="w-full flex items-center justify-center px-3 py-1.5 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-md transition-colors">
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
