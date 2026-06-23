import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variable keys:');
const keys = Object.keys(process.env).filter(key => 
  key.includes('KEY') || key.includes('SECRET') || key.includes('TOKEN') || key.includes('API') || key.includes('GOOGLE') || key.includes('APP')
);
console.log(keys);
