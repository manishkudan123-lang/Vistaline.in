import fs from 'fs';

function main() {
  if (!fs.existsSync('all_drive_files.json')) {
    console.log('all_drive_files.json does not exist');
    return;
  }
  const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
  console.log(`Searching all_drive_files.json for keyword patterns...`);
  
  const keywords = ['EPH', 'GDH', '056', '057'];
  files.forEach((file: any) => {
    const name = file.name || '';
    const nameUpper = name.toUpperCase();
    keywords.forEach(kw => {
      if (nameUpper.includes(kw)) {
        console.log(`Found file: ID ${file.id}, Name: "${file.name}"`);
      }
    });
  });
}

main();
