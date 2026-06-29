import React from 'react';
import SuiteDashboard from '../../components/SuiteDashboard';

export default function GACPSuiteDashboard() {
  return (
    <SuiteDashboard 
      title="GACP Suite" 
      description="Gestión agrícola, cultivo, cosecha, trazabilidad de campo y buenas prácticas agrícolas."
    >
      <div className="text-white">
        Contenido de la Suite GACP
      </div>
    </SuiteDashboard>
  );
}
