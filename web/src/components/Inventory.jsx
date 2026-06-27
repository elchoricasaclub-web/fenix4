import React, { useEffect } from 'react';
import { Package } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function Inventory() {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo de Inventario y Lotes', 'success');
  }, [logAudit]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-100 flex items-center">
        <Package className="w-6 h-6 mr-2 text-indigo-400" />
        Inventario
      </h1>
      <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700">
        <p className="text-gray-400">Módulo de inventario en construcción.</p>
      </div>
    </div>
  );
}
