// Downloads Instagram reels from INSTAGRAM_REELS, compresses to web-friendly MP4,
// and extracts a first-frame WebP poster for each. Writes to src/assets/reels/.
//
// Pipeline per reel:
//   1. yt-dlp  → /tmp/reel-XX.original.mp4  (raw IG download, ~5-15 MB)
//   2. ffmpeg  → src/assets/reels/reel-XX.mp4  (720p, H.264 CRF 26, AAC 96k, faststart, ~1-2 MB)
//   3. ffmpeg  → /tmp/reel-XX-poster.jpg     (first sharp frame at 0.5s)
//   4. sharp   → src/assets/reels/reel-XX.webp (WebP poster, q=80, ~30-60 KB)
//
// Usage: node scripts/import-reels.mjs

import sharp from "sharp";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access, mkdir, readFile, writeFile, stat, rm, mkdtemp } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const exec = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "reels");

// Mapping mirrors the order in src/data/site.ts → INSTAGRAM_REELS.
const REELS = [
  ["reel-01", "DX6pjbKgMIf"],
  ["reel-02", "DXy8GUisFPZ"],
  ["reel-03", "DXTaEDHt9bq"],
  ["reel-04", "DWJo0UIDKD6"],
  ["reel-05", "DWDec3zD42K"],
  ["reel-06", "DV3pfU3jION"],
  ["reel-07", "DWUgib0E3d3"],
  ["reel-08", "DNLbkIvPMXB"],
];

const fmt = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });
  const tmp = await mkdtemp(resolve(tmpdir(), "reels-import-"));

  let totalIn = 0;
  let totalOut = 0;
  const failed = [];

  // Process only specific slugs if passed as CLI args; otherwise iterate all.
  const onlySlugs = new Set(process.argv.slice(2));
  const todo = onlySlugs.size > 0 ? REELS.filter(([s]) => onlySlugs.has(s)) : REELS;

  for (const [slug, id] of todo) {
    const rawPath = resolve(tmp, `${slug}.raw.mp4`);
    const mp4Path = resolve(OUT_DIR, `${slug}.mp4`);
    const posterJpg = resolve(tmp, `${slug}-poster.jpg`);
    const posterPath = resolve(OUT_DIR, `${slug}.webp`);

    // Skip if both outputs already exist (unless explicitly requested by slug).
    if (onlySlugs.size === 0 && (await exists(mp4Path)) && (await exists(posterPath))) {
      console.log(`✓ skip ${slug} (already imported)`);
      continue;
    }

    console.log(`\n→ ${slug}  (${id})`);
    try {
      // 1. Download via yt-dlp
      await exec("yt-dlp", [
        "-f", "best[ext=mp4]/mp4",
        "-o", rawPath,
        "--no-warnings",
        `https://www.instagram.com/reel/${id}/`,
      ], { maxBuffer: 1024 * 1024 * 64 });
      const rawStat = await stat(rawPath);
      console.log(`  ↓ downloaded ${fmt(rawStat.size)}`);

      // 2. Compress with ffmpeg
      //    -vf scale: cap the longer side at 720 px (preserves portrait aspect)
      //    -crf 26: visually transparent for phone-screen viewing
      //    -movflags +faststart: enables progressive download (player starts as soon as bytes arrive)
      await exec("ffmpeg", [
        "-y",
        "-i", rawPath,
        "-vf", "scale='if(gt(iw,ih),min(720,iw),-2)':'if(gt(iw,ih),-2,min(720,ih))'",
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        "-loglevel", "error",
        mp4Path,
      ], { maxBuffer: 1024 * 1024 * 64 });
      const mp4Stat = await stat(mp4Path);
      const vidRatio = ((1 - mp4Stat.size / rawStat.size) * 100).toFixed(0);
      console.log(`  ✓ video    ${fmt(rawStat.size).padStart(10)} → ${fmt(mp4Stat.size).padStart(8)}  (-${vidRatio}%)`);

      // 3. Extract a clean first-frame poster (skip 0.5s in case there's a black opening frame).
      await exec("ffmpeg", [
        "-y",
        "-ss", "0.5",
        "-i", rawPath,
        "-frames:v", "1",
        "-q:v", "2",
        "-loglevel", "error",
        posterJpg,
      ], { maxBuffer: 1024 * 1024 * 16 });

      // 4. Convert poster JPEG → WebP via sharp.
      const jpgBuf = await readFile(posterJpg);
      const webpBuf = await sharp(jpgBuf)
        .resize({ width: 720, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      await writeFile(posterPath, webpBuf);
      const posterStat = await stat(posterPath);
      console.log(`  ✓ poster                       → ${fmt(posterStat.size).padStart(8)}`);

      totalIn += rawStat.size;
      totalOut += mp4Stat.size + posterStat.size;
    } catch (e) {
      failed.push({ slug, id, err: e.message });
      console.error(`  ✗ ${slug} (${id}): ${e.message.split("\n")[0]}`);
    }
  }

  // Tidy temp dir.
  await rm(tmp, { recursive: true, force: true });

  console.log(`\n────────────────────────`);
  console.log(`Total raw download:  ${fmt(totalIn)}`);
  console.log(`Total compressed:    ${fmt(totalOut)}`);
  if (totalIn > 0) {
    console.log(`Reduction:           -${((1 - totalOut / totalIn) * 100).toFixed(0)}%`);
  }
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.slug} (${f.id}): ${f.err.split("\n")[0]}`));
    process.exit(1);
  }
};

main().catch((err) => { console.error(err); process.exit(1); });
