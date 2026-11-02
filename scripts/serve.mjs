// Tiny local web server for previewing the site (clean URLs + 404 page, like Cloudflare Pages).
// Run: npm run serve   then open http://localhost:8080/
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// If site-data.json puts the site under a sub-path (e.g. /repo), serve it there too, like the real host would.
const basePath = new URL(JSON.parse(readFileSync(join(root, 'content/site-data.json'), 'utf8')).site.url).pathname.replace(/\/$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };

export function start(port = 8080) {
  const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (basePath) {
      if (p === basePath) { res.writeHead(301, { Location: basePath + '/' }); return res.end(); }
      if (!p.startsWith(basePath + '/')) { res.writeHead(302, { Location: basePath + '/' }); return res.end(); }
      p = p.slice(basePath.length);
    }
    let file = normalize(join(root, p));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
      file = join(file, 'index.html');
    }
    if (!existsSync(file)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(readFileSync(join(root, '404.html'))); }
    const ext = extname(file).toLowerCase();
    const headers = { 'content-type': types[ext] || 'application/octet-stream' };
    if (p.startsWith('/images/') || p.startsWith('/fonts/')) headers['cache-control'] = 'public, max-age=31536000, immutable';
    res.writeHead(200, headers);
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, () => { console.log(`serving ${root} at http://localhost:${port}${basePath}/`); resolve(server); }));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) start(Number(process.env.PORT) || 8080);
