#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const run = (script) => {
  const r = spawnSync(process.execPath, [path.join(dir, script)], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run('copy-public.mjs');
spawnSync('npm', ['run', 'generateSW'], { stdio: 'inherit', cwd: path.join(dir, '..') });
run('generate-static-pages.mjs');
run('generate-sitemap.mjs');
run('inject-more-tools.mjs');