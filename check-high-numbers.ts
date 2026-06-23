import fs from 'fs';

function main() {
  if (!fs.existsSync('all_drive_files.json')) {
    console.log('all_drive_files.json does not exist');
    return;
  }
  const files = JSON.parse(fs.readFileSync('all_drive_files.json', 'utf8'));
  console.log(`Checking filenames for any number patterns...`);
  
  files.forEach((file: any) => {
    const name = file.name || '';
    const match = name.match(/photo_0*(\d+)/i);
    if (match) {
      const num = parseInt(match[1]);
      if (num > 120) {
        console.log(`Found photo with number > 120: ID ${file.id}, Name: "${file.name}"`);
      }
    } else {
      // Print files containing 'DDS' or 'Handle' or 'Bolt' or 'EPH'
      const upper = name.toUpperCase();
      if (upper.includes('DDS') || upper.includes('HANDLE') || upper.includes('BOLT') || upper.includes('EPH') || upper.includes('GDH')) {
        console.log(`Found other file: ID ${file.id}, Name: "${file.name}"`);
      }
    }
  });
}

main();
