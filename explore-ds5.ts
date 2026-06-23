import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('ds5_data.json', 'utf8'));
  
  console.log(`Top level length: ${data.length}`);
  data.forEach((val: any, idx: number) => {
    if (val === null) {
      console.log(`Index ${idx}: null`);
    } else if (Array.isArray(val)) {
      console.log(`Index ${idx}: Array (len=${val.length})`);
      // Print first level of details or subcategories
      if (val.length < 10) {
        console.log(`  Value: ${JSON.stringify(val)}`);
      } else {
        console.log(`  Sample: ${JSON.stringify(val.slice(0, 3))}...`);
      }
    } else {
      console.log(`Index ${idx}: ${typeof val} = ${JSON.stringify(val)}`);
    }
  });

  // Let's recursively search for any keys or array items that resemble a token or could have 80+ file listings.
  // Wait! Let's check if the rest of the file list is in a different callback file!
  // In our previous summary:
  // "Identified and saved six callback JSON files (callback_1.json to callback_6.json)."
  // Wait! Did callback_1 through callback_5 contain other files?
  // Let's write a python or node script to search for '.jpeg' or 'photo_' in all callback files (callback_1.json to callback_6.json)!
}

main();
