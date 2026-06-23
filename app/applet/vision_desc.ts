import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const tsxPath = 'src/components/AllProducts.tsx';
const content = fs.readFileSync(tsxPath, 'utf8');

const photoExtRegex = /"photo_(\d+)":\s*"([^"]+)"/g;
const photoMap: Record<string, string> = {};
let match;
while ((match = photoExtRegex.exec(content)) !== null) {
    if (parseInt(match[1]) >= 73 && parseInt(match[1]) <= 120) {
        photoMap[`photo_${match[1]}`] = match[2];
    }
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let cache: Record<string, string> = {};
if (fs.existsSync('vision_descriptions.json')) {
    cache = JSON.parse(fs.readFileSync('vision_descriptions.json', 'utf8'));
}

async function run() {
    let requests = 0;
    for (let i = 73; i <= 120; i++) {
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
                            { text: 'Describe the object briefly in 10 words or less. What is its color and shape?' },
                            { inlineData: { data: Buffer.from(arrayBuffer).toString("base64"), mimeType: 'image/jpeg' }}
                        ]
                    }
                ],
                config: { temperature: 0, maxOutputTokens: 25 }
            });
            
            const desc = response.text ? response.text.trim().replace(/\n/g, ' ') : "NONE";
            console.log(`${pKey} -> ${desc}`);
            cache[pKey] = desc;
            fs.writeFileSync('vision_descriptions.json', JSON.stringify(cache, null, 2));
            
            await delay(3000);
            
            if (requests >= 12) {
                console.log("Waiting 65s to avoid rate limits...");
                await delay(65000);
                requests = 0;
            }
        } catch(e) {
            console.error(`Error on ${pKey}:`, (e as Error).message);
            if ((e as Error).message.includes('429')) {
                console.log("Rate limit hit, waiting 65 seconds...");
                await delay(65000);
                i--; // retry
            }
        }
    }
    console.log("Done scanning!");
}

run();
