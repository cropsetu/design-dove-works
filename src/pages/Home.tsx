import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, X, Phone, Quote, Star, MessageCircle } from "lucide-react";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, STATS, INDUSTRIES, TESTIMONIALS, CLIENT_LOGOS, CONCERNS, SOLUTIONS, AWARDS, SITE } from "@/data/site";
import heroGuard from "@/assets/hero-guard.jpg";
import detailUniform from "@/assets/detail-uniform.jpg";
import bouncerEvent from "@/assets/bouncer-event.jpg";
import real1 from "@/assets/real-1.jpg";
import real2 from "@/assets/real-2.jpg";
import real3 from "@/assets/real-3.jpg";
import aboutImg from "@/assets/about.jpg";
import bouncerSvc from "@/assets/service-bouncer.jpg";
import corporateSvc from "@/assets/service-corporate.jpg";
import residentialSvc from "@/assets/service-residential.jpg";
import vvipSvc from "@/assets/service-vvip.jpg";
import industrialSvc from "@/assets/service-industrial.jpg";
import trainingImg from "@/assets/training.jpg";

const SERVICE_IMAGES: Record<string, string> = {
  "manned-guarding": corporateSvc,
  "bouncer-bodyguard": bouncerSvc,
  "event-security": bouncerEvent,
  "corporate-security": corporateSvc,
  "industrial-security": industrialSvc,
  "residential-society-security": residentialSvc,
  "personal-security": vvipSvc,
  "mall-retail-security": trainingImg,
  "warehouse-security": industrialSvc,
};

const Home = () => {
  const { openModal } = useQuote();
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const heroSlides = [real1, real2, real3, heroGuard];
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const onQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <SEO
        title="Star Security & Bouncer — Pune's Trusted Security Agency"
        description="18+ years of police-permitted, ISO-certified security services in Pune. Trained guards, bouncers, bodyguards, event & corporate security across Maharashtra."
        path="/"
        jsonLd={localBusinessJsonLd()}
      />

      {/* HERO — split layout, photo-led, with faint auto carousel + inline quote form */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {heroSlides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Star Security operations"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${i === slideIdx ? "opacity-30" : "opacity-0"}`}
            width={1920}
            height={1080}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
        {/* slide dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlideIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === slideIdx ? "w-8 bg-gold" : "w-2 bg-primary-foreground/40"}`}
            />
          ))}
        </div>
        <div className="container-wide relative z-10 grid items-center gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow !text-gold">Pune · Since 2007 · Police Permitted</span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="heading-hero mt-5 max-w-3xl uppercase tracking-tight text-primary-foreground">
                It's time to upgrade<br />your security —<br />
                <span className="text-gold">SWITCH TO STAR.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
                ISO-certified protection for offices, factories, societies, events and individuals across Pune & Maharashtra. Trained personnel. Real supervision. 24×7 response.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => openModal()} className="btn-gold">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </button>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-3 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground transition hover:brightness-110">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={`tel:${SITE.phone}`} className="btn-outline-light">
                  <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
                </a>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {SITE.badges.map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/85">
                    <CheckCircle2 className="h-4 w-4 text-gold" />{b}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* placeholder removed below — quote form is now a direct grid child */}

          {/* Quick quote form — globe-style */}
          <Reveal delay={300} className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-3 -top-3 hidden h-full w-full rounded-lg border-2 border-gold/50 lg:block" />
              <form onSubmit={onQuickSubmit} className="relative rounded-lg bg-card p-6 shadow-elegant sm:p-7" style={{ boxShadow: "var(--shadow-elegant)" }}>
                <div className="border-l-4 border-gold pl-3">
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider text-primary sm:text-2xl">Get Started Today</h2>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Quote within the hour. Free site survey.</p>
                <div className="mt-5 space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
                    <input value={quickName} onChange={e => setQuickName(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Number</label>
                    <input value={quickPhone} onChange={e => setQuickPhone(e.target.value)} required type="tel" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Required</label>
                    <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold">
                      <option>Choose a service…</option>
                      {SERVICES.slice(0, 10).map(s => <option key={s.slug}>{s.title}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="btn-gold w-full">Submit Enquiry <ArrowRight className="h-4 w-4" /></button>
                  <p className="text-center text-[11px] text-muted-foreground">By submitting you agree to be contacted by our team.</p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Stat band */}
        <div className="relative z-10 border-t border-white/10 bg-primary/70 backdrop-blur">
          <div className="container-wide grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="px-4 py-5 text-center text-primary-foreground">
                <div className="font-mono-num text-3xl font-bold text-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest opacity-80 sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b bg-background py-8">
        <div className="container-wide">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">Trusted by 500+ organisations across Pune</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {CLIENT_LOGOS.slice(0, 8).map(l => (
              <span key={l} className="font-display text-base font-semibold text-primary/70">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <img src={aboutImg} alt="Star Security leadership" className="w-full rounded-lg shadow-elegant" width={1280} height={900} loading="lazy" style={{ boxShadow: "var(--shadow-elegant)" }} />
              <img src={detailUniform} alt="Security uniform detail" className="absolute -bottom-6 -right-6 hidden w-40 rounded-lg border-4 border-background shadow-elegant lg:block" loading="lazy" style={{ boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -left-3 -top-3 rounded-lg bg-gold px-4 py-2.5 text-primary shadow-gold sm:-left-4 sm:-top-4 sm:px-5 sm:py-3" style={{ boxShadow: "var(--shadow-gold)" }}>
                <div className="font-mono-num text-2xl font-bold leading-none sm:text-3xl">18+</div>
                <div className="text-[10px] uppercase tracking-widest">Years</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6">
            <span className="eyebrow">Welcome to Star Security</span>
            <h2 className="heading-section mt-4 text-primary">A Pune family business, built on trust.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded in 2007 by Late Anil Kamble and now led by MD Sonali Kamble, Star Security & Bouncer has grown into one of Pune's most respected private-security agencies. We protect over 500 sites — from MIDC factories and IT campuses to weddings, hospitals and gated societies — with PSARA-trained, police-verified personnel and real on-ground supervision.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {["PSARA Licensed Agency","ISO 9001:2015 Certified","Pune Police Permitted","2000+ trained personnel"].map(p => (
                <li key={p} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-gold" />{p}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-gold">Read our story <ArrowRight className="h-4 w-4" /></Link>
              <button onClick={() => openModal()} className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground">Get a Quote</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — image-led cards */}
      <section className="section bg-muted/40">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Security Services</span>
            <h2 className="heading-section mt-4 text-primary">19 specialised services. One trusted partner.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Reveal key={s.slug} delay={i * 50}>
                <Link to={`/services/${s.slug}`} className="card-elevate group block h-full overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                    <img
                      src={SERVICE_IMAGES[s.slug] || corporateSvc}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-gold text-primary shadow-gold" style={{ boxShadow: "var(--shadow-gold)" }}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-xl font-bold text-primary-foreground">{s.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground line-clamp-2">{s.short}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
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

      {/* INDUSTRIES — bold dark band */}
      <section className="section relative overflow-hidden bg-primary text-primary-foreground">
        <img src={bouncerEvent} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
        <div className="container-wide relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow !text-gold">Industries we secure</span>
            <h2 className="heading-section mt-4 text-primary-foreground">Trusted across every sector in Pune.</h2>
            <div className="gold-divider mt-6" />
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
