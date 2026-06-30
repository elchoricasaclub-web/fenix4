import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function ComplianceHeatmap() {
  const addToast = useToast();

  const areas = [
    { name: 'Documentación GACP', status: 'high', score: 98, lastAudit: 'Hace 2 días' },
    { name: 'Trazabilidad de Lotes', status: 'high', score: 95, lastAudit: 'Hace 5 hrs' },
    { name: 'Reportes INVIMA/ICA', status: 'medium', score: 75, lastAudit: 'Hace 1 semana' },
    { name: 'Gestión de Cupos MinJusticia', status: 'high', score: 100, lastAudit: 'Hace 1 mes' },
    { name: 'Entrenamiento de Personal', status: 'low', score: 45, lastAudit: 'Hace 3 meses' },
    { name: 'Control de Plagas', status: 'medium', score: 82, lastAudit: 'Hace 3 días' },
  ];

  const handleRunAudit = () => {
    addToast('Ejecutando auditoría cruzada de cumplimiento...', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Heatmap</h2>
          <p className="text-gray-500 mt-1">Mapa de calor del estado regulatorio y de calidad.</p>
        </div>
        <button 
          onClick={handleRunAudit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm text-sm"
        >
          Correr Auditoría Rápida
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map(area => (
          <div key={area.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-800 text-sm">{area.name}</h3>
              {area.status === 'high' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              {area.status === 'medium' && <Clock className="w-5 h-5 text-amber-500" />}
              {area.status === 'low' && <AlertTriangle className="w-5 h-5 text-red-500" />}
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div 
                className={`h-2.5 rounded-full ${area.status === 'high' ? 'bg-emerald-500' : area.status === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`} 
                style={{ width: `${area.score}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
              <span className="font-bold text-gray-700">{area.score}% Cumplimiento</span>
              <span>Auditoría: {area.lastAudit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
