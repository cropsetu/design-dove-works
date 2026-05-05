import {
  ShieldCheck, Target, Eye, Heart, Award, CheckCircle2, Sparkles,
  Globe2, Users, ArrowRight, Quote, FileLock2,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SITE, AWARDS } from "@/data/site";
import sonaliImg from "@/assets/about/sonali-kamble.webp";
// Hero, Vision and Mission now use real crew photos (originally HEIC, optimised to WebP).
import aboutHeroImg from "@/assets/gallery/crew-02.webp";
import visionImg from "@/assets/gallery/crew-01.webp";
import missionImg from "@/assets/gallery/crew-03.webp";
import historyImg from "@/assets/about/our-history.webp";
import isoCertImg from "@/assets/about/iso-cert.webp";

const About = () => {
  const { openModal } = useQuote();

  return (
    <>
      <SEO
        title="About Star Security & Bouncer — Premium Security in Pune"
        description="Founded by Late Anil Kamble, Star Security & Bouncer is led today by MD Sonali Kamble. Premium 'BOUNCER CLASS' security personnel across Maharashtra — PSARA-licensed, ISO-certified."
        path="/about"
      />

      {/* HERO with brand photo backdrop */}
      <section className="relative overflow-hidden">
        <img
          src={aboutHeroImg}
          alt="Star Security & Bouncer"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsl(215 65% 10% / 0.9) 0%, hsl(215 65% 10% / 0.65) 45%, hsl(215 65% 10% / 0.25) 80%, hsl(215 65% 10% / 0.1) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full opacity-30"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div className="container-wide relative z-10 py-24 text-primary-foreground lg:py-32">
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">About Us</span>
          </div>
          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">
            Making you feel secure — <span className="text-gold">our goal and objective.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Star Security & Bouncer was founded by Late Anil Kamble to deliver premium <strong className="text-gold">BOUNCER CLASS</strong> security personnel — protecting our clients' reputations and people across {SITE.coverageCities.length} cities.
          </p>
        </div>
      </section>

      {/* MANAGING DIRECTOR */}
      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="h-full lg:col-span-5">
            <div className="relative h-full min-h-[420px] lg:min-h-0">
              <img
                src={sonaliImg}
                alt="Sonali Kamble — Managing Director, Star Security & Bouncer"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-xl object-cover object-top shadow-elegant"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              />
              {/* Gold caption badge in the bottom-right */}
              <div
                className="absolute -bottom-4 -right-4 hidden rounded-lg bg-gold px-5 py-3 text-primary shadow-gold sm:block"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em]">Managing Director</div>
                <div className="font-display text-lg font-bold">Sonali Kamble</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex h-full flex-col justify-center lg:col-span-7">
            <span className="eyebrow">Leadership</span>
            <h2 className="heading-section mt-4 text-primary">
              Led with discipline. Driven by integrity.
            </h2>
            <div className="gold-divider mt-6" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p className="text-lg text-foreground">
                <strong className="text-primary">Sonali Kamble</strong> serves as Managing Director of Star Security and Bouncer, overseeing strategic, operational and business-development efforts across the company.
              </p>
              <p>
                She brings extensive security-industry experience and has established an organisational culture built on <em>integrity, discipline and excellence</em>. Under her leadership, the company has expanded its service portfolio to serve high-profile corporate clients, private events and residential projects.
              </p>
              <p>
                Sonali takes a hands-on approach — continuously refining staff training and integrating current security-technology advancements. Her dedication to client satisfaction and risk management has built the company's reputation for reliability across Maharashtra.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPANY OVERVIEW + FEATURE CARDS + PULL-QUOTE */}
      <section className="section relative overflow-hidden bg-muted/30">
        {/* Subtle gold dot-grid texture covering the whole section */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--gold) / 0.25) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Two soft gold orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full opacity-20"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full opacity-15"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />

        <div className="container-wide relative">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  About Star Security & Bouncer
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="heading-section mt-5 text-primary">
                A premium security partner you can{" "}
                <span className="relative inline-block text-gold">
                  rely on.
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-gold via-gold/50 to-transparent"
                  />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We are a team providing premium security with{" "}
                <strong className="text-primary">BOUNCER CLASS first-point security personnel</strong>.
                Your reputation and security are our first priority.
              </p>
            </Reveal>
          </div>

          {/* 3 feature cards summarising the company overview */}
          <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "BOUNCER CLASS Personnel",
                body: "Hand-picked, trained, first-point security personnel — present on every shift, ready for every scenario.",
              },
              {
                icon: Target,
                title: "Strategic Risk Management",
                body: "Formal site inspections and risk assessments before deployment — every post is sized to a real threat profile, not a template.",
              },
              {
                icon: FileLock2,
                title: "Confidential by Default",
                body: "Standard NDAs on every engagement keep your organisational information completely secure.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-xl border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl">
                  {/* Gold corner glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: "var(--gradient-gold)", filter: "blur(40px)" }}
                  />
                  {/* Card index watermark */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-2 font-mono-num text-7xl font-bold leading-none text-gold/[0.08] transition-all duration-500 group-hover:text-gold/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold-soft text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-bold leading-tight text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Brand pull-quote — bigger, more dramatic */}
          <Reveal delay={200}>
            <div
              className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border-2 border-gold/40 p-10 text-center md:p-14"
              style={{
                background:
                  "linear-gradient(180deg, hsl(215 60% 18% / 0.95), hsl(215 65% 12% / 0.98))",
              }}
            >
              {/* Two pulsing gold orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 animate-pulse rounded-full opacity-30"
                style={{
                  background: "var(--gradient-gold)",
                  filter: "blur(60px)",
                  animationDuration: "5s",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 animate-pulse rounded-full opacity-20"
                style={{
                  background: "var(--gradient-gold)",
                  filter: "blur(60px)",
                  animationDuration: "7s",
                }}
              />
              {/* Decorative top accent line */}
              <div
                aria-hidden
                className="mx-auto h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <Quote className="mx-auto mt-5 h-12 w-12 text-gold opacity-80" />
              <blockquote className="mt-5 font-display text-2xl italic leading-snug text-primary-foreground md:text-3xl lg:text-4xl">
                "With <span className="text-gold">STAR</span> — feel secure."
              </blockquote>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Making you feel secure · is our Goal and Objective
              </div>
              {/* Decorative bottom accent line */}
              <div
                aria-hidden
                className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION + MISSION (with photos) */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Vision · Mission</span>
            <h2 className="heading-section mt-4 text-primary">What drives us forward.</h2>
            <div className="gold-divider mt-6" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Our Vision */}
            <Reveal delay={0}>
              <div className="card-elevate group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={visionImg}
                    alt="Our Vision"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="absolute left-5 bottom-5 flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-primary">
                      <Eye className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">Our Vision</h3>
                  </div>
                </div>
                <div className="flex-1 p-7">
                  <p className="text-base leading-relaxed text-foreground">
                    "To be a <strong className="text-primary">global leader</strong> in the security industry and a <strong className="text-primary">trusted partner</strong> to our Clients, our Employees, our Communities and our Nation."
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Our Mission */}
            <Reveal delay={120}>
              <div className="card-elevate group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={missionImg}
                    alt="Our Mission"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="absolute left-5 bottom-5 flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-primary">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">Our Mission</h3>
                  </div>
                </div>
                <div className="flex-1 p-7">
                  <p className="text-base leading-relaxed text-foreground">
                    "To be a <strong className="text-primary">leader</strong> in the growth of global security and allied security services."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OUR HISTORY */}
      <section className="section bg-muted/30">
        <div className="container-wide grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="flex h-full flex-col justify-center lg:col-span-6">
            <span className="eyebrow">Our History</span>
            <h2 className="heading-section mt-4 text-primary">A private-security company built on hard work.</h2>
            <div className="gold-divider mt-6" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p className="text-lg text-foreground">
                Star Security & Bouncer has grown steadily through <strong className="text-primary">professionalism, hard work and high ethical standards</strong>, establishing itself as a leading private-security provider in the country.
              </p>
              <p>
                Founded by <strong className="text-primary">Late Anil Kamble</strong>, today the company is led by Managing Director Sonali Kamble and deploys trained, police-verified personnel across {SITE.coverageCities.length} cities — from corporate IT campuses and banking institutions to private events and residential complexes.
              </p>
            </div>

            {/* Mini stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <div className="font-display text-3xl font-bold text-gold">18+</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">Years of Service</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">500+</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">Sites Protected</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">2000+</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">Trained Personnel</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full lg:col-span-6">
            <div className="relative h-full min-h-[320px] lg:min-h-0">
              <img
                src={historyImg}
                alt="Star Security & Bouncer — our history"
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-xl object-cover shadow-elegant"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              />
              {/* Tilted year badge */}
              <div className="absolute -left-4 -top-4 rotate-[-6deg] rounded-lg bg-gold px-5 py-3 text-primary shadow-gold" style={{ boxShadow: "var(--shadow-gold)" }}>
                <div className="text-[10px] uppercase tracking-[0.2em]">Established</div>
                <div className="font-display text-2xl font-bold leading-none">2007</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ISO CERTIFICATION + COMPLIANCE BADGES */}
      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="flex h-full items-center justify-center lg:col-span-5">
            <div className="relative w-full">
              <img
                src={isoCertImg}
                alt="Star Security & Bouncer — ISO 9001:2015 certificate"
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border bg-card shadow-elegant"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="flex h-full flex-col justify-center lg:col-span-7">
            <span className="eyebrow">Compliance & Certification</span>
            <h2 className="heading-section mt-4 text-primary">Fully licensed. Fully accountable.</h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Every assignment we take on is backed by formal certification and licensing. Our compliance posture is independently audited — and proudly visible.
            </p>

            <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2">
              {SITE.badges.map((b, i) => (
                <Reveal key={b} delay={i * 60} className="h-full">
                  <div className="flex h-full items-center gap-3 rounded-lg border border-gold/30 bg-card p-4 transition-colors hover:bg-gold/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/15">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <div className="text-sm font-semibold text-primary">{b}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Values</span>
            <h2 className="heading-section mt-4 text-primary">The standards we hold ourselves to.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Integrity", body: "Honest dealings with clients, employees and authorities — every shift, every report." },
              { icon: Heart, title: "Discipline", body: "Bearing, conduct and uniform standards taught from day one and reinforced every quarter." },
              { icon: Users, title: "Excellence", body: "Continuously refined training, modern security technology and relentless attention to detail." },
              { icon: Globe2, title: "Reliability", body: "A reputation built shift by shift — clients renewing year after year, decade after decade." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="h-full">
                <div className="card-elevate group h-full p-7 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 transition-colors group-hover:bg-gold/30">
                    <v.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display mt-5 text-xl text-primary">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & MILESTONES */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Awards & Milestones</span>
            <h2 className="heading-section mt-4 text-primary">Recognised. Re-certified. Repeated by clients.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {AWARDS.map((a, i) => (
              <Reveal key={a.year} delay={i * 60}>
                <div className="card-elevate flex gap-5 p-6">
                  <div className="font-mono-num text-3xl font-bold text-gold">{a.year}</div>
                  <div>
                    <h3 className="font-display text-lg text-primary">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-narrow text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h2 className="heading-section mt-4 text-primary-foreground">Let's start with a conversation.</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            A free site survey, an honest recommendation, and a quote tailored to your real risks — not a one-size-fits-all package.
          </p>
          <button onClick={() => openModal()} className="btn-gold mt-8">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
