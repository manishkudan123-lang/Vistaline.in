const fs = require('fs');
const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
let code = null;
for (let line of lines) {
  let cMatch = line.match(/code:\s*"([^"]+)"/);
  if (cMatch) code = cMatch[1];
  let iMatch = line.match(/image:\s*getImageUrl\("photo_(\d+)"\)/);
  if (iMatch && code) {
    let numStr = iMatch[1];
    let num = parseInt(numStr, 10);
    if (num >= 70 && num <= 85) {
      console.log(`${code} -> ${numStr}`);
    }
    code = null;
  }
}
