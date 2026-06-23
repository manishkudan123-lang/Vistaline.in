import fs from 'fs';

const catalogStr = fs.readFileSync('full_catalog_compiled.json', 'utf8');
const catalog = JSON.parse(catalogStr);
let c = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');

const startIdx = c.indexOf('const productsData: Product[] = [');
const endIdx = c.indexOf('\n];', startIdx) + 3;

let newArrayStr = 'const productsData: Product[] = [\n';

function esc(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"');
}

for (let i = 0; i < catalog.length; i++) {
  const item = catalog[i];
  
  let targetPhoto = item.image || '';
  
  if (['CVT6', 'CVT8', 'CVT10', 'CVT12', 'CVT16'].includes(item.code)) {
      targetPhoto = 'photo_095';
  }
  
  if (item.code === 'R1-DC-1400') {
      targetPhoto = 'photo_110';
  }

  if (item.code === 'BLR-08') targetPhoto = 'photo_009';
  if (item.code === 'BLR-09') targetPhoto = 'photo_010';
  if (item.code === 'BLR-10') targetPhoto = 'photo_011';
  if (item.code === 'BLR-11') targetPhoto = 'photo_012';
  if (item.code === 'BLR-12') targetPhoto = 'photo_013';
  if (item.code === 'BLR-13') targetPhoto = 'photo_014';
  if (item.code === 'BLR-14') targetPhoto = 'photo_015';
  if (item.code === 'BLR-15') targetPhoto = 'photo_016';
  if (item.code === 'BLR-16') targetPhoto = 'photo_017';
  if (item.code === 'BLR-17') targetPhoto = 'photo_018';
  if (item.code === 'BLR-18') targetPhoto = 'photo_019';
  if (item.code === 'BLR-19') targetPhoto = 'photo_020';
  if (item.code === 'BLR-20') targetPhoto = 'photo_021';

  newArrayStr += '  {\n';
  newArrayStr += '    id: "' + esc(item.id) + '",\n';
  newArrayStr += '    code: "' + esc(item.code) + '",\n';
  newArrayStr += '    name: "' + esc(item.name) + '",\n';
  newArrayStr += '    category: "' + esc(item.category) + '",\n';
  newArrayStr += '    image: ' + (targetPhoto ? ('getImageUrl("' + targetPhoto + '")') : '""');
  
  if (item.desc) newArrayStr += ',\n    desc: "' + esc(item.desc) + '"';
  if (item.material) newArrayStr += ',\n    material: "' + esc(item.material) + '"';
  if (item.finish) newArrayStr += ',\n    finish: "' + esc(item.finish) + '"';
  if (item.size) newArrayStr += ',\n    size: "' + esc(item.size) + '"';
  
  newArrayStr += '\n  }';
  if (i < catalog.length - 1) newArrayStr += ',';
  newArrayStr += '\n';
}
newArrayStr += '];';

c = c.substring(0, startIdx) + newArrayStr + c.substring(endIdx);
fs.writeFileSync('src/components/AllProducts.tsx', c);
console.log('Regenerated successfully using ESM format.');
