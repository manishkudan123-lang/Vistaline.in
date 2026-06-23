import fs from 'fs';

function main() {
  if (!fs.existsSync('full_catalog_compiled.json')) {
    console.log('full_catalog_compiled.json does not exist');
    return;
  }
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log(`compiled has ${compiled.length} products`);
  
  const nonBlr = compiled.filter((p: any) => !p.code.startsWith('BLR-'));
  console.log(`Found ${nonBlr.length} non-BLR products:`);
  nonBlr.forEach((p: any, index: number) => {
    console.log(`${index + 1}. Code: ${p.code}, Name: "${p.name}", Image: "${p.image}"`);
  });
}

main();
