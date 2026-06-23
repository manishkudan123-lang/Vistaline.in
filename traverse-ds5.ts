import fs from 'fs';

function main() {
  // Let's load the ds5 JavaScript structure
  const content = fs.readFileSync('callback_6.json', 'utf8');
  // Extract data: array inside callback_6.json
  const dataStart = content.indexOf('data:');
  if (dataStart === -1) {
    console.error(`Could not find data:`);
    return;
  }
  const dataContent = content.substring(dataStart + 5).trim();
  // We can evaluate it securely using Function
  const dataArray = new Function(`return ${dataContent.substring(0, dataContent.length - 1)}`)();

  console.log(`Evaluated dataArray of type: ${typeof dataArray}`);
  
  const allStrings: string[] = [];
  function traverse(item: any) {
    if (typeof item === 'string') {
      allStrings.push(item);
    } else if (Array.isArray(item)) {
      item.forEach(traverse);
    } else if (item && typeof item === 'object') {
      Object.values(item).forEach(traverse);
    }
  }

  traverse(dataArray);

  const uniqueStrings = Array.from(new Set(allStrings));
  console.log(`Unique strings found: ${uniqueStrings.length}`);
  
  // Let's filter some potential tokens
  const longStrings = uniqueStrings.filter(s => s.length > 25);
  console.log(`Long strings (total ${longStrings.length}):`);
  longStrings.forEach((s, idx) => {
    console.log(`${idx}: [len=${s.length}] ${s.substring(0, 100)}`);
  });

  // Let's find files in dataArray
  // Google Drive files in ds:5 data are arrays of structures:
  // e.g., [id, name, type, size, ...]
  // Let's search inside dataArray for arrays where the 4th/5th element is 'image/jpeg' or contains 'photo_'
  const files: { id: string; name: string }[] = [];
  function findFiles(item: any) {
    if (Array.isArray(item)) {
      // Check if it's a file structure. Typically files have id at index 0 (which is an array of [null, id]) and name, mimeType.
      // E.g. [ [null, "1JQqSwgbzXvm76yomzwhOBduXcbq-J-HF"], null, null, null, "image/jpeg", ... ]
      if (item.length >= 5 && Array.isArray(item[0]) && item[0][0] === null && typeof item[0][1] === 'string' && typeof item[4] === 'string' && item[4].includes('/')) {
        // Let's find name
        // The name is usually buried inside. Let's traverse the items for any string ending in .jpeg
        let name = '';
        function searchName(obj: any) {
          if (typeof obj === 'string' && obj.endsWith('.jpeg')) {
            name = obj;
          } else if (Array.isArray(obj)) {
            obj.forEach(searchName);
          } else if (obj && typeof obj === 'object') {
            Object.values(obj).forEach(searchName);
          }
        }
        searchName(item);
        if (name) {
          files.push({ id: item[0][1], name });
        }
      }
      item.forEach(findFiles);
    } else if (item && typeof item === 'object') {
      Object.values(item).forEach(findFiles);
    }
  }

  findFiles(dataArray);
  console.log(`Found ${files.length} parsed file representations:`);
  console.log(files);
}

main();
