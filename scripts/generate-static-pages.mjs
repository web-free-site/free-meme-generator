#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { HUB, SITE, SITE_NAME } from './site-config.mjs';

const dist = path.resolve('dist');
const pageCss = `
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;background:#f8f9fa;color:#212529;line-height:1.6}
header,footer{background:#fff;border-bottom:1px solid #dee2e6}
footer{border-top:1px solid #dee2e6;border-bottom:none;margin-top:2rem}
.wrap{max-width:46rem;margin:0 auto;padding:1.25rem}
a{color:#0d6efd}.site-nav{display:flex;flex-wrap:wrap;gap:.75rem 1.25rem;font-size:.9rem}
h1{font-size:1.75rem}article h2{font-size:1.2rem;margin-top:1.5rem}
`;

function shell({ title, description, pathname, body, extraHead = '' }) {
  const canonical = `${SITE}${pathname}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<link rel="canonical" href="${canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:site_name" content="${SITE_NAME}"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${description}"/>
<style>${pageCss}</style>
${extraHead}
<script src="https://ref.web-free.site/r.js" defer></script>
</head>
<body>
<header><div class="wrap"><strong><a href="/">${SITE_NAME}</a></strong>
<nav class="site-nav" aria-label="Site">
<a href="/">Meme maker</a>
<a href="/how-to-make-a-meme/">How to make a meme</a>
<a href="/meme-generator-from-your-photo/">From your photo</a>
<a href="/download-meme-as-png/">Download PNG</a>
<a href="/about/">About</a>
<a href="/privacy/">Privacy</a>
<a href="/terms/">Terms</a>
<a href="/contact/">Contact</a>
</nav></div></header>
<main class="wrap"><article class="wf-static-page">${body}</article></main>
<footer><div class="wrap">
<p>Based on <a href="https://github.com/georapbox/meme-generator" rel="noopener noreferrer">meme-generator</a> by George Raptis (MIT).</p>
<p><a href="${HUB}/?ref=meme-generator">web-free.site</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
</div></footer>
<script src="/wf-ads.js" defer></script>
</body>
</html>`;
}

const pages = [
  {
    dir: 'how-to-make-a-meme',
    title: 'How to Make a Meme Online — Free Step-by-Step Guide',
    description:
      'Learn how to make a meme for free in your browser: pick a template, add top and bottom text, and download PNG or JPEG. No account.',
    pathname: '/how-to-make-a-meme/',
    body: `<h1>How to make a meme online</h1>
<p>Use our <a href="/">free meme generator</a> to add classic top-and-bottom text to any image. Everything runs in your browser.</p>
<h2>Steps</h2>
<ol>
<li>Open the meme maker and choose a template from the gallery or <strong>upload your own image</strong>.</li>
<li>Add one or more text boxes. Drag them on the canvas; adjust font, size, and color.</li>
<li>Click <strong>Generate Meme</strong>, then download PNG or JPEG — no watermark.</li>
</ol>
<p><a href="/">Start making a meme</a></p>`,
  },
  {
    dir: 'meme-generator-from-your-photo',
    title: 'Meme Generator From Your Photo — Upload Local Images Free',
    description:
      'Turn your own photos into memes without uploading to a server. Drag and drop a JPG, PNG, or WebP and add text in the browser.',
    pathname: '/meme-generator-from-your-photo/',
    body: `<h1>Meme generator from your photo</h1>
<p>Unlike server-side meme makers, this tool processes your picture <strong>only on your device</strong>. Drag an image onto the canvas or use the file picker.</p>
<h2>Why local processing?</h2>
<p>Your photos never leave your phone or laptop. That is faster for you and better for privacy.</p>
<p>You can also take a snapshot with your webcam or pick a solid color background for text-only memes.</p>
<p><a href="/">Upload a photo and add text</a></p>`,
  },
  {
    dir: 'download-meme-as-png',
    title: 'Download Meme as PNG or JPEG — Free, No Watermark',
    description:
      'Export your meme as a PNG or JPEG file. Free download with no watermark and no sign-up.',
    pathname: '/download-meme-as-png/',
    body: `<h1>Download meme as PNG or JPEG</h1>
<p>After you add text and click <strong>Generate Meme</strong>, use the download button to save the result. Choose your preferred format in the app settings if available.</p>
<p>Files are created in your browser from the canvas — we do not store copies on a server.</p>
<p><a href="/">Create and download a meme</a></p>`,
  },
  {
    dir: 'privacy',
    title: 'Privacy Policy — Free Meme Generator',
    description: 'Privacy policy for free-meme-generator.web-free.site. Images stay on your device.',
    pathname: '/privacy/',
    body: `<h1>Privacy</h1>
<p>${SITE_NAME} runs entirely in your browser. We do not receive the images you edit or the memes you create.</p>
<p>We use Cloudflare Web Analytics (aggregated traffic) and advertising partners (Adsterra) that may set cookies under their own policies.</p>
<p>Contact us via <a href="${HUB}/?ref=meme-generator">${HUB}</a>.</p>`,
  },
  {
    dir: 'terms',
    title: 'Terms of Use — Free Meme Generator',
    description: 'Terms of use for the free browser-based meme generator.',
    pathname: '/terms/',
    body: `<h1>Terms</h1>
<p>This tool is provided as-is without warranty. You must have the right to use any image you edit. Do not use the generator for unlawful or harassing content.</p>
<p>Template images in the gallery are provided for remix culture; you are responsible for compliance with applicable law and platform rules when you publish memes.</p>`,
  },
  {
    dir: 'about',
    title: 'About — Free Meme Generator',
    description:
      'About this free meme generator. Based on George Raptis meme-generator (MIT), hosted on web-free.site.',
    pathname: '/about/',
    body: `<h1>About ${SITE_NAME}</h1>
<p>${SITE_NAME} is a rebranded deployment of the open-source <a href="https://github.com/georapbox/meme-generator">meme-generator</a> project by <strong>George Raptis</strong> (MIT License).</p>
<p>It is part of the <a href="${HUB}/?ref=meme-generator">web-free.site</a> collection of utilities that run in your browser without accounts.</p>
<p>Upstream repository: <a href="https://github.com/georapbox/meme-generator">github.com/georapbox/meme-generator</a>.</p>`,
  },
  {
    dir: 'contact',
    title: 'Contact — Free Meme Generator',
    description: 'Contact the web-free.site team about the free meme generator.',
    pathname: '/contact/',
    body: `<h1>Contact</h1>
<p>For questions about this tool, visit <a href="${HUB}/?ref=meme-generator">${HUB}</a>.</p>`,
  },
];

for (const p of pages) {
  const dir = path.join(dist, p.dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(p));
}

console.log(`generate-static-pages: wrote ${pages.length} pages under dist/`);