import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');
  const startToken = 'const productsData: Product[] = [';
  const startIdx = content.indexOf(startToken);
  if (startIdx === -1) return;
  const arrayContent = content.substring(startIdx + startToken.length - 1);
  const endIdx = arrayContent.indexOf('];');
  const fullBlock = arrayContent.substring(0, endIdx + 2);
  const getImageUrl = (key: string) => key;
  const products = eval(`(function(getImageUrl){ return ${fullBlock}; })`)(getImageUrl);

  console.log('--- Current BLR mappings in AllProducts.tsx ---');
  products.forEach((p: any) => {
    if (p.code.startsWith('BLR-')) {
      console.log(`Code: ${p.code}, Name: "${p.name}", Image: ${JSON.stringify(p.image)}`);
    }
  });
}

main();
