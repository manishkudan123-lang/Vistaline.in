import fs from 'fs';

function main() {
  const catalogText = fs.readFileSync('catalog_text.txt', 'utf8');
  const productsContent = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');
  
  // Let's parse all productsData to check codes
  const startToken = 'const productsData: Product[] = [';
  const startIdx = productsContent.indexOf(startToken);
  if (startIdx === -1) return;
  const arrayContent = productsContent.substring(startIdx + startToken.length - 1);
  const endIdx = arrayContent.indexOf('];');
  const fullBlock = arrayContent.substring(0, endIdx + 2);
  const getImageUrl = (key: string) => key;
  const products = eval(`(function(getImageUrl){ return ${fullBlock}; })`)(getImageUrl);
  
  const existingCodes = new Set(products.map((p: any) => p.code.trim().toUpperCase()));
  
  console.log(`There are ${existingCodes.size} codes in src/components/AllProducts.tsx`);
  
  // Let's scan catalogText lines for codes
  const lines = catalogText.split('\n');
  const potentialCodes = [
    // BLRs
    ...Array.from({ length: 100 }, (_, i) => `BLR-${i + 1}`),
    ...Array.from({ length: 100 }, (_, i) => `BLR-${i + 1}A`),
    // Non-BLRs
    '107', '1842/161', '1842 / 161', '114', '103', '105', '1841', '106',
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
    'DDS750', 'DDS850', 'DDS950', 'DDS1050', 'DDS1150',
    '25X300-D', '25X300 D', '25X450-D', '25X450 D',
    'R1-EPH-02', 'R1-EPH-01', 'R1-GDH-056', 'R1-GDH-057',
    '25X300X450-H', '25X300X450 H', '25X450X600-H', '25X450X600 H', '25X600X900-H', '25X600X900 H',
    '25X300-DB', '25X300 DB', '25X450-DB', '25X450 DB', '25X600-DB', '25X600 DB',
    'TB300', 'TB600'
  ];
  
  console.log('\nChecking which catalog codes are missing from the app database:');
  const missing: string[] = [];
  potentialCodes.forEach(code => {
    // Normalization helper
    const normalized = code.replace(/\s+/g, '-').toUpperCase();
    if (!existingCodes.has(normalized)) {
      // Check if it appears in the catalogText
      if (catalogText.toUpperCase().includes(code.toUpperCase())) {
        missing.push(code);
        console.log(`- Missing code: "${code}" (normalized: ${normalized})`);
      }
    }
  });
  
  console.log(`\nFound ${missing.length} missing codes.`);
}

main();
