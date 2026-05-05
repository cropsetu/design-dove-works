import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Phone, ShieldCheck, AlertTriangle,
  MapPin, Sparkles, Quote, Clock, Award, Users2, ChevronRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO, faqJsonLd, serviceJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, SITE } from "@/data/site";
// Service-specific hero images (WebP, ~50 KB each).
// Regenerate from PNGs in ~/Desktop/Bouncer Folder/: node scripts/convert-images.mjs
import securityGuardServicesImg from "@/assets/services/security-guard-services.webp";
import campusPerimeterImg from "@/assets/services/campus-perimeter-combat-security.webp";
import bouncerSecurityImg from "@/assets/services/bouncer-security-services.webp";
import corporateSecurityImg from "@/assets/services/corporate-security-services.webp";
import mallComplexImg from "@/assets/services/security-for-mall-and-commercial-complexes.webp";
import celebritiesImg from "@/assets/services/security-for-celebrities.webp";
import residentialSocietyImg from "@/assets/services/residential-society-or-complexes-security.webp";
import personalGuardImg from "@/assets/services/security-for-personal-guard.webp";
import warehouseGodownsImg from "@/assets/services/security-for-warehouses-godowns.webp";
import banksAtmsImg from "@/assets/services/security-for-banks-or-atms.webp";
import hospitalImg from "@/assets/services/security-services-for-hospital.webp";
import educationalInstitutionsImg from "@/assets/services/security-services-for-educational-institutions.webp";
import hotelsRestaurantsImg from "@/assets/services/security-guards-for-hotels-or-restaurants.webp";
import bankingCustomerSafetyImg from "@/assets/services/banking-institutional-and-customer-safety.webp";
import secureTransitImg from "@/assets/services/secure-transit-security.webp";
import realEstateMarketImg from "@/assets/services/real-estate-and-market-place-security.webp";
import womenSafetyTransportImg from "@/assets/services/women-safety-and-transport-security.webp";
import vvipSecurityImg from "@/assets/services/vvip-security.webp";
import eventManagementImg from "@/assets/services/event-management-security.webp";
import heroImg from "@/assets/hero-security.webp";

