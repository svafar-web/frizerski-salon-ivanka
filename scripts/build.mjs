// Generates the static site from content/site-data.json + templates/.
// No dependencies: `node scripts/build.mjs`. Output is committed, so the
// site also works if someone just uploads the folder.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { strings } from '../templates/strings.mjs';
import { homePage, privacyPage, notFoundPage } from '../templates/page.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); console.log('wrote', p); };

const data = JSON.parse(read('content/site-data.json'));
const css = read('css/style.css');
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
const { lat, lng } = data.site.geo;
const urls = {
  base,
  home: `${base}/`,
  hr: `${base}/`,
  en: `${base}/en/`,
  og: `${base}/images/og-share.jpg`,
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
  appleMaps: `https://maps.apple.com/?q=${encodeURIComponent(data.site.name)}&ll=${lat},${lng}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
};
data._urls = urls;
const year = new Date().getFullYear();

write('index.html', homePage({ lang: 'hr', S: strings.hr, data, manifest, urls: { ...urls, home: urls.hr }, css, reviews, year }));
write('en/index.html', homePage({ lang: 'en', S: strings.en, data, manifest, urls: { ...urls, home: urls.en }, css, reviews, year }));
write('privatnost/index.html', privacyPage({ lang: 'hr', S: strings.hr, data, manifest, urls, css, year }));
write('en/privacy/index.html', privacyPage({ lang: 'en', S: strings.en, data, manifest, urls, css, year }));
write('404.html', notFoundPage({ strings, data, urls, css, year }));

const today = new Date().toISOString().slice(0, 10);
const pages = [
  { loc: `${base}/`, hr: `${base}/`, en: `${base}/en/` },
  { loc: `${base}/en/`, hr: `${base}/`, en: `${base}/en/` },
  { loc: `${base}/privatnost/`, hr: `${base}/privatnost/`, en: `${base}/en/privacy/` },
  { loc: `${base}/en/privacy/`, hr: `${base}/privatnost/`, en: `${base}/en/privacy/` }
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
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /images/source/\n\nSitemap: ${base}/sitemap.xml\n`);
