import React, { useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export default function ExecutiveReportsCenter() {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Centro de Reportes Ejecutivos', 'success');
  }, [logAudit]);

  return (
    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Centro de Reportes Ejecutivos</h3>
      <p className="text-gray-500 max-w-md mx-auto">Exportación y generación de reportes gerenciales en PDF/CSV. (Módulo en preparación).</p>
      <button className="mt-4 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-white transition flex items-center gap-2 mx-auto font-medium">
        <Download className="w-5 h-5" />
        Configurar Reportes
      </button>
    </div>
  );
}
