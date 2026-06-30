const fs = require('fs');
const path = require('path');

const filePath = path.join('web/src/data', 'regulatoryModules.js');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /{ name: '([^']+)', label: '([^']+)', type: '([^']+)'(?!.*placeholder:)([^}]*)}/g;

content = content.replace(regex, (match, name, label, type, rest) => {
  let placeholder = `Ej: Ingrese ${label.toLowerCase()}`;
  
  if (name.includes('fecha')) placeholder = 'Ej: 2026-05-12';
  else if (type === 'number') placeholder = 'Ej: 100';
  else if (name.includes('porcentaje')) placeholder = 'Ej: 85';

  return `{ name: '${name}', label: '${label}', type: '${type}'${rest}, placeholder: '${placeholder}' }`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Placeholders added to regulatoryModules");
