import React from 'react';
import SuiteDashboard from '../../components/SuiteDashboard';

export default function SecuritySuiteDashboard() {
  return (
    <SuiteDashboard 
      title="Security & Company Suite" 
      description="Empresas, usuarios, roles, permisos, auditoría de accesos, backups y memoria empresarial."
    >
      <div className="text-white">
        Contenido de la Suite de Seguridad y Compañía
      </div>
    </SuiteDashboard>
  );
}
