import fs from 'fs';

const filePath = 'src/components/AllProducts.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
let code = null;
let capture = false;
for(let line of lines) {
    if (line.includes('code: "107"')) {
        capture = true;
    }
    if (capture) {
        let codeMatch = line.match(/code:\s*"([^"]+)"/);
        if (codeMatch) code = codeMatch[1];
        let imgMatch = line.match(/image:\s*getImageUrl\("photo_(\d+)"\)/);
        if (imgMatch && code) {
            console.log(code + " -> " + imgMatch[1]);
            code = null;
        }
    }
}
