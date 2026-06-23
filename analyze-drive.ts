import fs from 'fs';

function main() {
  const fileContent = fs.readFileSync('all_drive_files.json', 'utf8');
  const files = JSON.parse(fileContent);
  console.log(`Total files in all_drive_files.json: ${files.length}`);
  const images = files.filter((f: any) => f.mimeType && f.mimeType.startsWith('image/'));
  console.log(`Total images: ${images.length}`);
  
  // Sort and print unique image names and sizes
  const uniqueNames = new Map<string, any[]>();
  images.forEach((img: any) => {
    if (!uniqueNames.has(img.name)) {
      uniqueNames.set(img.name, []);
    }
    uniqueNames.get(img.name)!.push(img);
  });

  console.log(`Unique image names count: ${uniqueNames.size}`);
  
  // Let's print all image names and their details
  const sortedNames = Array.from(uniqueNames.keys()).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  sortedNames.forEach(name => {
    const list = uniqueNames.get(name)!;
    console.log(`- ${name}: (${list.length} instances)`);
    list.forEach(i => {
      console.log(`  ID: ${i.id}, Size: ${i.size}, mime: ${i.mimeType}`);
    });
  });
}

main();
