import React from 'react';
import SuiteDashboard from '../../components/SuiteDashboard';

export default function ReportsSuiteDashboard() {
  return (
    <SuiteDashboard 
      title="Reports & Intelligence" 
      description="Reportes, KPIs, análisis de avance, trazabilidad consolidada y auditorías."
    >
      <div className="text-white">
        Contenido de la Suite de Reportes
      </div>
    </SuiteDashboard>
  );
}
