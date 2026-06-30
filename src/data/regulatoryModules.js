const commonFields = [
  { name: 'entidad_relacionada', label: 'Entidad Relacionada', type: 'select', options: ['Ministerio de Justicia', 'Ministerio de Salud', 'FNE', 'INVIMA', 'ICA', 'MICC', 'DIAN', 'Policía Antinarcóticos', 'Otro'], required: true , placeholder: 'Ej: Ingrese entidad relacionada' },
  { name: 'responsable', label: 'Responsable Interno', type: 'text', required: true, placeholder: 'Ej: Carlos López (Asuntos Regulatorios)' },
  { name: 'estado', label: 'Estado del Registro', type: 'select', options: ['Pendiente', 'En preparación', 'Radicado', 'En revisión', 'Aprobado', 'Rechazado', 'Cerrado', 'Vencido'], required: true , placeholder: 'Ej: Ingrese estado del registro' },
  { name: 'fecha_registro', label: 'Fecha de Registro', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
  { name: 'evidencia', label: 'Evidencia Documental / Observaciones', type: 'textarea', required: true, placeholder: 'Ej: Documentación adjunta en el servidor corporativo, carpeta 12B...' }
];

const defineRegModule = (id, title, icon, description, specificFields) => ({
  id, title, icon, description,
  fields: [...specificFields, ...commonFields]
});

export const regulatoryModules = [
  defineRegModule('entidades-regulatorias', '41. Entidades Regulatorias Colombia', 'Building', 'Gestión de relaciones con entidades oficiales.', [
    { name: 'entidad', label: 'Entidad', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad' },
    { name: 'competencia', label: 'Competencia', type: 'text', required: true , placeholder: 'Ej: Ingrese competencia' },
    { name: 'tramite_relacionado', label: 'Trámite Relacionado', type: 'text', required: true , placeholder: 'Ej: Ingrese trámite relacionado' },
    { name: 'contacto_institucional', label: 'Contacto Institucional', type: 'text', required: true , placeholder: 'Ej: Ingrese contacto institucional' }
  ]),
  defineRegModule('licencias-minjusticia', '42. Licencias Ministerio de Justicia', 'FileSignature', 'Gestión de licencias del Ministerio de Justicia.', [
    { name: 'tipo_licencia', label: 'Tipo de Licencia', type: 'select', options: ['Uso de Semillas', 'Cultivo Psicoactivo', 'Cultivo No Psicoactivo'], required: true , placeholder: 'Ej: Ingrese tipo de licencia' },
    { name: 'numero_resolucion', label: 'Número de Resolución', type: 'text', required: true, placeholder: 'Ej: RES-2023-0045' },
    { name: 'fecha_expedicion', label: 'Fecha de Expedición', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'fecha_vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'alcance_autorizado', label: 'Alcance Autorizado', type: 'textarea', required: true, placeholder: 'Ej: Cultivo para fines científicos y producción de derivados...' }
  ]),
  defineRegModule('licencia-semillas', '43. Licencia de Semillas (Siembra/Grano)', 'Sprout', 'Gestión de licencias para semillas.', [
    { name: 'genetica', label: 'Genética', type: 'text', required: true , placeholder: 'Ej: Ingrese genética' },
    { name: 'banco_semillas', label: 'Banco de Semillas', type: 'text', required: true , placeholder: 'Ej: Ingrese banco de semillas' },
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true , placeholder: 'Ej: Ingrese autorización' },
    { name: 'destino', label: 'Destino', type: 'text', required: true , placeholder: 'Ej: Ingrese destino' },
    { name: 'seguimiento', label: 'Seguimiento', type: 'textarea', required: false , placeholder: 'Ej: Ingrese seguimiento' }
  ]),
  defineRegModule('licencia-psicoactivo', '44. Licencia Cultivo Psicoactivo', 'Trees', 'Control de cultivo psicoactivo.', [
    { name: 'predio_autorizado', label: 'Predio Autorizado', type: 'text', required: true , placeholder: 'Ej: Ingrese predio autorizado' },
    { name: 'area_licenciada', label: 'Área Licenciada', type: 'text', required: true , placeholder: 'Ej: Ingrese área licenciada' },
    { name: 'cupo_relacionado', label: 'Cupo Relacionado', type: 'text', required: true , placeholder: 'Ej: Ingrese cupo relacionado' },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true , placeholder: 'Ej: Ingrese lote de cultivo' }
  ]),
  defineRegModule('licencia-nopsicoactivo', '45. Licencia Cultivo No Psicoactivo', 'Leaf', 'Control de cultivo no psicoactivo.', [
    { name: 'predio_autorizado', label: 'Predio Autorizado', type: 'text', required: true , placeholder: 'Ej: Ingrese predio autorizado' },
    { name: 'area_licenciada', label: 'Área Licenciada', type: 'text', required: true , placeholder: 'Ej: Ingrese área licenciada' },
    { name: 'porcentaje_thc', label: 'Porcentaje THC Esperado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'lote_cultivo', label: 'Lote de Cultivo', type: 'text', required: true , placeholder: 'Ej: Ingrese lote de cultivo' },
    { name: 'destino', label: 'Destino', type: 'text', required: true , placeholder: 'Ej: Ingrese destino' }
  ]),
  defineRegModule('licencia-invima', '46. Licencia Fabricación Derivados INVIMA', 'FlaskConical', 'Licencia INVIMA para fabricación.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia' },
    { name: 'instalacion', label: 'Instalación', type: 'text', required: true , placeholder: 'Ej: Ingrese instalación' },
    { name: 'linea_fabricacion', label: 'Línea de Fabricación', type: 'text', required: true , placeholder: 'Ej: Ingrese línea de fabricación' },
    { name: 'vigencia', label: 'Vigencia', type: 'date', required: true , placeholder: 'Ej: Ingrese vigencia' }
  ]),
  defineRegModule('plataforma-micc', '47. Plataforma MICC', 'Globe', 'Gestión de trámites en MICC.', [
    { name: 'tramite_micc', label: 'Trámite MICC', type: 'text', required: true , placeholder: 'Ej: Ingrese trámite micc' },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true , placeholder: 'Ej: Ingrese radicado' },
    { name: 'fecha_envio', label: 'Fecha de Envío', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'fecha_respuesta', label: 'Fecha de Respuesta', type: 'date', required: false , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineRegModule('radicados-oficiales', '48. Radicados Oficiales', 'Hash', 'Seguimiento de radicados oficiales.', [
    { name: 'numero_radicado', label: 'Número de Radicado', type: 'text', required: true , placeholder: 'Ej: Ingrese número de radicado' },
    { name: 'asunto', label: 'Asunto', type: 'textarea', required: true , placeholder: 'Ej: Ingrese asunto' },
    { name: 'fecha_radicacion', label: 'Fecha Radicación', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'vencimiento_respuesta', label: 'Vencimiento de Respuesta', type: 'date', required: true , placeholder: 'Ej: Ingrese vencimiento de respuesta' }
  ]),
  defineRegModule('requerimientos-autoridad', '49. Requerimientos de Autoridad', 'MailWarning', 'Gestión de requerimientos oficiales.', [
    { name: 'entidad_solicitante', label: 'Entidad Solicitante', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad solicitante' },
    { name: 'requerimiento', label: 'Requerimiento', type: 'textarea', required: true , placeholder: 'Ej: Ingrese requerimiento' },
    { name: 'fecha_recepcion', label: 'Fecha Recepción', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'fecha_limite', label: 'Fecha Límite', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineRegModule('respuestas-autoridades', '50. Respuestas a Autoridades', 'Send', 'Respuestas enviadas a autoridades.', [
    { name: 'radicado_origen', label: 'Radicado Origen', type: 'text', required: true , placeholder: 'Ej: Ingrese radicado origen' },
    { name: 'respuesta_preparada', label: 'Respuesta Preparada', type: 'textarea', required: true , placeholder: 'Ej: Ingrese respuesta preparada' },
    { name: 'anexos', label: 'Anexos', type: 'text', required: false , placeholder: 'Ej: Ingrese anexos' },
    { name: 'fecha_envio', label: 'Fecha Envío', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineRegModule('cupos-cultivo', '51. Cupos de Cultivo', 'PieChart', 'Gestión de cupos de cultivo.', [
    { name: 'anio', label: 'Año', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'lote_predio', label: 'Lote o Predio', type: 'text', required: true , placeholder: 'Ej: Ingrese lote o predio' },
    { name: 'cupo_solicitado', label: 'Cupo Solicitado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cupo_utilizado', label: 'Cupo Utilizado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('cupos-fabricacion', '52. Cupos de Fabricación', 'Factory', 'Gestión de cupos de fabricación.', [
    { name: 'anio', label: 'Año', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'producto', label: 'Producto o Derivado', type: 'text', required: true , placeholder: 'Ej: Ingrese producto o derivado' },
    { name: 'cupo_solicitado', label: 'Cupo Solicitado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cupo_consumido', label: 'Cupo Consumido', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('cupos-exportacion', '53. Cupos de Exportación', 'Plane', 'Gestión de cupos para exportación.', [
    { name: 'pais_destino', label: 'País Destino', type: 'text', required: true , placeholder: 'Ej: Ingrese país destino' },
    { name: 'cliente', label: 'Cliente', type: 'text', required: true , placeholder: 'Ej: Ingrese cliente' },
    { name: 'producto', label: 'Producto', type: 'text', required: true , placeholder: 'Ej: Ingrese producto' },
    { name: 'cupo_aprobado', label: 'Cupo Aprobado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cantidad_exportada', label: 'Cantidad Exportada', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'saldo', label: 'Saldo', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('plan-cultivo', '54. Plan de Cultivo Regulatorio', 'CalendarDays', 'Planificación regulatoria de cultivo.', [
    { name: 'ciclo', label: 'Ciclo', type: 'text', required: true , placeholder: 'Ej: Ingrese ciclo' },
    { name: 'genetica', label: 'Genética', type: 'text', required: true , placeholder: 'Ej: Ingrese genética' },
    { name: 'area_sembrada', label: 'Área Sembrada', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'produccion_estimada', label: 'Producción Estimada', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia asociada' },
    { name: 'cupo_asociado', label: 'Cupo Asociado', type: 'text', required: true , placeholder: 'Ej: Ingrese cupo asociado' }
  ]),
  defineRegModule('reporte-siembra', '55. Reporte de Siembra', 'Sprout', 'Reporte oficial de siembra.', [
    { name: 'fecha_siembra', label: 'Fecha Siembra', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'numero_plantas', label: 'Número de Plantas', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'genetica', label: 'Genética', type: 'text', required: true , placeholder: 'Ej: Ingrese genética' },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia asociada' }
  ]),
  defineRegModule('reporte-cosecha', '56. Reporte de Cosecha Regulatoria', 'Scissors', 'Reporte oficial de cosecha.', [
    { name: 'fecha_cosecha', label: 'Fecha Cosecha', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'peso_fresco', label: 'Peso Fresco', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'peso_seco_estimado', label: 'Peso Seco Estimado', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'destino', label: 'Destino', type: 'text', required: true , placeholder: 'Ej: Ingrese destino' },
    { name: 'reporte_asociado', label: 'Reporte Asociado', type: 'text', required: true , placeholder: 'Ej: Ingrese reporte asociado' }
  ]),
  defineRegModule('reporte-transformacion', '57. Reporte de Transformación', 'Beaker', 'Reporte de procesos de transformación.', [
    { name: 'lote_origen', label: 'Lote Origen', type: 'text', required: true , placeholder: 'Ej: Ingrese lote origen' },
    { name: 'proceso', label: 'Proceso', type: 'text', required: true , placeholder: 'Ej: Ingrese proceso' },
    { name: 'cantidad_ingresada', label: 'Cantidad Ingresada', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'cantidad_obtenida', label: 'Cantidad Obtenida', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'merma', label: 'Merma', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('balance-masas', '58. Balance de Masas Regulatorio', 'Scale', 'Balance de masas para trazabilidad legal.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'entrada', label: 'Entrada', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'salida', label: 'Salida', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'merma', label: 'Merma', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'destruccion', label: 'Destrucción', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'saldo_verificable', label: 'Saldo Verificable', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('inventario-regulado', '59. Reporte Inventario Regulado', 'Archive', 'Reporte de inventarios bajo control.', [
    { name: 'material_regulado', label: 'Material Regulado', type: 'text', required: true , placeholder: 'Ej: Ingrese material regulado' },
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'ubicacion', label: 'Ubicación', type: 'text', required: true , placeholder: 'Ej: Ingrese ubicación' },
    { name: 'cantidad', label: 'Cantidad', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia asociada' }
  ]),
  defineRegModule('destruccion-material', '60. Destrucción Material Regulado', 'Trash2', 'Solicitud de destrucción de material.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'cantidad_destruida', label: 'Cantidad a Destruir', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'motivo', label: 'Motivo', type: 'textarea', required: true , placeholder: 'Ej: Ingrese motivo' },
    { name: 'metodo', label: 'Método', type: 'text', required: true , placeholder: 'Ej: Ingrese método' },
    { name: 'testigos', label: 'Testigos', type: 'text', required: true , placeholder: 'Ej: Ingrese testigos' }
  ]),
  defineRegModule('actas-destruccion', '61. Actas de Destrucción', 'FileX', 'Actas oficiales de destrucción.', [
    { name: 'numero_acta', label: 'Número de Acta', type: 'text', required: true , placeholder: 'Ej: Ingrese número de acta' },
    { name: 'fecha_acta', label: 'Fecha del Acta', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'material', label: 'Material', type: 'text', required: true , placeholder: 'Ej: Ingrese material' },
    { name: 'autoridad_testigo', label: 'Autoridad/Testigo', type: 'text', required: true , placeholder: 'Ej: Ingrese autoridad/testigo' },
    { name: 'anexos', label: 'Anexos', type: 'text', required: false , placeholder: 'Ej: Ingrese anexos' }
  ]),
  defineRegModule('seguridad-fisica', '62. Seguridad Física Regulatoria', 'Shield', 'Control y monitoreo de seguridad.', [
    { name: 'area_critica', label: 'Área Crítica', type: 'text', required: true , placeholder: 'Ej: Ingrese área crítica' },
    { name: 'control_acceso', label: 'Control de Acceso', type: 'text', required: true , placeholder: 'Ej: Ingrese control de acceso' },
    { name: 'camara', label: 'Cámara Relacionada', type: 'text', required: true , placeholder: 'Ej: Ingrese cámara relacionada' },
    { name: 'incidente', label: 'Incidente', type: 'textarea', required: false , placeholder: 'Ej: Ingrese incidente' },
    { name: 'accion', label: 'Acción Tomada', type: 'textarea', required: false , placeholder: 'Ej: Ingrese acción tomada' }
  ]),
  defineRegModule('control-accesos', '63. Control de Accesos', 'Key', 'Bitácora de acceso a áreas reguladas.', [
    { name: 'persona', label: 'Persona', type: 'text', required: true , placeholder: 'Ej: Ingrese persona' },
    { name: 'area', label: 'Área', type: 'text', required: true , placeholder: 'Ej: Ingrese área' },
    { name: 'motivo_ingreso', label: 'Motivo de Ingreso', type: 'text', required: true , placeholder: 'Ej: Ingrese motivo de ingreso' },
    { name: 'hora_entrada', label: 'Hora Entrada', type: 'time', required: true , placeholder: 'Ej: Ingrese hora entrada' },
    { name: 'hora_salida', label: 'Hora Salida', type: 'time', required: false , placeholder: 'Ej: Ingrese hora salida' },
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true , placeholder: 'Ej: Ingrese autorización' }
  ]),
  defineRegModule('visitantes-autoridades', '64. Visitantes y Autoridades', 'Users', 'Control de visitas externas y autoridades.', [
    { name: 'visitante', label: 'Visitante', type: 'text', required: true , placeholder: 'Ej: Ingrese visitante' },
    { name: 'motivo', label: 'Motivo', type: 'text', required: true , placeholder: 'Ej: Ingrese motivo' },
    { name: 'fecha_visita', label: 'Fecha', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'areas_visitadas', label: 'Áreas Visitadas', type: 'text', required: true , placeholder: 'Ej: Ingrese áreas visitadas' },
    { name: 'acompanante', label: 'Acompañante Interno', type: 'text', required: true , placeholder: 'Ej: Ingrese acompañante interno' }
  ]),
  defineRegModule('visitas-inspeccion', '65. Visitas de Inspección', 'Search', 'Registro de visitas de inspección oficial.', [
    { name: 'entidad_inspectora', label: 'Entidad Inspectora', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad inspectora' },
    { name: 'fecha_inspeccion', label: 'Fecha de Inspección', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'alcance', label: 'Alcance', type: 'textarea', required: true , placeholder: 'Ej: Ingrese alcance' },
    { name: 'hallazgos', label: 'Hallazgos', type: 'textarea', required: false , placeholder: 'Ej: Ingrese hallazgos' },
    { name: 'requerimientos', label: 'Requerimientos', type: 'textarea', required: false , placeholder: 'Ej: Ingrese requerimientos' },
    { name: 'plan_respuesta', label: 'Plan de Respuesta', type: 'textarea', required: false , placeholder: 'Ej: Ingrese plan de respuesta' }
  ]),
  defineRegModule('preparacion-inspeccion', '66. Preparación de Inspección', 'ClipboardCheck', 'Auditoría interna pre-inspección.', [
    { name: 'entidad_objetivo', label: 'Entidad Objetivo', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad objetivo' },
    { name: 'checklist', label: 'Checklist Utilizado', type: 'text', required: true , placeholder: 'Ej: Ingrese checklist utilizado' },
    { name: 'documentos_listos', label: 'Documentos Listos', type: 'select', options: ['Sí', 'No', 'Parcial'], required: true , placeholder: 'Ej: Ingrese documentos listos' },
    { name: 'brechas', label: 'Brechas Detectadas', type: 'textarea', required: true , placeholder: 'Ej: Ingrese brechas detectadas' }
  ]),
  defineRegModule('expediente-maestro', '67. Expediente Regulatorio Maestro', 'FolderOpen', 'Gestión del expediente maestro.', [
    { name: 'expediente', label: 'Nombre del Expediente', type: 'text', required: true , placeholder: 'Ej: Ingrese nombre del expediente' },
    { name: 'licencia_asociada', label: 'Licencia Asociada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia asociada' },
    { name: 'documentos_incluidos', label: 'Documentos Incluidos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese documentos incluidos' },
    { name: 'version', label: 'Versión', type: 'text', required: true , placeholder: 'Ej: Ingrese versión' }
  ]),
  defineRegModule('matriz-legal', '68. Matriz Legal Colombiana', 'Scale', 'Matriz de requisitos legales.', [
    { name: 'norma', label: 'Norma', type: 'text', required: true , placeholder: 'Ej: Ingrese norma' },
    { name: 'articulo', label: 'Artículo', type: 'text', required: true , placeholder: 'Ej: Ingrese artículo' },
    { name: 'requisito', label: 'Requisito', type: 'textarea', required: true , placeholder: 'Ej: Ingrese requisito' },
    { name: 'evidencia_requerida', label: 'Evidencia Requerida', type: 'textarea', required: true , placeholder: 'Ej: Ingrese evidencia requerida' },
    { name: 'cumplimiento', label: 'Nivel de Cumplimiento', type: 'select', options: ['Cumple', 'No Cumple', 'No Aplica'], required: true , placeholder: 'Ej: Ingrese nivel de cumplimiento' }
  ]),
  defineRegModule('calendario-regulatorio', '69. Calendario Regulatorio', 'Calendar', 'Obligaciones y fechas clave.', [
    { name: 'obligacion', label: 'Obligación', type: 'text', required: true , placeholder: 'Ej: Ingrese obligación' },
    { name: 'fecha_limite', label: 'Fecha Límite', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'alerta', label: 'Días de Alerta Previa', type: 'number', required: true , placeholder: 'Ej: 100' }
  ]),
  defineRegModule('alertas-vencimiento', '70. Alertas de Vencimiento', 'BellRing', 'Control de documentos por vencer.', [
    { name: 'documento_licencia', label: 'Documento/Licencia/Cupo', type: 'text', required: true , placeholder: 'Ej: Ingrese documento/licencia/cupo' },
    { name: 'fecha_vencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'dias_restantes', label: 'Días Restantes', type: 'number', required: true , placeholder: 'Ej: 100' },
    { name: 'prioridad', label: 'Prioridad', type: 'select', options: ['Alta', 'Media', 'Baja'], required: true , placeholder: 'Ej: Ingrese prioridad' }
  ]),
  defineRegModule('renovaciones-licencias', '71. Renovaciones de Licencias', 'RefreshCw', 'Procesos de renovación.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia' },
    { name: 'fecha_inicio_renovacion', label: 'Fecha Inicio Renovación', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'documentos_requeridos', label: 'Documentos Requeridos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese documentos requeridos' },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true , placeholder: 'Ej: Ingrese radicado' }
  ]),
  defineRegModule('modificaciones-licencia', '72. Modificaciones de Licencia', 'Edit', 'Cambios a licencias existentes.', [
    { name: 'licencia', label: 'Licencia', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia' },
    { name: 'tipo_modificacion', label: 'Tipo de Modificación', type: 'text', required: true , placeholder: 'Ej: Ingrese tipo de modificación' },
    { name: 'justificacion', label: 'Justificación', type: 'textarea', required: true , placeholder: 'Ej: Ingrese justificación' },
    { name: 'impacto', label: 'Impacto', type: 'textarea', required: true , placeholder: 'Ej: Ingrese impacto' },
    { name: 'radicado', label: 'Radicado', type: 'text', required: true , placeholder: 'Ej: Ingrese radicado' },
    { name: 'aprobacion', label: 'Estado Aprobación', type: 'select', options: ['Aprobado', 'Rechazado', 'Pendiente'], required: true , placeholder: 'Ej: Ingrese estado aprobación' }
  ]),
  defineRegModule('autorizaciones-especiales', '73. Autorizaciones Especiales', 'Award', 'Permisos extraordinarios.', [
    { name: 'autorizacion', label: 'Autorización', type: 'text', required: true , placeholder: 'Ej: Ingrese autorización' },
    { name: 'alcance', label: 'Alcance', type: 'textarea', required: true , placeholder: 'Ej: Ingrese alcance' },
    { name: 'fecha_solicitud', label: 'Fecha Solicitud', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'fecha_aprobacion', label: 'Fecha Aprobación', type: 'date', required: false , placeholder: 'Ej: 2026-05-12' }
  ]),
  defineRegModule('importaciones-regulatorias', '74. Importaciones Regulatorias', 'Download', 'Control de importaciones.', [
    { name: 'insumo_material', label: 'Insumo/Material', type: 'text', required: true , placeholder: 'Ej: Ingrese insumo/material' },
    { name: 'pais_origen', label: 'País Origen', type: 'text', required: true , placeholder: 'Ej: Ingrese país origen' },
    { name: 'proveedor', label: 'Proveedor', type: 'text', required: true , placeholder: 'Ej: Ingrese proveedor' },
    { name: 'permiso', label: 'Permiso Asociado', type: 'text', required: true , placeholder: 'Ej: Ingrese permiso asociado' }
  ]),
  defineRegModule('exportaciones-regulatorias', '75. Exportaciones Regulatorias', 'Upload', 'Control de exportaciones.', [
    { name: 'producto', label: 'Producto', type: 'text', required: true , placeholder: 'Ej: Ingrese producto' },
    { name: 'pais_destino', label: 'País Destino', type: 'text', required: true , placeholder: 'Ej: Ingrese país destino' },
    { name: 'cliente', label: 'Cliente', type: 'text', required: true , placeholder: 'Ej: Ingrese cliente' },
    { name: 'permiso', label: 'Permiso Asociado', type: 'text', required: true , placeholder: 'Ej: Ingrese permiso asociado' }
  ]),
  defineRegModule('certificados-anexos', '76. Certificados y Anexos', 'FileBadge', 'Certificados oficiales.', [
    { name: 'certificado', label: 'Certificado', type: 'text', required: true , placeholder: 'Ej: Ingrese certificado' },
    { name: 'entidad_emisora', label: 'Entidad Emisora', type: 'text', required: true , placeholder: 'Ej: Ingrese entidad emisora' },
    { name: 'lote_producto', label: 'Lote/Producto', type: 'text', required: true , placeholder: 'Ej: Ingrese lote/producto' },
    { name: 'fecha_emision', label: 'Fecha Emisión', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'vigencia', label: 'Vigencia', type: 'date', required: true , placeholder: 'Ej: Ingrese vigencia' }
  ]),
  defineRegModule('trazabilidad-legal', '77. Trazabilidad Legal', 'Link', 'Trazabilidad legal por lote.', [
    { name: 'lote', label: 'Lote', type: 'text', required: true , placeholder: 'Ej: Ingrese lote' },
    { name: 'licencia', label: 'Licencia Asociada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia asociada' },
    { name: 'cupo', label: 'Cupo Asociado', type: 'text', required: true , placeholder: 'Ej: Ingrese cupo asociado' },
    { name: 'radicados', label: 'Radicados Relacionados', type: 'text', required: true , placeholder: 'Ej: Ingrese radicados relacionados' },
    { name: 'reportes', label: 'Reportes Relacionados', type: 'text', required: true , placeholder: 'Ej: Ingrese reportes relacionados' },
    { name: 'estado_legal', label: 'Estado Legal', type: 'select', options: ['Conforme', 'Observado', 'En Investigación'], required: true , placeholder: 'Ej: Ingrese estado legal' }
  ]),
  defineRegModule('contratos-clientes', '78. Contratos y Clientes Regulados', 'Handshake', 'Control de contratos.', [
    { name: 'cliente', label: 'Cliente', type: 'text', required: true , placeholder: 'Ej: Ingrese cliente' },
    { name: 'pais', label: 'País', type: 'text', required: true , placeholder: 'Ej: Ingrese país' },
    { name: 'producto', label: 'Producto', type: 'text', required: true , placeholder: 'Ej: Ingrese producto' },
    { name: 'contrato', label: 'Número de Contrato', type: 'text', required: true , placeholder: 'Ej: Ingrese número de contrato' },
    { name: 'licencia_relacionada', label: 'Licencia Relacionada', type: 'text', required: true , placeholder: 'Ej: Ingrese licencia relacionada' }
  ]),
  defineRegModule('proteccion-datos', '79. Protección de Datos', 'Lock', 'Confidencialidad y habeas data.', [
    { name: 'documento_proceso', label: 'Documento/Proceso', type: 'text', required: true , placeholder: 'Ej: Ingrese documento/proceso' },
    { name: 'tipo_dato', label: 'Tipo de Dato', type: 'text', required: true , placeholder: 'Ej: Ingrese tipo de dato' },
    { name: 'riesgo', label: 'Riesgo Identificado', type: 'select', options: ['Alto', 'Medio', 'Bajo'], required: true , placeholder: 'Ej: Ingrese riesgo identificado' },
    { name: 'control', label: 'Control Implementado', type: 'textarea', required: true , placeholder: 'Ej: Ingrese control implementado' }
  ]),
  defineRegModule('comite-regulatorio', '80. Comité Regulatorio y QA', 'UsersRound', 'Actas de comités.', [
    { name: 'reunion', label: 'Reunión', type: 'text', required: true , placeholder: 'Ej: Ingrese reunión' },
    { name: 'fecha_reunion', label: 'Fecha', type: 'date', required: true , placeholder: 'Ej: 2026-05-12' },
    { name: 'asistentes', label: 'Asistentes', type: 'textarea', required: true , placeholder: 'Ej: Ingrese asistentes' },
    { name: 'temas_regulatorios', label: 'Temas Regulatorios', type: 'textarea', required: true , placeholder: 'Ej: Ingrese temas regulatorios' },
    { name: 'decisiones', label: 'Decisiones', type: 'textarea', required: true , placeholder: 'Ej: Ingrese decisiones' },
    { name: 'compromisos', label: 'Compromisos', type: 'textarea', required: true , placeholder: 'Ej: Ingrese compromisos' }
  ])
];
