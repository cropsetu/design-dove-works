// One-off: convert the legacy JPGs in src/assets/ to WebP.
// Run once after clone, then delete the .jpg originals.
//   node scripts/optimize-static-assets.mjs

import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets");

const TARGETS = [
  "real-1", "real-2", "real-3",
  "hero-guard", "hero-security",
  "bouncer-event",
  "detail-uniform",
  "about",
  "training",
  "service-bouncer", "service-corporate", "service-residential", "service-vvip", "service-industrial",
];

const TARGET_WIDTH = 1920;
const QUALITY = 80;

const fmt = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

let totalIn = 0;
let totalOut = 0;
const failed = [];

for (const slug of TARGETS) {
  const inPath = resolve(DIR, `${slug}.jpg`);
  const outPath = resolve(DIR, `${slug}.webp`);
  try {
    const inStat = await stat(inPath);
    const buf = await readFile(inPath);
    const out = await sharp(buf)
      .rotate()
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
    await writeFile(outPath, out);
    const ratio = ((1 - out.length / inStat.size) * 100).toFixed(0);
    console.log(`✓ ${slug.padEnd(25)} ${fmt(inStat.size).padStart(10)} → ${fmt(out.length).padStart(8)}  (-${ratio}%)`);
    totalIn += inStat.size;
    totalOut += out.length;
  } catch (e) {
    failed.push({ slug, err: e.message });
    console.error(`✗ ${slug}: ${e.message}`);
  }
}

console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)} (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
if (failed.length) process.exit(1);
