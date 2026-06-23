import fs from 'fs';
const data = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf-8'));
let noImageCount = 0;
for(const item of data) {
    if (!item.image) {
        console.log(`Missing image for: ${item.code} - ${item.name}`);
        noImageCount++;
    }
}
console.log(`Total missing: ${noImageCount}`);
