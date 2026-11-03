// HTML templates. Everything that changes lives in content/site-data.json;
// this file only decides how it is laid out.

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const t = (tpl, vars = {}) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));

// Any text in [square brackets] is a placeholder that still needs real data.
// It is rendered with a yellow highlight so nobody can miss it, and
// `npm run check` fails while one is still on the page.
export const ph = (s) => esc(s).replace(/\[[^\]]+\]/g, (m) => `<mark class="todo">${m}</mark>`);

export const icons = {
  phone: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
  pin: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
  clock: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/></svg>',
  instagram: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1C2.7 9.8 2.7 10.1 2.7 12s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.3-2.9a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>',
  facebook: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z"/></svg>',
  messenger: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.5 2 2 6.1 2 11.3c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z"/></svg>',
  close: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M18.3 5.7 12 12l-6.3-6.3-1.4 1.4L10.6 13.4l-6.3 6.3 1.4 1.4L12 14.8l6.3 6.3 1.4-1.4-6.3-6.3 6.3-6.3z"/></svg>',
  prev: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>',
  next: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="m8.6 16.6 1.4 1.4 6-6-6-6-1.4 1.4 4.6 4.6z"/></svg>',
  external: '<svg class="ico ico-sm" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7zm5 16H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6z"/></svg>'
};

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const SCHEMA_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function openingHoursSpecification(hours) {
  // Group consecutive days with identical hours so the markup stays short.
  const groups = [];
  for (const key of DAY_KEYS) {
    const h = hours[key];
    if (!h) continue;
    const last = groups[groups.length - 1];
    if (last && last.opens === h[0] && last.closes === h[1]) last.dayOfWeek.push(SCHEMA_DAYS[DAY_KEYS.indexOf(key)]);
    else groups.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: [SCHEMA_DAYS[DAY_KEYS.indexOf(key)]], opens: h[0], closes: h[1] });
  }
  return groups;
}

export function jsonLd(data, lang, urls) {
  const s = data.site;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: s.name,
    alternateName: s.instagramName,
    url: urls.home,
    image: urls.og,
    telephone: s.phoneTel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      postalCode: s.address.postalCode,
      addressLocality: s.address.city,
      addressCountry: s.address.countryCode
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng },
    hasMap: urls.googleMaps,
    openingHoursSpecification: openingHoursSpecification(data.hours),
    sameAs: [s.facebook, s.instagram]
  };
  return `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;
}

// Responsive <picture>. `img` comes from images/manifest.json (written by scripts/images.mjs).
// Without a manifest entry we render a clearly labelled placeholder box instead of a broken image.
export function picture(manifest, file, { alt, sizes, eager = false, className = '', aspect = '4 / 5' }) {
  const m = manifest[file];
  if (!m) {
    return `<div class="ph ${className}" style="aspect-ratio:${aspect}" role="img" aria-label="${esc(alt)}"><span>FOTO</span><small>${esc(file)}</small></div>`;
  }
  const webp = m.sizes.map((w) => `/images/${file}-${w}.webp ${w}w`).join(', ');
  const fallback = m.sizes.includes(800) ? 800 : m.sizes[m.sizes.length - 1];
  const h = Math.round(fallback * m.height / m.width);
  return `<picture class="${className}"><source type="image/webp" srcset="${webp}" sizes="${sizes}"><img src="/images/${file}-${fallback}.jpg" width="${fallback}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high" decoding="sync"' : ' loading="lazy" decoding="async"'}></picture>`;
}

export function fullImage(manifest, file) {
  const m = manifest[file];
  if (!m) return { webp: '', jpg: '' };
  const w = m.sizes[m.sizes.length - 1];
  return { webp: `/images/${file}-${w}.webp`, jpg: `/images/${file}-${w}.jpg`, width: w, height: Math.round(w * m.height / m.width) };
}

