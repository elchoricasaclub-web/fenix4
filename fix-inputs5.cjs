const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove any previously added placeholder classes to avoid duplicates
  content = content.replace(/placeholder-slate-500 placeholder:font-bold /g, '');
  content = content.replace(/ placeholder-slate-500 placeholder:font-bold/g, '');

  // Add them safely after focus:outline-none or bg-slate-800
  // Since almost all extraction inputs have focus:outline-none
  content = content.replace(/focus:outline-none/g, 'focus:outline-none placeholder-slate-500 placeholder:font-bold');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Fixed classes");
