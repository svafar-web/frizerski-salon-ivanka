// Builds the 1200x630 social share image (images/og-share.jpg) from templates/og.html
// using the headless Chrome or Edge that is already installed. No extra dependencies.
// Run: npm run og   (after `npm run images`)
import { spawnSync } from 'node:child_process';
import { existsSync, unlinkSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) { console.error('No Chrome/Edge found. Set CHROME_PATH to the browser executable.'); process.exit(1); }

// The photo is the first hero image from content/site-data.json, at its largest generated size.
const data = JSON.parse(readFileSync(join(root, 'content', 'site-data.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(join(root, 'images', 'manifest.json'), 'utf8'));
const photo = data.hero[0];
const m = manifest[photo];
if (!m) { console.error(`Hero image "${photo}" is not in images/manifest.json. Run npm run images first.`); process.exit(1); }
const photoUrl = `../images/${photo}-${m.sizes[m.sizes.length - 1]}.jpg`;
const tmpHtml = join(root, 'templates', 'og.tmp.html');
writeFileSync(tmpHtml, readFileSync(join(root, 'templates', 'og.html'), 'utf8').replace('{{photo}}', photoUrl));

const png = join(root, 'images', 'og-share.png');
const html = pathToFileURL(tmpHtml).href;
const r = spawnSync(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
  '--window-size=1200,630', '--force-device-scale-factor=1', '--virtual-time-budget=4000',
  `--screenshot=${png}`, html
], { stdio: 'pipe' });
unlinkSync(tmpHtml);
if (!existsSync(png)) { console.error('Screenshot failed:', r.stderr?.toString()); process.exit(1); }
await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toFile(join(root, 'images', 'og-share.jpg'));
unlinkSync(png);
console.log('wrote images/og-share.jpg (1200x630)');
