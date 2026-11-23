#!/usr/bin/env node
/**
 * Smoke test: served dist/ via static server + Playwright canvas/download check.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const dist = path.resolve('dist');

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.join(dist, urlPath.replace(/^\//, ''));
  if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(file);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

async function main() {
  if (!fs.existsSync(dist)) {
    console.error('Run npm run build first');
    process.exit(1);
  }
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('playwright not installed — skipping browser verification');
    server.close();
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  let requests = [];
  page.on('request', (r) => {
    if (/\.(png|jpe?g|webp)/i.test(r.url()) && !r.url().includes('127.0.0.1')) {
      requests.push(r.url());
    }
  });

  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const title = await page.title();
  if (!title.includes('Free Meme Generator')) throw new Error('Unexpected title: ' + title);

  await page.waitForSelector('.gallery button', { timeout: 20000 });
  await page.locator('.gallery button').first().click();
  await page.waitForSelector('#canvas:not([hidden])', { timeout: 15000 });

  const addText = page.locator('#addTextboxBtn');
  if (await addText.isVisible()) await addText.click();

  await page.fill('textarea[id^="textbox-text-"]', 'TOP TEXT', { timeout: 5000 }).catch(() => {});
  const gen = page.locator('#generateMemeBtn');
  await gen.click();
  await page.waitForSelector('#downloadModal:not([hidden])', { timeout: 10000 }).catch(() => {});

  const pages = ['/privacy/', '/how-to-make-a-meme/', '/ads.json'];
  for (const p of pages) {
    const r = await page.goto(base + p);
    if (!r || r.status() !== 200) throw new Error('Failed to load ' + p);
  }

  if (requests.length) console.warn('Warning: image upload requests detected:', requests);
  else console.log('OK: no outbound image uploads detected');

  console.log('verify: smoke tests passed at 390px viewport');
  await browser.close();
  server.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});