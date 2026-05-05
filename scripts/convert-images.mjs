// Converts the user's 19 Gemini-generated PNGs from "~/Desktop/Bouncer Folder/"
// → optimised WebP files at src/assets/services/<slug>.webp.
// Usage: node scripts/convert-images.mjs

import sharp from "sharp";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(homedir(), "Desktop", "Bouncer Folder");
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "services");

// Filename in "Bouncer Folder" → service slug used in the IMAGES map.
const MAPPING = [
  ["Banking Institutiional .png", "banking-institutional-and-customer-safety"],
  ["Bouncer Security Services.png", "bouncer-security-services"],
  ["Celebrity Security.png", "security-for-celebrities"],
  ["Corporate Event.png", "event-management-security"],
  ["Education instiute Secuity.png", "security-services-for-educational-institutions"],
  ["Mall Securiry.png", "security-for-mall-and-commercial-complexes"],
  ["Personal Security.png", "security-for-personal-guard"],
  ["Real Estate Secutiry gurd.png", "real-estate-and-market-place-security"],
  ["Residential Society Security.png", "residential-society-or-complexes-security"],
  ["Secure Transit.png", "secure-transit-security"],
  ["Security For Bank AT.png", "security-for-banks-or-atms"],
  ["Security for  Warehouse.png", "security-for-warehouses-godowns"],
  ["Secutiy for Hospital.png", "security-services-for-hospital"],
  ["Secutiy for Hotel.png", "security-guards-for-hotels-or-restaurants"],
  ["VVIP Seutiy.png", "vvip-security"],
  ["Women Safety.png", "women-safety-and-transport-security"],
  ["campus-perimeter-combat-security.png", "campus-perimeter-combat-security"],
  ["corporate-security-services.png", "corporate-security-services"],
  ["security-guard-service.png", "security-guard-services"],
];

const TARGET_WIDTH = 1920;
const QUALITY = 80;

const fmt = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  let totalIn = 0;
  let totalOut = 0;
  const failed = [];

  for (const [fname, slug] of MAPPING) {
    const inPath = resolve(SRC_DIR, fname);
    const outPath = resolve(OUT_DIR, `${slug}.webp`);

    try {
      const inStat = await stat(inPath);
      const buf = await readFile(inPath);

      const outBuf = await sharp(buf)
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();

      await writeFile(outPath, outBuf);

      const ratio = ((1 - outBuf.length / inStat.size) * 100).toFixed(0);
      console.log(`✓ ${slug.padEnd(50)} ${fmt(inStat.size).padStart(10)} → ${fmt(outBuf.length).padStart(8)}  (-${ratio}%)`);

      totalIn += inStat.size;
      totalOut += outBuf.length;
    } catch (err) {
      failed.push({ slug, fname, err: err.message });
      console.error(`✗ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)}  (saved ${fmt(totalIn - totalOut)}, -${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.slug} (${f.fname}): ${f.err}`));
    process.exit(1);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
