// Imports HEIC/JPEG photos from ~/Desktop/Image Download/ into the gallery.
// Saves as WebP with a "crew-XX" prefix so they sort first in the gallery grid.
// HEIC files are first decoded via macOS `sips` (sharp's prebuilt binary lacks
// the HEIF/HEVC decode plugin), then sharp finishes the WebP conversion.
// Usage: node scripts/import-gallery-photos.mjs

import sharp from "sharp";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, mkdir, readFile, writeFile, stat, rm, mkdtemp } from "node:fs/promises";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir, tmpdir } from "node:os";

const exec = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(homedir(), "Desktop", "Image Download");
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "gallery");

// Only treat photographic formats as gallery candidates.
const IS_PHOTO = /\.(heic|heif|jpe?g)$/i;

const TARGET_WIDTH = 1600;
const QUALITY = 80;
const PREFIX = "crew";

const fmt = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const entries = await readdir(SRC_DIR);
  const candidates = entries
    .filter((f) => IS_PHOTO.test(extname(f)))
    .sort(); // stable, alphabetical: IMG_1642 < IMG_1644 < IMG_1653 ...

  if (candidates.length === 0) {
    console.log(`No HEIC/JPEG files found in ${SRC_DIR}`);
    return;
  }

  console.log(`Found ${candidates.length} photo(s) — converting to WebP\n`);

  // Temp dir for any HEIC → intermediate JPEG conversions.
  const tmp = await mkdtemp(resolve(tmpdir(), "gallery-heic-"));

  let totalIn = 0;
  let totalOut = 0;
  const failed = [];

  for (let i = 0; i < candidates.length; i++) {
    const src = candidates[i];
    const slug = `${PREFIX}-${String(i + 1).padStart(2, "0")}`;
    const inPath = resolve(SRC_DIR, src);
    const outPath = resolve(OUT_DIR, `${slug}.webp`);
    const ext = extname(src).toLowerCase();

    try {
      const inStat = await stat(inPath);
      let bufPath = inPath;

      // sharp's prebuilt binary can't decode HEIF/HEVC — bounce through macOS sips.
      if (ext === ".heic" || ext === ".heif") {
        const intermediate = resolve(tmp, `${basename(src, extname(src))}.jpg`);
        await exec("sips", ["-s", "format", "jpeg", inPath, "--out", intermediate]);
        bufPath = intermediate;
      }

      const buf = await readFile(bufPath);
      const outBuf = await sharp(buf)
        .rotate() // honour EXIF orientation
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      await writeFile(outPath, outBuf);
      const ratio = ((1 - outBuf.length / inStat.size) * 100).toFixed(0);
      console.log(`✓ ${slug}.webp  ←  ${src.padEnd(28)} ${fmt(inStat.size).padStart(10)} → ${fmt(outBuf.length).padStart(8)}  (-${ratio}%)`);
      totalIn += inStat.size;
      totalOut += outBuf.length;
    } catch (e) {
      failed.push({ src, slug, err: e.message });
      console.error(`✗ ${slug}: ${e.message}`);
    }
  }

  // Clean up temp dir.
  await rm(tmp, { recursive: true, force: true });

  console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)} (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.src}: ${f.err}`));
    process.exit(1);
  }
};

main().catch((err) => { console.error(err); process.exit(1); });
