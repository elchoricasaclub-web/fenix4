const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // FIX THE BROKEN ARROWS
  content = content.replace(/onChange=\{e\s*=\s*placeholder="[^"]*">\s*/g, 'onChange={e => ');
  content = content.replace(/onChange=\{\(e\)\s*=\s*placeholder="[^"]*">\s*/g, 'onChange={(e) => ');

  // NOW ADD PLACEHOLDERS CAREFULLY
  // We want to add placeholder-slate-500 placeholder:font-bold to className
  content = content.replace(/className=(["'{`])([^"'{`]+)(["'{`])/g, (match, p1, p2, p3) => {
    if (match.includes('placeholder-slate-500')) return match;
    if (match.includes('focus:outline-none') || match.includes('bg-slate-800') || match.includes('w-full px-3 py-2')) {
      return `className=${p1}placeholder-slate-500 placeholder:font-bold ${p2}${p3}`;
    }
    return match;
  });

  // Add generic placeholder if missing. We only target lines that have <input
  let lines = content.split('\n');
  lines = lines.map(line => {
    if (line.includes('<input') && !line.includes('type="checkbox"') && !line.includes('placeholder=')) {
      return line.replace('<input', '<input placeholder="Ej: Valor esperado"');
    }
    return line;
  });
  
  content = lines.join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
});

// For guided components
const guidedDir = 'web/src/components/guided';
const guidedFiles = fs.readdirSync(guidedDir).filter(f => f.endsWith('.jsx'));

guidedFiles.forEach(file => {
  const filePath = path.join(guidedDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix classes
  content = content.replace(/className=\{\`([^\`]+)\`/g, (match, p1) => {
    if (p1.includes('border') && !p1.includes('placeholder-slate-400')) {
      return `className={\`placeholder-slate-400 placeholder:font-bold ${p1}\``;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});


console.log("Fixed inputs properly");
