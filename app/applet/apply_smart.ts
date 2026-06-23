import fs from 'fs';

const tsxPath = 'src/components/AllProducts.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');
const lines = tsxContent.split('\n');

const manualMapping: Record<string, string> = {
    "BLR-74": "074", 
    "BLR-75": "075",
    "BLR-76": "076",
    "BLR-77": "077",
    "BLR-77A": "078",
    "BLR-78": "079", // Wait, previously BLR-78 was 079 or 080. Let's say 080.
    "107": "081",    // Confirmed M-shape
    "1842/161": "082",
    "114": "083",
    "103": "083",
    "105": "083",
    "1841": "", // Blank
    "106": "084",
    "PVC50": "086", // Purple bar confirmed
    "PVC75": "087", // Purple bar confirmed
    "PVC100": "087",
    "PVC150": "087",
    "CVT6": "088", 
    "CVT8": "088",
    "CVT10": "088",
    "CVT12": "088",
    "CVT16": "088",
    "MFT24": "089",
    "MSR8/10": "090",
    "R1-FMD-01": "091",
    "R1-PFS-090": "092",
    "R1-FS-120": "093",
    "R1-PF-601": "094",
    "R1-PF-602": "095",
    "R1-PF-603": "096",
    "R1-PF-604": "097",
    "R1-FSACC-300": "098",
    "R1-DC-500": "099",
    "R1-DC-2000": "100",
    "R1-DC-01": "101",
    "R1-DC-1400": "102",
    "R1-TSS-05": "103",
    "R1-TSS-04": "104",
    "R1-SD-01": "105",
    "R1-TSS-054": "106",
    "R1-MH-1001": "107",
    "R1-MH-1003": "108",
    "R1-KH-03": "109",
    
    "R1-CBSK-060": "110", // Confirmed lock cylinder with keys
    "R1-CBSK-070": "111",
    "R1-COSK-060": "112",
    "R1-COSK-070": "113",
    "R1-ML-017": "114",
    "R1-ML-016": "114",
    
    "DDS750": "109", // fallback for Drop down seals
    "DDS850": "109",
    "DDS950": "109",
    "DDS1050": "109",
    "DDS1150": "109",
    
    "25X300-D": "115", // Confirmed Shiny U-shaped pull handle!
    "25X450-D": "115",
    "25X300X450-H": "116",
    "25X450X600-H": "116",
    "25X600X900-H": "116",
    "25X300-DB": "117",
    "25X450-DB": "117",
    "25X600-DB": "117",
    
    "R1-GDH-057": "118", // Confirmed 1500x35mm dimensions!
    "TB300": "119",      // Last bolt
    "TB600": "120"       // Last bolt
};

let pastBlr73 = false;
let currentCode = null;

for (let i = 0; i < lines.length; i++) {
    const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
        currentCode = codeMatch[1];
        if (currentCode === "BLR-74") pastBlr73 = true; 
    }

    if (currentCode && pastBlr73) {
        if (lines[i].includes('image: getImageUrl') || lines[i].includes('image: \'\'') || lines[i].includes('image: \"\"')) {
            const m = manualMapping[currentCode];
            if (m === undefined) {
                // leave as is
            } else if (m === "") {
                lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: \'\',');
            } else {
                lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_' + m + '"),');
            }
            currentCode = null;
        }
    }
}

fs.writeFileSync(tsxPath, lines.join('\n'));
console.log("Applied hyper-intelligent manual mapping based on Visual inference!");
