// Generates 19 service hero images via Pollinations.ai (Flux model — free, no auth).
// Saves to src/assets/services/<slug>.jpg.
// Usage: node scripts/generate-images.mjs [slug1 slug2 ...]
//   - With no args: regenerates only missing images
//   - With slugs: regenerates only those (useful for one-off retries)

import { writeFile, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "assets", "services");

const STYLE_SUFFIX =
  "Cinematic photography, ultra-wide 21:9 hero composition with negative space on the left for text overlay, " +
  "moody low-key lighting with deep navy-blue and teal shadows, warm gold rim-light highlights, " +
  "subtle motion blur in the background, shallow depth of field, slight film grain, premium editorial realism. " +
  "Indian context, professional Indian security agency aesthetic, premium Bouncer Class feel. " +
  "Subject sharp, environment slightly out of focus. Photorealistic, 8K, no text, no logos, no watermarks.";

const SERVICES = [
  {
    slug: "security-guard-services",
    prompt:
      "A confident male Indian security guard in a sharp navy-blue uniform with shoulder epaulettes and a peaked cap, " +
      "standing alert at the entrance of a glass-and-steel corporate building in Pune at early dawn. " +
      "He holds a walkie-talkie close to his chest, eyes scanning the approach. Soft golden sunrise light catches his uniform. " +
      "Dim, slightly blurred background showing the building's lobby through tinted glass.",
  },
  {
    slug: "campus-perimeter-combat-security",
    prompt:
      "A combat-trained Indian security operative in dark tactical gear (cargo trousers, vest, radio harness) patrolling " +
      "the perimeter fence of a large institutional campus at dusk. He scans the boundary with focused intensity, walkie-talkie in hand. " +
      "A watch-tower silhouette and chain-link fence visible in the soft-blurred background. Cinematic blue-hour lighting with warm distant lamp posts.",
  },
  {
    slug: "bouncer-security-services",
    prompt:
      "A tall, broad-shouldered male bouncer in a fitted black suit and earpiece standing firm at the velvet-rope entrance " +
      "of an upscale Indian nightclub. Arms folded, neutral but imposing expression. " +
      "Neon ambient light from the club doorway behind him casts blue-purple highlights, " +
      "with warm gold tungsten lamps softly out of focus. Slight motion-blurred crowd in the deep background.",
  },
  {
    slug: "corporate-security-services",
    prompt:
      "A well-groomed Indian male corporate security officer in a navy-blue blazer with subtle brass insignia, " +
      "standing at the marble reception desk of a modern IT park lobby in Pune. He's politely checking a visitor on a tablet, " +
      "glass facade and elevator banks softly out of focus. Cool architectural lighting with warm gold accents. " +
      "Professional, calm, premium corporate atmosphere.",
  },
  {
    slug: "security-for-mall-and-commercial-complexes",
    prompt:
      "A male Indian mall security guard in dark uniform operating a handheld metal-detector wand, screening a visitor's bag " +
      "at a polished marble mall entrance. Atrium with shoppers gently blurred in the background, escalators and warm gold accent lighting visible. " +
      "Watchful but courteous expression. Cinematic shallow depth of field, premium retail atmosphere.",
  },
  {
    slug: "security-for-celebrities",
    prompt:
      "A muscular Indian close-protection officer in a sharp black suit, dark sunglasses and earpiece, " +
      "holding an open palm toward the camera to block paparazzi flashes. The famous client (back to camera, blurred) walks behind him. " +
      "Streaks of camera-flash light, blue-tinted night air, and out-of-focus crowd. Cinematic, intense, protective body language.",
  },
  {
    slug: "residential-society-or-complexes-security",
    prompt:
      "A polite male Indian society security guard in a smart khaki-and-navy uniform standing at the gated entrance of a premium " +
      "residential complex in Pune, gently greeting a resident. Boom barrier, intercom panel, and a softly blurred row of high-rise apartments at golden-hour. " +
      "Warm friendly atmosphere, professional posture, dignified low-light cinematic feel.",
  },
  {
    slug: "security-for-personal-guard",
    prompt:
      "A discreet Indian personal security officer (PSO) in a charcoal suit walking one step behind and slightly to the side of an unseen client, " +
      "hand near his earpiece, eyes scanning a busy street. Out-of-focus traffic and pedestrians. Late-afternoon golden side-light. " +
      "Calm but hyper-aware expression, classic close-protection body language.",
  },
  {
    slug: "security-for-warehouses-godowns",
    prompt:
      "A male Indian warehouse security guard in a high-visibility vest over a dark uniform, clipboard in hand, " +
      "checking a delivery truck at the loading dock of a large logistics warehouse. Stacked pallets and forklifts in the soft-blurred background, " +
      "late-evening warehouse interior light, single overhead lamp creating moody shadows. Diligent, methodical posture.",
  },
  {
    slug: "security-for-banks-or-atms",
    prompt:
      "A vigilant Indian bank security guard in a dark navy uniform with peaked cap, standing outside a brightly-lit ATM kiosk at night. " +
      "Hand resting on his belt, alert eyes scanning the road. Reflections of the ATM's interior light on the glass, " +
      "blurred passing vehicles' tail-lights in the background. Cinematic urban night photography.",
  },
  {
    slug: "security-services-for-hospital",
    prompt:
      "A calm, broad-shouldered Indian male hospital security guard in a clean uniform standing at the casualty/ER entrance " +
      "of a multispecialty hospital, gesturing for a relative to wait. Glass doors, softly blurred medical staff and stretcher inside, " +
      "fluorescent and warm signage light mixing. Empathetic but firm body language, late-evening cinematic atmosphere.",
  },
  {
    slug: "security-services-for-educational-institutions",
    prompt:
      "A warm, well-mannered male Indian school security guard in a dark uniform with a clipboard, manning the gate of a large school " +
      "as students in uniform walk past, motion-blurred. Wrought-iron school gate, banyan tree branches catching warm morning light. " +
      "Friendly but watchful expression, professional posture, cinematic golden-hour photography.",
  },
  {
    slug: "security-guards-for-hotels-or-restaurants",
    prompt:
      "A polished Indian hotel security officer in an elegant black suit with brass nameplate, standing inside the marble lobby of a 5-star hotel, " +
      "hand discreetly behind his back, smiling slightly. Warm gold chandelier light, blurred guests near the reception desk, " +
      "polished floor reflections. Hospitality-grade grooming, premium editorial atmosphere.",
  },
  {
    slug: "banking-institutional-and-customer-safety",
    prompt:
      "A reassuring Indian male bank-branch security officer in a crisp navy uniform standing inside a busy bank lobby, " +
      "gently directing an elderly customer toward a counter. Glass-fronted teller counters and motion-blurred customers. " +
      "Cool ambient bank lighting with warm gold pendant lamps. Calm, customer-centric body language, premium institutional atmosphere.",
  },
  {
    slug: "secure-transit-security",
    prompt:
      "A serious-faced Indian escort officer in tactical attire (dark vest, radio) standing beside an armored cash-in-transit van on a Pune highway. " +
      "Two-vehicle convoy faintly visible behind, motion blur of traffic streaks past. Moody overcast morning sky, " +
      "blue-grey palette with gold reflective stripes on the van. Cinematic, vigilant atmosphere.",
  },
  {
    slug: "real-estate-and-market-place-security",
    prompt:
      "A male Indian construction-site security guard in a hi-vis vest and hard hat, holding a logbook, standing at the gate of an " +
      "under-construction premium real-estate project in Pune. Tower cranes and partly-built high-rises in the soft-blurred background, " +
      "golden late-afternoon haze, dust particles catching light. Pragmatic, dependable posture.",
  },
  {
    slug: "women-safety-and-transport-security",
    prompt:
      "A respectful Indian male safety-escort officer in a smart dark uniform helping an Indian woman IT professional with a laptop bag " +
      "enter a company cab safely at night. Brightly-lit IT-park exit gate, blurred parked cabs, blue-hour sky. " +
      "Watchful, courteous body language, hand on radio, professional protective atmosphere.",
  },
  {
    slug: "vvip-security",
    prompt:
      "A multi-layer VVIP close-protection detail of three Indian operatives in identical black suits, dark glasses and earpieces, " +
      "flanking a black SUV with tinted windows. The lead operative scans the surroundings with an outstretched palm. " +
      "Convoy lights, motion-blurred onlookers, evening rain-slick city street. Tense, elite, cinematic government-protocol atmosphere.",
  },
  {
    slug: "event-management-security",
    prompt:
      "An Indian male event-security supervisor in a dark uniform with a yellow SECURITY armband, holding a radio, " +
      "standing at a barricaded crowd-control line of a large outdoor concert in Pune at night. " +
      "Stage lights, motion-blurred cheering crowd, smoke and laser haze. Focused, in-charge expression, " +
      "warm stage glow vs cool blue night, cinematic large-event atmosphere.",
  },
];

