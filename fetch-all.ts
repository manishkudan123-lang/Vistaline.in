import fs from 'fs';

async function fetchAll() {
  const folderId = '1XHH-U5x6DRjWRyPCP7seoqtNNZXuYGpu';
  const url = `https://drive.google.com/drive/folders/${folderId}`;
  
  console.log(`Fetching Drive folder HTML from: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = await res.text();
    fs.writeFileSync('drive_folder_full.html', html);
    console.log(`Saved HTML of size: ${html.length} bytes`);

    // Let's search for filenames in the HTML
    const nameRegex = /"([^"]+?\.(?:jpeg|jpg|png|webp|gif|pdf))"/gi;
    let match;
    const fileNames = new Set<string>();
    while ((match = nameRegex.exec(html)) !== null) {
      fileNames.add(match[1]);
    }
    console.log(`Total filenames matching regex: ${fileNames.size}`);
    console.log(`Filenames:`, Array.from(fileNames).filter(n => n.includes('photo')));

    // Let's scan for any numbers associated with 'photo_'
    // Maybe they are represented differently or listed in a JSON array.
    // Google Drive's chunked initial data uses arrays. Let's list all strings starting with 'photo_'
    const photoStrings = new Set<string>();
    const generalPhotoRegex = /photo_\d{3,4}\.(?:jpeg|jpg|png|webp)/gi;
    let photoMatch;
    while ((photoMatch = generalPhotoRegex.exec(html)) !== null) {
      photoStrings.add(photoMatch[0]);
    }
    console.log(`Found photo strings: ${photoStrings.size}`);
    console.log(Array.from(photoStrings).sort());

    // Google Drive folder has a list of items inside window._initialDataState or similar.
    // Let's output any 33-char drive IDs that are found in the draft HTML.
    const all33CharIds = html.match(/[a-zA-Z0-9_-]{33}/g) || [];
    console.log(`Total 33-char IDs found: ${new Set(all33CharIds).size}`);

  } catch (err: any) {
    console.error(`Error fetching:`, err.message);
  }
}

fetchAll();
