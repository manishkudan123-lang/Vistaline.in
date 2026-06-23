import fs from 'fs';

function main() {
  const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
  const nonImages = files.filter((f: any) => !f.mimeType || !f.mimeType.startsWith('image/'));
  console.log('Non-image files in Google Drive:', nonImages);
}

main();
