const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the arrow function bug
  content = content.replace(/e = placeholder="Ej: Valor esperado">/g, 'e =>');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Fixed arrow functions");
