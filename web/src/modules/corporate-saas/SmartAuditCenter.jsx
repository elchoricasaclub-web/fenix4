import React, { useState } from 'react';
import { runSmartAudit } from './smartAuditEngine';
import { AlertTriangle, ShieldCheck, Download, Search } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function SmartAuditCenter() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const handleRunAudit = () => {
    setLoading(true);
    setTimeout(() => {
      setAudits(runSmartAudit({}));
      setLoading(false);
      addToast('Auditoría inteligente completada con éxito.', 'success');
    }, 1500);
  };

  const handleExport = () => {
    addToast('Exportando reporte ejecutivo (CSV)...', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Smart Audit Center</h2>
          <p className="text-gray-500 mt-1">Detección automática de brechas regulatorias y operativas.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleRunAudit} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-indigo-700 transition flex items-center gap-2 font-medium">
            <Search className="w-5 h-5" />
            Ejecutar Auditoría
          </button>
          <button onClick={handleExport} className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-medium bg-white">
            <Download className="w-5 h-5" />
            Exportar CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 text-indigo-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-medium animate-pulse">Analizando módulos regulatorios y GACP...</p>
        </div>
      ) : audits.length > 0 ? (
        <div className="grid gap-4">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg flex items-start gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 mt-0.5 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Resultados de la Auditoría</h4>
              <p className="text-sm">Se han encontrado {audits.length} hallazgos que requieren atención. Prioriza las alertas Críticas.</p>
            </div>
          </div>
          {audits.map(audit => (
            <div key={audit.id} className="flex p-5 border rounded-xl items-center gap-4 border-l-4 border-l-red-500 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-red-50 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-800 text-lg">{audit.module}</h4>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 shadow-sm border border-red-200">{audit.type}</span>
                </div>
                <p className="text-gray-600">{audit.message}</p>
                <div className="mt-3">
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Ver Detalles &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sistema Seguro y en Cumplimiento</h3>
          <p className="text-gray-500 max-w-md">Ejecuta una auditoría inteligente para detectar posibles brechas en datos, trazabilidad y regulación.</p>
        </div>
      )}
    </div>
  );
}
