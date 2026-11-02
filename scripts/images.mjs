// Turns the originals in images/source/ into responsive WebP + JPEG files in images/
// and writes images/manifest.json (sizes + dimensions) for the build script.
// Also rasterises favicon.svg into the PNG favicons.
// Run: npm run images   (needs `npm install` once, for sharp)
import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'images/source');
const outDir = join(root, 'images');
const WIDTHS = [400, 800, 1200];
const force = process.argv.includes('--force');

mkdirSync(outDir, { recursive: true });
const manifest = {};

if (!existsSync(srcDir) || !readdirSync(srcDir).length) {
  console.warn('! images/source/ is empty. Put the salon photos there (see README.md). Writing an empty manifest.');
}

const files = existsSync(srcDir) ? readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)) : [];
for (const file of files) {
  const name = parse(file).name;
  if (!/^[a-z0-9-]+$/.test(name)) {
    console.warn(`! skipping "${file}": use only lowercase letters, digits and hyphens in the file name (e.g. plava-kosa.jpg)`);
    continue;
  }
  const input = sharp(join(srcDir, file)).rotate(); // honour EXIF orientation
  const meta = await input.metadata();
  const w = meta.width, h = meta.height;
  // Never upscale: widths above the original are replaced by the original width.
  const sizes = [...new Set(WIDTHS.map((x) => Math.min(x, w)))].sort((a, b) => a - b);
  manifest[name] = { width: w, height: h, sizes };
  for (const size of sizes) {
    const base = join(outDir, `${name}-${size}`);
    const fresh = (p) => !force && existsSync(p) && statSync(p).mtimeMs >= statSync(join(srcDir, file)).mtimeMs;
    if (!fresh(`${base}.webp`)) await input.clone().resize({ width: size, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}.webp`);
    if (!fresh(`${base}.jpg`)) await input.clone().resize({ width: size, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`);
  }
  console.log(`${name}: ${w}x${h} -> ${sizes.join(', ')}`);
}
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`manifest: ${Object.keys(manifest).length} images`);

// Favicons from favicon.svg
const svgPath = join(root, 'favicon.svg');
if (existsSync(svgPath)) {
  for (const [out, size] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['favicon-512.png', 512], ['apple-touch-icon.png', 180]]) {
    await sharp(svgPath, { density: 384 }).resize(size, size).png().toFile(join(root, out));
  }
  console.log('favicons written');
}
