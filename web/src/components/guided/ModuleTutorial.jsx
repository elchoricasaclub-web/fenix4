import React, { useState } from 'react';
import { BookOpen, X, Info, CheckCircle2, AlertTriangle, FileText, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

export default function ModuleTutorial({
  title,
  moduleName,
  objective,
  whoShouldUse,
  whenToUse,
  requiredInformation = [],
  requiredFields = [],
  suggestedDocuments = [],
  steps = [],
  commonMistakes = [],
  gacpGmpTips = [],
  auditRelation,
  reportRelation,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) {
    return (
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Guía Rápida: {moduleName}</h3>
          </div>
          <p className="text-sm text-slate-400">{objective}</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          <PlayCircle className="w-4 h-4" />
          Ver tutorial
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl mb-6 overflow-hidden">
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{title || `Tutorial: ${moduleName}`}</h2>
            <p className="text-xs text-indigo-300">Guía paso a paso y buenas prácticas</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex border-b border-slate-700 overflow-x-auto hide-scrollbar">
        {[
          { id: 'overview', label: 'Resumen', icon: Info },
          { id: 'steps', label: 'Paso a paso', icon: CheckCircle2 },
          { id: 'requirements', label: 'Requisitos', icon: FileText },
          { id: 'tips', label: 'GACP / Errores', icon: AlertTriangle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            } placeholder-slate-400 placeholder:font-bold`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Objetivo principal
                </h3>
                <p className="text-sm text-slate-400">{objective}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  ¿Quién y Cuándo?
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li><strong>Quién:</strong> {whoShouldUse}</li>
                  <li><strong>Cuándo:</strong> {whenToUse}</li>
                </ul>
              </div>
            </div>
            {auditRelation && (
              <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                <h3 className="text-sm font-semibold text-indigo-300 mb-1">Impacto en Auditoría</h3>
                <p className="text-sm text-indigo-200/80">{auditRelation}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white mb-4">Sigue estos pasos para completar el registro:</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <div className="bg-indigo-500/20 text-indigo-400 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Información Necesaria
              </h3>
              <ul className="space-y-2">
                {requiredInformation.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Documentos Sugeridos / Requeridos
              </h3>
              <ul className="space-y-2">
                {suggestedDocuments.map((doc, idx) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span> {doc}
                  </li>
                ))}
              </ul>
              {suggestedDocuments.length === 0 && (
                <p className="text-sm text-slate-500 italic">No se requieren documentos adicionales.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6">
            {gacpGmpTips.length > 0 && (
              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Consejos GACP / GMP
                </h3>
                <ul className="space-y-2">
                  {gacpGmpTips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-emerald-200/80 flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {commonMistakes.length > 0 && (
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                <h3 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Errores Comunes a Evitar
                </h3>
                <ul className="space-y-2">
                  {commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="text-sm text-rose-200/80 flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span> {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-800 border-t border-slate-700 p-4 flex justify-between items-center">
        <button
          onClick={() => setActiveTab('overview')}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Reiniciar tutorial
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Ocultar guía
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
