import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  const resolvePath = require.resolve('pdf-parse');
  console.log('Resolved path for pdf-parse:', resolvePath);
  const pdfExports = require(resolvePath);
  console.log('pdfExports keys:', Object.keys(pdfExports));
  console.log('pdfExports type:', typeof pdfExports);
  if (typeof pdfExports === 'function') {
    console.log('pdfExports is a function directly!');
  } else if (pdfExports.default) {
    console.log('pdfExports has .default of type:', typeof pdfExports.default);
  } else {
    // Let's print the module itself
    console.log('pdfExports string representation:', pdfExports.toString());
  }
} catch (e: any) {
  console.error('Error:', e.message);
}
