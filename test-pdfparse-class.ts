import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

async function main() {
  console.log('PDFParse type:', typeof pdfModule.PDFParse);
  
  if (typeof pdfModule.PDFParse === 'function') {
    const buffer = fs.readFileSync('catalog.pdf');
    try {
      // Let's see if it's a function we can call
      console.log('Trying as a function directly or async function...');
      const result = await pdfModule.PDFParse(buffer);
      console.log('Result keys:', Object.keys(result));
      console.log('Result text length:', result.text ? result.text.length : 'no text');
    } catch (e: any) {
      console.error('Failed as direct function:', e.message);
      
      try {
        console.log('Trying with new construct...');
        const result = new pdfModule.PDFParse(buffer);
        console.log('Result object:', result);
      } catch (e2: any) {
        console.error('Failed with new construct:', e2.message);
      }
    }
  }
}

main();
