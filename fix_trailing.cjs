const fs = require('fs');

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
let currentCode = null;

let insideTrailing = false; // Will trigger when we reach "107"

for (let i = 0; i < lines.length; i++) {
  const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
  if (codeMatch) {
    currentCode = codeMatch[1];
    if (currentCode === "107") insideTrailing = true;
  }

  // Fix BLR-77A and BLR-78 manually right as they appear
  if (currentCode === "BLR-77A" && lines[i].match(/image:\s*getImageUrl/)) {
    lines[i] = lines[i].replace(/image:\s*(.*)$/, "image: '',");
  } else if (currentCode === "BLR-78" && lines[i].match(/image:\s*getImageUrl/)) {
    lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_079"),');
  }

  if (insideTrailing) {
     const imageMatch = lines[i].match(/image:\s*getImageUrl\("photo_(\d+)"\)/);
     if (imageMatch) {
        let num = parseInt(imageMatch[1], 10);
        let newNum = num - 2;
        let pNew = String(newNum).padStart(3, '0');
        lines[i] = lines[i].replace(/image:\s*(.*)$/, "image: getImageUrl(\"photo_" + pNew + "\"),");
     }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Trailing fixed!");
