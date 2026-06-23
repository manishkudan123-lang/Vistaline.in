import fs from 'fs';

function main() {
  if (!fs.existsSync('upgraded_mapping.json')) {
    console.log('upgraded_mapping.json does not exist');
    return;
  }
  const mapping = JSON.parse(fs.readFileSync('upgraded_mapping.json', 'utf8'));
  console.log(`upgraded_mapping.json has ${Object.keys(mapping).length} entries.`);
  
  // Let's print all entries that are non-BLR or match some patterns
  let nonBlrCount = 0;
  for (const [key, val] of Object.entries(mapping)) {
    const v = val as any;
    const code = v.code || v.productCode || '';
    if (code && !code.startsWith('BLR-')) {
      nonBlrCount++;
      console.log(`Key: ${key} -> Code: ${code}, Name: "${v.name || v.productName}", Image: "${v.image || v.image_file || v.photo_id}"`);
    }
  }
  console.log(`Total non-BLR in upgraded_mapping.json: ${nonBlrCount}`);
}

main();
