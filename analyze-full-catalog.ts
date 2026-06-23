import fs from 'fs';

function main() {
  if (!fs.existsSync('full_catalog_compiled.json')) {
    console.error('full_catalog_compiled.json does not exist!');
    return;
  }
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log(`full_catalog_compiled.json contains ${compiled.length} products.`);
  
  // Print first 5 items
  console.log('First 5 items from compiled:');
  console.log(compiled.slice(0, 5));
}

main();
