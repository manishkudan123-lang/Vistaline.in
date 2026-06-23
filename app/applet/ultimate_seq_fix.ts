import fs from 'fs';

const tsxPath = 'src/components/AllProducts.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');
const lines = tsxContent.split('\n');

let pastBlr73 = false;
let currentCode = null;
let photoIndex = 74;

for (let i = 0; i < lines.length; i++) {
    const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
        currentCode = codeMatch[1];
        if (currentCode === "BLR-74") {
            pastBlr73 = true; 
        }
    }

    if (currentCode && pastBlr73) {
        if (lines[i].includes('image: getImageUrl') || lines[i].includes('image: \'\'') || lines[i].includes('image: \"\"')) {
            if (photoIndex <= 120) {
                const photoStr = photoIndex.toString().padStart(3, '0');
                lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_' + photoStr + '"),');
                photoIndex++;
            } else {
                lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: \'\',');
            }
            currentCode = null;
        }
    }
}

fs.writeFileSync(tsxPath, lines.join('\n'));
console.log("Ultimate sequenced fix applied from BLR-74 to the end!");
