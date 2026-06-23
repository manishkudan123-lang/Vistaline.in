import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');
  
  // Look for the productsData array
  const startToken = 'const productsData: Product[] = [';
  const startIndex = content.indexOf(startToken);
  if (startIndex === -1) {
    console.error(`Could not find productsData array!`);
    return;
  }
  
  // Let's approximate the array content
  const arrayContent = content.substring(startIndex + startToken.length - 1);
  // Find where it ends
  const endToken = '];';
  const endIndex = arrayContent.indexOf(endToken);
  if (endIndex === -1) {
    console.error(`Could not find end of productsData!`);
    return;
  }
  
  const fullArrayBlock = arrayContent.substring(0, endIndex + 2);
  
  // We can write a simple parser to extract all products or we can load them using a Sandbox Function.
  // Let's build a clean evaluator by mocking getImageUrl
  const getImageUrl = (key: string) => key;
  const products = eval(`(function(getImageUrl){ return ${fullArrayBlock}; })`)(getImageUrl);
  
  console.log(`Loaded ${products.length} products from src/components/AllProducts.tsx`);
  
  // Check image usage counts
  const imageUsage = new Map<string, string[]>(); // imageKey -> productCodes[]
  products.forEach((p: any) => {
    // Extract the image key from getImageUrl("...") or raw string
    let imgKey = p.image || '';
    if (imageUsage.has(imgKey)) {
      imageUsage.get(imgKey)!.push(p.code);
    } else {
      imageUsage.set(imgKey, [p.code]);
    }
  });

  console.log(`\n--- Products with NO images: ---`);
  products.forEach((p: any) => {
    if (!p.image) {
      console.log(`ID: ${p.id}, Code: ${p.code}, Name: ${p.name}`);
    }
  });

  console.log(`\n--- Image keys used MULTIPLE times: ---`);
  let duplicateCount = 0;
  imageUsage.forEach((list, key) => {
    if (key && list.length > 1) {
      console.log(`Image key "${key}" used ${list.length} times by codes: ${list.join(', ')}`);
      duplicateCount++;
    }
  });
  console.log(`Total duplicate image keys used: ${duplicateCount}`);
}

main();
