import fs from 'fs';

const groundTruthPath = 'full_catalog_compiled.json';
const tsxPath = 'src/components/AllProducts.tsx';

const groundTruthRaw = fs.readFileSync(groundTruthPath, 'utf-8');
const groundTruth = JSON.parse(groundTruthRaw);

const gtMap = {};
for (const item of groundTruth) {
    if (item.image) {
        gtMap[item.code] = item.image;
    }
}

let tsxContent = fs.readFileSync(tsxPath, 'utf-8');
const lines = tsxContent.split('\n');

let currentCode = null;

for (let i = 0; i < lines.length; i++) {
    const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
        currentCode = codeMatch[1];
    }

    if (currentCode) {
        if (lines[i].includes('image: getImageUrl') || lines[i].includes('image: \'\'')) {
            const trueImage = gtMap[currentCode];
            if (trueImage) {
                // Completely overwrite whatever image was there
                lines[i] = lines[i].replace(/image:\s*(.*)$/, `image: getImageUrl("${trueImage}"),`);
            }
            currentCode = null; // reset for next 
        }
    }
}

fs.writeFileSync(tsxPath, lines.join('\n'));
console.log("Ultimate fix applied!");
