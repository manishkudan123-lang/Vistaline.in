import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log(`Checking API Key presence: ${apiKey ? 'Yes (starts with ' + apiKey.substring(0, 5) + ')' : 'No'}`);

  if (!apiKey) {
    console.error(`No GEMINI_API_KEY found in process.env.`);
    return;
  }

  const folderId = '1XHH-U5x6DRjWRyPCP7seoqtNNZXuYGpu';
  // Use Drive API v3 to list files in parents
  let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&pageSize=1000&fields=nextPageToken,files(id,name)&key=${apiKey}`;

  console.log(`Calling public Drive listing endpoint...`);
  try {
    const res = await fetch(url);
    const data = await res.json() as any;
    if (data.error) {
      console.error(`Google API Error:`, JSON.stringify(data.error, null, 2));
    } else {
      console.log(`Success! Found ${data.files?.length} files.`);
      console.log(`First 10 files:`, data.files?.slice(0, 10));
      // Save results
      require('fs').writeFileSync('drive_files_list.json', JSON.stringify(data.files, null, 2));
      console.log(`Saved ${data.files?.length} files to drive_files_list.json`);
    }
  } catch (err: any) {
    console.error(`Error:`, err.message);
  }
}

main();
