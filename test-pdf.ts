import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf export:', Object.keys(pdf));
console.log('Direct exports keys:', typeof pdf === 'function' ? 'is function' : 'not function');
