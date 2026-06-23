import fs from 'fs';

function main() {
  if (!fs.existsSync('full_catalog_compiled.json')) {
    console.log('full_catalog_compiled.json does not exist');
    return;
  }
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log(`full_catalog_compiled.json has ${compiled.length} products`);
  
  compiled.forEach((p: any, index: number) => {
    console.log(`${index + 1}. Code: ${p.code}, Name: "${p.name}", Image: "${p.image || ''}"`);
  });
}

main();
