import fs from 'fs';

function main() {
  const compiled = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
  const usedPhotos = new Set<string>();
  
  compiled.forEach((p: any) => {
    if (p.image) {
      usedPhotos.add(p.image);
    }
  });

  const unusedPhotos: string[] = [];
  for (let i = 1; i <= 120; i++) {
    const padNum = String(i).padStart(3, '0');
    const photoKey = `photo_${padNum}`;
    if (!usedPhotos.has(photoKey)) {
      unusedPhotos.push(photoKey);
    }
  }

  console.log('Unused photo keys in range photo_001 to photo_120:');
  console.log(unusedPhotos);
  console.log(`Total unused photo keys: ${unusedPhotos.length}`);
}

main();
