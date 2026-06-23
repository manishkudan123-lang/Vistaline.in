import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

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

    const start = 75; // Let's check 74 to 90
    const end = 90;
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
                            { text: 'Look closely at the product image, specifically the product code or name written on it or overlaid on the image. Return ONLY the product code. The product code may look like BLR-77, BLR-78, 107, 1842/161, PVC50, CVT10, R1-MH-1001, DDS750, TB300, etc. If it is clearly visible, return exactly that string. If not visible, say "UNKNOWN". Return ONLY the code, NO other text.' },
                            { inlineData: { data: buffer.toString("base64"), mimeType: 'image/jpeg' }}
                        ]
                    }
                ],
                config: {
                    temperature: 0,
                    maxOutputTokens: 20
                }
            });

            const code = response.text ? response.text.trim() : "UNKNOWN";
            console.log(`=> ${photoKey} is ${code}`);
            results[photoKey] = code;
            
            await delay(1000); 
        } catch (e) {
            console.log(`Failed ${photoKey}:`, e);
        }
    }

    fs.writeFileSync('vision_mapping.json', JSON.stringify(results, null, 2));
    console.log("Done!");
}

run();