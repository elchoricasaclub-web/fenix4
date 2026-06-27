import React from 'react';
import { ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export default function BatchStatusBadge({ status, className = '' }) {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case 'aprobado':
      case 'gacp compliant':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: ShieldCheck,
          text: 'Aprobado'
        };
      case 'rechazado':
      case 'inspection required':
      case 'failed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertCircle,
          text: 'Rechazado'
        };
      case 'pendiente':
      case 'en revisión':
      case 'pending':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Clock,
          text: 'Pendiente'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          text: status || 'Desconocido'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.color} ${className}`}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {config.text}
    </span>
  );
}
