import fs from 'fs';
const data = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf-8'));
for(const item of data) {
    if (item.code.startsWith('BLR') || parseInt(item.image.split('_')[1]) >= 70) {
        // console.log(`${item.code}: ${item.image}`);
    }
}
const startIndex = data.findIndex(i => i.code === 'BLR-70');
const endIndex = Math.min(startIndex + 15, data.length);
for(let i = startIndex; i < endIndex; i++) {
    console.log(`${data[i].code} (${data[i].name}): ${data[i].image}`);
}
