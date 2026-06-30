const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix classes for input and select
  content = content.replace(/(<input[^>]*className=["'{\`])([^"'}]+)(["'}\`])/g, (match, p1, p2, p3) => {
    if (!p2.includes('placeholder-slate-500')) {
      return `${p1}${p2} placeholder-slate-500 placeholder:font-bold${p3}`;
    }
    return match;
  });

  // Add a generic placeholder if missing to input text/number
  content = content.replace(/(<input[^>]*type=["'](?:text|number)["'][^>]*)(\/?>)/g, (match, p1, p2) => {
    if (!p1.includes('placeholder=')) {
      return `${p1} placeholder="Ej: Valor esperado"${p2}`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

// Also fix Guided components
const guidedDir = 'web/src/components/guided';
const guidedFiles = fs.readdirSync(guidedDir).filter(f => f.endsWith('.jsx'));

guidedFiles.forEach(file => {
  const filePath = path.join(guidedDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add placeholder style to className
  content = content.replace(/className={\`([^\`]+)\`/g, (match, p1) => {
    if (p1.includes('border') && !p1.includes('placeholder-slate-400')) {
      return `className={\`${p1} placeholder-slate-400 placeholder:font-bold\``;
    }
    return match;
  });

  // Ensure fallback placeholder logic in Guided components
  // In GuidedInput.jsx
  if (file === 'GuidedInput.jsx') {
     content = content.replace(/placeholder={placeholder}/g, 'placeholder={placeholder || `Ej: Ingrese ${label ? label.toLowerCase() : "valor"}`}');
  }
  if (file === 'GuidedTextarea.jsx') {
     content = content.replace(/placeholder={placeholder}/g, 'placeholder={placeholder || `Ej: Detalle ${label ? label.toLowerCase() : "información"}...`}');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});


console.log("Done");
