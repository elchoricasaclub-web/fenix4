const fs = require('fs');
const path = require('path');

const filePath = path.join('web/src/data', 'gacpModules.js');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /{ name: '([^']+)', label: '([^']+)', type: '([^']+)'([^}]*)}/g;

content = content.replace(regex, (match, name, label, type, rest) => {
  if (match.includes("placeholder:")) return match;

  let placeholder = `Ej: Ingrese ${label.toLowerCase()}`;
  
  if (name.includes('fecha')) placeholder = 'Ej: 2026-05-12';
  else if (type === 'number') placeholder = 'Ej: 100';
  else if (name === 'trazabilidad_lote') placeholder = 'Ej: LOTE-2026-001';
  else if (name === 'responsable') placeholder = 'Ej: Ing. Juan Pérez';
  else if (name === 'observaciones') placeholder = 'Ej: Revisión conforme, sin anomalías';
  else if (name === 'evidencia') placeholder = 'Ej: URL o ruta del documento adjunto';
  else if (name.includes('porcentaje')) placeholder = 'Ej: 85';

  return `{ name: '${name}', label: '${label}', type: '${type}'${rest}, placeholder: '${placeholder}' }`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Placeholders added to gacpModules");
