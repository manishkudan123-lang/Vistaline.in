const fs = require('fs');

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let currentCode = null;

const group1 = ['R1-MH-1001', 'R1-MH-1003'];
const group2 = ['DDS750', 'DDS850', 'DDS950', 'DDS1050', 'DDS1150'];
const group3 = [
  '25X300-D', '25X450-D', '25X300X450-H', '25X450X600-H', '25X600X900-H',
  '25X300-DB', '25X450-DB', '25X600-DB', 'TB300', 'TB600'
];
const group4 = [
  'R1-KH-03', 'R1-CBSK-060', 'R1-CBSK-070', 'R1-COSK-060', 'R1-COSK-070',
  'R1-ML-017', 'R1-ML-016', 'R1-GDH-057'
];

for (let i = 0; i < lines.length; i++) {
  const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
  if (codeMatch) {
    currentCode = codeMatch[1];
  }

  if (currentCode) {
    if (lines[i].includes('image: getImageUrl')) {
      let replacement = null;
      if (group1.includes(currentCode)) replacement = '117';
      else if (group2.includes(currentCode)) replacement = '118';
      else if (group3.includes(currentCode)) replacement = '119';
      else if (group4.includes(currentCode)) replacement = '120';

      if (replacement) {
        lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_' + replacement + '"),');
      }
      currentCode = null; // reset until next code block
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Groups assigned!");
