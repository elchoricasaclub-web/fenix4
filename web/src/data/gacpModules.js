const commonFields = [
  { name: 'trazabilidad_lote', label: 'Trazabilidad (Lote asociado)', type: 'text', required: false , placeholder: 'Ej: LOTE-2026-001' },
  { name: 'responsable', label: 'Responsable de la Operación', type: 'text', required: true , placeholder: 'Ej: Ing. Juan Pérez' },
  { name: 'estado', label: 'Estado del Registro', type: 'select', options: ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado', 'Cerrado'], required: true , placeholder: 'Ej: Ingrese estado del registro' },
  { name: 'observaciones', label: 'Observaciones / Notas', type: 'textarea', required: false , placeholder: 'Ej: Revisión conforme, sin anomalías' }
];

const defineModule = (id, title, icon, description, specificFields) => ({
  id, title, icon, description,
  fields: [...specificFields, ...commonFields]
});

export const gacpModules = [
  defineModule('plan-maestro', '1. Plan Maestro GACP/GMP', 'Map', 'Gestión del mapa de cumplimiento y brechas críticas.', [
    { name: 'mapa_cumplimiento', label: 'Mapa de Cumplimiento', type: 'text', required: true , placeholder: 'Ej: Ingrese mapa de cumplimiento' },
    { name: 'porcentaje_avance', label: '% Avance Normativo', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'brechas_criticas', label: 'Brechas Críticas', type: 'textarea', required: true , placeholder: 'Ej: Ingrese brechas críticas' },
    { name: 'tareas_pendientes', label: 'Tareas Pendientes', type: 'textarea', required: true , placeholder: 'Ej: Ingrese tareas pendientes' }
  ]),
  defineModule('matriz-normativa', '2. Matriz Normativa', 'BookOpen', 'Requisitos y evidencias por norma (GACP/GMP).', [
    { name: 'requisito', label: 'Requisito Normativo', type: 'text', required: true , placeholder: 'Ej: Ingrese requisito normativo' },
    { name: 'norma', label: 'Norma Relacionada', type: 'text', required: true , placeholder: 'Ej: Ingrese norma relacionada' },
    { name: 'evidencia', label: 'Evidencia Requerida', type: 'textarea', required: true , placeholder: 'Ej: URL o ruta del documento adjunto' }
  ]),
  defineModule('gestion-documental', '3. Gestión Documental GMP', 'FileText', 'Control de versiones y vigencia de documentos.', [
    { name: 'codigo_doc', label: 'Código Documental', type: 'text', required: true , placeholder: 'Ej: Ingrese código documental' },
    { name: 'version', label: 'Versión Actual', type: 'text', required: true , placeholder: 'Ej: Ingrese versión actual' },
    { name: 'fecha_vigencia', label: 'Fecha de Vigencia', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineModule('sop-poe', '4. Módulo de SOP / POE', 'FileCheck', 'Procedimientos operativos estándar.', [
    { name: 'procedimiento', label: 'Nombre del SOP', type: 'text', required: true , placeholder: 'Ej: Ingrese nombre del sop' },
    { name: 'area', label: 'Área de Aplicación', type: 'text', required: true , placeholder: 'Ej: Ingrese área de aplicación' },
    { name: 'version_sop', label: 'Versión', type: 'text', required: true , placeholder: 'Ej: Ingrese versión' },
    { name: 'aprobacion', label: 'Aprobado por', type: 'text', required: true , placeholder: 'Ej: Ingrese aprobado por' },
    { name: 'entrenamiento', label: 'Entrenamiento Requerido', type: 'select', options: ['Sí', 'No'], required: true , placeholder: 'Ej: Ingrese entrenamiento requerido' }
  ]),
  defineModule('control-cambios', '5. Control de Cambios', 'GitMerge', 'Evaluación e impacto de cambios en procesos.', [
    { name: 'cambio', label: 'Cambio Propuesto', type: 'textarea', required: true , placeholder: 'Ej: Ingrese cambio propuesto' },
    { name: 'justificacion', label: 'Justificación', type: 'textarea', required: true , placeholder: 'Ej: Ingrese justificación' },
    { name: 'impacto', label: 'Impacto (Calidad/GMP)', type: 'select', options: ['Bajo', 'Medio', 'Alto', 'Crítico'], required: true , placeholder: 'Ej: Ingrese impacto (calidad/gmp)' },
    { name: 'aprobacion_cambio', label: 'Aprobación QA', type: 'text', required: true , placeholder: 'Ej: Ingrese aprobación qa' },
    { name: 'fecha_implementacion', label: 'Fecha de Implementación', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineModule('capa', '6. Módulo CAPA', 'AlertTriangle', 'Acciones Correctivas y Preventivas.', [
    { name: 'desviacion', label: 'Desviación Relacionada', type: 'text', required: true , placeholder: 'Ej: Ingrese desviación relacionada' },
    { name: 'causa_raiz', label: 'Causa Raíz', type: 'textarea', required: true , placeholder: 'Ej: Ingrese causa raíz' },
    { name: 'accion_correctiva', label: 'Acción Correctiva', type: 'textarea', required: true , placeholder: 'Ej: Ingrese acción correctiva' },
    { name: 'accion_preventiva', label: 'Acción Preventiva', type: 'textarea', required: true , placeholder: 'Ej: Ingrese acción preventiva' },
    { name: 'verificacion', label: 'Verificación de Eficacia', type: 'textarea', required: true , placeholder: 'Ej: Ingrese verificación de eficacia' }
  ]),
  defineModule('desviaciones', '7. Gestión de Desviaciones', 'AlertOctagon', 'Reporte y análisis de desviaciones de calidad.', [
    { name: 'tipo', label: 'Tipo de Desviación', type: 'select', options: ['Menor', 'Mayor', 'Crítica'], required: true , placeholder: 'Ej: Ingrese tipo de desviación' },
    { name: 'impacto_desviacion', label: 'Impacto en el Producto', type: 'textarea', required: true , placeholder: 'Ej: Ingrese impacto en el producto' },
    { name: 'investigacion', label: 'Resumen de Investigación', type: 'textarea', required: true , placeholder: 'Ej: Ingrese resumen de investigación' },
    { name: 'cierre', label: 'Condiciones de Cierre', type: 'textarea', required: true , placeholder: 'Ej: Ingrese condiciones de cierre' }
  ]),
  defineModule('no-conformidades', '8. No Conformidades', 'XOctagon', 'Hallazgos fuera de especificación.', [
    { name: 'hallazgo', label: 'Descripción del Hallazgo', type: 'textarea', required: true , placeholder: 'Ej: Ingrese descripción del hallazgo' },
    { name: 'criticidad', label: 'Criticidad', type: 'select', options: ['Baja', 'Media', 'Alta'], required: true , placeholder: 'Ej: Ingrese criticidad' },
    { name: 'area_nc', label: 'Área Afectada', type: 'text', required: true , placeholder: 'Ej: Ingrese área afectada' },
    { name: 'plan_accion', label: 'Plan de Acción', type: 'textarea', required: true , placeholder: 'Ej: Ingrese plan de acción' }
  ]),
  defineModule('auditorias-internas', '9. Auditorías Internas', 'Search', 'Programa y ejecución de auditorías.', [
    { name: 'fecha_auditoria', label: 'Fecha de Auditoría', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'auditor', label: 'Auditor Líder', type: 'text', required: true , placeholder: 'Ej: Ingrese auditor líder' },
    { name: 'area_auditada', label: 'Área Auditada', type: 'text', required: true , placeholder: 'Ej: Ingrese área auditada' },
    { name: 'hallazgos_aud', label: 'Resumen de Hallazgos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese resumen de hallazgos' }
  ]),
  defineModule('inspecciones', '10. Inspecciones Regulatorias', 'ShieldCheck', 'Gestión de visitas de entidades de control.', [
    { name: 'entidad', label: 'Entidad Inspectora', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad inspectora' },
    { name: 'fecha_inspeccion', label: 'Fecha', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'requerimientos', label: 'Requerimientos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese requerimientos' },
    { name: 'respuestas', label: 'Respuestas/Compromisos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese respuestas/compromisos' }
  ]),
  defineModule('gestion-riesgos', '11. Gestión de Riesgos', 'Activity', 'Identificación y mitigación de riesgos GMP.', [
    { name: 'riesgo', label: 'Descripción del Riesgo', type: 'textarea', required: true , placeholder: 'Ej: Ingrese descripción del riesgo' },
    { name: 'probabilidad', label: 'Probabilidad', type: 'select', options: ['Baja', 'Media', 'Alta'], required: true , placeholder: 'Ej: Ingrese probabilidad' },
    { name: 'impacto_riesgo', label: 'Impacto', type: 'select', options: ['Leve', 'Moderado', 'Grave'], required: true , placeholder: 'Ej: Ingrese impacto' },
    { name: 'controles', label: 'Controles Mitigantes', type: 'textarea', required: true , placeholder: 'Ej: Ingrese controles mitigantes' }
  ]),
  defineModule('haccp', '12. HACCP / Puntos Críticos', 'Crosshair', 'Análisis de peligros y puntos críticos de control.', [
    { name: 'etapa', label: 'Etapa del Proceso', type: 'text', required: true , placeholder: 'Ej: Ingrese etapa del proceso' },
    { name: 'peligro', label: 'Peligro Identificado', type: 'text', required: true , placeholder: 'Ej: Ingrese peligro identificado' },
    { name: 'punto_critico', label: 'Punto Crítico (PCC)', type: 'select', options: ['Sí', 'No'], required: true , placeholder: 'Ej: Ingrese punto crítico (pcc)' },
    { name: 'limite', label: 'Límite Crítico', type: 'text', required: true , placeholder: 'Ej: Ingrese límite crítico' },
    { name: 'accion_haccp', label: 'Acción Correctiva (HACCP)', type: 'textarea', required: true , placeholder: 'Ej: Ingrese acción correctiva (haccp)' }
  ]),
  defineModule('proveedores', '13. Calificación de Proveedores', 'Truck', 'Evaluación de proveedores de impacto GMP.', [
    { name: 'proveedor', label: 'Nombre del Proveedor', type: 'text', required: true , placeholder: 'Ej: Ingrese nombre del proveedor' },
    { name: 'insumo', label: 'Insumo/Servicio', type: 'text', required: true , placeholder: 'Ej: Ingrese insumo/servicio' },
    { name: 'evaluacion', label: 'Resultado Evaluación', type: 'select', options: ['Aprobado', 'Aprobado Condicionado', 'Rechazado'], required: true , placeholder: 'Ej: Ingrese resultado evaluación' },
    { name: 'fecha_reeval', label: 'Fecha Próxima Reevaluación', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineModule('recepcion-insumos', '14. Recepción de Insumos', 'Inbox', 'Ingreso de materiales e inspección.', [
    { name: 'proveedor_rec', label: 'Proveedor', type: 'text', required: true , placeholder: 'Ej: Ingrese proveedor' },
    { name: 'lote_insumo', label: 'Lote del Insumo', type: 'text', required: true , placeholder: 'Ej: Ingrese lote del insumo' },
    { name: 'certificado', label: 'Certificado de Análisis (CoA)', type: 'select', options: ['Conforme', 'No Conforme', 'No Aplica'], required: true , placeholder: 'Ej: Ingrese certificado de análisis (coa)' },
    { name: 'inspeccion', label: 'Inspección Visual', type: 'select', options: ['Aprobada', 'Rechazada'], required: true , placeholder: 'Ej: Ingrese inspección visual' }
  ]),
  defineModule('inventario-gmp', '15. Inventario GMP', 'Package', 'Control de existencias e insumos críticos.', [
    { name: 'insumo_inv', label: 'Nombre Insumo/Producto', type: 'text', required: true , placeholder: 'Ej: Ingrese nombre insumo/producto' },
    { name: 'cantidad', label: 'Cantidad', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'ubicacion', label: 'Ubicación Física', type: 'text', required: true , placeholder: 'Ej: Ingrese ubicación física' },
    { name: 'vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true , placeholder: 'Ej: Ingrese fecha de vencimiento' }
  ]),
  defineModule('cuarentena', '16. Módulo de Cuarentena', 'Lock', 'Gestión de materiales retenidos o en cuarentena.', [
    { name: 'material', label: 'Material o Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese material o lote' },
    { name: 'motivo', label: 'Motivo de Cuarentena', type: 'textarea', required: true , placeholder: 'Ej: Ingrese motivo de cuarentena' },
    { name: 'fecha_ingreso', label: 'Fecha de Ingreso', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'liberacion', label: 'Condición de Liberación', type: 'textarea', required: true , placeholder: 'Ej: Ingrese condición de liberación' }
  ]),
  defineModule('liberacion-lotes', '17. Liberación de Lotes', 'CheckSquare', 'Proceso de liberación final por QA.', [
    { name: 'resultados_qc', label: 'Resultados QC (Laboratorio)', type: 'select', options: ['Cumple Especificación', 'OOS (Out of Spec)'], required: true , placeholder: 'Ej: Ingrese resultados qc (laboratorio)' },
    { name: 'revision_qa', label: 'Revisión Batch Record (QA)', type: 'select', options: ['Conforme', 'Con Desviaciones Menores', 'No Conforme'], required: true , placeholder: 'Ej: Ingrese revisión batch record (qa)' },
    { name: 'decision', label: 'Decisión Final', type: 'select', options: ['Liberado', 'Rechazado', 'Reproceso'], required: true , placeholder: 'Ej: Ingrese decisión final' },
    { name: 'certificado_lib', label: 'Emisión CoA', type: 'select', options: ['Emitido', 'Pendiente'], required: true , placeholder: 'Ej: Ingrese emisión coa' }
  ]),
  defineModule('batch-record', '18. Batch Record (BMR)', 'ClipboardList', 'Registro Maestro de Lote.', [
    { name: 'genetica', label: 'Genética / Cultivar', type: 'text', required: true , placeholder: 'Ej: Ingrese genética / cultivar' },
    { name: 'fechas_clave', label: 'Fechas Clave (Inicio-Fin)', type: 'text', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'operaciones', label: 'Operaciones Críticas Realizadas', type: 'textarea', required: true , placeholder: 'Ej: Ingrese operaciones críticas realizadas' },
    { name: 'responsables_fases', label: 'Responsables por Fase', type: 'textarea', required: true , placeholder: 'Ej: Ingrese responsables por fase' }
  ]),
  defineModule('trazabilidad', '19. Trazabilidad Completa', 'Share2', 'Genealogía del lote farmacéutico.', [
    { name: 'semilla_clon', label: 'Lote Semilla/Clon', type: 'text', required: true , placeholder: 'Ej: Ingrese lote semilla/clon' },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true , placeholder: 'Ej: Ingrese lote de cultivo' },
    { name: 'lote_cosecha', label: 'Lote de Cosecha', type: 'text', required: true , placeholder: 'Ej: Ingrese lote de cosecha' },
    { name: 'lote_secado', label: 'Lote de Secado/Curado', type: 'text', required: true , placeholder: 'Ej: Ingrese lote de secado/curado' },
    { name: 'lote_empaque', label: 'Lote Final Empaque', type: 'text', required: true , placeholder: 'Ej: Ingrese lote final empaque' }
  ]),
  defineModule('propagacion', '20. Propagación y Enraizamiento', 'Sprout', 'Control de esquejes y clones.', [
    { name: 'madre_origen', label: 'Planta Madre Origen', type: 'text', required: true , placeholder: 'Ej: Ingrese planta madre origen' },
    { name: 'cantidad_clones', label: 'Cantidad de Clones', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'fecha_corte', label: 'Fecha de Corte', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'enraizamiento', label: '% de Enraizamiento', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('plantas-madre', '21. Plantas Madre', 'TreeDeciduous', 'Sanidad e historial de madres.', [
    { name: 'codigo_madre', label: 'Código Madre', type: 'text', required: true , placeholder: 'Ej: Ingrese código madre' },
    { name: 'estado_sanitario', label: 'Estado Sanitario', type: 'select', options: ['Sano', 'En Observación', 'Cuarentena', 'Descarte'], required: true , placeholder: 'Ej: Ingrese estado sanitario' },
    { name: 'edad_semanas', label: 'Edad (Semanas)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'historial_cortes', label: 'Historial de Cortes', type: 'textarea', required: true , placeholder: 'Ej: Ingrese historial de cortes' }
  ]),
  defineModule('vegetativo', '22. Cultivo Vegetativo', 'Leaf', 'Control de desarrollo vegetativo.', [
    { name: 'sala_veg', label: 'Sala/Invernadero', type: 'text', required: true , placeholder: 'Ej: Ingrese sala/invernadero' },
    { name: 'fecha_inicio_veg', label: 'Fecha Inicio', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'nutricion', label: 'Esquema Nutricional', type: 'text', required: true , placeholder: 'Ej: Ingrese esquema nutricional' },
    { name: 'desarrollo', label: 'Observaciones de Desarrollo', type: 'textarea', required: true , placeholder: 'Ej: Ingrese observaciones de desarrollo' }
  ]),
  defineModule('floracion', '23. Floración', 'Flower', 'Control de fase de floración.', [
    { name: 'semana_floracion', label: 'Semana de Floración', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'fotoperiodo', label: 'Fotoperiodo (Luz/Oscuridad)', type: 'text', required: true , placeholder: 'Ej: Ingrese fotoperiodo (luz/oscuridad)' },
    { name: 'fenologico', label: 'Estado Fenológico', type: 'textarea', required: true , placeholder: 'Ej: Ingrese estado fenológico' }
  ]),
  defineModule('ipm', '24. Manejo Integrado de Plagas (IPM)', 'Bug', 'Control fitosanitario.', [
    { name: 'plaga', label: 'Plaga/Enfermedad Detectada', type: 'text', required: true , placeholder: 'Ej: Ingrese plaga/enfermedad detectada' },
    { name: 'monitoreo', label: 'Método de Monitoreo', type: 'text', required: true , placeholder: 'Ej: Ingrese método de monitoreo' },
    { name: 'umbral', label: 'Umbral de Acción Superado', type: 'select', options: ['Sí', 'No'], required: true , placeholder: 'Ej: Ingrese umbral de acción superado' },
    { name: 'tratamiento', label: 'Tratamiento Aplicado', type: 'text', required: true , placeholder: 'Ej: Ingrese tratamiento aplicado' },
    { name: 'eficacia', label: 'Eficacia del Tratamiento', type: 'select', options: ['Alta', 'Media', 'Baja', 'Nula'], required: true , placeholder: 'Ej: Ingrese eficacia del tratamiento' }
  ]),
  defineModule('aplicaciones', '25. Aplicaciones Agrícolas', 'Droplet', 'Registro de aplicaciones foliares/suelo.', [
    { name: 'producto', label: 'Producto Aplicado', type: 'text', required: true , placeholder: 'Ej: Ingrese producto aplicado' },
    { name: 'dosis', label: 'Dosis (ml/L o g/L)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'carencia', label: 'Periodo de Carencia (Días)', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('fertirriego', '26. Fertirriego', 'TestTube', 'Gestión de soluciones nutritivas.', [
    { name: 'solucion', label: 'Receta/Solución', type: 'text', required: true , placeholder: 'Ej: Ingrese receta/solución' },
    { name: 'ec', label: 'Conductividad Eléctrica (EC)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'ph', label: 'pH', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'volumen', label: 'Volumen Aplicado (L)', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('agua', '27. Calidad de Agua', 'Waves', 'Monitoreo de fuente hídrica.', [
    { name: 'fuente', label: 'Fuente de Agua', type: 'text', required: true , placeholder: 'Ej: Ingrese fuente de agua' },
    { name: 'analisis_fq', label: 'Análisis Físico-Químico', type: 'select', options: ['Conforme', 'No Conforme'], required: true , placeholder: 'Ej: Ingrese análisis físico-químico' },
    { name: 'microbiologico', label: 'Análisis Microbiológico', type: 'select', options: ['Ausencia Patógenos', 'Presencia Patógenos'], required: true , placeholder: 'Ej: Ingrese análisis microbiológico' }
  ]),
  defineModule('ambiental', '28. Control Ambiental', 'Thermometer', 'Clima de cuartos y salas.', [
    { name: 'sala_amb', label: 'Sala/Cuarto', type: 'text', required: true , placeholder: 'Ej: Ingrese sala/cuarto' },
    { name: 'temperatura', label: 'Temperatura Promedio (°C)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'humedad', label: 'Humedad Relativa (%)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'vpd', label: 'VPD (kPa)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'co2', label: 'CO2 (ppm)', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('limpieza', '29. Limpieza y Sanitización', 'Sparkles', 'Registro de POES.', [
    { name: 'area_limpieza', label: 'Área / Equipo', type: 'text', required: true , placeholder: 'Ej: Ingrese área / equipo' },
    { name: 'procedimiento', label: 'Procedimiento (SOP)', type: 'text', required: true , placeholder: 'Ej: Ingrese procedimiento (sop)' },
    { name: 'producto_limp', label: 'Producto Utilizado', type: 'text', required: true , placeholder: 'Ej: Ingrese producto utilizado' },
    { name: 'verificacion_limp', label: 'Verificación Visual', type: 'select', options: ['Aprobada', 'Rechazada'], required: true , placeholder: 'Ej: Ingrese verificación visual' }
  ]),
  defineModule('equipos', '30. Gestión de Equipos', 'Settings', 'Inventario y estado de equipos.', [
    { name: 'equipo', label: 'Nombre del Equipo', type: 'text', required: true , placeholder: 'Ej: Ingrese nombre del equipo' },
    { name: 'codigo_eq', label: 'Código Interno', type: 'text', required: true , placeholder: 'Ej: Ingrese código interno' },
    { name: 'estado_eq', label: 'Estado Operativo', type: 'select', options: ['Operativo', 'En Mantenimiento', 'Fuera de Servicio', 'Dado de Baja'], required: true , placeholder: 'Ej: Ingrese estado operativo' }
  ]),
  defineModule('calibracion', '31. Calibración de Equipos', 'Gauge', 'Control metrológico.', [
    { name: 'equipo_cal', label: 'Equipo Calibrado', type: 'text', required: true , placeholder: 'Ej: Ingrese equipo calibrado' },
    { name: 'fecha_cal', label: 'Fecha Calibración', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'vencimiento_cal', label: 'Próximo Vencimiento', type: 'date', required: true , placeholder: 'Ej: Ingrese próximo vencimiento' },
    { name: 'resultado_cal', label: 'Resultado', type: 'select', options: ['Pasa', 'No Pasa'], required: true , placeholder: 'Ej: Ingrese resultado' }
  ]),
  defineModule('mantenimiento', '32. Mantenimiento', 'Wrench', 'Mantenimiento preventivo y correctivo.', [
    { name: 'equipo_mant', label: 'Equipo', type: 'text', required: true , placeholder: 'Ej: Ingrese equipo' },
    { name: 'tipo_mant', label: 'Tipo de Mantenimiento', type: 'select', options: ['Preventivo', 'Correctivo'], required: true , placeholder: 'Ej: Ingrese tipo de mantenimiento' },
    { name: 'falla', label: 'Descripción de Falla (si aplica)', type: 'textarea', required: false , placeholder: 'Ej: Ingrese descripción de falla (si aplica)' },
    { name: 'accion_mant', label: 'Acción Realizada', type: 'textarea', required: true , placeholder: 'Ej: Ingrese acción realizada' }
  ]),
  defineModule('cosecha', '33. Cosecha', 'Scissors', 'Registro de recolección de flor.', [
    { name: 'fecha_cosecha', label: 'Fecha de Cosecha', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'peso_fresco', label: 'Peso Fresco Total (kg)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'equipo_corte', label: 'Herramientas Utilizadas (Saneadas)', type: 'select', options: ['Sí', 'No'], required: true , placeholder: 'Ej: Ingrese herramientas utilizadas (saneadas)' }
  ]),
  defineModule('secado', '34. Secado', 'Wind', 'Pérdida de humedad controlada.', [
    { name: 'sala_secado', label: 'Sala de Secado', type: 'text', required: true , placeholder: 'Ej: Ingrese sala de secado' },
    { name: 'temp_secado', label: 'Temperatura Promedio (°C)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'hr_secado', label: 'Humedad Relativa Promedio (%)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'perdida_peso', label: '% Pérdida de Peso Estimada', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('curado', '35. Curado', 'Box', 'Estabilización de flor farmacéutica.', [
    { name: 'contenedor', label: 'ID Contenedor', type: 'text', required: true , placeholder: 'Ej: Ingrese id contenedor' },
    { name: 'humedad_interna', label: 'Humedad Interna Medida (%)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'apertura', label: 'Apertura para intercambio (Burping)', type: 'select', options: ['Realizado', 'No Necesario'], required: true , placeholder: 'Ej: Ingrese apertura para intercambio (burping)' }
  ]),
  defineModule('trimming', '36. Trimming / Manicura', 'Scissors', 'Corte y limpieza de flor.', [
    { name: 'tipo_corte', label: 'Tipo de Corte', type: 'select', options: ['Manual', 'Máquina', 'Mixto'], required: true , placeholder: 'Ej: Ingrese tipo de corte' },
    { name: 'peso_antes', label: 'Peso Antes (kg)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'peso_despues', label: 'Peso Después (kg)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'rendimiento', label: 'Rendimiento (%)', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('clasificacion', '37. Clasificación de Flor', 'Eye', 'Selección de grado farmacéutico.', [
    { name: 'grado', label: 'Grado Farmacéutico', type: 'select', options: ['A', 'B', 'Biomasa/Extracción', 'Rechazo'], required: true , placeholder: 'Ej: Ingrese grado farmacéutico' },
    { name: 'defectos', label: 'Defectos Encontrados', type: 'textarea', required: false , placeholder: 'Ej: Ingrese defectos encontrados' },
    { name: 'humedad_final', label: 'Humedad Final Aw', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineModule('empaque', '38. Empaque', 'Archive', 'Acondicionamiento final.', [
    { name: 'presentacion', label: 'Presentación', type: 'text', required: true , placeholder: 'Ej: Ingrese presentación' },
    { name: 'peso_neto', label: 'Peso Neto por Unidad (g/kg)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'material', label: 'Material de Empaque Primario', type: 'text', required: true , placeholder: 'Ej: Ingrese material de empaque primario' }
  ]),
  defineModule('retencion', '39. Retención de Muestras', 'Database', 'Muestras de retención (Contra-muestras).', [
    { name: 'cantidad_ret', label: 'Cantidad Retenida (g)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'ubicacion_ret', label: 'Ubicación Segura', type: 'text', required: true , placeholder: 'Ej: Ingrese ubicación segura' },
    { name: 'fecha_descarte', label: 'Fecha Programada Descarte', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineModule('estabilidad', '40. Estudios de Estabilidad', 'TrendingUp', 'Seguimiento de vida útil.', [
    { name: 'condicion', label: 'Condición (Temp/HR)', type: 'text', required: true , placeholder: 'Ej: Ingrese condición (temp/hr)' },
    { name: 'punto_tiempo', label: 'Punto de Tiempo (Meses)', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'resultado_est', label: 'Resultado Analítico', type: 'select', options: ['Dentro de Especificación', 'Fuera de Especificación'], required: true , placeholder: 'Ej: Ingrese resultado analítico' },
    { name: 'tendencia', label: 'Análisis de Tendencia', type: 'textarea', required: true , placeholder: 'Ej: Ingrese análisis de tendencia' }
  ])
];
