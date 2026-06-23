import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const tsxPath = 'src/components/AllProducts.tsx';
    const content = fs.readFileSync(tsxPath, 'utf8');

    // Extract photo map
    const photoMap: Record<string, string> = {};
    const photoExtRegex = /"photo_(\d+)":\s*"([^"]+)"/g;
    let match;
    while ((match = photoExtRegex.exec(content)) !== null) {
        photoMap[`photo_${match[1]}`] = match[2];
    }

    const start = 74;
    const end = 120;
    const results: Record<string, string> = {};

    for (let i = start; i <= end; i++) {
        const photoKey = `photo_${i.toString().padStart(3, '0')}`;
        const driveId = photoMap[photoKey];
        if (!driveId) continue;

        console.log(`Processing ${photoKey}...`);
        
        try {
            const fetchRes = await fetch(`https://drive.google.com/uc?id=${driveId}`);
            if (!fetchRes.ok) throw new Error('Fetch failed');
            
            const arrayBuffer = await fetchRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: 'Read the text in the image. Give me the product code and name if visible. Just output the text.' },
                            { inlineData: { data: buffer.toString("base64"), mimeType: 'image/jpeg' }}
                        ]
                    }
                ],
                config: {
                    temperature: 0,
                    maxOutputTokens: 50
                }
            });

            const code = response.text ? response.text.trim().replace(/\n/g, ' ') : "UNKNOWN";
            console.log(`=> ${photoKey}: ${code}`);
            results[photoKey] = code;
            
            await delay(500); 
        } catch (e) {
            console.log(`Failed ${photoKey}:`, e);
        }
    }

    fs.writeFileSync('vision_results.json', JSON.stringify(results, null, 2));
    console.log("Done!");
}

run();
