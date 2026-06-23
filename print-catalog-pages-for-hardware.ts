import fs from 'fs';

function main() {
  const text = fs.readFileSync('catalog_text.txt', 'utf8');
  const lines = text.split('\n');
  
  let currentPage = '';
  const keywords = ['EPH', 'GDH', 'DDS', 'HANDLE', 'BOLT'];
  
  lines.forEach((line, index) => {
    if (line.includes('--') && line.includes('of')) {
      currentPage = line;
    }
    const hasKw = keywords.some(kw => line.toUpperCase().includes(kw));
    if (hasKw) {
      console.log(`[${currentPage}] Line ${index + 1}: ${line}`);
    }
  });
}

main();
