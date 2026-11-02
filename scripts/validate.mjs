// Sends each generated page to the W3C Nu HTML Checker (validator.w3.org) and prints the result.
// Run: npm run validate   (needs internet)
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'en/index.html', 'privatnost/index.html', 'en/privacy/index.html', '404.html'];
let failed = 0;
for (const page of pages) {
  const html = readFileSync(join(root, page));
  const res = await fetch('https://validator.w3.org/nu/?out=json', { method: 'POST', headers: { 'content-type': 'text/html; charset=utf-8', 'user-agent': 'Mozilla/5.0 (site validate script)' }, body: html });
  const json = await res.json();
  const msgs = (json.messages || []).filter((m) => m.type === 'error' || m.subType === 'warning');
  console.log(`${page}: ${msgs.length ? msgs.length + ' issue(s)' : 'valid'}`);
  for (const m of msgs) { console.log(`  [${m.type}${m.subType ? '/' + m.subType : ''}] line ${m.lastLine}: ${m.message}`); if (m.type === 'error') failed++; }
}
process.exit(failed ? 1 : 0);
