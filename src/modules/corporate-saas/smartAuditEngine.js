export const runSmartAudit = (data) => {
  return [
    { id: 1, type: 'Crítico', module: 'GACP Suite', message: 'Licencias próximas a vencer en 30 días.' },
    { id: 2, type: 'Alto', module: 'Quality QA', message: 'Registros sin evidencia adjunta en el lote L-1002.' },
    { id: 3, type: 'Medio', module: 'Trazabilidad', message: 'Falta validación de COA en recepción.' }
  ];
};
