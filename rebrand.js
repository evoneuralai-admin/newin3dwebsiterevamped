const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\home\\Desktop\\Evoneuralai-website-main\\Evoneuralai-website-main\\server\\client\\src';

const replacements = [
  { from: /Altie Reality Private Limited/g, to: 'Evoneural Artificial Intelligence .' },
  { from: /Altie Reality/g, to: 'Evoneural AI' },
  { from: /LearnXR/g, to: 'In3D.ai' },
  { from: /admin@altiereality.com/g, to: 'admin@in3d.ai' },
  { from: /\+91 8619953434/g, to: '+91 7023310122' }
];

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getFiles(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

console.log('Starting synchronous walkthrough (excluding node_modules)...');
const files = getFiles(targetDir);
console.log(`Found ${files.length} files. Starting replacements...`);

let count = 0;
files.forEach(file => {
  if (file.match(/\.(jsx|js|tsx|ts|html|css|json)$/)) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let newContent = content;
      replacements.forEach(r => {
        newContent = newContent.replace(r.from, r.to);
      });
      if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file}`);
        count++;
      }
    } catch (e) {
      console.error(`Error processing ${file}: ${e.message}`);
    }
  }
});

console.log(`Rebranding complete. Total ${count} files updated.`);
