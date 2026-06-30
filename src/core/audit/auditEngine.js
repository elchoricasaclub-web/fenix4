/**
 * Corporate SaaS Audit Engine
 * Motor de validación profunda y auditoría de calidad de datos
 */

import { isRequired } from '../utils/validators';

export const runDataAudit = (dataset, rules) => {
  let criticalFindings = 0;
  let missingEvidences = 0;
  let missingResponsibles = 0;
  let emptyRecords = 0;
  
  const recommendations = [];
  const invalidRecords = [];

  dataset.forEach((record, index) => {
    let isRecordValid = true;
    const recordErrors = [];

    // Validar campos obligatorios generales
    if (rules.requiredFields) {
      rules.requiredFields.forEach(field => {
        if (!isRequired(record[field])) {
          emptyRecords++;
          isRecordValid = false;
          recordErrors.push(`Campo obligatorio '${field}' está vacío.`);
        }
      });
    }

    // Validar evidencias
    if (rules.requireEvidence && !record.evidenceAttached) {
      missingEvidences++;
      isRecordValid = false;
      recordErrors.push('Evidencia documental faltante.');
    }

    // Validar responsables
    if (rules.requireResponsible && !record.responsible) {
      missingResponsibles++;
      isRecordValid = false;
      recordErrors.push('Responsable no asignado.');
    }

    if (!isRecordValid) {
      invalidRecords.push({ id: record.id || `Fila ${index + 1}`, errors: recordErrors });
      criticalFindings++;
    }
  });

  // Generar recomendaciones
  if (emptyRecords > 0) {
    recommendations.push(`Completar ${emptyRecords} registros con campos vacíos críticos.`);
  }
  if (missingEvidences > 0) {
    recommendations.push(`Adjuntar evidencia en ${missingEvidences} registros para cumplir GACP/GMP.`);
  }
  if (missingResponsibles > 0) {
    recommendations.push(`Asignar responsable legal a ${missingResponsibles} operaciones.`);
  }

  // Calcular score básico (0-100)
  const totalChecks = dataset.length * (rules.requiredFields?.length || 1 + (rules.requireEvidence ? 1 : 0) + (rules.requireResponsible ? 1 : 0));
  const totalErrors = emptyRecords + missingEvidences + missingResponsibles;
  const complianceScore = totalChecks === 0 ? 100 : Math.max(0, Math.round(((totalChecks - totalErrors) / totalChecks) * 100));

  return {
    totalRecords: dataset.length,
    criticalFindings,
    missingEvidences,
    missingResponsibles,
    emptyRecords,
    invalidRecords,
    recommendations,
    complianceScore
  };
};
