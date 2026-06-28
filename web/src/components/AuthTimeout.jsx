import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { ShieldAlert } from 'lucide-react';

const TIMEOUT_MINUTES = 15;
const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000;
const WARNING_MS = 60 * 1000; // 1 minuto antes del cierre mostrar advertencia

export default function AuthTimeout() {
  const { isAuthenticated, logout } = useAppContext();
  const navigate = useNavigate();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Eventos de actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    const interval = setInterval(() => {
      const now = Date.now();
      const timeInactive = now - lastActivity;

      if (timeInactive >= TIMEOUT_MS) {
        logout().then(() => {
          navigate('/login');
        });
      } else if (timeInactive >= TIMEOUT_MS - WARNING_MS && !showWarning) {
        setShowWarning(true);
      }
    }, 10000); // Check every 10 seconds

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated, lastActivity, showWarning, logout, navigate, resetTimer]);

  if (!showWarning || !isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-orange-500/50 p-6 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-orange-900/30 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-2">Inactividad Detectada</h2>
        <p className="text-gray-400 mb-6">
          Por políticas de seguridad (ISO 27001), su sesión expirará en menos de 1 minuto por inactividad. ¿Desea mantener la sesión activa?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => { await logout(); navigate('/login'); }}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cerrar Sesión
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Mantener Sesión Activa
          </button>
        </div>
      </div>
    </div>
  );
}
