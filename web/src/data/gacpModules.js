const commonFields = [
  { name: 'trazabilidad_lote', label: 'Trazabilidad (Lote asociado)', type: 'text', required: false },
  { name: 'responsable', label: 'Responsable de la Operación', type: 'text', required: true },
  { name: 'estado', label: 'Estado del Registro', type: 'select', options: ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado', 'Cerrado'], required: true },
  { name: 'observaciones', label: 'Observaciones / Notas', type: 'textarea', required: false }
];

const defineModule = (id, title, icon, description, specificFields) => ({
  id, title, icon, description,
  fields: [...specificFields, ...commonFields]
});

export const gacpModules = [
  defineModule('plan-maestro', '1. Plan Maestro GACP/GMP', 'Map', 'Gestión del mapa de cumplimiento y brechas críticas.', [
    { name: 'mapa_cumplimiento', label: 'Mapa de Cumplimiento', type: 'text', required: true },
    { name: 'porcentaje_avance', label: '% Avance Normativo', type: 'number', required: true },
    { name: 'brechas_criticas', label: 'Brechas Críticas', type: 'textarea', required: true },
    { name: 'tareas_pendientes', label: 'Tareas Pendientes', type: 'textarea', required: true }
  ]),
  defineModule('matriz-normativa', '2. Matriz Normativa', 'BookOpen', 'Requisitos y evidencias por norma (GACP/GMP).', [
    { name: 'requisito', label: 'Requisito Normativo', type: 'text', required: true },
    { name: 'norma', label: 'Norma Relacionada', type: 'text', required: true },
    { name: 'evidencia', label: 'Evidencia Requerida', type: 'textarea', required: true }
  ]),
  defineModule('gestion-documental', '3. Gestión Documental GMP', 'FileText', 'Control de versiones y vigencia de documentos.', [
    { name: 'codigo_doc', label: 'Código Documental', type: 'text', required: true },
    { name: 'version', label: 'Versión Actual', type: 'text', required: true },
    { name: 'fecha_vigencia', label: 'Fecha de Vigencia', type: 'date', required: true }
  ]),
  defineModule('sop-poe', '4. Módulo de SOP / POE', 'FileCheck', 'Procedimientos operativos estándar.', [
    { name: 'procedimiento', label: 'Nombre del SOP', type: 'text', required: true },
    { name: 'area', label: 'Área de Aplicación', type: 'text', required: true },
    { name: 'version_sop', label: 'Versión', type: 'text', required: true },
    { name: 'aprobacion', label: 'Aprobado por', type: 'text', required: true },
    { name: 'entrenamiento', label: 'Entrenamiento Requerido', type: 'select', options: ['Sí', 'No'], required: true }
  ]),
  defineModule('control-cambios', '5. Control de Cambios', 'GitMerge', 'Evaluación e impacto de cambios en procesos.', [
    { name: 'cambio', label: 'Cambio Propuesto', type: 'textarea', required: true },
    { name: 'justificacion', label: 'Justificación', type: 'textarea', required: true },
    { name: 'impacto', label: 'Impacto (Calidad/GMP)', type: 'select', options: ['Bajo', 'Medio', 'Alto', 'Crítico'], required: true },
    { name: 'aprobacion_cambio', label: 'Aprobación QA', type: 'text', required: true },
    { name: 'fecha_implementacion', label: 'Fecha de Implementación', type: 'date', required: true }
  ]),
  defineModule('capa', '6. Módulo CAPA', 'AlertTriangle', 'Acciones Correctivas y Preventivas.', [
    { name: 'desviacion', label: 'Desviación Relacionada', type: 'text', required: true },
    { name: 'causa_raiz', label: 'Causa Raíz', type: 'textarea', required: true },
    { name: 'accion_correctiva', label: 'Acción Correctiva', type: 'textarea', required: true },
    { name: 'accion_preventiva', label: 'Acción Preventiva', type: 'textarea', required: true },
    { name: 'verificacion', label: 'Verificación de Eficacia', type: 'textarea', required: true }
  ]),
  defineModule('desviaciones', '7. Gestión de Desviaciones', 'AlertOctagon', 'Reporte y análisis de desviaciones de calidad.', [
    { name: 'tipo', label: 'Tipo de Desviación', type: 'select', options: ['Menor', 'Mayor', 'Crítica'], required: true },
    { name: 'impacto_desviacion', label: 'Impacto en el Producto', type: 'textarea', required: true },
    { name: 'investigacion', label: 'Resumen de Investigación', type: 'textarea', required: true },
    { name: 'cierre', label: 'Condiciones de Cierre', type: 'textarea', required: true }
  ]),
  defineModule('no-conformidades', '8. No Conformidades', 'XOctagon', 'Hallazgos fuera de especificación.', [
    { name: 'hallazgo', label: 'Descripción del Hallazgo', type: 'textarea', required: true },
    { name: 'criticidad', label: 'Criticidad', type: 'select', options: ['Baja', 'Media', 'Alta'], required: true },
    { name: 'area_nc', label: 'Área Afectada', type: 'text', required: true },
    { name: 'plan_accion', label: 'Plan de Acción', type: 'textarea', required: true }
  ]),
  defineModule('auditorias-internas', '9. Auditorías Internas', 'Search', 'Programa y ejecución de auditorías.', [
    { name: 'fecha_auditoria', label: 'Fecha de Auditoría', type: 'date', required: true },
    { name: 'auditor', label: 'Auditor Líder', type: 'text', required: true },
    { name: 'area_auditada', label: 'Área Auditada', type: 'text', required: true },
    { name: 'hallazgos_aud', label: 'Resumen de Hallazgos', type: 'textarea', required: true }
  ]),
  defineModule('inspecciones', '10. Inspecciones Regulatorias', 'ShieldCheck', 'Gestión de visitas de entidades de control.', [
    { name: 'entidad', label: 'Entidad Inspectora', type: 'text', required: true },
    { name: 'fecha_inspeccion', label: 'Fecha', type: 'date', required: true },
    { name: 'requerimientos', label: 'Requerimientos', type: 'textarea', required: true },
    { name: 'respuestas', label: 'Respuestas/Compromisos', type: 'textarea', required: true }
  ]),
  defineModule('gestion-riesgos', '11. Gestión de Riesgos', 'Activity', 'Identificación y mitigación de riesgos GMP.', [
    { name: 'riesgo', label: 'Descripción del Riesgo', type: 'textarea', required: true },
    { name: 'probabilidad', label: 'Probabilidad', type: 'select', options: ['Baja', 'Media', 'Alta'], required: true },
    { name: 'impacto_riesgo', label: 'Impacto', type: 'select', options: ['Leve', 'Moderado', 'Grave'], required: true },
    { name: 'controles', label: 'Controles Mitigantes', type: 'textarea', required: true }
  ]),
  defineModule('haccp', '12. HACCP / Puntos Críticos', 'Crosshair', 'Análisis de peligros y puntos críticos de control.', [
    { name: 'etapa', label: 'Etapa del Proceso', type: 'text', required: true },
    { name: 'peligro', label: 'Peligro Identificado', type: 'text', required: true },
    { name: 'punto_critico', label: 'Punto Crítico (PCC)', type: 'select', options: ['Sí', 'No'], required: true },
    { name: 'limite', label: 'Límite Crítico', type: 'text', required: true },
    { name: 'accion_haccp', label: 'Acción Correctiva (HACCP)', type: 'textarea', required: true }
  ]),
  defineModule('proveedores', '13. Calificación de Proveedores', 'Truck', 'Evaluación de proveedores de impacto GMP.', [
    { name: 'proveedor', label: 'Nombre del Proveedor', type: 'text', required: true },
    { name: 'insumo', label: 'Insumo/Servicio', type: 'text', required: true },
    { name: 'evaluacion', label: 'Resultado Evaluación', type: 'select', options: ['Aprobado', 'Aprobado Condicionado', 'Rechazado'], required: true },
    { name: 'fecha_reeval', label: 'Fecha Próxima Reevaluación', type: 'date', required: true }
  ]),
  defineModule('recepcion-insumos', '14. Recepción de Insumos', 'Inbox', 'Ingreso de materiales e inspección.', [
    { name: 'proveedor_rec', label: 'Proveedor', type: 'text', required: true },
    { name: 'lote_insumo', label: 'Lote del Insumo', type: 'text', required: true },
    { name: 'certificado', label: 'Certificado de Análisis (CoA)', type: 'select', options: ['Conforme', 'No Conforme', 'No Aplica'], required: true },
    { name: 'inspeccion', label: 'Inspección Visual', type: 'select', options: ['Aprobada', 'Rechazada'], required: true }
  ]),
  defineModule('inventario-gmp', '15. Inventario GMP', 'Package', 'Control de existencias e insumos críticos.', [
    { name: 'insumo_inv', label: 'Nombre Insumo/Producto', type: 'text', required: true },
    { name: 'cantidad', label: 'Cantidad', type: 'number', required: true },
    { name: 'ubicacion', label: 'Ubicación Física', type: 'text', required: true },
    { name: 'vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true }
  ]),
  defineModule('cuarentena', '16. Módulo de Cuarentena', 'Lock', 'Gestión de materiales retenidos o en cuarentena.', [
    { name: 'material', label: 'Material o Lote', type: 'text', required: true },
    { name: 'motivo', label: 'Motivo de Cuarentena', type: 'textarea', required: true },
    { name: 'fecha_ingreso', label: 'Fecha de Ingreso', type: 'date', required: true },
    { name: 'liberacion', label: 'Condición de Liberación', type: 'textarea', required: true }
  ]),
  defineModule('liberacion-lotes', '17. Liberación de Lotes', 'CheckSquare', 'Proceso de liberación final por QA.', [
    { name: 'resultados_qc', label: 'Resultados QC (Laboratorio)', type: 'select', options: ['Cumple Especificación', 'OOS (Out of Spec)'], required: true },
    { name: 'revision_qa', label: 'Revisión Batch Record (QA)', type: 'select', options: ['Conforme', 'Con Desviaciones Menores', 'No Conforme'], required: true },
    { name: 'decision', label: 'Decisión Final', type: 'select', options: ['Liberado', 'Rechazado', 'Reproceso'], required: true },
    { name: 'certificado_lib', label: 'Emisión CoA', type: 'select', options: ['Emitido', 'Pendiente'], required: true }
  ]),
  defineModule('batch-record', '18. Batch Record (BMR)', 'ClipboardList', 'Registro Maestro de Lote.', [
    { name: 'genetica', label: 'Genética / Cultivar', type: 'text', required: true },
    { name: 'fechas_clave', label: 'Fechas Clave (Inicio-Fin)', type: 'text', required: true },
    { name: 'operaciones', label: 'Operaciones Críticas Realizadas', type: 'textarea', required: true },
    { name: 'responsables_fases', label: 'Responsables por Fase', type: 'textarea', required: true }
  ]),
  defineModule('trazabilidad', '19. Trazabilidad Completa', 'Share2', 'Genealogía del lote farmacéutico.', [
    { name: 'semilla_clon', label: 'Lote Semilla/Clon', type: 'text', required: true },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true },
    { name: 'lote_cosecha', label: 'Lote de Cosecha', type: 'text', required: true },
    { name: 'lote_secado', label: 'Lote de Secado/Curado', type: 'text', required: true },
    { name: 'lote_empaque', label: 'Lote Final Empaque', type: 'text', required: true }
  ]),
  defineModule('propagacion', '20. Propagación y Enraizamiento', 'Sprout', 'Control de esquejes y clones.', [
    { name: 'madre_origen', label: 'Planta Madre Origen', type: 'text', required: true },
    { name: 'cantidad_clones', label: 'Cantidad de Clones', type: 'number', required: true },
    { name: 'fecha_corte', label: 'Fecha de Corte', type: 'date', required: true },
    { name: 'enraizamiento', label: '% de Enraizamiento', type: 'number', required: true }
  ]),
  defineModule('plantas-madre', '21. Plantas Madre', 'TreeDeciduous', 'Sanidad e historial de madres.', [
    { name: 'codigo_madre', label: 'Código Madre', type: 'text', required: true },
    { name: 'estado_sanitario', label: 'Estado Sanitario', type: 'select', options: ['Sano', 'En Observación', 'Cuarentena', 'Descarte'], required: true },
    { name: 'edad_semanas', label: 'Edad (Semanas)', type: 'number', required: true },
    { name: 'historial_cortes', label: 'Historial de Cortes', type: 'textarea', required: true }
  ]),
  defineModule('vegetativo', '22. Cultivo Vegetativo', 'Leaf', 'Control de desarrollo vegetativo.', [
    { name: 'sala_veg', label: 'Sala/Invernadero', type: 'text', required: true },
    { name: 'fecha_inicio_veg', label: 'Fecha Inicio', type: 'date', required: true },
    { name: 'nutricion', label: 'Esquema Nutricional', type: 'text', required: true },
    { name: 'desarrollo', label: 'Observaciones de Desarrollo', type: 'textarea', required: true }
  ]),
  defineModule('floracion', '23. Floración', 'Flower', 'Control de fase de floración.', [
    { name: 'semana_floracion', label: 'Semana de Floración', type: 'number', required: true },
    { name: 'fotoperiodo', label: 'Fotoperiodo (Luz/Oscuridad)', type: 'text', required: true },
    { name: 'fenologico', label: 'Estado Fenológico', type: 'textarea', required: true }
  ]),
  defineModule('ipm', '24. Manejo Integrado de Plagas (IPM)', 'Bug', 'Control fitosanitario.', [
    { name: 'plaga', label: 'Plaga/Enfermedad Detectada', type: 'text', required: true },
    { name: 'monitoreo', label: 'Método de Monitoreo', type: 'text', required: true },
    { name: 'umbral', label: 'Umbral de Acción Superado', type: 'select', options: ['Sí', 'No'], required: true },
    { name: 'tratamiento', label: 'Tratamiento Aplicado', type: 'text', required: true },
    { name: 'eficacia', label: 'Eficacia del Tratamiento', type: 'select', options: ['Alta', 'Media', 'Baja', 'Nula'], required: true }
  ]),
  defineModule('aplicaciones', '25. Aplicaciones Agrícolas', 'Droplet', 'Registro de aplicaciones foliares/suelo.', [
    { name: 'producto', label: 'Producto Aplicado', type: 'text', required: true },
    { name: 'dosis', label: 'Dosis (ml/L o g/L)', type: 'number', required: true },
    { name: 'carencia', label: 'Periodo de Carencia (Días)', type: 'number', required: true }
  ]),
  defineModule('fertirriego', '26. Fertirriego', 'TestTube', 'Gestión de soluciones nutritivas.', [
    { name: 'solucion', label: 'Receta/Solución', type: 'text', required: true },
    { name: 'ec', label: 'Conductividad Eléctrica (EC)', type: 'number', required: true },
    { name: 'ph', label: 'pH', type: 'number', required: true },
    { name: 'volumen', label: 'Volumen Aplicado (L)', type: 'number', required: true }
  ]),
  defineModule('agua', '27. Calidad de Agua', 'Waves', 'Monitoreo de fuente hídrica.', [
    { name: 'fuente', label: 'Fuente de Agua', type: 'text', required: true },
    { name: 'analisis_fq', label: 'Análisis Físico-Químico', type: 'select', options: ['Conforme', 'No Conforme'], required: true },
    { name: 'microbiologico', label: 'Análisis Microbiológico', type: 'select', options: ['Ausencia Patógenos', 'Presencia Patógenos'], required: true }
  ]),
  defineModule('ambiental', '28. Control Ambiental', 'Thermometer', 'Clima de cuartos y salas.', [
    { name: 'sala_amb', label: 'Sala/Cuarto', type: 'text', required: true },
    { name: 'temperatura', label: 'Temperatura Promedio (°C)', type: 'number', required: true },
    { name: 'humedad', label: 'Humedad Relativa (%)', type: 'number', required: true },
    { name: 'vpd', label: 'VPD (kPa)', type: 'number', required: true },
    { name: 'co2', label: 'CO2 (ppm)', type: 'number', required: true }
  ]),
  defineModule('limpieza', '29. Limpieza y Sanitización', 'Sparkles', 'Registro de POES.', [
    { name: 'area_limpieza', label: 'Área / Equipo', type: 'text', required: true },
    { name: 'procedimiento', label: 'Procedimiento (SOP)', type: 'text', required: true },
    { name: 'producto_limp', label: 'Producto Utilizado', type: 'text', required: true },
    { name: 'verificacion_limp', label: 'Verificación Visual', type: 'select', options: ['Aprobada', 'Rechazada'], required: true }
  ]),
  defineModule('equipos', '30. Gestión de Equipos', 'Settings', 'Inventario y estado de equipos.', [
    { name: 'equipo', label: 'Nombre del Equipo', type: 'text', required: true },
    { name: 'codigo_eq', label: 'Código Interno', type: 'text', required: true },
    { name: 'estado_eq', label: 'Estado Operativo', type: 'select', options: ['Operativo', 'En Mantenimiento', 'Fuera de Servicio', 'Dado de Baja'], required: true }
  ]),
  defineModule('calibracion', '31. Calibración de Equipos', 'Gauge', 'Control metrológico.', [
    { name: 'equipo_cal', label: 'Equipo Calibrado', type: 'text', required: true },
    { name: 'fecha_cal', label: 'Fecha Calibración', type: 'date', required: true },
    { name: 'vencimiento_cal', label: 'Próximo Vencimiento', type: 'date', required: true },
    { name: 'resultado_cal', label: 'Resultado', type: 'select', options: ['Pasa', 'No Pasa'], required: true }
  ]),
  defineModule('mantenimiento', '32. Mantenimiento', 'Wrench', 'Mantenimiento preventivo y correctivo.', [
    { name: 'equipo_mant', label: 'Equipo', type: 'text', required: true },
    { name: 'tipo_mant', label: 'Tipo de Mantenimiento', type: 'select', options: ['Preventivo', 'Correctivo'], required: true },
    { name: 'falla', label: 'Descripción de Falla (si aplica)', type: 'textarea', required: false },
    { name: 'accion_mant', label: 'Acción Realizada', type: 'textarea', required: true }
  ]),
  defineModule('cosecha', '33. Cosecha', 'Scissors', 'Registro de recolección de flor.', [
    { name: 'fecha_cosecha', label: 'Fecha de Cosecha', type: 'date', required: true },
    { name: 'peso_fresco', label: 'Peso Fresco Total (kg)', type: 'number', required: true },
    { name: 'equipo_corte', label: 'Herramientas Utilizadas (Saneadas)', type: 'select', options: ['Sí', 'No'], required: true }
  ]),
  defineModule('secado', '34. Secado', 'Wind', 'Pérdida de humedad controlada.', [
    { name: 'sala_secado', label: 'Sala de Secado', type: 'text', required: true },
    { name: 'temp_secado', label: 'Temperatura Promedio (°C)', type: 'number', required: true },
    { name: 'hr_secado', label: 'Humedad Relativa Promedio (%)', type: 'number', required: true },
    { name: 'perdida_peso', label: '% Pérdida de Peso Estimada', type: 'number', required: true }
  ]),
  defineModule('curado', '35. Curado', 'Box', 'Estabilización de flor farmacéutica.', [
    { name: 'contenedor', label: 'ID Contenedor', type: 'text', required: true },
    { name: 'humedad_interna', label: 'Humedad Interna Medida (%)', type: 'number', required: true },
    { name: 'apertura', label: 'Apertura para intercambio (Burping)', type: 'select', options: ['Realizado', 'No Necesario'], required: true }
  ]),
  defineModule('trimming', '36. Trimming / Manicura', 'Scissors', 'Corte y limpieza de flor.', [
    { name: 'tipo_corte', label: 'Tipo de Corte', type: 'select', options: ['Manual', 'Máquina', 'Mixto'], required: true },
    { name: 'peso_antes', label: 'Peso Antes (kg)', type: 'number', required: true },
    { name: 'peso_despues', label: 'Peso Después (kg)', type: 'number', required: true },
    { name: 'rendimiento', label: 'Rendimiento (%)', type: 'number', required: true }
  ]),
  defineModule('clasificacion', '37. Clasificación de Flor', 'Eye', 'Selección de grado farmacéutico.', [
    { name: 'grado', label: 'Grado Farmacéutico', type: 'select', options: ['A', 'B', 'Biomasa/Extracción', 'Rechazo'], required: true },
    { name: 'defectos', label: 'Defectos Encontrados', type: 'textarea', required: false },
    { name: 'humedad_final', label: 'Humedad Final Aw', type: 'number', required: true }
  ]),
  defineModule('empaque', '38. Empaque', 'Archive', 'Acondicionamiento final.', [
    { name: 'presentacion', label: 'Presentación', type: 'text', required: true },
    { name: 'peso_neto', label: 'Peso Neto por Unidad (g/kg)', type: 'number', required: true },
    { name: 'material', label: 'Material de Empaque Primario', type: 'text', required: true }
  ]),
  defineModule('retencion', '39. Retención de Muestras', 'Database', 'Muestras de retención (Contra-muestras).', [
    { name: 'cantidad_ret', label: 'Cantidad Retenida (g)', type: 'number', required: true },
    { name: 'ubicacion_ret', label: 'Ubicación Segura', type: 'text', required: true },
    { name: 'fecha_descarte', label: 'Fecha Programada Descarte', type: 'date', required: true }
  ]),
  defineModule('estabilidad', '40. Estudios de Estabilidad', 'TrendingUp', 'Seguimiento de vida útil.', [
    { name: 'condicion', label: 'Condición (Temp/HR)', type: 'text', required: true },
    { name: 'punto_tiempo', label: 'Punto de Tiempo (Meses)', type: 'number', required: true },
    { name: 'resultado_est', label: 'Resultado Analítico', type: 'select', options: ['Dentro de Especificación', 'Fuera de Especificación'], required: true },
    { name: 'tendencia', label: 'Análisis de Tendencia', type: 'textarea', required: true }
  ])
];
