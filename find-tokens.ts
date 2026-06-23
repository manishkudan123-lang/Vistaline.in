import fs from 'fs';

function main() {
  const content = fs.readFileSync('callback_6.json', 'utf8');
  const stringsInContent = content.match(/"[^"]+"/g) || [];
  
  // Filter for strings that are between 40 and 200 characters
  const candidates = Array.from(new Set(stringsInContent))
    .map(s => s.replace(/^"|"$/g, ''))
    .filter(s => s.length > 30 && s.length < 250);

  console.log(`Analyzing ${candidates.length} candidate strings:`);
  
  // Write to a file for easier viewing or searching
  fs.writeFileSync('candidates.txt', candidates.join('\n'));
}

main();
