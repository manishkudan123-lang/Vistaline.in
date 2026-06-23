import fs from 'fs';

function main() {
  const dtsPath = 'node_modules/pdf-parse/dist/pdf-parse/cjs/index.d.cts';
  if (fs.existsSync(dtsPath)) {
    const content = fs.readFileSync(dtsPath, 'utf8');
    console.log(content.substring(0, 1500));
  } else {
    console.log('Typings file does not exist at:', dtsPath);
  }
}

main();
