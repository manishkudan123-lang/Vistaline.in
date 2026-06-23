import fs from 'fs';

function main() {
  if (!fs.existsSync('all_drive_files.json')) {
    console.log('all_drive_files.json does not exist');
    return;
  }
  const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
  const photos = files.filter((f: any) => f.name && f.name.toLowerCase().endsWith('.jpeg'));
  photos.sort((a: any, b: any) => a.name.localeCompare(b.name));
  
  console.log(`Found ${photos.length} photos:`);
  photos.forEach((p: any, idx: number) => {
    console.log(`${idx + 1}. Name: ${p.name}, ID: ${p.id}`);
  });
}

main();
