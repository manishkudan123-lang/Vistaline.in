import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');
  const countEph = (content.match(/EPH/g) || []).length;
  const countGdh = (content.match(/GDH/g) || []).length;
  console.log(`Eph count in AllProducts.tsx: ${countEph}`);
  console.log(`Gdh count in AllProducts.tsx: ${countGdh}`);
  
  // Print any lines with GDH or EPH
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('GDH') || line.includes('EPH')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
}

main();