export function head({ lang, S, data, urls, css, manifest, preloadHero }) {
  const s = data.site;
  const hero = preloadHero && manifest[preloadHero];
  const preload = hero
    ? `<link rel="preload" as="image" fetchpriority="high" href="/images/${preloadHero}-800.webp" imagesrcset="${hero.sizes.map((w) => `/images/${preloadHero}-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 900px) 440px, 80vw" type="image/webp">`
    : '';
  return `<!DOCTYPE html>
<html lang="${S.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(urls.title)}</title>
<meta name="description" content="${esc(urls.description)}">
<link rel="canonical" href="${urls.canonical}">
<link rel="alternate" hreflang="hr" href="${urls.hr}">
<link rel="alternate" hreflang="en" href="${urls.en}">
<link rel="alternate" hreflang="x-default" href="${urls.hr}">
<meta property="og:type" content="business.business">
<meta property="og:site_name" content="${esc(s.name)}">
<meta property="og:title" content="${esc(urls.title)}">
<meta property="og:description" content="${esc(urls.description)}">
<meta property="og:url" content="${urls.canonical}">
<meta property="og:image" content="${urls.og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(S.ogAlt)}">
<meta property="og:locale" content="${lang === 'hr' ? 'hr_HR' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(urls.title)}">
<meta name="twitter:description" content="${esc(urls.description)}">
<meta name="twitter:image" content="${urls.og}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#b3122e">
<link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-ext-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/fraunces-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-ext-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/fraunces-latin-ext-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/fraunces-latin-400-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/fraunces-latin-ext-400-italic.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<style>${css}</style>
</head>`;
}

export function header({ lang, S, data, switchHref, home }) {
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  const other = lang === 'hr' ? 'en' : 'hr';
  return `<a class="skip" href="#main">${esc(S.skip)}</a>
<header class="site-header">
  <div class="wrap header-row">
    <a class="wordmark" href="${home}">Frizerski salon <strong>Ivanka</strong></a>
    <nav class="site-nav" aria-label="${lang === 'hr' ? 'Glavna navigacija' : 'Main navigation'}">
      <ul>
        <li><a href="${home}#usluge">${esc(S.nav.services)}</a></li>
        <li><a href="${home}#galerija">${esc(S.nav.gallery)}</a></li>
        <li><a href="${home}#radno-vrijeme">${esc(S.nav.hours)}</a></li>
        <li><a href="${home}#kontakt">${esc(S.nav.contact)}</a></li>
      </ul>
    </nav>
    <div class="header-tools">
      <nav class="lang-switch" aria-label="${esc(S.switchLabel)}">
        <span aria-current="page" lang="${lang}">${lang.toUpperCase()}</span><span aria-hidden="true"> | </span><a href="${switchHref}" hreflang="${other}" lang="${other}">${other.toUpperCase()}</a>
      </nav>
    </div>
  </div>
</header>`;
}

export function notice(text) {
  if (!text || !text.trim()) return '';
  return `<div class="notice" role="status"><div class="wrap">${esc(text)}</div></div>`;
}

export function hoursTable({ S, data }) {
  const rows = DAY_KEYS.map((key, i) => {
    const h = data.hours[key];
    const time = h ? `${h[0]} – ${h[1]}` : S.hours.closed;
    return `<tr data-day="${i}"><th scope="row">${esc(S.hours.days[i])}<span class="today-tag" hidden> (${esc(S.hours.today)})</span></th><td${h ? '' : ' class="closed"'}>${esc(time)}</td></tr>`;
  }).join('\n');
  return `<table class="hours-table">
  <caption class="visually-hidden">${esc(S.hours.heading)}</caption>
  <thead><tr><th scope="col">${esc(S.hours.colDay)}</th><th scope="col">${esc(S.hours.colTime)}</th></tr></thead>
  <tbody>${rows}</tbody>
</table>`;
}

export function hoursData({ S, data }) {
  const payload = { hours: data.hours, status: S.hours.status, remind: { ...S.remind, location: `${data.site.address.street}, ${data.site.address.postalCode} ${data.site.address.city}`, tel: data.site.phoneTel } };
  return `<script type="application/json" id="hours-data">${JSON.stringify(payload).replace(/</g, '\\u003c')}</script>`;
}

export function callButton({ lang, S, data, className = 'btn btn-primary' }) {
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  // No aria-label here: the visible text already is the full label (WCAG 2.5.3 "label in name").
  return `<a class="${className}" href="tel:${s.phoneTel}">${icons.phone}<span>${esc(t(S.callCta, { phone }))}</span></a>`;
}

