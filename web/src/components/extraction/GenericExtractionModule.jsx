import React from 'react';
import { ArrowLeft, Wrench } from 'lucide-react';
import ModuleActionBar from '../ModuleActionBar';

export default function GenericExtractionModule({ title, onBack }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 p-12 text-center">
        <Wrench className="w-16 h-16 text-slate-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Este módulo ({title}) está actualmente en desarrollo. 
          <br/><br/>
          <strong>Módulos Funcionales Actuales:</strong><br/>
          ✅ Preparación de Flor<br/>
          ✅ BHO<br/>
          ✅ Bubble Hash<br/>
          ✅ Live Resin<br/>
          ✅ Live Rosin<br/>
          ✅ Control de Solventes
        </p>
        
        <div className="max-w-md mx-auto">
          <ModuleActionBar 
            onSave={() => alert('Funcionalidad en preparación. No se ha guardado ningún cambio.')} 
            onCancel={onBack} 
            hasUnsavedChanges={false} 
            backPath="/dashboard" 
          />
        </div>
      </div>
    </div>
  );
}
