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

  const nonBlr = products.filter((p: any) => !p.code.startsWith('BLR-'));
  console.log(`Found ${nonBlr.length} non-BLR products out of ${products.length} total products:`);
  nonBlr.forEach((p: any, index: number) => {
    console.log(`${index + 1}. Code: ${p.code}, Name: "${p.name}", Image: "${p.image}"`);
  });
}

main();
