import React, { useState } from 'react';
import { HelpCircle, FileText, Wand2, Lightbulb, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

export default function FieldGuide({
  label,
  helpText,
  exampleValue,
  draftValue,
  gacpGmpTip,
  isRequired,
  onUseDraft,
  value,
  children
}) {
  const [showExample, setShowExample] = useState(false);
  const [showTip, setShowTip] = useState(false);

  // validation check
  const isExampleUsed = value === exampleValue && value !== '' && value != null;
  const isEmpty = isRequired && (value === '' || value === undefined || value === null);

  return (
    <div className="space-y-1 mb-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          {label} {isRequired && <span className="text-rose-500" title="Campo obligatorio">*</span>}
        </label>
        
        <div className="flex items-center gap-2">
          {gacpGmpTip && (
            <button 
              type="button" 
              onClick={() => setShowTip(!showTip)}
              className={`text-xs flex items-center gap-1 transition-colors ${showTip ? 'text-indigo-400' : 'text-slate-500 hover:text-indigo-300'}`}
              title="Tip GACP/GMP"
            >
              <CheckCircle2 className="w-3 h-3" /> GMP
            </button>
          )}
          {exampleValue && (
            <button 
              type="button"
              onClick={() => setShowExample(!showExample)}
              className={`text-xs flex items-center gap-1 transition-colors ${showExample ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-300'}`}
            >
              <Lightbulb className="w-3 h-3" /> {showExample ? 'Ocultar' : 'Ver'} ejemplo
            </button>
          )}
          {draftValue && onUseDraft && (
            <button 
              type="button"
              onClick={() => onUseDraft(draftValue)}
              className="text-xs flex items-center gap-1 text-slate-500 hover:text-purple-400 transition-colors"
            >
              <Wand2 className="w-3 h-3" /> Usar borrador
            </button>
          )}
        </div>
      </div>

      {showTip && gacpGmpTip && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2 text-xs text-indigo-300 flex items-start gap-2 mb-2 mt-1">
          <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{gacpGmpTip}</span>
        </div>
      )}

      {showExample && exampleValue && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-xs text-emerald-300 mb-2 mt-1">
          <strong>Ejemplo:</strong> {exampleValue}
        </div>
      )}

      {children}

      {helpText && (
        <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
          <HelpCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          {helpText}
        </p>
      )}

      {isExampleUsed && (
        <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Has usado el texto de ejemplo. Por favor, ajústalo a tu realidad.
        </p>
      )}
    </div>
  );
}
