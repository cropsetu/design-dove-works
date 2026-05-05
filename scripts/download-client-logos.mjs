// Downloads the client logos from starsecuritybouncer.com, converts to WebP,
// and saves to src/assets/clients/<slug>.webp.
// Usage: node scripts/download-client-logos.mjs

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "clients");

// [name, slug, source URL]
const LOGOS = [
  ["Tech Mahindra", "tech-mahindra", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Tech_Mahindra.jpg"],
  ["Kalpak", "kalpak", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Kalpak.jpg"],
  ["Anshul Group", "anshul-group", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Anshul_Group.jpg"],
  ["Marc Group", "marc-group", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Marc_Group.jpg"],
  ["Ruby Hall Clinic", "ruby-hall-clinic", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/12/ruby-hall-clinic-logo.jpg"],
  ["Panchsil Office Park", "panchsil-office-park", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Panchsil_Office_Park.jpg"],
  ["Bramha", "bramha", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Bramha.jpg"],
  ["Aum Cityscapes", "aum-cityscapes", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Aum_Cityscapes.jpg"],
  ["Krushnai Water Park", "krushnai-water-park", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Krushnai_Water_Park.jpg"],
  ["Sheraton Grand", "sheraton-grand", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/12/sheraton-grand-logo.jpg"],
  ["MCCIA", "mccia", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/05/MCCIA.jpg"],
  ["Sunny's World", "sunnys-world", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Sunnys_World.jpg"],
  ["Darode Jog Properties", "darode-jog-properties", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Darode_Jog_Properties.jpg"],
  ["A2Z Online Services", "a2z-online-services", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/12/a2z-online-services-logo.jpg"],
  ["TATA", "tata", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/05/TATA.jpg"],
  ["Aquarius Resort", "aquarius-resort", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Aquarius_Resort.jpg"],
  ["Infinite Variable", "infinite-variable", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/05/Infinite_Variable.jpg"],
  ["Five Star Constructions", "five-star-constructions", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Five_Star_Constructions.jpg"],
  ["Toyota", "toyota", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Toyota.jpg"],
  ["Wildernest Resort", "wildernest-resort", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Wildernest_Resort-1.jpg"],
  ["Shubhankar", "shubhankar", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/02/Shubhankar.jpg"],
  ["Continuum Advertising & Events", "continuum-advertising-events", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/07/continuum-advertising-and-events.jpg"],
  ["Mouser Electronics", "mouser-electronics", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/Mouser_Electronics.jpg"],
  ["ASPL", "aspl", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/03/aspl.jpg"],
  ["Avenue Group", "avenue-group", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/05/Avenue_Group_logo.jpg"],
  ["Meraki Events", "meraki-events", "https://www.starsecuritybouncer.com/wp-content/uploads/2023/07/meraki-events.jpg"],
];

const fmt = (b) => (b >= 1024 * 1024 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);

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

  for (const [name, slug, url] of LOGOS) {
    try {
      const inBuf = await fetchWithRetry(url);
      // Logos: keep on a clean white background, max 600px wide, quality 85
      const outBuf = await sharp(inBuf)
        .resize({ width: 600, withoutEnlargement: true })
        .flatten({ background: "#ffffff" })
        .webp({ quality: 85, effort: 6 })
        .toBuffer();
      const out = resolve(OUT_DIR, `${slug}.webp`);
      await writeFile(out, outBuf);
      totalIn += inBuf.length;
      totalOut += outBuf.length;
      console.log(`✓ ${name.padEnd(35)} ${fmt(inBuf.length).padStart(8)} → ${fmt(outBuf.length).padStart(7)}`);
    } catch (e) {
      failed.push({ name, slug, err: e.message });
      console.error(`✗ ${name}: ${e.message}`);
    }
  }

  console.log(`\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)} (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  if (failed.length) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.name}: ${f.err}`));
    process.exit(1);
  }
};

main().catch((err) => { console.error(err); process.exit(1); });
