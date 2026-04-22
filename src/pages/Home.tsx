import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, X, Phone, Award, Quote, Star } from "lucide-react";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, STATS, INDUSTRIES, TESTIMONIALS, CLIENT_LOGOS, CONCERNS, SOLUTIONS, AWARDS, SITE } from "@/data/site";
import heroImg from "@/assets/hero-security.jpg";
import aboutImg from "@/assets/about.jpg";

const Home = () => {
  const { openModal } = useQuote();

  return (
    <>
      <SEO
        title="Star Security & Bouncer — Pune's Trusted Security Agency"
        description="18+ years of police-permitted, ISO-certified security services in Pune. Trained guards, bouncers, bodyguards, event & corporate security across Maharashtra."
        path="/"
        jsonLd={localBusinessJsonLd()}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img src={heroImg} alt="Star Security guards on duty in Pune" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10 flex min-h-[92vh] flex-col justify-center py-24 text-primary-foreground">
          <Reveal>
            <span className="eyebrow !text-gold">Pune · Since 2007</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="heading-hero mt-5 max-w-3xl text-primary-foreground">
              It's time to upgrade your security —<br />
              <span className="text-gold">SWITCH TO STAR.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
              Police-permitted, ISO-certified protection for offices, factories, societies, events and individuals across Pune & Maharashtra. Trained personnel. Real supervision. 24×7 response.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openModal()} className="btn-gold">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a href={`tel:${SITE.phone}`} className="btn-outline-light">
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
              {SITE.badges.map(b => (
                <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-gold" />{b}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 hidden border-t border-white/10 bg-primary/60 backdrop-blur md:block">
          <div className="container-wide grid grid-cols-4 divide-x divide-white/10">
            {STATS.map(s => (
              <div key={s.label} className="px-4 py-5 text-center text-primary-foreground">
                <div className="font-mono-num text-3xl font-bold text-gold">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP / CLIENT LOGOS */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container-wide">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">Trusted by 500+ organisations across Pune</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {CLIENT_LOGOS.slice(0, 8).map(l => (
              <span key={l} className="font-display text-base font-semibold text-primary/70">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img src={aboutImg} alt="Star Security leadership" className="rounded-lg shadow-elegant" width={1280} height={900} loading="lazy" style={{ boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -bottom-6 -right-6 hidden rounded-lg border border-gold/40 bg-card p-5 shadow-card sm:block" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="font-mono-num text-4xl font-bold text-primary">18+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Years protecting Pune</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Who we are</span>
            <h2 className="heading-section mt-4 text-primary">A Pune family business, built on trust.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded in 2007 by Late Anil Kamble and now led by MD Sonali Kamble, Star Security & Bouncer has grown into one of Pune's most respected private-security agencies. We protect over 500 sites — from MIDC factories and IT campuses to weddings, hospitals and gated societies — with PSARA-trained, police-verified personnel and real on-ground supervision.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {["PSARA Licensed Agency","ISO 9001:2015 Certified","Pune Police Permitted","2000+ trained personnel"].map(p => (
                <li key={p} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-gold" />{p}</li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:text-gold transition">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What we do</span>
            <h2 className="heading-section mt-4 text-primary">19 specialised services. One trusted partner.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link to={`/services/${s.slug}`} className="card-elevate group block h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display mt-5 text-xl text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-gold">View all 19 services <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* CONCERNS / SOLUTIONS */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Star difference</span>
            <h2 className="heading-section mt-4 text-primary">Many concerns. One solution.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 sm:p-8">
              <h3 className="font-display text-xl text-destructive">Common security concerns</h3>
              <ul className="mt-5 space-y-3">
                {CONCERNS.map(c => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-gold/40 bg-gold-soft/30 p-6 sm:p-8">
              <h3 className="font-display text-xl text-primary">The Star Security promise</h3>
              <ul className="mt-5 space-y-3">
                {SOLUTIONS.map(c => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Industries we secure</span>
            <h2 className="heading-section mt-4 text-primary-foreground">Trusted across every sector in Pune.</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INDUSTRIES.map((i, idx) => (
              <Reveal key={i.name} delay={idx * 50}>
                <div className="group rounded-lg border border-white/10 bg-primary-glow/40 p-6 text-center transition-all hover:border-gold/60 hover:bg-primary-glow/70">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-gold text-primary transition-transform group-hover:scale-110">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{i.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS TIMELINE */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="heading-section mt-4 text-primary">A legacy built one milestone at a time.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gold/40 sm:left-1/2" />
            {AWARDS.map((a, i) => (
              <Reveal key={a.year} delay={i * 80}>
                <div className={`relative mb-10 flex flex-col gap-4 sm:flex-row ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                  <div className={`absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-gold sm:left-1/2`} />
                  <div className={`pl-12 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                    <div className="font-mono-num text-2xl font-bold text-gold">{a.year}</div>
                    <div className="font-display mt-1 text-lg text-primary">{a.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-muted/40">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What clients say</span>
            <h2 className="heading-section mt-4 text-primary">Trusted, not just hired.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="card-elevate h-full p-7">
                  <Quote className="h-7 w-7 text-gold/60" />
                  <div className="mt-3 flex gap-1">
                    {[...Array(5)].map((_, n) => <Star key={n} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
                  <div className="mt-5 border-t pt-4">
                    <div className="font-semibold text-primary">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="navy-bg relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-narrow relative z-10 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-gold" />
          <h2 className="heading-section mt-6 text-primary-foreground">Ready to upgrade your security?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Talk to a Pune-based security expert today. Free site survey. No obligation. Quote within the hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => openModal()} className="btn-gold">Request a Free Quote</button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light"><Phone className="h-4 w-4" />Call {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
