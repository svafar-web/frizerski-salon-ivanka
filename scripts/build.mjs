// Generates the static site from content/site-data.json + templates/.
// No dependencies: `node scripts/build.mjs`. Output is committed, so the
// site also works if someone just uploads the folder.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { strings } from '../templates/strings.mjs';
import { homePage, privacyPage, faqPage, notFoundPage } from '../templates/page.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); console.log('wrote', p); };

const data = JSON.parse(read('content/site-data.json'));
// The stylesheet is inlined minified: comments stripped, whitespace collapsed.
const css = read('css/style.css').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
const manifest = existsSync(join(root, 'images/manifest.json')) ? JSON.parse(read('images/manifest.json')) : {};
if (!Object.keys(manifest).length) console.warn('! images/manifest.json missing or empty - run `npm run images`; building with placeholder boxes');

// Reviews: content/reviews.md, blocks of "## Name" followed by the review text.
const reviews = [];
if (existsSync(join(root, 'content/reviews.md'))) {
  const md = read('content/reviews.md');
  for (const block of md.split(/^##\s+/m).slice(1)) {
    const [name, ...rest] = block.split('\n');
    const text = rest.join('\n').trim();
    if (name.trim() && text) reviews.push({ name: name.trim(), text });
  }
}

const base = data.site.url.replace(/\/$/, '');
// Sub-path support (e.g. https://user.github.io/repo): every root-relative URL gets this prefix.
// Empty when the site lives at the root of its domain.
const basePath = new URL(base).pathname.replace(/\/$/, '');
// Script URLs carry a short content hash so browsers never run an old script with a new page.
const jsHash = (p) => existsSync(join(root, p)) ? createHash('md5').update(readFileSync(join(root, p))).digest('hex').slice(0, 8) : '0';
const mainV = jsHash('js/main.js'), qrV = jsHash('js/qr.min.js');
const applyBase = (html) => {
  html = html.replace('/js/main.js"', `/js/main.js?v=${mainV}"`).replace('/js/qr.min.js"', `/js/qr.min.js?v=${qrV}"`);
  if (!basePath) return html;
  return html
    .replace(/(href|src|data-full)="\/(?!\/)/g, `$1="${basePath}/`)
    .replace(/(srcset|imagesrcset)="([^"]*)"/g, (m, a, v) => `${a}="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${basePath}/`)}"`)
    .replace(/url\('\/(?!\/)/g, `url('${basePath}/`);
};
const { lat, lng } = data.site.geo;
const urls = {
  base,
  home: `${base}/`,
  hr: `${base}/`,
  en: `${base}/en/`,
  og: `${base}/images/og-share.jpg`,
  googleMaps: data.site.googleMapsPlace || `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
  appleMaps: `https://maps.apple.com/?q=${encodeURIComponent(data.site.name)}&ll=${lat},${lng}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
};
data._urls = urls;
data._basePath = basePath;
const year = new Date().getFullYear();

write('index.html', applyBase(homePage({ lang: 'hr', S: strings.hr, data, manifest, urls: { ...urls, home: urls.hr }, css, reviews, year })));
write('en/index.html', applyBase(homePage({ lang: 'en', S: strings.en, data, manifest, urls: { ...urls, home: urls.en }, css, reviews, year })));
write('privatnost/index.html', applyBase(privacyPage({ lang: 'hr', S: strings.hr, data, manifest, urls, css, year })));
write('en/privacy/index.html', applyBase(privacyPage({ lang: 'en', S: strings.en, data, manifest, urls, css, year })));
write('pitanja/index.html', applyBase(faqPage({ lang: 'hr', S: strings.hr, data, manifest, urls, css, year })));
write('en/faq/index.html', applyBase(faqPage({ lang: 'en', S: strings.en, data, manifest, urls, css, year })));
write('404.html', applyBase(notFoundPage({ strings, data, urls, css, year })));
write('site.webmanifest', JSON.stringify({
  name: data.site.name, short_name: 'Salon Ivanka', lang: 'hr', start_url: `${basePath}/`, display: 'browser',
  background_color: '#faf6f1', theme_color: '#b3122e',
  icons: [{ src: `${basePath}/favicon-192.png`, sizes: '192x192', type: 'image/png' }, { src: `${basePath}/favicon-512.png`, sizes: '512x512', type: 'image/png' }]
}, null, 2) + '\n');

const today = new Date().toISOString().slice(0, 10);
const pages = [
  { loc: `${base}/`, hr: `${base}/`, en: `${base}/en/` },
  { loc: `${base}/en/`, hr: `${base}/`, en: `${base}/en/` },
  { loc: `${base}/privatnost/`, hr: `${base}/privatnost/`, en: `${base}/en/privacy/` },
  { loc: `${base}/en/privacy/`, hr: `${base}/privatnost/`, en: `${base}/en/privacy/` },
  { loc: `${base}/pitanja/`, hr: `${base}/pitanja/`, en: `${base}/en/faq/` },
  { loc: `${base}/en/faq/`, hr: `${base}/pitanja/`, en: `${base}/en/faq/` }
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="hr" href="${p.hr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${p.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${p.hr}"/>
  </url>`).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot', 'Applebot'];
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: ${basePath}/images/source/\n\n# AI crawlers and assistants are welcome\n${aiBots.map((b) => `User-agent: ${b}`).join('\n')}\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