export function services({ lang, S, data, manifest }) {
  const rows = data.services.map((g, i) => {
    const price = g.price && g.price.trim() ? esc(g.price) : `<span class="muted">${esc(S.services.onRequest)}</span>`;
    const items = (g.items || []).map((it) => `<tr class="service-item"><td>${esc(it.name?.[lang] ?? it.name)}</td><td class="price">${it.price && it.price.trim() ? esc(it.price) : `<span class="muted">${esc(S.services.onRequest)}</span>`}</td></tr>`).join('\n');
    const swatches = g.accent === 'rainbow' ? ' <span class="swatches" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' : '';
    return `<tr class="service-group" id="usluga-${esc(g.id)}"><td><div class="service-cell"><span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(g.name[lang])}${swatches}</h3><p>${esc(g.desc[lang])}</p></div></div></td><td class="price">${price}</td></tr>${items}`;
  }).join('\n');
  const art = data.servicesImage ? `<figure class="services-art">${picture(manifest, data.servicesImage, { alt: data.heroAlt?.[data.servicesImage]?.[lang] || '', sizes: '(min-width: 900px) 420px, 100vw' })}</figure>` : '';
  return `<section id="usluge" class="section" aria-labelledby="usluge-h">
  <div class="wrap services-grid">
    <div>
      <p class="eyebrow">01 <span>${esc(S.eyebrows.services)}</span></p>
      <h2 id="usluge-h">${esc(S.services.heading)}</h2>
      <p class="lead">${esc(S.services.intro)}</p>
      <table class="services-table">
        <thead><tr><th scope="col">${esc(S.services.colService)}</th><th scope="col" class="price">${esc(S.services.colPrice)}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${art}
  </div>
</section>`;
}

export function about({ lang, S, data, manifest }) {
  const a = data.about;
  if (!a || !a[lang] || !a[lang].length) return '';
  const pic = a.image ? picture(manifest, a.image, { alt: a.alt?.[lang] || '', sizes: '(min-width: 760px) 420px, 100vw', className: 'about-pic', aspect: '1 / 1' }) : '';
  return `<section id="o-nama" class="section section-tint" aria-labelledby="o-nama-h">
  <div class="wrap about-grid">
    ${pic}
    <div class="about-text">
      <p class="eyebrow">02 <span>${esc(S.about.eyebrow)}</span></p>
      <h2 id="o-nama-h">${esc(S.about.heading)}</h2>
      ${a[lang].map((p) => `<p>${esc(p)}</p>`).join('\n')}
    </div>
  </div>
</section>`;
}

