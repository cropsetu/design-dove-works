// Downloads About-Us page photos from starsecuritybouncer.com,
// converts them to WebP, and saves to src/assets/about/<slug>.webp.
// Usage: node scripts/download-about-photos.mjs

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "about");

// [slug, source URL]
const PHOTOS = [
  ["sonali-kamble", "https://www.starsecuritybouncer.com/wp-content/uploads/2025/06/Sonali-Kamble-1.jpg"],
  ["about-hero",    "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/about-us-1-1.jpeg"],
  ["our-vision",    "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/our-vision.jpg"],
  ["our-mission",   "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/our-mission.jpg"],
  ["our-history",   "https://www.starsecuritybouncer.com/wp-content/uploads/2023/05/Our_History-1.jpg"],
  ["iso-cert",      "https://www.starsecuritybouncer.com/wp-content/uploads/2025/03/star-security-and-bouncer-iso.jpg"],
  ["hotel",         "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/hotel.jpg"],
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

  for (const [slug, url] of PHOTOS) {
    try {
      const inBuf = await fetchWithRetry(url);
      const outBuf = await sharp(inBuf)
        .rotate()
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      const out = resolve(OUT_DIR, `${slug}.webp`);
      await writeFile(out, outBuf);
      const ratio = ((1 - outBuf.length / inBuf.length) * 100).toFixed(0);
      console.log(`✓ ${slug.padEnd(15)} ${fmt(inBuf.length).padStart(10)} → ${fmt(outBuf.length).padStart(8)}  (-${ratio}%)`);
      totalIn += inBuf.length;
      totalOut += outBuf.length;
    } catch (e) {
      failed.push({ slug, url, err: e.message });
      console.error(`✗ ${slug}: ${e.message}`);
    }
  }

  console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)} (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.slug}: ${f.err}`));
    process.exit(1);
  }
};

main().catch((err) => { console.error(err); process.exit(1); });
