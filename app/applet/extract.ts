import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /code:\s*"([^"]+)",[\s\S]*?image:\s*([^,]+),/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  if (count < 100) {
    console.log(`${match[1]} | ${match[2]}`);
  }
  count++;
}
console.log(`Total: ${count}`);
