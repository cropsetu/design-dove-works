// Downloads the photo-gallery images from starsecuritybouncer.com,
// converts to WebP, and saves to src/assets/gallery/<slug>.webp.
// Usage: node scripts/download-gallery.mjs

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "gallery");

const BASE = "https://www.starsecuritybouncer.com/wp-content/uploads/2023/06/";

// All 15 unique full-size gallery images.
const PHOTOS = [
  ["IMG-20230227-WA0027-1.jpg", "field-01"],
  ["IMG-20230227-WA0028.jpg",   "field-02"],
  ["IMG-20230227-WA0029-1-1.jpg","field-03"],
  ["IMG-20230227-WA0032-1.jpg", "field-04"],
  ["IMG-20230227-WA0034.jpg",   "field-05"],
  ["IMG-20230227-WA0035.jpg",   "field-06"],
  ["IMG-20230227-WA0036-1.jpg", "field-07"],
  ["IMG-20230227-WA0039-1.jpg", "field-08"],
  ["IMG-20230227-WA0040-2.jpg", "field-09"],
  ["IMG-20230227-WA0041.jpg",   "field-10"],
  ["IMG-20230227-WA0044.jpg",   "field-11"],
  ["IMG-20230227-WA0045.jpg",   "field-12"],
  ["IMG-20230227-WA0046.jpg",   "field-13"],
  ["IMG-20230227-WA0047.jpg",   "field-14"],
  ["IMG-20230227-WA0048.jpg",   "field-15"],
];

const TARGET_WIDTH = 1600;
const QUALITY = 80;

const fmt = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

const fetchWithRetry = async (url, attempts = 3) => {
  let last;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw last;
};

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });
  let totalIn = 0;
  let totalOut = 0;
  const failed = [];

  for (const [filename, slug] of PHOTOS) {
    try {
      const inBuf = await fetchWithRetry(BASE + filename);
      const outBuf = await sharp(inBuf)
        .rotate() // honour EXIF orientation (these are phone photos)
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      const out = resolve(OUT_DIR, `${slug}.webp`);
      await writeFile(out, outBuf);
      totalIn += inBuf.length;
      totalOut += outBuf.length;
      console.log(`✓ ${slug.padEnd(10)} ${fmt(inBuf.length).padStart(10)} → ${fmt(outBuf.length).padStart(8)}  (-${((1 - outBuf.length / inBuf.length) * 100).toFixed(0)}%)`);
    } catch (e) {
      failed.push({ slug, filename, err: e.message });
      console.error(`✗ ${slug}: ${e.message}`);
    }
  }

  console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)} (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.slug} (${f.filename}): ${f.err}`));
    process.exit(1);
  }
};

main().catch((err) => { console.error(err); process.exit(1); });
