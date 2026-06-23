import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const tsxPath = 'src/components/AllProducts.tsx';
const content = fs.readFileSync(tsxPath, 'utf8');

const photoExtRegex = /"photo_(\d+)":\s*"([^"]+)"/g;
const photoMap: Record<string, string> = {};
let match;
while ((match = photoExtRegex.exec(content)) !== null) {
    if (parseInt(match[1]) >= 74 && parseInt(match[1]) <= 120) {
        photoMap[`photo_${match[1]}`] = match[2];
    }
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let cache: Record<string, string> = {};
if (fs.existsSync('vision_cache.json')) {
    cache = JSON.parse(fs.readFileSync('vision_cache.json', 'utf8'));
}

async function run() {
    let requests = 0;
    for (let i = 74; i <= 120; i++) {
        const pKey = `photo_${i.toString().padStart(3, '0')}`;
        if (cache[pKey]) continue;

        console.log(`Checking ${pKey}...`);
        try {
            requests++;
            const fetchRes = await fetch(`https://drive.google.com/uc?id=${photoMap[pKey]}`);
            const arrayBuffer = await fetchRes.arrayBuffer();
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: 'Look carefully. Is there ANY product code (like BLR-74, 107, 25X300, R1-MH-1001, CVT10, PVC50) visible in text on this image? Reply with ONLY the product code. If none is perfectly readable, reply "NONE".' },
                            { inlineData: { data: Buffer.from(arrayBuffer).toString("base64"), mimeType: 'image/jpeg' }}
                        ]
                    }
                ],
                config: { temperature: 0, maxOutputTokens: 20 }
            });
            
            const code = response.text ? response.text.trim() : "NONE";
            console.log(`${pKey} -> ${code}`);
            cache[pKey] = code;
            fs.writeFileSync('vision_cache.json', JSON.stringify(cache, null, 2));
            
            if (requests >= 12) {
                console.log("Waiting 60s to avoid rate limits...");
                await delay(60000);
                requests = 0;
            } else {
                await delay(3000);
            }
        } catch(e) {
            console.error(`Error on ${pKey}:`, e.message);
            // Wait heavily on 429
            if (e.message.includes('429')) {
                console.log("Rate limit hit, waiting 65 seconds...");
                await delay(65000);
                i--; // retry
            }
        }
    }
    console.log("Done scanning!");
}

run();
