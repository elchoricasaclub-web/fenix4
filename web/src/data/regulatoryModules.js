const commonFields = [
  { name: 'entidad_relacionada', label: 'Entidad Relacionada', type: 'select', options: ['Ministerio de Justicia', 'Ministerio de Salud', 'FNE', 'INVIMA', 'ICA', 'MICC', 'DIAN', 'Policía Antinarcóticos', 'Otro'], required: true },
  { name: 'responsable', label: 'Responsable Interno', type: 'text', required: true },
  { name: 'estado', label: 'Estado del Registro', type: 'select', options: ['Pendiente', 'En preparación', 'Radicado', 'En revisión', 'Aprobado', 'Rechazado', 'Cerrado', 'Vencido'], required: true },
  { name: 'fecha_registro', label: 'Fecha de Registro', type: 'date', required: true },
  { name: 'evidencia', label: 'Evidencia Documental / Observaciones', type: 'textarea', required: true }
];

const defineRegModule = (id, title, icon, description, specificFields) => ({
  id, title, icon, description,
  fields: [...specificFields, ...commonFields]
});

export const regulatoryModules = [
  defineRegModule('entidades-regulatorias', '41. Entidades Regulatorias Colombia', 'Landmark', 'Gestión de relaciones con entidades oficiales.', [
    { name: 'entidad', label: 'Entidad', type: 'text', required: true },
    { name: 'competencia', label: 'Competencia', type: 'text', required: true },
    { name: 'tramite_relacionado', label: 'Trámite Relacionado', type: 'text', required: true },
    { name: 'contacto_institucional', label: 'Contacto Institucional', type: 'text', required: true }
  ]),
  defineRegModule('licencias-minjusticia', '42. Licencias Ministerio de Justicia', 'FileSignature', 'Gestión de licencias del Ministerio de Justicia.', [
    { name: 'tipo_licencia', label: 'Tipo de Licencia', type: 'select', options: ['Uso de Semillas', 'Cultivo Psicoactivo', 'Cultivo No Psicoactivo'], required: true },
    { name: 'numero_resolucion', label: 'Número de Resolución', type: 'text', required: true },
    { name: 'fecha_expedicion', label: 'Fecha de Expedición', type: 'date', required: true },
    { name: 'fecha_vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true },
    { name: 'alcance_autorizado', label: 'Alcance Autorizado', type: 'textarea', required: true }
  ]),
  defineRegModule('licencia-semillas', '43. Licencia de Semillas (Siembra/Grano)', 'Sprout', 'Gestión de licencias para semillas.', [
    { name: 'genetica', label: 'Genética', type: 'text', required: true },
    { name: 'banco_semillas', label: 'Banco de Semillas', type: 'text', required: true },
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true },
    { name: 'destino', label: 'Destino', type: 'text', required: true },
    { name: 'seguimiento', label: 'Seguimiento', type: 'textarea', required: false }
  ]),
  defineRegModule('licencia-psicoactivo', '44. Licencia Cultivo Psicoactivo', 'Trees', 'Control de cultivo psicoactivo.', [
    { name: 'predio_autorizado', label: 'Predio Autorizado', type: 'text', required: true },
    { name: 'area_licenciada', label: 'Área Licenciada', type: 'text', required: true },
    { name: 'cupo_relacionado', label: 'Cupo Relacionado', type: 'text', required: true },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true }
  ]),
  defineRegModule('licencia-nopsicoactivo', '45. Licencia Cultivo No Psicoactivo', 'Leaf', 'Control de cultivo no psicoactivo.', [
    { name: 'predio_autorizado', label: 'Predio Autorizado', type: 'text', required: true },
    { name: 'area_licenciada', label: 'Área Licenciada', type: 'text', required: true },
    { name: 'porcentaje_thc', label: 'Porcentaje THC Esperado', type: 'number', required: true },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true },
    { name: 'destino', label: 'Destino', type: 'text', required: true }
  ]),
  defineRegModule('licencia-invima', '46. Licencia Fabricación Derivados INVIMA', 'FlaskConical', 'Licencia INVIMA para fabricación.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true },
    { name: 'instalacion', label: 'Instalación', type: 'text', required: true },
    { name: 'linea_fabricacion', label: 'Línea de Fabricación', type: 'text', required: true },
    { name: 'vigencia', label: 'Vigencia', type: 'date', required: true }
  ]),
  defineRegModule('plataforma-micc', '47. Plataforma MICC', 'Globe', 'Gestión de trámites en MICC.', [
    { name: 'tramite_micc', label: 'Trámite MICC', type: 'text', required: true },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true },
    { name: 'fecha_envio', label: 'Fecha de Envío', type: 'date', required: true },
    { name: 'fecha_respuesta', label: 'Fecha de Respuesta', type: 'date', required: false }
  ]),
  defineRegModule('radicados-oficiales', '48. Radicados Oficiales', 'Hash', 'Seguimiento de radicados oficiales.', [
    { name: 'numero_radicado', label: 'Número de Radicado', type: 'text', required: true },
    { name: 'asunto', label: 'Asunto', type: 'textarea', required: true },
    { name: 'fecha_radicacion', label: 'Fecha Radicación', type: 'date', required: true },
    { name: 'vencimiento_respuesta', label: 'Vencimiento de Respuesta', type: 'date', required: true }
  ]),
  defineRegModule('requerimientos-autoridad', '49. Requerimientos de Autoridad', 'MailWarning', 'Gestión de requerimientos oficiales.', [
    { name: 'entidad_solicitante', label: 'Entidad Solicitante', type: 'text', required: true },
    { name: 'requerimiento', label: 'Requerimiento', type: 'textarea', required: true },
    { name: 'fecha_recepcion', label: 'Fecha Recepción', type: 'date', required: true },
    { name: 'fecha_limite', label: 'Fecha Límite', type: 'date', required: true }
  ]),
  defineRegModule('respuestas-autoridades', '50. Respuestas a Autoridades', 'Send', 'Respuestas enviadas a autoridades.', [
    { name: 'radicado_origen', label: 'Radicado Origen', type: 'text', required: true },
    { name: 'respuesta_preparada', label: 'Respuesta Preparada', type: 'textarea', required: true },
    { name: 'anexos', label: 'Anexos', type: 'text', required: false },
    { name: 'fecha_envio', label: 'Fecha Envío', type: 'date', required: true }
  ]),
  defineRegModule('cupos-cultivo', '51. Cupos de Cultivo', 'PieChart', 'Gestión de cupos de cultivo.', [
    { name: 'anio', label: 'Año', type: 'number', required: true },
    { name: 'lote_predio', label: 'Lote o Predio', type: 'text', required: true },
    { name: 'cupo_solicitado', label: 'Cupo Solicitado', type: 'number', required: true },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true },
    { name: 'cupo_utilizado', label: 'Cupo Utilizado', type: 'number', required: true },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true }
  ]),
  defineRegModule('cupos-fabricacion', '52. Cupos de Fabricación', 'Factory', 'Gestión de cupos de fabricación.', [
    { name: 'anio', label: 'Año', type: 'number', required: true },
    { name: 'producto', label: 'Producto o Derivado', type: 'text', required: true },
    { name: 'cupo_solicitado', label: 'Cupo Solicitado', type: 'number', required: true },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true },
    { name: 'cupo_consumido', label: 'Cupo Consumido', type: 'number', required: true },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true }
  ]),
  defineRegModule('cupos-exportacion', '53. Cupos de Exportación', 'Plane', 'Gestión de cupos para exportación.', [
    { name: 'pais_destino', label: 'País Destino', type: 'text', required: true },
    { name: 'cliente', label: 'Cliente', type: 'text', required: true },
    { name: 'producto', label: 'Producto', type: 'text', required: true },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true },
    { name: 'cantidad_exportada', label: 'Cantidad Exportada', type: 'number', required: true },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true }
  ]),
  defineRegModule('plan-cultivo', '54. Plan de Cultivo Regulatorio', 'CalendarDays', 'Planificación regulatoria de cultivo.', [
    { name: 'ciclo', label: 'Ciclo', type: 'text', required: true },
    { name: 'genetica', label: 'Genética', type: 'text', required: true },
    { name: 'area_sembrada', label: 'Área Sembrada', type: 'number', required: true },
    { name: 'produccion_estimada', label: 'Producción Estimada', type: 'number', required: true },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true },
    { name: 'cupo_asociado', label: 'Cupo Asociado', type: 'text', required: true }
  ]),
  defineRegModule('reporte-siembra', '55. Reporte de Siembra', 'Sprout', 'Reporte oficial de siembra.', [
    { name: 'fecha_siembra', label: 'Fecha Siembra', type: 'date', required: true },
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'numero_plantas', label: 'Número de Plantas', type: 'number', required: true },
    { name: 'genetica', label: 'Genética', type: 'text', required: true },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true }
  ]),
  defineRegModule('reporte-cosecha', '56. Reporte de Cosecha Regulatoria', 'Scissors', 'Reporte oficial de cosecha.', [
    { name: 'fecha_cosecha', label: 'Fecha Cosecha', type: 'date', required: true },
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'peso_fresco', label: 'Peso Fresco', type: 'number', required: true },
    { name: 'peso_seco_estimado', label: 'Peso Seco Estimado', type: 'number', required: true },
    { name: 'destino', label: 'Destino', type: 'text', required: true },
    { name: 'reporte_asociado', label: 'Reporte Asociado', type: 'text', required: true }
  ]),
  defineRegModule('reporte-transformacion', '57. Reporte de Transformación', 'Beaker', 'Reporte de procesos de transformación.', [
    { name: 'lote_origen', label: 'Lote Origen', type: 'text', required: true },
    { name: 'proceso', label: 'Proceso', type: 'text', required: true },
    { name: 'cantidad_ingresada', label: 'Cantidad Ingresada', type: 'number', required: true },
    { name: 'cantidad_obtenida', label: 'Cantidad Obtenida', type: 'number', required: true },
    { name: 'merma', label: 'Merma', type: 'number', required: true }
  ]),
  defineRegModule('balance-masas', '58. Balance de Masas Regulatorio', 'Scale', 'Balance de masas para trazabilidad legal.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'entrada', label: 'Entrada', type: 'number', required: true },
    { name: 'salida', label: 'Salida', type: 'number', required: true },
    { name: 'merma', label: 'Merma', type: 'number', required: true },
    { name: 'destruccion', label: 'Destrucción', type: 'number', required: true },
    { name: 'saldo_verificable', label: 'Saldo Verificable', type: 'number', required: true }
  ]),
  defineRegModule('inventario-regulado', '59. Reporte Inventario Regulado', 'Archive', 'Reporte de inventarios bajo control.', [
    { name: 'material_regulado', label: 'Material Regulado', type: 'text', required: true },
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'ubicacion', label: 'Ubicación', type: 'text', required: true },
    { name: 'cantidad', label: 'Cantidad', type: 'number', required: true },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true }
  ]),
  defineRegModule('destruccion-material', '60. Destrucción Material Regulado', 'Trash2', 'Solicitud de destrucción de material.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'cantidad_destruida', label: 'Cantidad a Destruir', type: 'number', required: true },
    { name: 'motivo', label: 'Motivo', type: 'textarea', required: true },
    { name: 'metodo', label: 'Método', type: 'text', required: true },
    { name: 'testigos', label: 'Testigos', type: 'text', required: true }
  ]),
  defineRegModule('actas-destruccion', '61. Actas de Destrucción', 'FileX', 'Actas oficiales de destrucción.', [
    { name: 'numero_acta', label: 'Número de Acta', type: 'text', required: true },
    { name: 'fecha_acta', label: 'Fecha del Acta', type: 'date', required: true },
    { name: 'material', label: 'Material', type: 'text', required: true },
    { name: 'autoridad_testigo', label: 'Autoridad/Testigo', type: 'text', required: true },
    { name: 'anexos', label: 'Anexos', type: 'text', required: false }
  ]),
  defineRegModule('seguridad-fisica', '62. Seguridad Física Regulatoria', 'Shield', 'Control y monitoreo de seguridad.', [
    { name: 'area_critica', label: 'Área Crítica', type: 'text', required: true },
    { name: 'control_acceso', label: 'Control de Acceso', type: 'text', required: true },
    { name: 'camara', label: 'Cámara Relacionada', type: 'text', required: true },
    { name: 'incidente', label: 'Incidente', type: 'textarea', required: false },
    { name: 'accion', label: 'Acción Tomada', type: 'textarea', required: false }
  ]),
  defineRegModule('control-accesos', '63. Control de Accesos', 'Key', 'Bitácora de acceso a áreas reguladas.', [
    { name: 'persona', label: 'Persona', type: 'text', required: true },
    { name: 'area', label: 'Área', type: 'text', required: true },
    { name: 'motivo_ingreso', label: 'Motivo de Ingreso', type: 'text', required: true },
    { name: 'hora_entrada', label: 'Hora Entrada', type: 'time', required: true },
    { name: 'hora_salida', label: 'Hora Salida', type: 'time', required: false },
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true }
  ]),
  defineRegModule('visitantes-autoridades', '64. Visitantes y Autoridades', 'Users', 'Control de visitas externas y autoridades.', [
    { name: 'visitante', label: 'Visitante', type: 'text', required: true },
    { name: 'motivo', label: 'Motivo', type: 'text', required: true },
    { name: 'fecha_visita', label: 'Fecha', type: 'date', required: true },
    { name: 'areas_visitadas', label: 'Áreas Visitadas', type: 'text', required: true },
    { name: 'acompanante', label: 'Acompañante Interno', type: 'text', required: true }
  ]),
  defineRegModule('visitas-inspeccion', '65. Visitas de Inspección', 'Search', 'Registro de visitas de inspección oficial.', [
    { name: 'entidad_inspectora', label: 'Entidad Inspectora', type: 'text', required: true },
    { name: 'fecha_inspeccion', label: 'Fecha de Inspección', type: 'date', required: true },
    { name: 'alcance', label: 'Alcance', type: 'textarea', required: true },
    { name: 'hallazgos', label: 'Hallazgos', type: 'textarea', required: false },
    { name: 'requerimientos', label: 'Requerimientos', type: 'textarea', required: false },
    { name: 'plan_respuesta', label: 'Plan de Respuesta', type: 'textarea', required: false }
  ]),
  defineRegModule('preparacion-inspeccion', '66. Preparación de Inspección', 'ClipboardCheck', 'Auditoría interna pre-inspección.', [
    { name: 'entidad_objetivo', label: 'Entidad Objetivo', type: 'text', required: true },
    { name: 'checklist', label: 'Checklist Utilizado', type: 'text', required: true },
    { name: 'documentos_listos', label: 'Documentos Listos', type: 'select', options: ['Sí', 'No', 'Parcial'], required: true },
    { name: 'brechas', label: 'Brechas Detectadas', type: 'textarea', required: true }
  ]),
  defineRegModule('expediente-maestro', '67. Expediente Regulatorio Maestro', 'FolderOpen', 'Gestión del expediente maestro.', [
    { name: 'expediente', label: 'Nombre del Expediente', type: 'text', required: true },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true },
    { name: 'documentos_incluidos', label: 'Documentos Incluidos', type: 'textarea', required: true },
    { name: 'version', label: 'Versión', type: 'text', required: true }
  ]),
  defineRegModule('matriz-legal', '68. Matriz Legal Colombiana', 'Scale', 'Matriz de requisitos legales.', [
    { name: 'norma', label: 'Norma', type: 'text', required: true },
    { name: 'articulo', label: 'Artículo', type: 'text', required: true },
    { name: 'requisito', label: 'Requisito', type: 'textarea', required: true },
    { name: 'evidencia_requerida', label: 'Evidencia Requerida', type: 'textarea', required: true },
    { name: 'cumplimiento', label: 'Nivel de Cumplimiento', type: 'select', options: ['Cumple', 'No Cumple', 'No Aplica'], required: true }
  ]),
  defineRegModule('calendario-regulatorio', '69. Calendario Regulatorio', 'Calendar', 'Obligaciones y fechas clave.', [
    { name: 'obligacion', label: 'Obligación', type: 'text', required: true },
    { name: 'fecha_limite', label: 'Fecha Límite', type: 'date', required: true },
    { name: 'alerta', label: 'Días de Alerta Previa', type: 'number', required: true }
  ]),
  defineRegModule('alertas-vencimiento', '70. Alertas de Vencimiento', 'BellRing', 'Control de documentos por vencer.', [
    { name: 'documento_licencia', label: 'Documento/Licencia/Cupo', type: 'text', required: true },
    { name: 'fecha_vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true },
    { name: 'dias_restantes', label: 'Días Restantes', type: 'number', required: true },
    { name: 'prioridad', label: 'Prioridad', type: 'select', options: ['Alta', 'Media', 'Baja'], required: true }
  ]),
  defineRegModule('renovaciones-licencias', '71. Renovaciones de Licencias', 'RefreshCw', 'Procesos de renovación.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true },
    { name: 'fecha_inicio_renovacion', label: 'Fecha Inicio Renovación', type: 'date', required: true },
    { name: 'documentos_requeridos', label: 'Documentos Requeridos', type: 'textarea', required: true },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true }
  ]),
  defineRegModule('modificaciones-licencia', '72. Modificaciones de Licencia', 'Edit', 'Cambios a licencias existentes.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true },
    { name: 'tipo_modificacion', label: 'Tipo de Modificación', type: 'text', required: true },
    { name: 'justificacion', label: 'Justificación', type: 'textarea', required: true },
    { name: 'impacto', label: 'Impacto', type: 'textarea', required: true },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true },
    { name: 'aprobacion', label: 'Estado Aprobación', type: 'select', options: ['Aprobado', 'Rechazado', 'Pendiente'], required: true }
  ]),
  defineRegModule('autorizaciones-especiales', '73. Autorizaciones Especiales', 'Award', 'Permisos extraordinarios.', [
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true },
    { name: 'alcance', label: 'Alcance', type: 'textarea', required: true },
    { name: 'fecha_solicitud', label: 'Fecha Solicitud', type: 'date', required: true },
    { name: 'fecha_aprobacion', label: 'Fecha Aprobación', type: 'date', required: false }
  ]),
  defineRegModule('importaciones-regulatorias', '74. Importaciones Regulatorias', 'Download', 'Control de importaciones.', [
    { name: 'insumo_material', label: 'Insumo/Material', type: 'text', required: true },
    { name: 'pais_origen', label: 'País Origen', type: 'text', required: true },
    { name: 'proveedor', label: 'Proveedor', type: 'text', required: true },
    { name: 'permiso', label: 'Permiso Asociado', type: 'text', required: true }
  ]),
  defineRegModule('exportaciones-regulatorias', '75. Exportaciones Regulatorias', 'Upload', 'Control de exportaciones.', [
    { name: 'producto', label: 'Producto', type: 'text', required: true },
    { name: 'pais_destino', label: 'País Destino', type: 'text', required: true },
    { name: 'cliente', label: 'Cliente', type: 'text', required: true },
    { name: 'permiso', label: 'Permiso Asociado', type: 'text', required: true }
  ]),
  defineRegModule('certificados-anexos', '76. Certificados y Anexos', 'FileBadge', 'Certificados oficiales.', [
    { name: 'certificado', label: 'Certificado', type: 'text', required: true },
    { name: 'entidad_emisora', label: 'Entidad Emisora', type: 'text', required: true },
    { name: 'lote_producto', label: 'Lote/Producto', type: 'text', required: true },
    { name: 'fecha_emision', label: 'Fecha Emisión', type: 'date', required: true },
    { name: 'vigencia', label: 'Vigencia', type: 'date', required: true }
  ]),
  defineRegModule('trazabilidad-legal', '77. Trazabilidad Legal', 'Link', 'Trazabilidad legal por lote.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true },
    { name: 'licencia', label: 'Licencia Asociada', type: 'text', required: true },
    { name: 'cupo', label: 'Cupo Asociado', type: 'text', required: true },
    { name: 'radicados', label: 'Radicados Relacionados', type: 'text', required: true },
    { name: 'reportes', label: 'Reportes Relacionados', type: 'text', required: true },
    { name: 'estado_legal', label: 'Estado Legal', type: 'select', options: ['Conforme', 'Observado', 'En Investigación'], required: true }
  ]),
  defineRegModule('contratos-clientes', '78. Contratos y Clientes Regulados', 'Handshake', 'Control de contratos.', [
    { name: 'cliente', label: 'Cliente', type: 'text', required: true },
    { name: 'pais', label: 'País', type: 'text', required: true },
    { name: 'producto', label: 'Producto', type: 'text', required: true },
    { name: 'contrato', label: 'Número de Contrato', type: 'text', required: true },
    { name: 'licencia_relacionada', label: 'Licencia Relacionada', type: 'text', required: true }
  ]),
  defineRegModule('proteccion-datos', '79. Protección de Datos', 'Lock', 'Confidencialidad y habeas data.', [
    { name: 'documento_proceso', label: 'Documento/Proceso', type: 'text', required: true },
    { name: 'tipo_dato', label: 'Tipo de Dato', type: 'text', required: true },
    { name: 'riesgo', label: 'Riesgo Identificado', type: 'select', options: ['Alto', 'Medio', 'Bajo'], required: true },
    { name: 'control', label: 'Control Implementado', type: 'textarea', required: true }
  ]),
  defineRegModule('comite-regulatorio', '80. Comité Regulatorio y QA', 'UsersRound', 'Actas de comités.', [
    { name: 'reunion', label: 'Reunión', type: 'text', required: true },
    { name: 'fecha_reunion', label: 'Fecha', type: 'date', required: true },
    { name: 'asistentes', label: 'Asistentes', type: 'textarea', required: true },
    { name: 'temas_regulatorios', label: 'Temas Regulatorios', type: 'textarea', required: true },
    { name: 'decisiones', label: 'Decisiones', type: 'textarea', required: true },
    { name: 'compromisos', label: 'Compromisos', type: 'textarea', required: true }
  ])
];
