import fs from 'fs';
const file = fs.readFileSync('src/components/AllProducts.tsx', 'utf-8');
const lines = file.split('\n');
let print = false;
for (const line of lines) {
    if (line.includes('code: "BLR-74"')) print = true;
    if (print && (line.includes('code:') || line.includes('image:'))) {
        console.log(line);
    }
}
