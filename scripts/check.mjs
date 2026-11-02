// Pre-publish check. Fails (exit 1) while any [PLACEHOLDER] is still visible on a page
// or an internal link / image / anchor is broken. With --external it also pings outbound links.
// Run: npm run check   or   npm run check:links
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'en/index.html', 'privatnost/index.html', 'en/privacy/index.html', '404.html'];
const external = process.argv.includes('--external');
const siteUrl = JSON.parse(readFileSync(join(root, 'content/site-data.json'), 'utf8')).site.url.replace(/\/$/, '');
const basePath = new URL(siteUrl).pathname.replace(/\/$/, '');
const stripBase = (p) => (basePath && p.startsWith(basePath + '/')) ? p.slice(basePath.length) : p;
let errors = 0, warnings = 0;
const err = (m) => { errors++; console.error('ERROR  ' + m); };
const warn = (m) => { warnings++; console.warn('WARN   ' + m); };

const externalUrls = new Set();
for (const page of pages) {
  const path = join(root, page);
  if (!existsSync(path)) { err(`${page}: missing (run npm run build)`); continue; }
  const html = readFileSync(path, 'utf8');
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

  // 1. Placeholders
  for (const m of visible.match(/\[[^\[\]\n]{2,120}\]/g) || []) err(`${page}: placeholder still on page: ${m}`);

  // 2. Internal links, images and anchors
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const urls = new Set();
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) urls.add(m[1]);
  for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)) for (const part of m[1].split(',')) urls.add(part.trim().split(/\s+/)[0]);
  for (const u of urls) {
    if (/^(https?:)?\/\//.test(u)) { if (/^https?:/.test(u) && !u.startsWith(siteUrl)) externalUrls.add(u); continue; }
    if (/^(tel:|mailto:|data:)/.test(u)) continue;
    const [p0, hash] = u.split('#');
    const p = stripBase(p0);
    if (!p) { if (hash && !ids.has(hash)) err(`${page}: anchor #${hash} not found`); continue; }
    if (hash && (p === '/' || p === '/en/')) {
      const target = readFileSync(join(root, p === '/' ? 'index.html' : 'en/index.html'), 'utf8');
      if (!target.includes(`id="${hash}"`)) err(`${page}: anchor ${u} not found`);
    }
    let file = p.startsWith('/') ? join(root, p) : join(dirname(path), p);
    if (p.endsWith('/')) file = join(file, 'index.html');
    if (!existsSync(file)) err(`${page}: broken internal link ${u}`);
  }
}

if (external) {
  for (const u of externalUrls) {
    try {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 10000);
      const res = await fetch(u, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
      clearTimeout(t);
      if (res.status >= 400) warn(`${u} -> HTTP ${res.status}`); else console.log(`ok     ${u} -> ${res.status}`);
    } catch (e) { warn(`${u} -> ${e.message}`); }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
