import React from 'react';
import { FileText, Wand2, PlusCircle, Database, BookOpen } from 'lucide-react';

export default function EmptyStateGuide({
  title = "Este módulo aún no tiene información registrada.",
  description = "Puedes iniciar de varias formas según tu nivel de experiencia o datos previos.",
  onNewRecord,
  onUseDraft,
  onAutofill,
  showAutofill = true
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto text-center backdrop-blur-sm mt-8">
      <div className="bg-indigo-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-indigo-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-8">{description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button 
          type="button"
          onClick={onNewRecord}
          className="flex flex-col items-center p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all group"
        >
          <PlusCircle className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-slate-200">Crear registro desde cero</span>
          <span className="text-xs text-slate-500 mt-1">Formulario en blanco guiado</span>
        </button>

        <button 
          type="button"
          onClick={onUseDraft}
          className="flex flex-col items-center p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all group"
        >
          <Wand2 className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-slate-200">Usar borrador GACP/GMP</span>
          <span className="text-xs text-slate-500 mt-1">Pre-llenado con estándar sugerido</span>
        </button>

        {showAutofill && onAutofill && (
          <button 
            type="button"
            onClick={onAutofill}
            className="flex flex-col items-center p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all group"
          >
            <Database className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-slate-200">Autollenar memoria</span>
            <span className="text-xs text-slate-500 mt-1">Traer datos de la empresa</span>
          </button>
        )}
      </div>
      
      <div className="mt-8 flex items-start gap-3 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-left">
        <BookOpen className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-indigo-300">Consejo de auditoría</h4>
          <p className="text-xs text-indigo-200/70 mt-1">
            Recomendamos utilizar los borradores GACP/GMP si es la primera vez que documentas este proceso, para asegurar el cumplimiento normativo.
          </p>
        </div>
      </div>
    </div>
  );
}
