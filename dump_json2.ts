import fs from 'fs';
const data = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf-8'));
const startIndex = data.findIndex(i => i.code === '1841');
const endIndex = Math.min(startIndex + 40, data.length);
for(let i = startIndex; i < endIndex; i++) {
    console.log(`${data[i].code} (${data[i].name}): ${data[i].image}`);
}
