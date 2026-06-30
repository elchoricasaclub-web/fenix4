import React, { useState } from 'react';
import { TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function ImprovementRoadmap() {
  const addToast = useToast();
  const improvements = [
    { id: 1, title: 'Implementar e-Firma en Registros', impact: 'Crítico', effort: 'Medio', status: 'Propuesto', date: 'Oct 2026' },
    { id: 2, title: 'Conexión API con Sistema ICA', impact: 'Crítico', effort: 'Alto', status: 'En Análisis', date: 'Nov 2026' },
    { id: 3, title: 'Dashboard de Rendimiento por Lote', impact: 'Medio', effort: 'Bajo', status: 'Aprobado', date: 'Sep 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Roadmap de Mejoras</h2>
          <p className="text-gray-500 mt-1">Evolución planificada de la plataforma y madurez digital.</p>
        </div>
        <button 
          onClick={() => addToast('Abriendo formulario de nueva mejora...', 'success')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nueva Mejora
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mejora Estratégica</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Impacto</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Esfuerzo</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Objetivo</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {improvements.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1">Sugerido por Motor de Auditoría</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.impact === 'Crítico' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                    {item.impact}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.effort}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 justify-end w-full">
                    Detalles <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
