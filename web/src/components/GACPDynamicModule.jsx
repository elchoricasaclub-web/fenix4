import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { gacpModules } from '../data/gacpModules';
import { useToast } from '../contexts/ToastContext';
import { validateForm } from '../core/utils/validators';
import { storage } from '../core/utils/storage';
import { exportToCSV } from '../core/utils/exportHelper';
import RequirePermission from './RequirePermission';
import DigitalSignatureModal from './DigitalSignatureModal';
import { useAppContext } from '../contexts/AppContext';
import ModuleActionBar from './ModuleActionBar';

export default function GACPDynamicModule() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const addToast = useToast();
  
  const moduleData = gacpModules.find(m => m.id === moduleId);
  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { logAudit } = useAppContext();

  useEffect(() => {
    if (moduleData) {
      logAudit(`Acceso a módulo GACP: ${moduleData.title}`, 'success');
      const saved = storage.get(`gacp_${moduleId}`, []);
      setRecords(saved);
      setFormData({});
      setHasUnsavedChanges(false);
    }
  }, [moduleId, moduleData, logAudit]);

  if (!moduleData) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
        <Icons.AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Módulo no encontrado</h2>
        <button onClick={() => navigate('/gacp-suite')} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Volver a la Suite
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const validateAndRequestSignature = () => {
    const requiredFieldNames = moduleData.fields.filter(f => f.required).map(f => f.name);
    const { isValid } = validateForm(formData, requiredFieldNames);
    
    if (!isValid) {
      addToast('Faltan campos obligatorios. Revisa la información marcada.', 'error');
      return;
    }
    
    // Request electronic signature (CFR 21 Part 11)
    setShowSignatureModal(true);
  };

  const handleSaveWithSignature = (signatureData) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newRecord = { 
        ...formData, 
        _id: `REG-${Date.now().toString().slice(-6)}`,
        _fecha_creacion: new Date().toLocaleString(),
        _firma_usuario: signatureData.user,
        _firma_timestamp: signatureData.timestamp
      };
      
      const updatedRecords = [newRecord, ...records];
      storage.set(`gacp_${moduleId}`, updatedRecords);
      setRecords(updatedRecords);
      setFormData({});
      setHasUnsavedChanges(false);
      addToast('Registro GACP/GMP firmado y guardado exitosamente', 'success');
      logAudit(`Registro GACP/GMP firmado y creado en módulo: ${moduleData.title}`, 'success');
      setIsSubmitting(false);
    }, 400);
  };

  const handleClear = () => {
    setFormData({});
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    if(records.length === 0) {
      addToast('No hay registros para exportar', 'error');
      return;
    }
    exportToCSV(records, `Auditoria_${moduleId}`);
    addToast('Archivo CSV preparado para Auditoría GACP/GMP generado', 'success');
    logAudit(`Exportó registros de auditoría GACP: ${moduleData.title}`, 'success');
  };

  const IconComp = Icons[moduleData.icon] || Icons.Folder;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <DigitalSignatureModal 
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSign={handleSaveWithSignature}
        actionDescription={`Creación de nuevo registro en módulo: ${moduleData.title}`}
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 text-green-700 rounded-lg mr-4 shadow-sm">
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{moduleData.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{moduleData.description}</p>
          </div>
        </div>
        <RequirePermission permission="audit:view">
          <button onClick={handleExport} className="w-full md:w-auto flex justify-center items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
            <Icons.Download className="w-4 h-4 mr-2" /> Exportar Auditoría
          </button>
        </RequirePermission>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Icons.Brain className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-indigo-900">Guía del Módulo</h3>
                <p className="text-xs text-indigo-700 mt-1 mb-2">Este módulo permite registrar parámetros de calidad y operaciones. Algunos campos pueden ser autollenados usando la <b>Memoria Empresarial</b>.</p>
                <button className="text-xs font-medium text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors">
                  Ver tutorial completo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Icons.PlusCircle className="w-5 h-5 mr-2 text-green-600" /> Nuevo Registro
              </h2>
              <button 
                type="button"
                className="flex items-center text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-2.5 py-1.5 rounded-lg border border-purple-200 transition-colors"
                onClick={() => addToast('Autollenando datos desde Memoria Empresarial...', 'success')}
              >
                <Icons.Wand2 className="w-3.5 h-3.5 mr-1.5" />
                Autollenar
              </button>
            </div>
            <div className="p-5 space-y-4 flex-1">
              {moduleData.fields.map(field => (
                <div key={field.name}>
                  <label className="flex justify-between items-end text-sm font-medium text-gray-700 mb-1">
                    <span>{field.label} {field.required && <span className="text-red-500">*</span>}</span>
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white"
                    >
                      <option value="">Seleccione una opción...</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-5 mt-auto">
              <ModuleActionBar 
                onSave={validateAndRequestSignature} 
                onCancel={handleClear} 
                hasUnsavedChanges={hasUnsavedChanges}
                isSaving={isSubmitting} 
                backPath="/gacp-suite" 
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Icons.History className="w-5 h-5 mr-2 text-blue-600" /> Historial de Registros
              </h2>
              <span className="text-xs font-medium px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                {records.length} {records.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Fecha</th>
                    {moduleData.fields.slice(0, 2).map(f => (
                      <th key={f.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{f.label}</th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firma Digital</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                        No hay registros en este módulo aún.
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{r._id}</div>
                          <div className="text-xs text-gray-500">{r._fecha_creacion}</div>
                        </td>
                        {moduleData.fields.slice(0, 2).map(f => (
                          <td key={f.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {r[f.name] ? (r[f.name].length > 30 ? r[f.name].substring(0, 30) + '...' : r[f.name]) : '-'}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {r._firma_usuario ? (
                            <div className="flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100 inline-flex text-xs font-medium">
                              <Icons.ShieldCheck className="w-3 h-3 mr-1" />
                              Firmado por: {r._firma_usuario}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Sin firma</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