export function gallery({ lang, S, data, manifest }) {
  const items = data.gallery.map((g, i) => {
    const alt = g.alt[lang];
    const full = fullImage(manifest, g.file);
    const credit = g.credit ? `<figcaption class="credit">${esc(t(S.gallery.credit, { credit: g.credit }))}</figcaption>` : '';
    const n = i + 1;
    const numbered = `${t(S.gallery.number, { n })} – ${t(S.gallery.open, { alt })}`;
    const pic = picture(manifest, g.file, { alt, sizes: '(min-width: 1100px) 260px, (min-width: 700px) 33vw, 50vw', className: 'gallery-pic' });
    const badge = `<span class="num-badge" aria-hidden="true">${n}</span>`;
    const inner = full.jpg
      ? `<a class="gallery-link" href="${full.jpg}" data-full="${full.webp}" data-n="${n}" data-alt="${esc(alt)}" data-credit="${esc(g.credit || '')}" aria-label="${esc(numbered)}">${pic}${badge}</a>`
      : `<div class="gallery-link">${pic}${badge}</div>`;
    return `<li${i === 0 || i === 7 ? ' class="tall"' : ''} data-tags="${esc((g.tags || []).join(' '))}"><figure id="rad-${esc(g.file)}">${inner}${credit}</figure></li>`;
  }).join('\n');
  const filters = (data.galleryFilters || []).length ? `<div class="filters" data-filters hidden>
      <span class="filters-label">${esc(S.gallery.filterLabel)}</span>
      <div class="filters-list" role="group" aria-label="${esc(S.gallery.filterLabel)}">
        <button type="button" class="chip" data-filter="" aria-pressed="true">${esc(S.gallery.all)} <span class="count">${data.gallery.length}</span></button>
        ${data.galleryFilters.map((f) => {
          const count = data.gallery.filter((g) => (g.tags || []).includes(f.id)).length;
          if (!count) return '';
          const dot = f.dot === 'rainbow' ? '<span class="dot dot-rainbow" aria-hidden="true"></span>' : f.dot ? `<span class="dot" style="--chip:${esc(f.dot)}" aria-hidden="true"></span>` : '';
          return `<button type="button" class="chip" data-filter="${esc(f.id)}" aria-pressed="false">${dot}${esc(f.name[lang])} <span class="count">${count}</span></button>`;
        }).join('')}
      </div>
    </div>
    <p class="gallery-empty muted" data-empty hidden>${esc(S.gallery.empty)}</p>` : '';
  return `<section id="galerija" class="section" aria-labelledby="galerija-h">
  <div class="wrap">
    <p class="eyebrow">03 <span>${esc(S.eyebrows.gallery)}</span></p>
    <h2 id="galerija-h">${esc(S.gallery.heading)}</h2>
    <p class="lead">${esc(S.gallery.intro)} ${esc(S.gallery.mention)}</p>
    ${filters}
    <ul class="gallery-grid">${items}</ul>
    <p class="more"><a href="${data.site.instagram}" rel="noopener">${esc(S.gallery.more)}</a></p>
  </div>
</section>
<dialog class="lightbox" id="lightbox" aria-label="${esc(S.gallery.heading)}" data-number="${esc(S.gallery.number)}" data-mention="${esc(S.gallery.mention)}">
  <div class="lightbox-bar">
    <span class="lightbox-counter" aria-live="polite"></span>
    <button type="button" class="lightbox-btn" data-lb="close" aria-label="${esc(S.gallery.close)}">${icons.close}</button>
  </div>
  <figure class="lightbox-fig">
    <img src="data:," alt="" decoding="async">
    <figcaption><span class="lightbox-caption"></span><small class="lightbox-mention"></small></figcaption>
  </figure>
  <button type="button" class="lightbox-btn lightbox-prev" data-lb="prev" aria-label="${esc(S.gallery.prev)}">${icons.prev}</button>
  <button type="button" class="lightbox-btn lightbox-next" data-lb="next" aria-label="${esc(S.gallery.next)}">${icons.next}</button>
</dialog>`;
}

// Croatian plural of "recenzija" (1 recenzija, 2–4 recenzije, 5+ recenzija; 11–14 recenzija)
const recenzija = (n, lang) => {
  if (lang === 'en') return n === 1 ? 'review' : 'reviews';
  const m10 = n % 10, m100 = n % 100;
  return (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) ? 'recenzije' : 'recenzija';
};

export function reviewsBlock({ lang, S, data, reviews }) {
  const s = data.site;
  const links = [];
  if (s.googleReviews && s.googleReviews.url) {
    const g = s.googleReviews;
    const rating = lang === 'hr' ? String(g.rating).replace('.', ',') : String(g.rating);
    links.push(`<li><a href="${g.url}" rel="noopener"><span class="stars" aria-hidden="true">★</span><span>${esc(t(S.reviews.google, { rating, count: g.count, word: recenzija(g.count, lang) }))}</span></a></li>`);
  }
  links.push(`<li><a href="${s.facebookReviews}" rel="noopener">${icons.facebook}<span>${esc(t(S.reviews.summary, { ...s.reviewsSummary, word: recenzija(s.reviewsSummary.count, lang) }))}</span></a></li>`);
  const list = `<ul class="reviews-line">${links.join('')}</ul>`;
  if (reviews.length) {
    const items = reviews.map((r) => `<li><blockquote><p>${esc(r.text)}</p><footer>— ${esc(r.name)}</footer></blockquote></li>`).join('\n');
    return `<section id="recenzije" class="section" aria-labelledby="recenzije-h"><div class="wrap"><h2 id="recenzije-h">${esc(S.reviews.heading)}</h2><ul class="reviews">${items}</ul>${list}</div></section>`;
  }
  return `<div class="wrap">${list}</div>`;
}

