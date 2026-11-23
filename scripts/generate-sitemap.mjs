#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './site-config.mjs';

const paths = [
  '/',
  '/how-to-make-a-meme/',
  '/meme-generator-from-your-photo/',
  '/download-meme-as-png/',
  '/privacy/',
  '/terms/',
  '/about/',
  '/contact/',
];

const today = new Date().toISOString().slice(0, 10);
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${SITE}${p === '/' ? '/' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), body);
console.log('generate-sitemap: wrote dist/sitemap.xml');