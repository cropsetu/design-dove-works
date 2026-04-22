import { ShieldCheck, Target, Eye, Heart, Award, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SITE, AWARDS } from "@/data/site";
import aboutImg from "@/assets/about.jpg";

const About = () => {
  const { openModal } = useQuote();
  return (
    <>
      <SEO title="About Star Security & Bouncer — 18+ Years in Pune" description="The story behind Pune's trusted security agency: founded by Late Anil Kamble in 2007, led today by MD Sonali Kamble. PSARA-licensed, ISO-certified." path="/about" />

      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-wide">
          <span className="eyebrow !text-gold">About us</span>
          <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">A Pune family business protecting Pune families & businesses.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">Since 2007, Star Security & Bouncer has grown from a small Kothrud office into one of Maharashtra's most respected private-security agencies — built on trust, training and on-ground supervision.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img src={aboutImg} alt="Star Security leadership" className="rounded-lg shadow-elegant" loading="lazy" width={1280} height={900} style={{ boxShadow: "var(--shadow-elegant)" }} />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Our Story</span>
            <h2 className="heading-section mt-4 text-primary">From a single guard post to 2000+ trained personnel.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Founded by <strong>Late Anil Kamble</strong> in 2007 with a simple belief — that private security in India deserved to be done ethically, professionally and with real accountability — Star Security began with a handful of guards across Kothrud and Karve Nagar.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Today, under the leadership of <strong>Managing Director Sonali Kamble</strong>, we deploy more than 2,000 PSARA-trained, police-verified personnel across 500+ sites in Pune and across Maharashtra — without ever losing the family-business touch our clients first signed up for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Vision · Mission · Values</span>
            <h2 className="heading-section mt-4 text-primary">What drives us every day.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Eye, title: "Vision", body: "To be Maharashtra's most trusted private-security partner — chosen for our ethics, our training and our reliability." },
              { icon: Target, title: "Mission", body: "Deliver disciplined, well-supervised security to every client — large or small — with measurable accountability." },
              { icon: Heart, title: "Values", body: "Integrity. Discipline. Empathy. Ownership. The same values our founder built the company on in 2007." },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="card-elevate h-full p-7 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
                    <b.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display mt-5 text-xl text-primary">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Compliance & Certification</span>
            <h2 className="heading-section mt-4 text-primary">Fully licensed. Fully accountable.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.badges.map((b, i) => (
              <Reveal key={b} delay={i * 60}>
                <div className="rounded-lg border border-gold/30 bg-card p-5 text-center">
                  <Award className="mx-auto h-7 w-7 text-gold" />
                  <div className="mt-3 text-sm font-semibold text-primary">{b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/30">
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

      <section className="navy-bg py-16 text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-primary-foreground">Let's start with a conversation.</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">A free site survey, an honest recommendation and a quote tailored to your real risks — not a one-size-fits-all package.</p>
          <button onClick={() => openModal()} className="btn-gold mt-8">Get a Free Quote</button>
        </div>
      </section>
    </>
  );
};

export default About;
