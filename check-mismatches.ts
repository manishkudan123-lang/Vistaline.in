import fs from 'fs';

function main() {
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  console.log(`Checking ${compiled.length} products...`);
  
  compiled.forEach((p: any) => {
    // Check if the code starts with BLR- (followed by numbers)
    const match = p.code.match(/^BLR-0*(\d+)([A-Z]*)$/i);
    if (match) {
      const CodeNum = parseInt(match[1]);
      const suffix = match[2]; // e.g., A for BLR-30A
      
      if (p.image) {
        // Extract number from photo_XXX
        const imageMatch = p.image.match(/photo_0*(\d+)/i);
        if (imageMatch) {
          const imageNum = parseInt(imageMatch[1]);
          if (CodeNum !== imageNum) {
            console.log(`⚠️ MISMATCH or SPECIAL CASE: Product code ${p.code} (num=${CodeNum}) is mapped to image "${p.image}" (num=${imageNum})`);
          }
        } else {
          console.log(`ℹ️ Image key doesn't match photo_0* syntax: ${p.code} has image "${p.image}"`);
        }
      } else {
        console.log(`ℹ️ Product ${p.code} has NO image.`);
      }
    } else {
      // For other categories like R1-PF-604, DDS750, etc.
      // Let's see what their images are
      if (p.image) {
        console.log(`ℹ️ Non-BLR Product ${p.code} has image "${p.image}"`);
      }
    }
  });
}

main();
