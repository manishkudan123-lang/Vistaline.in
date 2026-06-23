import fs from 'fs';

function main() {
  if (fs.existsSync('all_drive_files.json')) {
    const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
    console.log(`Loaded ${files.length} drive files`);
    
    // Sort or filter photo files
    const photos = files.filter((f: any) => f.name && f.name.toLowerCase().includes('photo'));
    photos.sort((a: any, b: any) => a.name.localeCompare(b.name));
    console.log(`Found ${photos.length} photos. First 10 and last 10:`);
    photos.slice(0, 10).forEach((f: any) => console.log(`  - ${f.name} (id: ${f.id})`));
    console.log('...');
    photos.slice(-15).forEach((f: any) => console.log(`  - ${f.name} (id: ${f.id})`));
  } else {
    console.log('all_drive_files.json does not exist');
  }
}

main();