const IMAGES: Record<string, string> = {
  "security-guard-services": securityGuardServicesImg,
  "campus-perimeter-combat-security": campusPerimeterImg,
  "bouncer-security-services": bouncerSecurityImg,
  "corporate-security-services": corporateSecurityImg,
  "security-for-mall-and-commercial-complexes": mallComplexImg,
  "security-for-celebrities": celebritiesImg,
  "residential-society-or-complexes-security": residentialSocietyImg,
  "security-for-personal-guard": personalGuardImg,
  "security-for-warehouses-godowns": warehouseGodownsImg,
  "security-for-banks-or-atms": banksAtmsImg,
  "security-services-for-hospital": hospitalImg,
  "security-services-for-educational-institutions": educationalInstitutionsImg,
  "security-guards-for-hotels-or-restaurants": hotelsRestaurantsImg,
  "banking-institutional-and-customer-safety": bankingCustomerSafetyImg,
  "secure-transit-security": secureTransitImg,
  "real-estate-and-market-place-security": realEstateMarketImg,
  "women-safety-and-transport-security": womenSafetyTransportImg,
  "vvip-security": vvipSecurityImg,
  "event-management-security": eventManagementImg,
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  const { openModal } = useQuote();
  if (!service) return <Navigate to="/services" replace />;
  const img = IMAGES[service.slug] || heroImg;
  const related = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${service.title} in Pune — Star Security & Bouncer`}
        description={service.description}
        path={`/services/${service.slug}`}
        jsonLd={[serviceJsonLd(service.title, service.description), faqJsonLd(service.faqs)]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={img}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={800}
        />
        {/* Gradient overlay: dark on the left for text legibility, transparent on the right
            so the AI-generated subject on that side stays fully visible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsl(215 65% 10% / 0.7) 0%, hsl(215 65% 10% / 0.45) 35%, hsl(215 65% 10% / 0.15) 65%, hsl(215 65% 10% / 0) 100%)",
          }}
        />
        {/* Subtle bottom-fade for visual grounding without crushing the image */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to top, hsl(215 65% 10% / 0.5), transparent)",
          }}
        />
        <div className="container-wide relative z-10 py-24 lg:py-32 text-primary-foreground">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary-foreground/70">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/services" className="transition-colors hover:text-gold">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{service.title}</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gold text-primary shadow-lg" style={{ boxShadow: "var(--shadow-gold)" }}>
              <service.icon className="h-6 w-6" />
            </div>
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              {SITE.signatureTier} Service
            </span>
          </div>

          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-primary-foreground/85">{service.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openModal(service.title)} className="btn-gold">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light">
              <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-border/60 bg-card">
        <div className="container-wide grid grid-cols-2 gap-px md:grid-cols-4">
          {[
            { icon: Clock, label: "24×7 Coverage", sub: "Round-the-clock deployment" },
            { icon: ShieldCheck, label: SITE.signatureTier, sub: "Signature quality tier" },
            { icon: Award, label: "ISO 9001:2015", sub: "PSARA Licensed" },
            { icon: MapPin, label: `${SITE.coverageCities.length} Cities`, sub: "Maharashtra & Goa" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 bg-card p-5 md:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-sm font-bold text-primary md:text-base">{s.label}</div>
                <div className="text-[11px] text-muted-foreground md:text-xs">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO + PULL QUOTE */}
      {service.intro && service.intro.length > 0 && (
        <section className="section">
          <div className="container-wide grid gap-12 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <span className="eyebrow">Overview</span>
              <h2 className="heading-section mt-4 text-primary">Built for {service.title.toLowerCase()}, end to end.</h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                {service.intro.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-lg text-foreground" : ""}>{p}</p>
                ))}
              </div>
            </Reveal>
            {service.pullQuote && (
              <Reveal delay={120}>
                <div className="sticky top-28">
                  <div className="card-elevate relative overflow-hidden p-7" style={{ background: "var(--gradient-navy)" }}>
                    <Quote className="absolute -right-2 -top-2 h-24 w-24 text-gold/15" />
                    <Sparkles className="h-6 w-6 text-gold" />
                    <blockquote className="mt-4 font-display text-xl leading-snug text-primary-foreground">
                      "{service.pullQuote}"
                    </blockquote>
                    <div className="mt-5 border-t border-primary-foreground/10 pt-4">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{SITE.signatureTier}</div>
                      <div className="mt-1 text-xs text-primary-foreground/70">{SITE.shortName} · Pune</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* COVERAGE / WHAT WE DO */}
      {service.coverage && service.coverage.length > 0 && (
        <section className="section bg-muted/40">
          <div className="container-wide">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">What we cover</span>
              <h2 className="heading-section mt-4 text-primary">Every angle — covered, not assumed.</h2>
              <div className="gold-divider mt-6" />
            </div>
            <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.coverage.map((c, i) => (
                <Reveal key={c.title} delay={i * 60} className="h-full">
                  <div className="card-elevate group h-full p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-soft text-primary transition-colors group-hover:bg-gold group-hover:text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-display mt-4 text-lg leading-tight text-primary">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS + WHO IT'S FOR */}
      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <span className="eyebrow">What's included</span>
            <h2 className="heading-section mt-4 text-primary">Everything you need, none of the gaps.</h2>
            <ul className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2">
              {service.highlights.map(h => (
                <li key={h} className="flex h-full items-start gap-2.5 rounded-md border border-border/60 bg-card p-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-elevate sticky top-28 p-6">
              <div className="flex items-center gap-2.5">
                <Users2 className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg text-primary">Who it's for</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {service.forWhom.map(w => (
                  <li key={w} className="flex gap-2">
                    <span className="text-gold">•</span>{w}
                  </li>
                ))}
              </ul>
              <button onClick={() => openModal(service.title)} className="btn-gold mt-6 w-full !text-xs">
                Request a Quote
              </button>
              <a href={`tel:${SITE.phone}`} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-primary px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Phone className="h-3.5 w-3.5" /> Call now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KEY CHALLENGES */}
      {service.keyChallenges && service.keyChallenges.length > 0 && (
        <section className="section bg-muted/40">
          <div className="container-wide">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Threats we address</span>
              <h2 className="heading-section mt-4 text-primary">The risks we're built for.</h2>
              <div className="gold-divider mt-6" />
            </div>
            <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.keyChallenges.map((k, i) => (
                <Reveal key={k} delay={i * 50} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-md border-l-4 border-destructive bg-card p-5 shadow-sm">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <span className="text-sm leading-relaxed text-foreground">{k}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* METHODOLOGY */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="heading-section mt-4 text-primary">A proven 4-step process.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80} className="h-full">
                <div className="card-elevate relative h-full overflow-hidden p-6">
                  <div className="absolute -right-3 -top-3 font-mono-num text-7xl font-bold text-gold/10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="font-mono-num text-3xl font-bold text-gold">0{i + 1}</div>
                    <h3 className="font-display mt-3 text-lg text-primary">{p.step}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      {service.whyChooseUs && service.whyChooseUs.length > 0 && (
        <section className="section navy-bg text-primary-foreground">
          <div className="container-wide">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow !text-gold">Why Star Security</span>
              <h2 className="heading-section mt-4 text-primary-foreground">
                {service.whyChooseUs.length} reasons clients choose us.
              </h2>
              <div className="gold-divider mt-6" />
            </div>
            <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.whyChooseUs.map((w, i) => (
                <Reveal key={w} delay={i * 60} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur transition-colors hover:bg-primary-foreground/10">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm leading-relaxed text-primary-foreground/90">{w}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CITIES SERVED */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Coverage</span>
            <h2 className="heading-section mt-4 text-primary">Available across {SITE.coverageCities.length} cities.</h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground">
              Star Security & Bouncer operates {service.title} across Maharashtra and Goa — same brand, same standards, same {SITE.signatureTier} quality.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {SITE.coverageCities.map(c => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-muted/40">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">FAQs</span>
            <h2 className="heading-section mt-4 text-primary">Common questions, straight answers.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {service.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="rounded-md border bg-card px-5 mb-3">
                <AccordionTrigger className="text-left font-display text-base text-primary md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Explore more</span>
              <h2 className="heading-section mt-4 text-primary">Related security services</h2>
            </div>
            <Link to="/services" className="btn-outline-light !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              View all 19 services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map(r => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="card-elevate group flex h-full flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-soft text-primary transition-colors group-hover:bg-gold">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg leading-tight text-primary group-hover:text-primary-glow">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{r.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-narrow text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h2 className="heading-section mt-4 text-primary-foreground">
            Ready to deploy {service.title.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Free site survey. Quote within the hour. 24×7 deployment & support.
            {SITE.motto && <span className="mt-3 block italic text-gold">"{SITE.motto}"</span>}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => openModal(service.title)} className="btn-gold">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light">
              <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
