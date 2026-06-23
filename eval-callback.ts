import fs from 'fs';

function main() {
  const content = fs.readFileSync('callback_6.json', 'utf8');
  
  try {
    // Wrap the object in parentheses so it correctly interprets as an expression
    const obj = new Function(`return (${content})`)();
    const ds5Data = obj.data;
    console.log(`Success! Evaluated ds:5 object. data is array? ${Array.isArray(ds5Data)}`);
    
    fs.writeFileSync('ds5_data.json', JSON.stringify(ds5Data, null, 2));
    console.log(`Saved clean JSON representation to ds5_data.json`);
    
    const files: { id: string; name: string }[] = [];
    
    function traverse(item: any) {
      if (Array.isArray(item)) {
        if (item.length >= 5 && Array.isArray(item[0]) && item[0][0] === null && typeof item[0][1] === 'string' && typeof item[4] === 'string' && item[4] === 'image/jpeg') {
          let name = '';
          function findJpeg(x: any) {
            if (typeof x === 'string' && x.endsWith('.jpeg')) {
              name = x;
            } else if (Array.isArray(x)) {
              x.forEach(findJpeg);
            } else if (x && typeof x === 'object') {
              Object.values(x).forEach(findJpeg);
            }
          }
          findJpeg(item);
          if (name) {
            files.push({ id: item[0][1], name });
          }
        }
        item.forEach(traverse);
      } else if (item && typeof item === 'object') {
        Object.values(item).forEach(traverse);
      }
    }
    
    traverse(ds5Data);
    console.log(`Parsed total ${files.length} unique file items from ds:5:`);
    console.log(JSON.stringify(files.slice(0, 50), null, 2));
    
  } catch (err: any) {
    console.error(`Eval error:`, err.message);
  }
}

main();
