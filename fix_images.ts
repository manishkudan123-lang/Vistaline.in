import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const blr08Idx = content.indexOf('code: "BLR-08"');
const prefix = content.slice(0, blr08Idx);
let suffix = content.slice(blr08Idx);

// First, fix BLR-08's empty string to what it will be shifted FROM.
// Currently BLR-08 has `image: '',` and will become `getImageUrl("photo_009")`.
suffix = suffix.replace(/name: "Corner Guard 19x19",\n\s*category: "Accessories",\n\s*image: '',/, 'name: "Corner Guard 19x19",\n    category: "Accessories",\n    image: getImageUrl("photo_008"),');

// Now shift EVERYTHING in suffix up by 1.
// We count down from 99 to 8 so we don't double replace.
for (let i = 150; i >= 8; i--) {
    const paddedOld = String(i).padStart(3, '0');
    const paddedNew = String(i + 1).padStart(3, '0');
    suffix = suffix.replaceAll(
        `getImageUrl("photo_${paddedOld}")`, 
        `getImageUrl("photo_${paddedNew}")`
    );
}

fs.writeFileSync(filePath, prefix + suffix);
console.log("Images shifted successfully.");
