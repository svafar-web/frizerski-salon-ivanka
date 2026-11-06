# Frizerski salon Ivanka – website

Static, two-language (HR / EN) website for a hair salon in Split, Croatia. No framework, no
database, no cookies, no analytics. Booking is by phone only, so there are no forms.

Owner-facing instructions (Croatian, no jargon) are in [UPUTE.md](UPUTE.md). This file is for
developers.

## How it works

```
content/site-data.json   ← the only file the owner edits (phone, hours, notice, services, gallery, legal)
content/reviews.md       ← real reviews, pasted by hand (empty = no testimonials section)
templates/*.mjs          ← HTML templates + UI strings (hr/en)
css/style.css            ← stylesheet (inlined into every page at build time)
js/main.js               ← ~6 KB: open/closed status, lightbox, footer year. Site works without it.
images/source/           ← original photos (NOT committed, NOT deployed)
images/                  ← generated WebP + JPEG at 400/800/1200 px + manifest.json + og-share.jpg
fonts/                   ← self-hosted Fraunces 600 + Inter 400/600 (latin + latin-ext), OFL licence
scripts/                 ← build, images, og, check, serve, lighthouse (plain Node, ESM)
index.html, en/, privatnost/, en/privacy/, 404.html, sitemap.xml, robots.txt   ← GENERATED, committed
```

`npm run build` renders both languages, the hours table, the JSON-LD `HairSalon` block and the
sitemap from the same JSON, so hours on the page and in structured data cannot drift apart.
The generated files are committed, so the folder can be uploaded as-is to any static host.

Why a build step instead of hand-edited HTML: one change in one file instead of the same change
in two languages, and Cloudflare Pages runs the build on every push, so the owner's helper only
needs the GitHub web editor, never Node.

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | once; installs `sharp` (only needed for `images` and `og`) |
| `npm run build` | regenerate all HTML + sitemap + robots from `content/` (no dependencies) |
| `npm run images` | convert `images/source/*.jpg` → responsive WebP/JPEG, write `images/manifest.json`, rasterise favicons |
| `npm run og` | render `images/og-share.jpg` (1200×630) from `templates/og.html` with the installed Chrome/Edge |
| `npm run check` | fail if any `[PLACEHOLDER]` is still visible or an internal link/anchor/image is broken |
| `npm run check:links` | same, plus pings every outbound link |
| `npm run serve` | local preview at http://localhost:8080 with clean URLs and the 404 page |
| `npm run lighthouse` | Lighthouse (mobile) for `/` and `/en/`, reports in `.lighthouse/` |

Order after adding photos: `images` → `build` → `og` (optional) → `check`.

Photo rules: only the salon's own photos. File names lowercase, hyphens only
(`plava-kosa.jpg`). Images are never upscaled; the largest size is capped at the original width.
Add a gallery entry in `site-data.json` with Croatian and English alt text.

## Deployment

### Current: Cloudflare Pages, published by GitHub Actions

The code lives in the GitHub repository `svafar-web/frizerski-salon-ivanka`; the site is served by
Cloudflare Pages (project `frizerski-salon-ivanka`) at `https://frizerskisalonivanka.hr/`.
On every push to `main`, `.github/workflows/deploy.yml`:

1. runs `node scripts/build.mjs` (pages, sitemap, robots, manifest),
2. runs `node scripts/check.mjs` (placeholders and broken links; warns only),
3. runs `node scripts/dist.mjs`, which copies just the published files into `dist/`
   (no scripts, templates, content or source photos),
4. uploads `dist/` with `wrangler pages deploy`.

Editing `content/site-data.json` in the GitHub web editor and pressing *Commit changes* is
therefore enough to republish; the site updates in about a minute.

The workflow needs two repository secrets (Settings → Secrets and variables → Actions):
`CLOUDFLARE_API_TOKEN` (a token with *Cloudflare Pages: Edit*) and `CLOUDFLARE_ACCOUNT_ID`.

Cloudflare Pages honours `_headers` (one-year immutable caching for `/images/*` and `/fonts/*`,
a strict Content-Security-Policy, no framing) and `404.html`. HTTPS is automatic.

The domain `frizerskisalonivanka.hr` is a free CARNET domain registered to the salon (renew yearly
at domene.hr; the authorisation link goes to the owner's e-mail). Its DNS is on Cloudflare:
proxied CNAME records for the apex and `www` pointing at `frizerski-salon-ivanka.pages.dev`.
The old GitHub Pages addresses (`svafar.github.io/…` and `svafar-web.github.io/…`) still redirect here.

`site.url` in `site-data.json` is the origin used for canonical links, hreflang, Open Graph and the
sitemap. If the site ever lives under a sub-path again, put that path in `site.url` and the build
prefixes every root-relative URL with it.

### Alternatives

- **GitHub Pages**: Settings → Pages → Deploy from branch (`main`, `/`). Works as-is (generated files are committed). `_headers` is ignored there (no custom cache headers or CSP), `404.html` is honoured.
- **Netlify drag-and-drop**: run `npm run build`, then drag the folder onto app.netlify.com/drop. `_headers` and `404.html` are both honoured. Not automatic on later edits; repeat the drop.

## Google Business Profile

For a phone-booking local business this matters more than the website. Claim or create the
profile at business.google.com with **exactly** the same name, address, phone and opening hours
as on the site (`Frizerski salon Ivanka`, `Drage Ivaniševića 18, 21000 Split`, `095 855 5532`,
the hours in `site-data.json`), add the website URL, and upload the same photos. Keep the hours
in both places in sync whenever they change.

## Notes

- Total JS ≈ 15 KB: open/closed status, calendar reminder, lightbox, gallery filters and the SMS request stepper (QR library loads only on desktop).
- The open/closed status is computed client-side in the `Europe/Zagreb` time zone, not the visitor's zone.
- "Zatražite termin porukom": three questions compose an appointment request; phones get an `sms:` link with the text prefilled, desktops get a QR code (vendored `js/qr.min.js`, qrcode-generator, MIT, loaded only there) plus a copy button. Nothing is sent by the site. The owner must answer incoming texts.
- While the salon is closed, the hero shows "Podsjeti me kad otvorimo": a calendar event (.ics) for the next opening time, with the phone number, generated in the browser as a Blob. No server, no tracking. Hidden without JS and while the salon is open.
- No external requests at all (fonts and images are self-hosted), so no cookie banner is needed.
- Reviews: paste real reviews into `content/reviews.md` as `## Name` followed by the text. Empty file = a single factual line linking to the Facebook reviews page.
- `images/source/` is git-ignored on purpose; keep the originals somewhere safe. The generated `images/` folder is committed.
- Fonts: Fraunces and Inter, both SIL Open Font License (licences in `fonts/`).
