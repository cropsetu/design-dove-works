import { useState } from "react";
import {
  Building2, Banknote, Factory, Camera, UtensilsCrossed, ShoppingBag,
  Warehouse, Stethoscope, GraduationCap, ArrowRight, Sparkles,
  CheckCircle2, type LucideIcon,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import {
  CLIENT_LOGOS, CLIENT_CATEGORIES, INDUSTRIES, TESTIMONIALS, SITE,
} from "@/data/site";

// Eagerly bundle all client logos via Vite's glob import — no per-file imports needed.
const logoModules = import.meta.glob<{ default: string }>("@/assets/clients/*.webp", {
  eager: true,
});
const logoBySlug: Record<string, string> = {};
for (const [path, mod] of Object.entries(logoModules)) {
  const slug = path.split("/").pop()!.replace(/\.webp$/, "");
  logoBySlug[slug] = mod.default;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Building2, Banknote, Factory, Camera, UtensilsCrossed, ShoppingBag, Warehouse,
  Stethoscope, GraduationCap,
};

const Clients = () => {
  const { openModal } = useQuote();
  const [activeTab, setActiveTab] = useState(CLIENT_CATEGORIES[0].name);
  const active = CLIENT_CATEGORIES.find((c) => c.name === activeTab) ?? CLIENT_CATEGORIES[0];

  return (
    <>
      <SEO
        title="Our Clients | Star Security & Bouncer Pune"
        description="Tech Mahindra, Panchshil, TATA, Toyota, Sheraton, Ruby Hall and 500+ more — see the brands that trust Star Security & Bouncer for their security, across IT, hospitality, real estate and manufacturing."
        path="/clients"
      />

      {/* HERO */}
      <section className="relative overflow-hidden navy-bg py-24 text-primary-foreground lg:py-32">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-15"
          style={{ background: "var(--gradient-gold)", filter: "blur(60px)" }}
        />
        <div className="container-wide relative">
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Clients</span>
          </div>
          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">
            Trusted by <span className="text-gold">India's most demanding</span> brands.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            From Fortune-500 IT campuses to leading hospitals, hotels, industrial plants and real-estate giants — Star Security & Bouncer protects the names you know.
          </p>

          {/* Stat strip */}
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { v: `${CLIENT_LOGOS.length}+`, l: "Esteemed Brands" },
              { v: "500+", l: "Locations Served" },
              { v: "18+", l: "Years of Trust" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur">
                <div className="font-display text-3xl font-bold text-gold">{s.v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-primary-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO WALL */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our esteemed clients</span>
            <h2 className="heading-section mt-4 text-primary">
              Brands we proudly protect.
            </h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground">
              A selection of the {CLIENT_LOGOS.length} organisations that have trusted Star Security & Bouncer with their people and premises.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {CLIENT_LOGOS.map((logo, i) => {
              const src = logoBySlug[logo.slug];
              return (
                <Reveal key={logo.slug} delay={i * 30}>
                  <div className="group relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md">
                    {src ? (
                      <img
                        src={src}
                        alt={`${logo.name} logo`}
                        title={logo.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-center font-display text-xs font-semibold text-primary/80">{logo.name}</span>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRY-CATEGORISED CLIENT LIST — animated tabs */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">By industry</span>
            <h2 className="heading-section mt-4 text-primary">
              Same standard. Every sector.
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          {/* Tab buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {CLIENT_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.iconKey] || Building2;
              const isActive = activeTab === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(cat.name)}
                  className={
                    "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all " +
                    (isActive
                      ? "border-gold bg-gold text-primary shadow-md"
                      : "border-border bg-card text-primary hover:border-gold/50 hover:bg-gold/5")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                  <span className={"ml-1 rounded-full px-1.5 text-[10px] font-bold " + (isActive ? "bg-primary text-gold" : "bg-muted text-muted-foreground")}>
                    {cat.clients.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="mt-10">
            <div
              key={active.name}
              className="mx-auto max-w-4xl animate-fade-up overflow-hidden rounded-xl border bg-card shadow-elegant"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              {/* Panel header */}
              <div className="relative overflow-hidden navy-bg p-6 text-primary-foreground">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30"
                  style={{ background: "var(--gradient-gold)", filter: "blur(40px)" }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold text-primary">
                    {(() => {
                      const Icon = CATEGORY_ICONS[active.iconKey] || Building2;
                      return <Icon className="h-5 w-5" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Industry</span>
                    <h3 className="font-display text-2xl text-primary-foreground">{active.name}</h3>
                  </div>
                </div>
              </div>

              {/* Panel body */}
              <ul className="grid gap-2 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {active.clients.map((c, i) => (
                  <li
                    key={c}
                    className="group flex items-start gap-2.5 rounded-md border border-border/60 bg-card p-3 text-sm transition-all hover:border-gold/50 hover:bg-gold/5"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="leading-relaxed text-primary">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES OVERVIEW */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Sectors we serve</span>
            <h2 className="heading-section mt-4 text-primary">Every sector. Every shift.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INDUSTRIES.map((i, idx) => (
              <Reveal key={i.name} delay={idx * 50}>
                <div className="card-elevate group p-6 text-center transition-transform hover:-translate-y-1">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-primary">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-primary">{i.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT VOICE — selected testimonials */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Client voice</span>
            <h2 className="heading-section mt-4 text-primary">In their words.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2">
            {TESTIMONIALS.slice(0, 4).map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="h-full">
                <figure className="card-elevate flex h-full flex-col p-6">
                  <div className="text-4xl font-bold text-gold/40">"</div>
                  <blockquote className="-mt-4 flex-1 text-base italic leading-relaxed text-foreground">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4">
                    <div className="font-display font-bold text-primary">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-narrow text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h2 className="heading-section mt-4 text-primary-foreground">
            Become our next esteemed client.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Free site survey, quote within the hour, officers deployed within 48 hours — across {SITE.coverageCities.length} cities.
          </p>
          <button onClick={() => openModal()} className="btn-gold mt-8">
            Get in touch <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Clients;
