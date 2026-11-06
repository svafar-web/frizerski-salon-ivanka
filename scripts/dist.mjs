// Collects the files that make up the published site into dist/ so the deploy
// step uploads only the site, not the build scripts, templates or source photos.
// Run: node scripts/dist.mjs   (after node scripts/build.mjs)
import { cpSync, rmSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

const files = ['index.html', '404.html', 'site.webmanifest', 'sitemap.xml', 'robots.txt', '_headers', 'favicon.svg', 'apple-touch-icon.png',
  ...readdirSync(root).filter((f) => /^favicon-\d+\.png$/.test(f))];
const dirs = ['en', 'privatnost', 'pitanja', 'fonts', 'js', 'images'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of files) if (existsSync(join(root, f))) cpSync(join(root, f), join(out, f));
for (const d of dirs) cpSync(join(root, d), join(out, d), { recursive: true, filter: (src) => !src.includes(`${join(root, 'images')}${process.platform === 'win32' ? '\\' : '/'}source`) });

let count = 0;
const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) e.isDirectory() ? walk(join(d, e.name)) : count++; };
walk(out);
console.log(`dist/: ${count} files`);
