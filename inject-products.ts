import fs from 'fs';

function main() {
  const fileContent = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');
  
  const upgradedMapping = JSON.parse(fs.readFileSync('upgraded_mapping.json', 'utf8'));
  const fullCatalog = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8')) as any[];

  // 1. Build string representation for photoMappings
  let mappingStr = 'const photoMappings: Record<string, string> = {\n';
  const sortedKeys = Object.keys(upgradedMapping).sort();
  sortedKeys.forEach(key => {
    mappingStr += `  "${key}": "${upgradedMapping[key]}",\n`;
  });
  mappingStr += '};';

  // 2. Build string representation for productsData
  let productsStr = 'const productsData: Product[] = [\n';
  fullCatalog.forEach((p, idx) => {
    productsStr += '  {\n';
    productsStr += `    id: "${p.id}",\n`;
    productsStr += `    code: "${p.code}",\n`;
    productsStr += `    name: ${JSON.stringify(p.name)},\n`;
    productsStr += `    category: "${p.category}",\n`;
    // If image is a key like 'photo_XXX', format as getImageUrl("photo_XXX"), otherwise as standard ''
    if (p.image) {
      productsStr += `    image: getImageUrl("${p.image}"),\n`;
    } else {
      productsStr += `    image: '',\n`;
    }
    productsStr += `    desc: ${JSON.stringify(p.desc)},\n`;
    productsStr += `    material: ${JSON.stringify(p.material)},\n`;
    productsStr += `    finish: ${JSON.stringify(p.finish)},\n`;
    productsStr += `    size: ${JSON.stringify(p.size)}\n`;
    productsStr += idx === fullCatalog.length - 1 ? '  }\n' : '  },\n';
  });
  productsStr += '];';

  // Find photoMappings in AllProducts.tsx
  const mappingStartIdx = fileContent.indexOf('const photoMappings: Record<string, string> = {');
  if (mappingStartIdx === -1) {
    console.error('Could not find photoMappings start');
    return;
  }
  const mappingEndIdx = fileContent.indexOf('};', mappingStartIdx) + 2;
  
  // Replace mapping
  let newContent = fileContent.substring(0, mappingStartIdx) + mappingStr + fileContent.substring(mappingEndIdx);

  // Find productsData in the *new* content
  const productsStartIdx = newContent.indexOf('const productsData: Product[] = [');
  if (productsStartIdx === -1) {
    console.error('Could not find productsData start');
    return;
  }
  
  // Find productsData end mapping matching [] brackets
  let bracketCount = 1;
  let productsEndIdx = -1;
  const searchStr = newContent.substring(productsStartIdx + 'const productsData: Product[] = ['.length);
  
  for (let i = 0; i < searchStr.length; i++) {
    if (searchStr[i] === '[') {
      bracketCount++;
    } else if (searchStr[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        productsEndIdx = productsStartIdx + 'const productsData: Product[] = ['.length + i;
        break;
      }
    }
  }

  if (productsEndIdx === -1) {
    console.error('Could not find productsData end bracket');
    return;
  }

  // Replace productsData
  newContent = newContent.substring(0, productsStartIdx) + productsStr + newContent.substring(productsEndIdx + 1);

  // Now, let's fix any static counts on categories like 'All Products (50)' to dynamically render productsData.length!
  // 'All Products (50)' exists at multiple places. Let's make it dynamic!
  newContent = newContent.replace(/'All Products \(50\)'/g, '`All Products (${productsData.length})`');
  newContent = newContent.replace(/"All Products \(50\)"/g, '`All Products (${productsData.length})`');
  newContent = newContent.replace(/{cat === 'All' \? 'All Products \(50\)' : cat}/g, "{cat === 'All' ? `All Products (${productsData.length})` : cat}");
  newContent = newContent.replace(/{selectedCategory === 'All' \? 'All Products \(50\)' : selectedCategory}/g, "{selectedCategory === 'All' ? `All Products (${productsData.length})` : selectedCategory}");
  newContent = newContent.replace(/cat === 'All' \? 'All Products \(50\)' : cat/g, "cat === 'All' ? `All Products (${productsData.length})` : cat");

  fs.writeFileSync('src/components/AllProducts.tsx', newContent);
  console.log('Successfully injected 132 products and 119 photo mappings into AllProducts.tsx!');
}

main();
