import fs from "fs";

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');

let startAssigning = false;
let currentPhotoNum = 77;

for (let i = 0; i < lines.length; i++) {
  const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
  if (codeMatch) {
    if (codeMatch[1] === "BLR-74") {
      startAssigning = true;
    }
    if (codeMatch[1] === "R1-MH-1001") {
      startAssigning = false;
    }
  }

  if (startAssigning) {
    const imageMatch = lines[i].match(/image:\s*(.*)$/);
    if (imageMatch) {
      let pNew = String(currentPhotoNum).padStart(3, '0');
      lines[i] = lines[i].replace(/image:\s*(.*)$/, 'image: getImageUrl("photo_' + pNew + '"),');
      currentPhotoNum++;
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Rewrote images! Ended at photo_" + currentPhotoNum);
