import fs from 'fs';

function main() {
  const content = fs.readFileSync('callback_6.json', 'utf8');
  console.log(`Content length: ${content.length}`);
  
  // Clean up the string to be valid JSON if possible, or parse safely
  // The structure inside AF_initDataCallback is an object literal.
  // E.g. {key: 'ds:5', isError: false, hash: '2', data: [11, null, [null, "1XHH-U5x6DRjWRyPCP7seoqtNNZXuYGpu"], ...]}
  // Let's print out parts of the JSON or find tokens or "pageToken" inside.
  
  // Let's see if there are strings that look like continuation tokens
  const stringsInContent = content.match(/"[^"]+"/g) || [];
  console.log(`Total strings in content: ${stringsInContent.length}`);
  
  // Filter for long alphanumeric strings that could be tokens (usually starting with some base64 or long characters)
  const candidateTokens = stringsInContent.filter(s => s.length > 50 && s.length < 500);
  console.log(`Found ${candidateTokens.length} strings of length 50-500:`);
  console.log(candidateTokens.slice(0, 5));

  // Let's look for fields around null or arrays containing the list of files
  // We can write a parser that parses the data: array
  // We can find where the list starts.
  // File names like "photo_" should be inside.
  // Let's search inside the content for occurrences of pageToken or nextPageToken.
  const pageTokenMatches = content.match(/token/gi) || [];
  console.log(`Found ${pageTokenMatches.length} occurrences of word 'token'`);
  
  // Let's write the JSON structure of data array to a file of readable format
  // We can do it by matching 'data:' inside the callback block
  const dataStart = content.indexOf('data:');
  if (dataStart !== -1) {
    const dataContent = content.substring(dataStart + 5).trim();
    // find matching bracket or save it as js
    fs.writeFileSync('ds5_data.js', `const ds5 = ${dataContent.substring(0, dataContent.length - 1)}; console.log(JSON.stringify(ds5, null, 2));`);
  }
}

main();
