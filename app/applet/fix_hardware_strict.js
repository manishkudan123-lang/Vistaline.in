const fs = require('fs');

const tsxPath = 'src/components/AllProducts.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');
const lines = tsxContent.split('\n');

// The sequence of codes in the PDF starting from box 84
const itemsWithPhotos = [
  "103",         // 84
  "105",         // 85
  "106",         // 86
  "PVC50",       // 87
  "PVC75",       // 88
  "PVC100",      // 89
  "PVC150",      // 90
  "CVT6",        // 91
  "CVT8",        // 92
  "CVT10",       // 93
  "CVT12",       // 94
  "CVT16",       // 95
  "MFT24",       // 96
  "R1-FMD-01",   // 97
  "R1-PFS-090",  // 98
  "R1-FS-120",   // 99
  "R1-PF-601",   // 100
  "R1-PF-602",   // 101
  "R1-PF-603",   // 102
  "R1-PF-604",   // 103
  "R1-FSACC-300",// 104
  "R1-DC-500",   // 105
  "R1-DC-2000",  // 106
  "R1-DC-01",    // 107
  "R1-DC-1400",  // 108
  "R1-TSS-05",   // 109
  "R1-TSS-04",   // 110
  "R1-SD-01",    // 111
  "R1-TSS-054",  // 112
  "R1-MH-1001",  // 113
  "R1-MH-1003",  // 114
  "R1-KH-03",    // 115
  "R1-CBSK-060", // 116
  "R1-CBSK-070", // 117
  "R1-COSK-060", // 118
  "R1-COSK-070", // 119
  "R1-ML-017",   // 120
];

const itemsToClear = new Set([
  "1841",
  "MSR8/10",
  "R1-ML-016",
  "DDS750",
  "DDS850",
  "DDS950",
  "DDS1050",
  "DDS1150",
  "25X300",
  "25X450",
  "25X300X450",
  "25X450X600",
  "25X600X900",
  "25X300 DB",
  "25X450 DB",
  "25X600 DB",
  "R1-GDH-057",
  "R1-EPH-01",
  "R1-GDH-056",
  "TB300",
  "TB600"
]);

// Prepare photo mapping
const photoMap = {};
let currentPhotoIndex = 84;
for (const code of itemsWithPhotos) {
    if (currentPhotoIndex <= 120) {
        photoMap[code] = currentPhotoIndex.toString().padStart(3, '0');
        currentPhotoIndex++;
    }
}

// Special case: we know that earlier I used code matching loosely (e.g., 25X300 might have "25X300 D Handle" as name but code might be different or the same).
// Let's just track the 'code' property.

let currentCode = null;
let replacedCount = 0;

for (let i = 0; i < lines.length; i++) {
    const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
        currentCode = codeMatch[1];
    }

    if (currentCode) {
        if (lines[i].includes('image: getImageUrl') || lines[i].includes('image: \'\'') || lines[i].includes('image: ""')) {
            // Find if this code needs an exact replacement
            const exactMappedVal = photoMap[currentCode];
            
            // Check if it's in itemsToClear
            let shouldClear = itemsToClear.has(currentCode);
            // also clear if it starts with DDS or 25X in case the code is slightly different in the array
            if (currentCode.startsWith('DDS') || currentCode.startsWith('25X') || currentCode.startsWith('TB')) {
                shouldClear = true;
            }

            if (exactMappedVal !== undefined) {
                // Apply precise image!
                lines[i] = lines[i].replace(/image:\s*(.*)$/, `image: getImageUrl("photo_${exactMappedVal}"),`);
                replacedCount++;
            } else if (shouldClear) {
                // Apply clear!
                lines[i] = lines[i].replace(/image:\s*(.*)$/, `image: '',`);
                replacedCount++;
            }
            // If neither, leave alone (like BLR-78, 107, 1842/161, 114 which were manually verified)
            
            currentCode = null; // reset for next item
        }
    }
}

fs.writeFileSync(tsxPath, lines.join('\n'));
console.log(`Hardware fixed! Updated ${replacedCount} products.`);
