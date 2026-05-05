// Generates dist/sitemap.xml after `vite build`.
// Reads the canonical service slugs and Pune localities directly from
// src/data/site.ts so the sitemap stays in sync with the routes.
//   node scripts/build-sitemap.mjs

import { writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SITE_TS = resolve(ROOT, "src", "data", "site.ts");
const OUT = resolve(ROOT, "dist", "sitemap.xml");
const ORIGIN = "https://www.starsecuritybouncer.com";

// Crude but reliable: regex out the slug arrays from site.ts so we don't have to
// transpile TypeScript at build time.
const src = await readFile(SITE_TS, "utf8");

const serviceSlugs = [...src.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g)].map(m => m[1]);
if (serviceSlugs.length === 0) {
  console.error("✗ Could not parse SERVICES slugs from site.ts");
  process.exit(1);
}

const localitiesMatch = src.match(/PUNE_LOCALITIES\s*=\s*\[([^\]]+)\]/);
const localities = localitiesMatch
  ? [...localitiesMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1])
  : [];

const today = new Date().toISOString().split("T")[0];

// Build the URL list with a sensible <priority> per page type.
const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/services", priority: "0.9", changefreq: "weekly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/training", priority: "0.8", changefreq: "monthly" },
  { loc: "/clients", priority: "0.7", changefreq: "monthly" },
  { loc: "/gallery", priority: "0.6", changefreq: "weekly" },
  { loc: "/contact", priority: "0.9", changefreq: "monthly" },
  { loc: "/coverage", priority: "0.6", changefreq: "monthly" },
  { loc: "/sitemap", priority: "0.3", changefreq: "monthly" },
  { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms", priority: "0.3", changefreq: "yearly" },
  ...serviceSlugs.map(s => ({ loc: `/services/${s}`, priority: "0.85", changefreq: "monthly" })),
  ...localities.map(l => ({
    loc: `/security-services-in-${l.toLowerCase().replace(/\s+/g, "-")}`,
    priority: "0.65",
    changefreq: "monthly",
  })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u =>
    `  <url>\n` +
    `    <loc>${ORIGIN}${u.loc}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${u.changefreq}</changefreq>\n` +
    `    <priority>${u.priority}</priority>\n` +
    `  </url>`
  ).join("\n") +
  `\n</urlset>\n`;

await writeFile(OUT, xml);
console.log(`✓ ${OUT} (${urls.length} URLs: ${serviceSlugs.length} services, ${localities.length} localities)`);
