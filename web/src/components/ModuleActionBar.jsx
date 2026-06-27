import React, { useState } from 'react';
import { Save, X, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmExitModal from './ConfirmExitModal';

export default function ModuleActionBar({ 
  onSave, 
  onCancel, 
  hasUnsavedChanges = false, 
  isSaving = false,
  backPath = '/' 
}) {
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'back' | 'cancel'

  const handleAction = (actionType) => {
    if (hasUnsavedChanges) {
      setPendingAction(actionType);
      setShowExitConfirm(true);
    } else {
      executeAction(actionType);
    }
  };

  const executeAction = (actionType) => {
    if (actionType === 'back') {
      navigate(backPath);
    } else if (actionType === 'cancel') {
      if (onCancel) onCancel();
      else navigate(backPath);
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    executeAction(pendingAction);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-700/50 bg-slate-900/50 rounded-b-xl p-4">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-start">
          <button
            type="button"
            onClick={() => handleAction('back')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-700 hover:border-slate-600 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al menú principal
          </button>
          
          {hasUnsavedChanges && (
            <div className="hidden md:flex items-center text-amber-400 text-sm font-medium animate-pulse">
              <AlertCircle className="w-4 h-4 mr-1.5" />
              Cambios sin guardar
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => handleAction('cancel')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-rose-400 bg-transparent hover:bg-slate-800 rounded-xl transition-all duration-200"
          >
            <X className="w-4 h-4 mr-2" />
            Salir sin guardar
          </button>
          
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/20"
          >
            <Save className={`w-4 h-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      <ConfirmExitModal 
        isOpen={showExitConfirm}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitConfirm(false)}
      />
    </>
  );
}
