import fs from 'fs';

function main() {
  const html = fs.readFileSync('drive_folder_full.html', 'utf8');
  console.log(`HTML length: ${html.length} bytes`);

  // Let's find script blocks that contain initial data state or JSON configurations
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let index = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1];
    if (code.includes('initialDataState') || code.includes('_initialData') || code.includes('chunk') || code.includes('continuation')) {
      console.log(`\n--- SCRIPT BLOCK ${index++} (length: ${code.length}) ---`);
      console.log(code.substring(0, 500) + '...');
      
      // Let's write this script to a file so we can inspect it fully if needed
      fs.writeFileSync(`script_${index}.js`, code);
    }
  }
}

main();
