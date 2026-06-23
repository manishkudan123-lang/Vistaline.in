import fs from 'fs';

function main() {
  if (!fs.existsSync('full_catalog_compiled.json')) {
    console.log('full_catalog_compiled.json does not exist');
    return;
  }
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log(`Checking compiled products for EPH and GDH...`);
  compiled.forEach((p: any) => {
    if (p.code.includes('EPH') || p.code.includes('GDH')) {
      console.log(`Code: ${p.code}, Name: "${p.name}", Category: "${p.category}", Image: "${p.image}"`);
    }
  });
}

main();
