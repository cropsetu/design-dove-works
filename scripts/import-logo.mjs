// One-off: turn ~/Desktop/Image Download/Star Security Final Logo.png into the
// site's brand assets — header/footer logo (WebP) + multi-size favicons (PNG).
//   node scripts/import-logo.mjs

import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(homedir(), "Desktop", "Image Download", "Star Security Final Logo.png");

const ASSETS = resolve(ROOT, "src", "assets");
const PUBLIC = resolve(ROOT, "public");

const fmt = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

const buf = await readFile(SRC);
console.log(`Source: ${fmt(buf.length)}\n`);

// 1. Chroma-key the white background to true transparency.
//    Iterate the raw RGBA buffer and zero alpha for any pixel whose luminance
//    is "white-ish" (>= 245), with a soft 15-unit feathered edge so the logo's
//    anti-aliased outline doesn't get a hard halo. The logo's navy/red/black
//    interior is well below this threshold and stays untouched.
const { data: rawData, info } = await sharp(buf)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < rawData.length; i += 4) {
  const r = rawData[i];
  const g = rawData[i + 1];
  const b = rawData[i + 2];
  const lum = (r + g + b) / 3;
  if (lum >= 245) {
    rawData[i + 3] = 0;
  } else if (lum >= 230) {
    rawData[i + 3] = Math.round(((245 - lum) / 15) * 255);
  }
}

// Re-wrap the keyed pixels and trim the now-transparent edges.
const base = sharp(rawData, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 });

await mkdir(ASSETS, { recursive: true });
await mkdir(PUBLIC, { recursive: true });

// 1. Header/footer use — WebP, max 600 px wide, transparent flatten on white
//    so the logo reads cleanly on any card background.
const logoWebp = await base
  .clone()
  .resize({ width: 600, withoutEnlargement: true })
  .webp({ quality: 85, effort: 6 })
  .toBuffer();
await writeFile(resolve(ASSETS, "logo.webp"), logoWebp);
console.log(`✓ src/assets/logo.webp                  ${fmt(logoWebp.length)}`);

// 2. Favicons — PNG with the white background flattened (browsers render
//    favicons against a variable bg and transparency can look messy).
for (const size of [32, 96, 192, 512]) {
  const out = await base
    .clone()
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const path = resolve(PUBLIC, `favicon-${size}.png`);
  await writeFile(path, out);
  console.log(`✓ public/favicon-${size}.png${" ".repeat(Math.max(0, 16 - String(size).length))}      ${fmt(out.length)}`);
}

// 3. Apple touch icon — 180×180, no transparency.
const apple = await base
  .clone()
  .resize(180, 180, { fit: "contain", background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(resolve(PUBLIC, "apple-touch-icon.png"), apple);
console.log(`✓ public/apple-touch-icon.png           ${fmt(apple.length)}`);

// 4. Open Graph image — keep the existing crew shot but overlay logo? Skip;
//    og-image.jpg already curated. Instead write a square logo OG variant.
const ogLogo = await base
  .clone()
  .resize(1200, 630, { fit: "contain", background: "#0B1F3A" })
  .flatten({ background: "#0B1F3A" })
  .jpeg({ quality: 88, progressive: true })
  .toBuffer();
await writeFile(resolve(PUBLIC, "og-logo.jpg"), ogLogo);
console.log(`✓ public/og-logo.jpg                    ${fmt(ogLogo.length)}`);

console.log(`\nDone.`);
