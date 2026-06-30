import React from 'react';
import SuiteDashboard from '../../components/SuiteDashboard';

export default function RegulatorySuiteDashboard() {
  return (
    <SuiteDashboard 
      title="Regulatory Suite" 
      description="Gestión de licencias, entidades regulatorias, PEAS, ICA, INVIMA y Ministerio de Justicia."
    >
      <div className="text-white">
        Contenido de la Suite Regulatoria
      </div>
    </SuiteDashboard>
  );
}
