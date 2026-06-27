import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, BarChart2, CheckCircle, Database } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function DataQualityCenter() {
  const addToast = useToast();
  const [dataQualityStats] = useState({
    totalRecords: 12450,
    missingEvidences: 12,
    incompleteFields: 45,
    duplicateEntries: 3,
    healthScore: 94
  });

  const handleFixData = () => {
    addToast('Iniciando proceso de limpieza de datos corporativos...', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Database className="w-6 h-6 text-indigo-600" />
          Data Quality Center
        </h2>
        <p className="text-gray-500 mt-1">Supervisión de la integridad, completitud y validación de los datos GACP/GMP.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2" />
          <h3 className="text-sm font-bold text-gray-500 uppercase">Health Score</h3>
          <p className="text-3xl font-black text-gray-900 mt-1">{dataQualityStats.healthScore}%</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
          <h3 className="text-sm font-bold text-gray-500 uppercase">Campos Incompletos</h3>
          <p className="text-3xl font-black text-gray-900 mt-1">{dataQualityStats.incompleteFields}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
          <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-sm font-bold text-gray-500 uppercase">Evidencias Faltantes</h3>
          <p className="text-3xl font-black text-gray-900 mt-1">{dataQualityStats.missingEvidences}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
          <BarChart2 className="w-8 h-8 text-indigo-500 mb-2" />
          <h3 className="text-sm font-bold text-gray-500 uppercase">Total Registros</h3>
          <p className="text-3xl font-black text-gray-900 mt-1">{dataQualityStats.totalRecords.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Acciones Requeridas (Nivel 1 & 2)
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-amber-700 text-sm mb-4">
          <li>12 registros regulatorios requieren carga de documento PDF (Evidencia GACP).</li>
          <li>45 registros de lotes agrícolas tienen campos de peso en blanco.</li>
          <li>3 duplicados detectados en la tabla de clientes B2B.</li>
        </ul>
        <button 
          onClick={handleFixData}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-700 transition-colors"
        >
          Auto-Corregir / Limpiar
        </button>
      </div>
    </div>
  );
}
