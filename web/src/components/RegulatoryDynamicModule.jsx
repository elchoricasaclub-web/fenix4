import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { regulatoryModules } from '../data/regulatoryModules';
import { useToast } from '../contexts/ToastContext';
import { validateForm } from '../core/utils/validators';
import { storage } from '../core/utils/storage';
import { exportToCSV } from '../core/utils/exportHelper';
import ModuleActionBar from './ModuleActionBar';

export default function RegulatoryDynamicModule() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const addToast = useToast();
  
  const moduleData = regulatoryModules.find(m => m.id === moduleId);
  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (moduleData) {
      const saved = storage.get(`regulatory_${moduleId}`, []);
      setRecords(saved);
      setFormData({});
      setHasUnsavedChanges(false);
    }
  }, [moduleId, moduleData]);

  if (!moduleData) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
        <Icons.AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Módulo Regulatorio no encontrado</h2>
        <button onClick={() => navigate('/regulatory-suite')} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Volver a la Suite Regulatoria
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    const requiredFieldNames = moduleData.fields.filter(f => f.required).map(f => f.name);
    const { isValid, errors } = validateForm(formData, requiredFieldNames);
    
    if (!isValid) {
      addToast('Faltan campos obligatorios. Revisa la información marcada.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newRecord = { 
        ...formData, 
        _id: `REG-${Date.now().toString().slice(-6)}`,
        _fecha_creacion: new Date().toLocaleString()
      };
      
      const updatedRecords = [newRecord, ...records];
      storage.set(`regulatory_${moduleId}`, updatedRecords);
      setRecords(updatedRecords);
      setFormData({});
      setHasUnsavedChanges(false);
      addToast('Registro guardado correctamente.', 'success');
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
    exportToCSV(records, `Auditoria_Regulatoria_${moduleId}`);
    addToast('Archivo CSV preparado para Auditoría / Inspección generado', 'success');
  };

  const IconComp = Icons[moduleData.icon] || Icons.Folder;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-lg mr-4 shadow-sm">
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{moduleData.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{moduleData.description}</p>
          </div>
        </div>
        <button onClick={handleExport} className="w-full md:w-auto flex justify-center items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
          <Icons.Download className="w-4 h-4 mr-2" /> Exportar Evidencia
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Icons.PlusCircle className="w-5 h-5 mr-2 text-blue-600" /> Nuevo Registro Oficial
              </h2>
            </div>
            <div className="p-5 space-y-4 flex-1">
              {moduleData.fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                      placeholder={`Ingrese ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-5 mt-auto">
              <ModuleActionBar 
                onSave={handleSave} 
                onCancel={handleClear} 
                hasUnsavedChanges={hasUnsavedChanges}
                isSaving={isSubmitting} 
                backPath="/regulatory-suite" 
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
                    {moduleData.fields.slice(0, 3).map(f => (
                      <th key={f.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{f.label}</th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
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
                        {moduleData.fields.slice(0, 3).map(f => (
                          <td key={f.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {r[f.name] ? (r[f.name].length > 30 ? r[f.name].substring(0, 30) + '...' : r[f.name]) : '-'}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${r.estado === 'Aprobado' || r.estado === 'Cerrado' ? 'bg-green-100 text-green-800' : 
                              r.estado === 'Rechazado' || r.estado === 'Vencido' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {r.estado || 'Pendiente'}
                          </span>
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
