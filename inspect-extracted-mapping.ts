import fs from 'fs';

function main() {
  if (fs.existsSync('extracted_mapping.json')) {
    const data = JSON.parse(fs.readFileSync('extracted_mapping.json', 'utf8'));
    console.log(`extracted_mapping.json keys:`, Object.keys(data));
    if (Array.isArray(data)) {
      console.log(`extracted_mapping.json is an array of length ${data.length}`);
      console.log('First 3 items:', data.slice(0, 3));
    } else {
      console.log('Sample of extracted_mapping:', Object.entries(data).slice(0, 10));
    }
  } else {
    console.log('extracted_mapping.json does not exist');
  }
}

main();
