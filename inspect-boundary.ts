import fs from 'fs';

function main() {
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  const blrHigh = compiled.filter((p: any) => p.code.startsWith('BLR-'));
  blrHigh.sort((a: any, b: any) => a.code.localeCompare(b.code));
  
  console.log('High BLR items and their images in full_catalog_compiled.json:');
  blrHigh.slice(-15).forEach((p: any) => {
    console.log(`Code: ${p.code}, Name: "${p.name}", Image: "${p.image}"`);
  });
}

main();
