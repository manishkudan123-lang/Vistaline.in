import fs from 'fs';

const tsxPath = 'src/components/AllProducts.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');
const lines = tsxContent.split('\n');

// The EXACT sequence of product codes that have a picture box in the PDF, in order.
const itemsWithPhotos = [
  "BLR-74", // 075
  "BLR-75", // 076
  "BLR-76", // 077
  "BLR-77", // 078
  "BLR-77A", // 079
  "BLR-78", // 080
  "107", // 081
  "1842/161", // 082
  "114", // 083
  "103", // 084
  "105", // 085
  // "1841" is BLANK, skip
  "106", // 086
  "PVC50", // 087
  "PVC75", // 088
  "PVC100", // 089
  "PVC150", // 090
  "CVT6", // 091
  "CVT8", // 092
  "CVT10", // 093
  "CVT12", // 094
  "CVT16", // 095
  "MFT24", // 096
  // "MSR8/10" is BLANK, skip
  "R1-FMD-01", // 097
  "R1-PFS-090", // 098
  "R1-FS-120", // 099
  "R1-PF-601", // 100
  "R1-PF-602", // 101
  "R1-PF-603", // 102
  "R1-PF-604", // 103
  "R1-FSACC-300", // 104
  "R1-DC-500", // 105
  "R1-DC-2000", // 106
  "R1-DC-01", // 107
  "R1-DC-1400", // 108
  "R1-TSS-05", // 109
  "R1-TSS-04", // 110
  "R1-SD-01", // 111
  "R1-TSS-054", // 112
  "R1-MH-1001", // 113
  "R1-MH-1003", // 114
  "R1-KH-03", // 115
  "R1-CBSK-060", // 116
  "R1-CBSK-070", // 117
  "R1-COSK-060", // 118
  "R1-COSK-070", // 119
  "R1-ML-017", // 120
  
  // Remaining items that would theoretically get photos, but we run out at 120!
  "R1-ML-016", // 121? Doesn't exist, will be blank.
  // The DDS items share one big image in the PDF, maybe we assign nothing since we ran out.
];

// Items we explicitly KNOW run into a problem or should be blank past BLR-73
const skipItems = new Set([
  "1841",
  "MSR8/10"
]);

let currentCode: string | null = null;
let inScope = false;

// Create a mapping dictionary based on the array
const photoMap: Record<string, string> = {};
let currentPhotoIndex = 75; // START FROM 075
for (const code of itemsWithPhotos) {
    if (currentPhotoIndex <= 120) {
        photoMap[code] = currentPhotoIndex.toString().padStart(3, '0');
        currentPhotoIndex++;
    } else {
        photoMap[code] = ""; // Out of photos
    }
}

for (let i = 0; i < lines.length; i++) {
    const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
        currentCode = codeMatch[1];
        if (currentCode === "BLR-74") {
            inScope = true; 
        }
    }

    if (currentCode && inScope) {
        if (lines[i].includes('image: getImageUrl') || lines[i].includes('image: \'\'') || lines[i].includes('image: \"\"')) {
            const mappedVal = photoMap[currentCode];
            
            if (skipItems.has(currentCode) || mappedVal === undefined || mappedVal === "") {
                // If it's a known blank item, or past 120, or an item not in PDF boxes
                lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: \'\',');
            } else {
                lines[i] = lines[i].replace(/image:\s*(.*)$/, `image: getImageUrl("photo_${mappedVal}"),`);
            }
            
            // Mark processed
            currentCode = null;
        }
    }
}

fs.writeFileSync(tsxPath, lines.join('\n'));
console.log("Strict PDF sequential mapping applied!");
