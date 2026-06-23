import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /code:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*image:\s*([^,]+),/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  console.log(`${match[1]} | ${match[4]}`);
  count++;
}
console.log(`Total: ${count}`);
