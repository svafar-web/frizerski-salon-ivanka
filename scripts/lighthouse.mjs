// Runs Lighthouse (mobile) against the local site for / and /en/ and prints the four scores.
// Uses `npx lighthouse` (downloaded on first run) and the installed Chrome or Edge.
// Run: npm run lighthouse
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { start } from './serve.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '.lighthouse');
mkdirSync(outDir, { recursive: true });
const chrome = [process.env.CHROME_PATH, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].filter(Boolean).find((p) => existsSync(p));
const port = 8089;
const server = await start(port);
const basePath = new URL(JSON.parse(readFileSync(join(root, 'content/site-data.json'), 'utf8')).site.url).pathname.replace(/\/$/, '');
const pages = [`${basePath}/`, `${basePath}/en/`];
for (const page of pages) {
  const name = page.endsWith('/en/') ? 'en' : 'hr';
  const out = join(outDir, name);
  // One quoted command string: on Windows npx is a .cmd and needs a shell, and the
  // --chrome-flags value contains no spaces so it survives the shell untouched.
  const cmd = `npx --yes lighthouse@12 "http://localhost:${port}${page}" --output=json --output=html "--output-path=${out}" --quiet --chrome-flags=--headless=new --only-categories=performance,accessibility,best-practices,seo`;
  // Must be async: the preview server runs in this same process, and a blocking spawnSync would stop it answering.
  const status = await new Promise((resolve) => spawn(cmd, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: chrome || '' }, shell: true }).on('exit', resolve));
  if (status !== 0) { console.error('lighthouse failed for', page); continue; }
  const report = JSON.parse(readFileSync(`${out}.report.json`, 'utf8'));
  const c = report.categories;
  console.log(`\n${page}  Performance ${Math.round(c.performance.score * 100)}  Accessibility ${Math.round(c.accessibility.score * 100)}  Best Practices ${Math.round(c['best-practices'].score * 100)}  SEO ${Math.round(c.seo.score * 100)}`);
  console.log(`  report: ${out}.report.html`);
}
server.close();
