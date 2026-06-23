import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /code:\s*"([^"]+)",[\s\S]*?image:\s*([^,]+),/g;
let match;
while ((match = regex.exec(content)) !== null) {
  let numMatch = match[2].match(/photo_(\d+)/);
  if (numMatch) {
    let num = parseInt(numMatch[1], 10);
    if (num >= 70 && num <= 120) {
      console.log(`${match[1]} | ${match[2]}`);
    }
  }
}
