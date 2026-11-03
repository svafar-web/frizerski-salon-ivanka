# Frizerski salon Ivanka – website

Static, two-language (HR / EN) website for a hair salon in Split, Croatia. No framework, no
database, no cookies, no analytics. Booking is by phone only, so there are no forms.

Owner-facing instructions (Croatian, no jargon) are in [UPUTE.md](UPUTE.md). This file is for
developers.

## How it works

```
content/site-data.json   ← the only file the owner edits (phone, hours, notice, services, prices, gallery, legal)
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

### Current: GitHub Pages via GitHub Actions

The repository `svafar/frizerski-salon-ivanka` deploys automatically. On every push to `main`,
`.github/workflows/deploy.yml` runs `node scripts/build.mjs` and publishes the folder to
GitHub Pages at `https://svafar.github.io/frizerski-salon-ivanka/`. Editing
`content/site-data.json` in the GitHub web editor is therefore enough to republish.

Because the site lives under a sub-path, `site.url` in `site-data.json` includes `/frizerski-salon-ivanka`
and the build prefixes every root-relative URL with it. When the site moves to its own domain
(or to Cloudflare Pages), set `site.url` to the new origin and rebuild; the prefix disappears.
`.nojekyll` keeps GitHub from running Jekyll over the files. GitHub Pages ignores `_headers`
(no custom caching or CSP there); `404.html` is honoured.

### Cloudflare Pages (free, alternative with better caching headers)

1. Push this folder to a GitHub repository (do **not** commit `node_modules/` or `images/source/`; `.gitignore` handles it).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: Framework preset **None**, Build command `npm run build`, Build output directory `/`.
4. Deploy. The site is live at `https://<project>.pages.dev`. Put that URL into `site.url` in `content/site-data.json` (used for canonical, hreflang, Open Graph and the sitemap), commit, and it rebuilds.
5. `_headers` is picked up automatically: one-year immutable caching for `/images/*` and `/fonts/*`, a strict Content-Security-Policy, no framing. Clean URLs (`/en/`, `/privatnost/`) and `404.html` work out of the box. HTTPS is automatic.

From then on, editing `content/site-data.json` in the GitHub web editor and pressing *Commit changes* republishes the site in about a minute.

### Alternatives

- **GitHub Pages**: Settings → Pages → Deploy from branch (`main`, `/`). Works as-is (generated files are committed). `_headers` is ignored there (no custom cache headers or CSP), `404.html` is honoured.
- **Netlify drag-and-drop**: run `npm run build`, then drag the folder onto app.netlify.com/drop. `_headers` and `404.html` are both honoured. Not automatic on later edits; repeat the drop.

### Custom domain (later)

The domain is not registered yet. A `.hr` domain (e.g. `frizerskisalonivanka.hr`) is registered
through a CARNET-accredited registrar (list at domene.hr); expect a few euros to low tens of
euros per year. Then: Cloudflare Pages → Custom domains → add the domain → follow the DNS
instructions (CNAME to the `pages.dev` host). Finally change `site.url` in `site-data.json` and
rebuild so canonical/hreflang/OG URLs point at the new domain. Until then the free `*.pages.dev`
address is fine.

## Google Business Profile

For a phone-booking local business this matters more than the website. Claim or create the
profile at business.google.com with **exactly** the same name, address, phone and opening hours
as on the site (`Frizerski salon Ivanka`, `Drage Ivaniševića 18, 21000 Split`, `021 568 427`,
the hours in `site-data.json`), add the website URL, and upload the same photos. Keep the hours
in both places in sync whenever they change.

## Notes

- Total JS ≈ 6 KB. Only the open/closed line and the lightbox need it.
- The open/closed status is computed client-side in the `Europe/Zagreb` time zone, not the visitor's zone.
- "Zatražite termin porukom": three questions compose an appointment request; phones get an `sms:` link with the text prefilled, desktops get a QR code (vendored `js/qr.min.js`, qrcode-generator, MIT, loaded only there) plus a copy button. Nothing is sent by the site. The owner must answer incoming texts.
- While the salon is closed, the hero shows "Podsjeti me kad otvorimo": a calendar event (.ics) for the next opening time, with the phone number, generated in the browser as a Blob. No server, no tracking. Hidden without JS and while the salon is open.
- No external requests at all (fonts and images are self-hosted), so no cookie banner is needed.
- Reviews: paste real reviews into `content/reviews.md` as `## Name` followed by the text. Empty file = a single factual line linking to the Facebook reviews page.
- `images/source/` is git-ignored on purpose; keep the originals somewhere safe. The generated `images/` folder is committed.
- Fonts: Fraunces and Inter, both SIL Open Font License (licences in `fonts/`).
