import React, { useState } from 'react';
import { Lock, FileSignature, X, Activity } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function DigitalSignatureModal({ isOpen, onClose, onSign, actionDescription }) {
  const [password, setPassword] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAppContext();

  if (!isOpen) return null;

  const handleSign = (e) => {
    e.preventDefault();
    setIsSigning(true);
    setError('');

    // Simulate validation
    setTimeout(() => {
      if (password) {
        setIsSigning(false);
        onSign({
          user: user.name,
          timestamp: new Date().toISOString(),
          action: actionDescription
        });
        setPassword('');
        onClose();
      } else {
        setIsSigning(false);
        setError('Contraseña requerida para firma electrónica.');
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-gray-100 flex items-center">
            <FileSignature className="w-5 h-5 mr-2 text-indigo-400" />
            Firma Electrónica Requerida
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSign} className="p-6">
          <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-200">
              <span className="font-semibold block mb-1">Acción a autorizar:</span>
              {actionDescription}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
            <input 
              type="text" 
              disabled 
              value={user?.email || ''} 
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña (PIN / Credencial)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-600 text-gray-100 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Cumplimiento CFR 21 Parte 11 (Registros y Firmas Electrónicas)
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-400 text-sm bg-red-900/30 p-2 rounded border border-red-900/50">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSigning}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              {isSigning ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : <FileSignature className="w-4 h-4 mr-2" />}
              {isSigning ? 'Firmando...' : 'Firmar y Autorizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
