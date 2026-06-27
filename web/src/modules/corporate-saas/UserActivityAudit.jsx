import React from 'react';
import { Activity } from 'lucide-react';

export default function UserActivityAudit() {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Auditoría de Actividad</h3>
      <p className="text-gray-500 max-w-md mx-auto">Trazabilidad completa de las acciones de usuarios, roles y firmas. (Módulo en preparación).</p>
    </div>
  );
}
