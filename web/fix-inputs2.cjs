const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Revert bad arrow functions
  content = content.replace(/e = placeholder="Ej: Valor esperado"> handleInputChange/g, 'e => handleInputChange');

  // Fix classes for input and select if not already fixed properly
  content = content.replace(/(<input[^>]*className=["'{`])([^"'{`]+)(["'{`])/g, (match, p1, p2, p3) => {
    if (match.includes('placeholder-slate-500')) return match;
    if (p2.includes('placeholder-slate-500')) return match;
    if (match.includes('focus:outline-none') || match.includes('bg-slate-800')) {
      return `${p1}${p2} placeholder-slate-500 placeholder:font-bold${p3}`;
    }
    return match;
  });

  // Add generic placeholder if missing
  content = content.replace(/(<input[^>]+)/g, (match) => {
    if (match.includes('type="checkbox"')) return match;
    if (!match.includes('placeholder=')) {
      return `${match} placeholder="Ej: Valor esperado"`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Done");