// "Request an appointment by text": three questions, a composed message, an sms: link
// (phones) or a QR code (desktop). Nothing is sent by the site itself.
export function requestSection({ lang, S, data }) {
  const R = S.request;
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  const pills = (name, opts, type = 'radio', checkedFirst = false) => opts.map(([val, label], i) =>
    `<label class="pill"><input type="${type}" name="${name}" value="${esc(val)}"${checkedFirst && i === 0 ? ' checked' : ''}><span>${esc(label)}</span></label>`).join('');
  const services = data.services.map((g) => [g.name[lang], g.name[lang]]);
  const cfg = { phone: s.phoneTel, phoneDisplay: phone, lengthPhrase: R.lengthPhrase, dayPhrase: R.dayPhrase, partPhrase: R.partPhrase, msg: R.msg, or: R.or, copied: R.copied, qrSrc: (data._basePath || '') + '/js/qr.min.js' };
  return `<section id="zatrazi-termin" class="section section-request" aria-labelledby="zatrazi-h">
  <div class="wrap">
    <p class="eyebrow">04 <span>${esc(R.eyebrow)}</span></p>
    <h2 id="zatrazi-h">${esc(R.heading)}</h2>
    <p class="lead">${esc(R.intro)}</p>
    <noscript><p class="request-nojs">${esc(t(R.noJs, { phone })).replace(esc(phone), `<a href="sms:${s.phoneTel}">${esc(phone)}</a>`)}</p></noscript>
    <form class="request" data-request hidden>
      <div class="request-steps">
        <fieldset class="step"><legend>${esc(R.q1)}</legend><div class="pills">${pills('service', services, 'radio', true)}</div></fieldset>
        <fieldset class="step"><legend>${esc(R.q2)}</legend><div class="pills">${pills('length', R.lengths)}</div></fieldset>
        <fieldset class="step"><legend>${esc(R.q3)}</legend><div class="pills">${pills('day', R.days, 'checkbox')}</div><div class="pills pills-sub">${pills('part', R.parts, 'radio', true)}</div></fieldset>
        <div class="step step-inline">
          <label class="field"><span>${esc(R.q4)} <small>(${esc(R.q4hint)})</small></span><input type="number" name="work" inputmode="numeric" min="1" max="${data.gallery.length}" placeholder="7"></label>
          <label class="field"><span>${esc(R.q5)} <small>(${esc(R.q5hint)})</small></span><input type="text" name="name" autocomplete="given-name" maxlength="40"></label>
        </div>
      </div>
      <div class="request-out">
        <p class="request-label">${esc(R.previewLabel)}</p>
        <div class="bubble" data-preview aria-live="polite"></div>
        <p class="request-actions">
          <a class="btn btn-primary btn-big" href="sms:${s.phoneTel}" data-sms>${icons.phone}<span>${esc(R.send)}</span></a>
          <button type="button" class="btn btn-secondary" data-copy>${esc(R.copy)}</button>
        </p>
        <p class="small request-send-hint">${esc(R.sendHint)}</p>
        <div class="qr" data-qr hidden>
          <div class="qr-code" data-qr-box></div>
          <div><p class="qr-title">${esc(R.qrTitle)}</p><p class="small">${esc(R.qrHint)}</p></div>
        </div>
        <p class="small">${esc(t(R.smsNote, { phone }))}</p>
      </div>
    </form>
    <script type="application/json" id="request-data">${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>
  </div>
</section>`;
}

export function hoursSection({ S, data }) {
  return `<section id="radno-vrijeme" class="section section-tint" aria-labelledby="radno-vrijeme-h">
  <div class="wrap hours-grid">
    <div class="hours-text">
      <p class="eyebrow">05 <span>${esc(S.eyebrows.hours)}</span></p>
      <h2 id="radno-vrijeme-h">${esc(S.hours.heading)}</h2>
      <p class="lead">${esc(S.hours.intro)}</p>
      <p class="small">${icons.clock} ${esc(S.hours.holidays)}</p>
    </div>
    <div class="hours-card">
      <p class="status" data-status></p>
      ${hoursTable({ S, data })}
    </div>
  </div>
</section>`;
}

