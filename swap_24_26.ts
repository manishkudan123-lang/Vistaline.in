import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
let code24line = -1;
let code26line = -1;

for (let i = 0; i < lines.length; i++) {
   if (lines[i].includes('code: "BLR-24"')) {
       for (let j = i; j < i + 10; j++) {
           if (lines[j].includes('image: getImageUrl')) {
               code24line = j;
               break;
           }
       }
   }
   if (lines[i].includes('code: "BLR-26"')) {
       for (let j = i; j < i + 10; j++) {
           if (lines[j].includes('image: getImageUrl')) {
               code26line = j;
               break;
           }
       }
   }
}

if (code24line !== -1 && code26line !== -1) {
    const val24 = lines[code24line].match(/image:\s*(.*)$/)[1];
    const val26 = lines[code26line].match(/image:\s*(.*)$/)[1];

    lines[code24line] = lines[code24line].replace(/image:\s*(.*)$/, 'image: ' + val26);
    lines[code26line] = lines[code26line].replace(/image:\s*(.*)$/, 'image: ' + val24);

    fs.writeFileSync(filePath, lines.join('\n'));
    console.log("Swapped 24 and 26!");
} else {
    console.log("Could not find lines!");
}
