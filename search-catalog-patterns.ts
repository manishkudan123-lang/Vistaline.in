import fs from 'fs';

function main() {
  if (!fs.existsSync('catalog_text.txt')) {
    console.log('catalog_text.txt does not exist');
    return;
  }
  const text = fs.readFileSync('catalog_text.txt', 'utf8');
  const lines = text.split('\n');
  
  // Find lines referencing some key keywords to map page locations
  console.log('--- Searching for product references in catalog_text.txt ---');
  const keywords = [
    '107', '1842', '114', '103', '105', '1841', '106',
    'PVC50', 'PVC75', 'PVC100', 'PVC150',
    'CVT6', 'CVT8', 'CVT10', 'CVT12', 'CVT16',
    'MFT24', 'MSR8/10',
    'R1-FMD-01', 'R1-PFS-090', 'R1-FS-120',
    'R1-PF-601', 'R1-PF-602', 'R1-PF-603', 'R1-PF-604',
    'R1-FSACC-300', 'R1-DC-500', 'R1-DC-2000', 'R1-DC-01', 'R1-DC-1400',
    'R1-TSS-05', 'R1-TSS-04', 'R1-SD-01', 'R1-TSS-054',
    'R1-MH-1001', 'R1-MH-1003', 'R1-KH-03',
    'R1-CBSK-060', 'R1-CBSK-070', 'R1-COSK-060', 'R1-COSK-070',
    'R1-ML-017', 'R1-ML-016',
    'DDS750', '25X300', 'R1-GDH-057', 'TB300'
  ];

  lines.forEach((line, index) => {
    const upper = line.toUpperCase();
    keywords.forEach(kw => {
      if (upper.includes(kw.toUpperCase())) {
        // Log line and keyword
        console.log(`Line ${index + 1} [KW: ${kw}]: ${line}`);
      }
    });
  });
}

main();