export function contact({ lang, S, data, urls }) {
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  const messenger = s.showMessenger ? `<p class="contact-messenger"><a class="btn btn-secondary" href="${s.messenger}" rel="noopener">${icons.messenger}<span>${esc(S.contact.messenger)}</span></a></p>` : '';
  return `<section id="kontakt" class="section" aria-labelledby="kontakt-h">
  <div class="wrap">
    <p class="eyebrow">06 <span>${esc(S.eyebrows.contact)}</span></p>
    <h2 id="kontakt-h">${esc(S.contact.heading)}</h2>
    <div class="contact-grid">
      <div class="map-card">
        <h3>${icons.pin} ${esc(S.contact.addressLabel)}</h3>
        <p class="map-address">${esc(s.address.street)}<br>${esc(s.address.postalCode)} ${esc(s.address.city)}${lang === 'hr' ? '' : ', Croatia'}</p>
        <p class="map-buttons">
          <a class="btn btn-secondary" href="${urls.googleMaps}" rel="noopener">${esc(S.contact.googleMaps)}${icons.external}</a>
          <a class="btn btn-secondary" href="${urls.appleMaps}" rel="noopener">${esc(S.contact.appleMaps)}${icons.external}</a>
        </p>
        <p class="directions"><strong>${esc(S.contact.directionsLabel)}</strong> ${ph(data.directions[lang])}</p>
      </div>
      <div class="contact-details">
        <h3>${icons.phone} ${esc(S.contact.phoneLabel)}</h3>
        <p class="contact-phone"><a class="phone-big" href="tel:${s.phoneTel}">${esc(phone)}</a><br><small>${esc(S.phoneOnly)}</small></p>
        ${messenger}
        <ul class="social">
          <li><a href="${s.instagram}" rel="noopener">${icons.instagram}<span>${esc(S.contact.instagram)}</span></a></li>
          <li><a href="${s.facebook}" rel="noopener">${icons.facebook}<span>${esc(S.contact.facebook)}</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

export function footer({ lang, S, data, privacyHref, year }) {
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  const L = data.legal;
  const email = L.email && L.email.trim() ? `<li><span>${esc(S.footer.email)}:</span> ${ph(L.email)}</li>` : '';
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="footer-name">${esc(s.name)}</p>
      <p>${esc(s.address.street)}, ${esc(s.address.postalCode)} ${esc(s.address.city)}</p>
      <p>${esc(S.footer.hoursSummary)}</p>
      <ul class="social">
        <li><a href="${s.instagram}" rel="noopener">${icons.instagram}<span>Instagram</span></a></li>
        <li><a href="${s.facebook}" rel="noopener">${icons.facebook}<span>Facebook</span></a></li>
      </ul>
    </div>
    <div class="legal">
      <p class="footer-name">${esc(S.footer.legalHeading)}</p>
      <ul>
        <li>${ph(L.name)}</li>
        <li><span>${esc(S.footer.oib)}:</span> ${ph(L.oib)}</li>
        <li><span>${esc(S.footer.register)}:</span> ${ph(L.register)}</li>
        ${email}
      </ul>
      <p><a href="${privacyHref}">${esc(S.footer.privacy)}</a> · © <span data-year>${year}</span> ${esc(s.name)}</p>
    </div>
  </div>
</footer>
<nav class="bottom-bar" aria-label="${lang === 'hr' ? 'Brze radnje' : 'Quick actions'}">
  <a href="tel:${s.phoneTel}" aria-label="${esc(t(S.callAria, { phone }))}">${icons.phone}<span>${esc(S.bottomBar.call)}</span></a>
  <a href="${data._urls.directions}" rel="noopener" aria-label="${esc(S.bottomBar.directionsAria)}">${icons.pin}<span>${esc(S.bottomBar.directions)}</span></a>
</nav>`;
}

