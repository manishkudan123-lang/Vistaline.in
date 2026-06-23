const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('full_catalog_compiled.json', 'utf8'));
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
  if (item.code === 'BLR-21') targetPhoto = 'photo_022';
  if (item.code === 'BLR-22') targetPhoto = 'photo_023';
  if (item.code === 'BLR-23') targetPhoto = 'photo_024';
  if (item.code === 'BLR-24') targetPhoto = 'photo_025';
  if (item.code === 'BLR-25') targetPhoto = 'photo_026';
  if (item.code === 'BLR-26') targetPhoto = 'photo_027';
  if (item.code === 'BLR-27') targetPhoto = 'photo_028';
  if (item.code === 'BLR-28') targetPhoto = 'photo_029';
  if (item.code === 'BLR-29') targetPhoto = 'photo_030';
  if (item.code === 'BLR-30') targetPhoto = 'photo_031';
  if (item.code === 'BLR-30A') targetPhoto = 'photo_032';
  if (item.code === 'BLR-31') targetPhoto = 'photo_033';
  if (item.code === 'BLR-32') targetPhoto = 'photo_034';
  if (item.code === 'BLR-33') targetPhoto = 'photo_035';
  if (item.code === 'BLR-34') targetPhoto = 'photo_036';
  if (item.code === 'BLR-35') targetPhoto = 'photo_037';


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
console.log('Regenerated successfully inside tsx -e with proper escaping');
