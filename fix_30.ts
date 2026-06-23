import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// We are shifting images +1 starting from BLR-30.
// But wait, if I shift from 31 to 32, then what happens to BLR-30's photo?
// The user says "BLR 30 ki photo 31 me dal diya".
// So BLR-30 needs to receive the photo that is CURRENTLY in BLR-31.
// Currently BLR-31 has photo_032. So BLR-30 should get photo_032.
// Currently BLR-32 has photo_033. So BLR-31 should get photo_033.
// Wait, if BLR-30 gets photo_032, what gets photo_031?
// Currently BLR-30 has photo_031. It gets overwritten with photo_032. So photo_031 is no longer used!

const startIdx = content.indexOf('code: "BLR-30"');
const prefix = content.slice(0, startIdx);
let suffix = content.slice(startIdx);

for (let i = 150; i >= 31; i--) {
    const paddedOld = String(i).padStart(3, '0');
    const paddedNew = String(i + 1).padStart(3, '0');
    suffix = suffix.replaceAll(
        `getImageUrl("photo_${paddedOld}")`, 
        `getImageUrl("photo_${paddedNew}")`
    );
}

fs.writeFileSync(filePath, prefix + suffix);
console.log("Images shifted from 30 onwards successfully.");