export function homePage(ctx) {
  const { lang, S, data, manifest, urls, css, reviews, year } = ctx;
  const s = data.site;
  const phone = lang === 'hr' ? s.phoneDisplay : s.phoneDisplayIntl;
  const home = lang === 'hr' ? '/' : '/en/';
  const heroTiles = data.hero.map((file, i) => {
    const g = data.gallery.find((x) => x.file === file);
    const alt = data.heroAlt?.[file]?.[lang] ?? (g ? g.alt[lang] : '');
    return picture(manifest, file, { alt, sizes: i === 0 ? '(min-width: 900px) 440px, 80vw' : '(min-width: 900px) 200px, 38vw', eager: i === 0, className: `hero-tile hero-tile-${i + 1}`, aspect: i === 0 ? '4 / 5' : '1 / 1' });
  }).join('\n');
  return `${head({ lang, S, data, urls: { ...urls, title: S.title, description: S.description, canonical: urls.home }, css, manifest, preloadHero: data.hero[0] })}
<body>
${header({ lang, S, data, switchHref: lang === 'hr' ? '/en/' : '/', home })}
${notice(data.notice[lang])}
<main id="main">
  <section class="hero" aria-labelledby="hero-h">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <h1 id="hero-h"><span class="h1-small">Frizerski salon</span> <span class="h1-name">Ivanka</span></h1>
        <p class="tagline">${esc(S.heroTagline)}</p>
        <p class="hero-cta">${callButton({ lang, S, data, className: 'btn btn-primary btn-big' })}</p>
        <p class="hero-alt"><a href="#zatrazi-termin">${esc(S.request.heroLink)}</a></p>
        <p class="hero-address">${icons.pin}<a href="${urls.googleMaps}" rel="noopener">${esc(s.address.street)}, ${esc(s.address.postalCode)} ${esc(s.address.city)}</a></p>
        <p class="status" data-status></p>
        <p class="hero-remind" data-remind-wrap hidden><a class="btn btn-secondary" href="#radno-vrijeme" data-remind>${icons.clock}<span>${esc(S.remind.label)}</span></a><br><small>${esc(S.remind.hint)}</small></p>
      </div>
      <div class="hero-art">${heroTiles}</div>
    </div>
  </section>
  ${services({ lang, S, data, manifest })}
  ${about({ lang, S, data, manifest })}
  ${gallery({ lang, S, data, manifest })}
  ${reviewsBlock({ lang, S, data, reviews })}
  ${requestSection({ lang, S, data })}
  ${hoursSection({ S, data })}
  ${contact({ lang, S, data, urls })}
</main>
${footer({ lang, S, data, privacyHref: lang === 'hr' ? '/privatnost/' : '/en/privacy/', year })}
${hoursData({ S, data })}
${jsonLd(data, lang, urls)}
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

export function privacyPage(ctx) {
  const { lang, S, data, manifest, urls, css, year } = ctx;
  const home = lang === 'hr' ? '/' : '/en/';
  const self = lang === 'hr' ? `${urls.base}/privatnost/` : `${urls.base}/en/privacy/`;
  const body = S.privacy.body.map((p) => `<p>${esc(p)}</p>`).join('\n');
  return `${head({ lang, S, data, urls: { ...urls, title: S.privacy.title, description: S.privacy.body[0], canonical: self, hr: `${urls.base}/privatnost/`, en: `${urls.base}/en/privacy/` }, css, manifest })}
<body>
${header({ lang, S, data, switchHref: lang === 'hr' ? '/en/privacy/' : '/privatnost/', home })}
<main id="main">
  <section class="section"><div class="wrap narrow prose">
    <h1>${esc(S.privacy.heading)}</h1>
    ${body}
    <p><a href="${home}">${esc(S.privacy.back)}</a></p>
  </div></section>
</main>
${footer({ lang, S, data, privacyHref: lang === 'hr' ? '/privatnost/' : '/en/privacy/', year })}
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

export function notFoundPage(ctx) {
  const { strings, data, urls, css, year } = ctx;
  const hr = strings.hr; const en = strings.en;
  const s = data.site;
  return `${head({ lang: 'hr', S: hr, data, urls: { ...urls, title: hr.notFound.title, description: hr.notFound.text, canonical: `${urls.base}/404.html` }, css, manifest: {} }).replace('<link rel="canonical"', '<meta name="robots" content="noindex"><link rel="canonical"')}
<body>
${header({ lang: 'hr', S: hr, data, switchHref: '/en/', home: '/' })}
<main id="main">
  <section class="section"><div class="wrap narrow prose">
    <h1>${esc(hr.notFound.heading)}</h1>
    <p>${esc(hr.notFound.text)}</p>
    <p>${callButton({ lang: 'hr', S: hr, data, className: 'btn btn-primary btn-big' })}</p>
    <p><a href="/">${esc(hr.notFound.home)}</a></p>
    <hr>
    <div lang="en">
      <h2>${esc(en.notFound.heading)}</h2>
      <p>${esc(en.notFound.text)}</p>
      <p>${callButton({ lang: 'en', S: en, data, className: 'btn btn-primary' })}</p>
      <p><a href="/en/">${esc(en.notFound.home)}</a></p>
    </div>
  </div></section>
</main>
${footer({ lang: 'hr', S: hr, data, privacyHref: '/privatnost/', year })}
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}
