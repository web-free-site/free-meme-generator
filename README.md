# Free Meme Generator

[free-meme-generator.web-free.site](https://free-meme-generator.web-free.site) — add text to images in your browser. No account, no watermark, no server upload.

Based on [georapbox/meme-generator](https://github.com/georapbox/meme-generator) (MIT) by George Raptis.

## Develop

```bash
nvm use   # Node 24+
npm ci
npm start
```

## Build

```bash
npm run build
```

Output is in `dist/`. Post-build steps add SEO pages, `sitemap.xml`, ads placeholders, and the web-free.site footer block.

## Deploy

Deployment is done manually from Gentil's box (`wrangler deploy`). This repo does not deploy from CI.

## License

MIT — see [LICENSE](./LICENSE) and [LICENSE-UPSTREAM](./LICENSE-UPSTREAM).