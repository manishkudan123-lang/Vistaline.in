import fs from 'fs';

function main() {
  const html = fs.readFileSync('drive_folder_full.html', 'utf8');
  console.log(`HTML size: ${html.length} bytes`);

  // Search for "photo_" followed by any digits
  const regex = /photo_(\d+)/gi;
  const numbers = new Set<string>();
  let match;
  while ((match = regex.exec(html)) !== null) {
    numbers.add(match[1]);
  }
  
  const sortedNums = Array.from(numbers).map(Number).sort((a,b) => a-b);
  console.log(`Found ${sortedNums.length} photo numbers in the HTML:`);
  console.log(sortedNums);
  
  // Let's also search for typical strings containing photo details or other images.
  const photoJpegs = [];
  const jpegRegex = /"([^"]*?photo_[^"]*?)"/gi;
  while ((match = jpegRegex.exec(html)) !== null) {
    photoJpegs.push(match[1]);
  }
  console.log(`Found ${photoJpegs.length} matching string literals:`);
  console.log([...new Set(photoJpegs)].slice(0, 20));
}

main();
