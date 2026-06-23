import fs from 'fs';

async function main() {
  const folderId = '1XHH-U5x6DRjWRyPCP7seoqtNNZXuYGpu';
  const apiKey = 'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ';

  console.log(`Querying Drive folder ${folderId} for images...`);
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&pageSize=1000&fields=nextPageToken,files(id,name,mimeType,size,createdTime)`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json() as any;
      console.log(`Success! Total files returned: ${data.files?.length}`);
      fs.writeFileSync('all_drive_files.json', JSON.stringify(data.files, null, 2));
      
      const images = data.files.filter((f: any) => f.mimeType.startsWith('image/'));
      console.log(`Total image files found: ${images.length}`);
      
      // Let's analyze name patterns
      const names = images.map((f: any) => f.name);
      const uniqueNames = Array.from(new Set(names));
      console.log(`Unique image names: ${uniqueNames.length}`);
      
      const duplicates: string[] = [];
      const counts: Record<string, number> = {};
      names.forEach((name: string) => {
        counts[name] = (counts[name] || 0) + 1;
        if (counts[name] === 2) {
          duplicates.push(name);
        }
      });
      console.log(`Duplicate names: ${duplicates.length}`, duplicates);
    } else {
      console.error(`Failed with status: ${res.status}`);
      const text = await res.text();
      console.error(text.substring(0, 300));
    }
  } catch (e: any) {
    console.error(`Error: ${e.message}`);
  }
}

main();
