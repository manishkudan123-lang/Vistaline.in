import fs from 'fs';

function main() {
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log('--- Product mappings in full_catalog_compiled.json with image >= photo_100 ---');
  compiled.forEach((p: any) => {
    if (p.image && p.image.startsWith('photo_')) {
      const num = parseInt(p.image.replace('photo_', ''));
      if (num >= 100) {
        console.log(`Code: ${p.code}, Name: "${p.name}", Image: "${p.image}"`);
      }
    }
  });
}

main();
