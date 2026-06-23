const fs = require('fs');

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const regex = /code:\s*"([^"]+)",[\s\S]*?image:\s*getImageUrl\("photo_(\d+)"\)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  let numStr = match[2];
  let num = parseInt(numStr, 10);
  if (num >= 70 && num <= 85) {
     console.log(`${match[1]} -> ${numStr}`);
  }
}
