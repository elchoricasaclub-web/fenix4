import React from 'react';
import SuiteDashboard from '../../components/SuiteDashboard';

export default function GMPSuiteDashboard() {
  return (
    <SuiteDashboard 
      title="GMP Suite" 
      description="Manufactura, extracción, transformación, calidad, liberación y buenas prácticas de manufactura."
    >
      <div className="text-white">
        Contenido de la Suite GMP
      </div>
    </SuiteDashboard>
  );
}
