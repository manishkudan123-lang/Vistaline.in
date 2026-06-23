import fs from 'fs';

function main() {
  const text = fs.readFileSync('catalog_text.txt', 'utf8');
  const lines = text.split('\n');
  
  // Let's extract everything that starts with BLR or familiar codes
  const items: string[] = [];
  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^(BLR-\d+)/i.test(trimmed) || /^(DDS\d+)/i.test(trimmed) || /^(PVC\d+)/i.test(trimmed) || /^(CVT\d+)/i.test(trimmed) || /^(R1-[A-Z]+-\d+)/i.test(trimmed) || /^(25X\d+)/i.test(trimmed) || /^\d{3}\s/i.test(trimmed)) {
      items.push(trimmed);
    }
  });

  console.log(`Total structured code-like lines: ${items.length}`);
  items.forEach((item, idx) => {
    console.log(`${idx + 1}: ${item}`);
  });
}

main();
