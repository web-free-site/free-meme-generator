# Cursor agent brief — free-meme-generator

Target: https://free-meme-generator.web-free.site
Repo name (wrangler `name`): `free-meme-generator`
English name: "Free Meme Generator". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is a **meme generator**: the user picks a template or uploads a local image, adds top/bottom (or extra) text, and downloads a PNG or JPEG. All editing stays in the browser. No accounts, no watermark.

## Recommended base (use this)

- Repo: https://github.com/georapbox/meme-generator
- License: MIT (keep `LICENSE`, credit George Raptis / georapbox in the footer and on `/about`)
- Stars: 113
- Last commit: 7 Nov 2026, 13:26 Africa/Kigali — `50959ebddd` on `main`
- Official demo: `https://georapbox.github.io/meme-generator/`
- Stack: a complete client-side PWA (HTML/CSS/JS, Parcel, Canvas API, optional camera/dropzone web components). Text is drawn on the image in the browser; nothing is uploaded. `npm run build` emits static files.
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. `LICENSE` is a real MIT file (Copyright (c) 2019-present George Raptis). Dependencies are UI web components + Bootstrap + emoji-picker — no server, no paid API.
- Why this one: MIT with a real `LICENSE` file, a complete working website (113 stars, still maintained in 2026), and a documented no-upload Canvas workflow.

## Backup

If the recommended base cannot be built statically for some reason, STOP and report it. Do not switch to a Python, Electron, or server-side meme generator. Do not use repos without a license file (`TayMcQuaya/pic2gif-converter` is in that class).

## Do not use these

- Server-side meme APIs (including Imgflip's API), Python/Ruby CLIs, or Electron apps.
- Tools that require an account, stamp a watermark, or upload the image.

## What to build on top of georapbox/meme-generator

1. Import the base into this repo, keep the MIT license, and credit George Raptis. Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them).
2. Rebrand to "Free Meme Generator". English primary. No FR/SW translations of the site. Keep upload-or-template, editable text, and a download of the result with no watermark. A handful of classic public-domain or clearly licensed blank templates is welcome; do not ship trademarked images you do not have rights to. The user must also be able to use their own local photo.
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no image upload to a server.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not break editing or download.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-meme-generator.web-free.site`; English how-to pages, at least `/how-to-make-a-meme`, `/meme-generator-from-your-photo`, and `/download-meme-as-png` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-meme-generator.web-free.site`. No French landing page.
6. Footer: credit the upstream project, and add a link back to the hub `https://web-free.site/?ref=meme-generator`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the nine other sites in this batch (50 tools in total). Show **Free Meme Generator** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=meme-generator`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=meme-generator`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=meme-generator`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=meme-generator`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=meme-generator`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=meme-generator`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=meme-generator`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=meme-generator`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=meme-generator`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=meme-generator`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=meme-generator`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=meme-generator`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=meme-generator`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=meme-generator`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=meme-generator`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=meme-generator`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=meme-generator`), **Free Meme Generator**, Free Color Picker (`https://free-color-picker.web-free.site/?ref=meme-generator`), Free GIF Maker (`https://free-gif-maker.web-free.site/?ref=meme-generator`), Free Photo Editor (`https://free-photo-editor.web-free.site/?ref=meme-generator`), Free Logo Maker (`https://free-logo-maker.web-free.site/?ref=meme-generator`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/en/?ref=meme-generator`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=meme-generator`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=meme-generator`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=meme-generator`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=meme-generator`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=meme-generator`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=meme-generator`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=meme-generator`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=meme-generator`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=meme-generator`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=meme-generator`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=meme-generator`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=meme-generator`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=meme-generator`), Free Citation Generator (`https://free-citation-generator.web-free.site/?ref=meme-generator`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=meme-generator`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=meme-generator`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=meme-generator`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=meme-generator`), Free Video to GIF Converter (`https://free-video-to-gif.web-free.site/?ref=meme-generator`), Free Audio Converter (`https://free-audio-converter.web-free.site/?ref=meme-generator`), Free Video Converter (`https://free-video-converter.web-free.site/?ref=meme-generator`).
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=meme-generator`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=meme-generator`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=meme-generator`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=meme-generator`).
     - **Time:** Free Time Zone Converter (`https://free-time-zone-converter.web-free.site/?ref=meme-generator`).
     - **Drawing:** Free Whiteboard (`https://free-whiteboard.web-free.site/?ref=meme-generator`).
     - **Random & pickers:** Free Spin Wheel (`https://free-spin-wheel.web-free.site/?ref=meme-generator`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-meme-generator"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-meme-generator.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally, add text to a built-in or blank canvas and to a local image, download a PNG, check mobile at 390px, confirm no image is uploaded, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes are not ready yet (sites are not live). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23bplaceholder`). After a browser agent writes real keys to `adsterra-codes.md`, a later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-meme-generator.web-free.site — site ID 6222776
Popunder d9939bc05b680f54716f3de83fdc2258
Native Banner 9d2a68a3c579ec29c8ce1b88705bbb8d
Smartlink 2fef6487c98fd2e12bfa3a9d38da9c2c
Social Bar bada27819bcd3fa99c3a1ebe3d4e9cd7
468x60 ffcda077ee626a3d6a50455d5dafff02
160x300 21da304ff2c17568b6fb003a73fb79c8
320x50 a324c275e3796c9565b4807b3eba40fe
300x250 d29ed041f6d9149c30ca1d74fb4d5f79
160x600 eee9ee73cd97ba54809e356e0ee9a075
728x90 296bed53a6fd5a7bb9a7831fade651e4
