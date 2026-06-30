import React, { useState, useEffect } from 'react';
import { Camera, MapPin } from 'lucide-react';
import AIDiagnosticTool from './AIDiagnosticTool';
import { useAppContext } from '../contexts/AppContext';

// A standalone view for AI Diagnostics if accessed from the sidebar directly
export default function AIDiagnosticView() {
  const [selectedPlot, setSelectedPlot] = useState({ id: 'N/A', name: 'Cultivo General' });
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Centro de Diagnóstico IA', 'success');
  }, [logAudit]);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Camera className="w-6 h-6 mr-2 text-indigo-600" />
          Centro de Diagnóstico IA
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600 mb-6">
          Sube fotografías de hojas, tallos o cultivos enteros para que nuestra IA identifique posibles patógenos, 
          deficiencias de nutrientes o signos de estrés.
        </p>

        <div className="mb-6">
           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
             <MapPin className="w-4 h-4 mr-1 text-gray-500"/>
             Lote/Área (Opcional)
           </label>
           <input 
             type="text" 
             value={selectedPlot.id}
             onChange={(e) => setSelectedPlot({ ...selectedPlot, id: e.target.value })}
             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
           />
        </div>

        <div className="max-w-2xl">
          <AIDiagnosticTool selectedPlot={selectedPlot} />
        </div>
      </div>
    </div>
  );
}
