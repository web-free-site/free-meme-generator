import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve('public');
const dest = path.resolve('dist');

for (const name of fs.readdirSync(src)) {
  const from = path.join(src, name);
  if (fs.statSync(from).isFile()) {
    fs.copyFileSync(from, path.join(dest, name));
  }
}
console.log('copy-public: copied public/ → dist/');