import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let currentCode = null;

for (let i = 0; i < lines.length; i++) {
   const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
   if (codeMatch) {
       currentCode = codeMatch[1];
   }

   if (currentCode) {
       if (lines[i].includes('image: getImageUrl')) {
           if (currentCode === 'BLR-65') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_065"),');
           } else if (currentCode === 'BLR-66') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_066"),');
           } else if (currentCode === 'BLR-67') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_067"),');
           } else if (currentCode === 'BLR-68') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_068"),');
           } else if (currentCode === 'BLR-69') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_069"),');
           } else if (currentCode === 'BLR-70') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_070"),');
           } else if (currentCode === 'BLR-71') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_071"),');
           } else if (currentCode === 'BLR-72') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_072"),');
           } else if (currentCode === 'BLR-73') {
               lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_073"),');
           }
           currentCode = null;
       }
   }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Fixed 65 down to 73!");
