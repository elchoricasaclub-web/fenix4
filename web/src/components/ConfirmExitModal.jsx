import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmExitModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-rose-500/20 rounded-full p-3 flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="h-6 w-6 text-rose-400" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Cambios sin guardar</h3>
              <p className="text-slate-300">
                Tienes información escrita que aún no ha sido guardada. Si sales ahora, se perderán estos cambios.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 px-6 py-4 flex items-center justify-end space-x-3 border-t border-slate-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-lg shadow-rose-600/20 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            Salir sin guardar
          </button>
        </div>
      </div>
    </div>
  );
}
