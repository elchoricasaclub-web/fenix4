const fs = require('fs');
const path = require('path');

const dir = 'web/src/components/extraction';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find all <input ...> tags and modify them.
  let newContent = '';
  let inInput = false;
  let currentInput = '';
  for (let i = 0; i < content.length; i++) {
    if (!inInput && content.substring(i, i + 6) === '<input') {
      inInput = true;
      currentInput = '<input';
      i += 5;
    } else if (inInput) {
      currentInput += content[i];
      if (content[i] === '>' || (content[i] === '/' && content[i+1] === '>')) {
        if (content[i] === '/' && content[i+1] === '>') {
           currentInput += '>';
           i++;
        }
        inInput = false;

        // Now modify currentInput
        if (currentInput.includes('type="checkbox"')) {
           newContent += currentInput;
           continue;
        }

        // Add class
        if (currentInput.includes('className="')) {
           currentInput = currentInput.replace('className="', 'className="placeholder-slate-500 placeholder:font-bold ');
        } else if (currentInput.includes('className={`')) {
           currentInput = currentInput.replace('className={`', 'className={`placeholder-slate-500 placeholder:font-bold ');
        }

        // Add placeholder if missing
        if (!currentInput.includes('placeholder=')) {
           currentInput = currentInput.replace('/>', ' placeholder="Ej: Valor" />').replace('>', ' placeholder="Ej: Valor">');
        }

        newContent += currentInput;
      }
    } else {
      newContent += content[i];
    }
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
});

console.log("Inputs updated");