const exists = async (path) => {
  try { await access(path); return true; } catch { return false; }
};

const buildUrl = (prompt) => {
  const fullPrompt = `${prompt} ${STYLE_SUFFIX}`;
  const encoded = encodeURIComponent(fullPrompt);
  // model=flux for highest quality, 1920x1080 native size, no logo, enhanced prompt
  return `https://image.pollinations.ai/prompt/${encoded}?model=flux&width=1920&height=1080&nologo=true&enhance=true&seed=${Math.floor(Math.random() * 100000)}`;
};

const fetchWithRetry = async (url, attempts = 3) => {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "image/jpeg" },
        // Pollinations can take 30-60s under load
        signal: AbortSignal.timeout(180_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error(`Suspiciously small response (${buf.length}B)`);
      return buf;
    } catch (err) {
      lastErr = err;
      console.warn(`  ↻ retry ${i + 1}/${attempts} (${err.message})`);
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw lastErr;
};

const generate = async (svc) => {
  const out = resolve(OUT_DIR, `${svc.slug}.jpg`);
  const url = buildUrl(svc.prompt);
  console.log(`→ ${svc.slug}`);
  const buf = await fetchWithRetry(url);
  await writeFile(out, buf);
  console.log(`  ✓ ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
};

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const requested = args.length > 0
    ? SERVICES.filter((s) => args.includes(s.slug))
    : SERVICES;

  const todo = [];
  for (const s of requested) {
    const out = resolve(OUT_DIR, `${s.slug}.jpg`);
    if (args.length === 0 && (await exists(out))) {
      console.log(`✓ skip ${s.slug} (exists)`);
      continue;
    }
    todo.push(s);
  }

  console.log(`\nGenerating ${todo.length} of ${requested.length} services\n`);

  const results = { ok: 0, fail: [] };
  for (const svc of todo) {
    try {
      await generate(svc);
      results.ok += 1;
    } catch (err) {
      console.error(`  ✗ ${svc.slug}: ${err.message}`);
      results.fail.push(svc.slug);
    }
  }

  console.log(`\nDone: ${results.ok} ok, ${results.fail.length} failed`);
  if (results.fail.length) {
    console.log(`Retry the failed ones with: node scripts/generate-images.mjs ${results.fail.join(" ")}`);
    process.exit(1);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
