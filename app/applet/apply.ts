import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const mapping: Record<string, string> = {
  "BLR-01": "001",
  "BLR-02": "002",
  "BLR-03": "003",
  "BLR-04": "004",
  "BLR-05": "005",
  "BLR-06": "006",
  "BLR-07": "007",
  "BLR-08": "009",
  "BLR-09": "010",
  "BLR-10": "011",
  "BLR-11": "012",
  "BLR-12": "013",
  "BLR-13": "014",
  "BLR-14": "015",
  "BLR-15": "016",
  "BLR-16": "017",
  "BLR-17": "018",
  "BLR-18": "019",
  "BLR-19": "020",
  "BLR-20": "021",
  "BLR-21": "022",
  "BLR-22": "023",
  "BLR-23": "024",
  "BLR-24": "027",
  "BLR-25": "026",
  "BLR-26": "025",
  "BLR-27": "028",
  "BLR-28": "029",
  "BLR-29": "030",
  "BLR-30": "031",
  "BLR-30A": "032",
  "BLR-31": "033",
  "BLR-32": "034",
  "BLR-33": "035",
  "BLR-34": "036",
  "BLR-35": "037",
  "BLR-36": "038",
  "BLR-37": "039",
  "BLR-38": "040",
  "BLR-39": "041",
  "BLR-40": "042",
  "BLR-41": "043",
  "BLR-42": "044",
  "BLR-43": "045",
  "BLR-44": "046",
  "BLR-45": "047",
  "BLR-46": "048",
  "BLR-47": "049",
  "BLR-48": "050",
  "BLR-49": "051",
  "BLR-50": "052",
  "BLR-51": "053",
  "BLR-52": "054",
  "BLR-53": "055",
  "BLR-54": "056",
  "BLR-55": "057",
  "BLR-56": "058",
  "BLR-57": "059",
  "BLR-58": "060",
  "BLR-59": "061",
  "BLR-60": "062",
  "BLR-61": "063",
  "BLR-62": "064",
  "BLR-63": "065",
  "BLR-64": "066",
  "BLR-65": "066",
  "BLR-66": "067",
  "BLR-67": "068",
  "BLR-68": "069",
  "BLR-69": "070",
  "BLR-70": "071",
  "BLR-71": "072",
  "BLR-72": "073",
  "BLR-73": "074",
  "BLR-74": "075",
  "BLR-75": "076",
  "BLR-76": "077",
  "BLR-77": "078",
  "BLR-77A": "079",
  "BLR-78": "080",
};

const lines = content.split('\n');
let currentCode: string | null = null;

for (let i = 0; i < lines.length; i++) {
  const codeMatch = lines[i].match(/code:\s*"([^"]+)"/);
  if (codeMatch) {
    currentCode = codeMatch[1];
  }

  const imageMatch = lines[i].match(/image:\s*(.*)$/);
  if (imageMatch && currentCode && mapping[currentCode]) {
    lines[i] = lines[i].replace(/image:\s*(.*)$/, \`image: getImageUrl("photo_\${mapping[currentCode]}"),\`);
    currentCode = null;
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log("Applied absolute mapping!");
