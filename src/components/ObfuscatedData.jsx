import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function ObfuscatedData({ value, type = 'text', sensitive = true }) {
  const [isVisible, setIsVisible] = useState(false);
  const { hasPermission } = useAppContext();

  // Si no es sensible, lo mostramos normal
  if (!sensitive) return <span>{value}</span>;

  // Verificar si el usuario tiene permiso general para ver data sensible
  const canViewAlways = hasPermission('read:sensitive');

  if (canViewAlways) {
    return <span>{value}</span>;
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    // Idealmente aquí se generaría un log de auditoría: "Usuario X reveló dato sensible Y"
  };

  const getObfuscatedText = () => {
    if (!value) return '';
    if (type === 'email') {
      const [name, domain] = value.split('@');
      return `${name.charAt(0)}***@${domain}`;
    }
    if (type === 'phone') {
      return `+** *** ** ${value.slice(-4)}`;
    }
    // Default text obfuscation
    return '••••••••';
  };

  return (
    <div className="inline-flex items-center gap-2 group">
      <span className={!isVisible ? 'text-gray-400 font-mono tracking-wider' : ''}>
        {isVisible ? value : getObfuscatedText()}
      </span>
      <button 
        onClick={toggleVisibility}
        className="text-gray-400 hover:text-indigo-400 transition-colors focus:outline-none opacity-0 group-hover:opacity-100"
        title={isVisible ? "Ocultar dato" : "Revelar dato sensible"}
      >
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
      {!isVisible && <Lock className="w-3 h-3 text-gray-500" title="Protegido por DLP" />}
    </div>
  );
}
