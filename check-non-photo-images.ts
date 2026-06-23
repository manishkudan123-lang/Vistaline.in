import fs from 'fs';

function main() {
  const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
  const images = files.filter((f: any) => f.mimeType && f.mimeType.startsWith('image/'));
  
  const nonPhotoImages = images.filter((img: any) => !img.name.startsWith('photo_'));
  console.log(`Found ${nonPhotoImages.length} images that do NOT start with 'photo_':`);
  nonPhotoImages.forEach((img: any) => {
    console.log(`- ID: ${img.id}, Name: ${img.name}, Size: ${img.size}`);
  });
}

main();
