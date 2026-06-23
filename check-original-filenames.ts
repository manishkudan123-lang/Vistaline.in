import fs from 'fs';

function main() {
  const content = fs.readFileSync('all_drive_files.json', 'utf8');
  const files = JSON.parse(content);
  
  // Let's filter files that are images and print their names and IDs.
  const images = files.filter((f: any) => f.mimeType && f.mimeType.startsWith('image/'));
  console.log(`Found ${images.length} images.`);
  
  // Print first 50 image names
  console.log('Sample of image filenames and IDs from Google Drive:');
  images.slice(0, 80).forEach((img: any) => {
    console.log(`- ID: ${img.id}, Name: ${img.name}, MIME: ${img.mimeType}`);
  });
}

main();
