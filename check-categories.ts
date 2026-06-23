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
  const categories = new Set(nonBlr.map((p: any) => p.category));
  console.log('Categories of non-BLR:', Array.from(categories));
}

main();
