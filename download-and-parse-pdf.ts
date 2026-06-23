import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

async function main() {
  const fileId = '1Zuh3qez8AYUiUtpDVrG4c5lrg_N1KwVj';
  const apiKey = 'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ';
  const pdfPath = 'catalog.pdf';

  console.log(`Downloading PDF (ID: ${fileId}) from Google Drive...`);
  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(pdfPath, buffer);
    console.log(`Successfully downloaded PDF. Size: ${buffer.length} bytes.`);

    console.log('Parsing PDF contents via PDFParse...');
    const parser = new pdfModule.PDFParse({ data: buffer });
    const textResult = await parser.getText();
    fs.writeFileSync('catalog_text.txt', textResult.text);
    console.log(`Successfully parsed PDF! Extracted ${textResult.text.length} characters of text into catalog_text.txt.`);
    
    // Let's destroy parser
    await parser.destroy();
  } catch (error: any) {
    console.error('Error in main flow:', error);
  }
}

main();
