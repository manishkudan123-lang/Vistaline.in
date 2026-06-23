import fs from 'fs';

function main() {
  const html = fs.readFileSync('drive_folder_full.html', 'utf8');
  console.log(`HTML length: ${html.length} bytes`);

  // Google Drive uses AF_initDataCallback({key: 'ds:X', isError: false, hash: '...', data: [...]})
  const callbackRegex = /AF_initDataCallback\s*\(\s*({[\s\S]*?})\s*\)\s*;/g;
  let match;
  let index = 0;
  while ((match = callbackRegex.exec(html)) !== null) {
    const payloadStr = match[1];
    console.log(`\n--- CALLBACK ${index++} (length: ${payloadStr.length}) ---`);
    if (payloadStr.includes('photo_')) {
      console.log(`Piped to callback has photos!`);
    }
    // Try to extract key
    const keyMatch = payloadStr.match(/key\s*:\s*['"]([^'"]+)['"]/);
    if (keyMatch) {
      console.log(`Key: ${keyMatch[1]}`);
    }
    fs.writeFileSync(`callback_${index}.json`, payloadStr);
    console.log(`Saved callback_${index}.json`);
  }
}

main();
