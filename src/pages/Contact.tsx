import {
  MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram,
  ExternalLink, Sparkles, ShieldCheck, Award, Globe2, Zap, ArrowRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/data/site";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Star Security & Bouncer Pune"
        description="Reach Pune's most trusted security agency. 24/7 hotline, free site survey and quote within the hour."
        path="/contact"
      />

      {/* HERO — navy with gold corner accent + quick contact pills */}
      <section className="relative overflow-hidden navy-bg py-24 text-primary-foreground lg:py-32">
        {/* Decorative gradients */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-10"
          style={{ background: "var(--gradient-gold)", filter: "blur(60px)" }}
        />

        <div className="container-wide relative">
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Contact</span>
          </div>
          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">
            Let's talk <span className="text-gold">security</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            A free site survey, an honest recommendation, and a quote within the hour — anywhere across our 10-city footprint.
          </p>

          {/* Quick action pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`tel:${SITE.phones[0].tel}`} className="btn-gold">
              <Phone className="h-4 w-4" /> Call {SITE.phones[0].number}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-5 py-3 text-xs font-bold uppercase tracking-wider text-whatsapp-foreground transition hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Chat
            </a>
            <a href={`mailto:${SITE.emails[0]}`} className="btn-outline-light">
              <Mail className="h-4 w-4" /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — 4 quick reasons */}
      <section className="border-b border-border bg-card">
        <div className="container-wide grid grid-cols-2 gap-px lg:grid-cols-4">
          {[
            { icon: Zap, label: "Response in <1 hour", sub: "24×7 hotline manned" },
            { icon: ShieldCheck, label: SITE.signatureTier, sub: "Signature quality tier" },
            { icon: Award, label: "ISO 9001:2015", sub: "PSARA Licensed" },
            { icon: Globe2, label: `${SITE.coverageCities.length} Cities`, sub: "Maharashtra & Goa" },
          ].map((s) => (
            <div key={s.label} className="group flex items-center gap-4 bg-card p-6 transition-colors hover:bg-muted/40">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gold-soft text-primary transition-colors group-hover:bg-gold"
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-bold text-primary">{s.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + INFO — equal-width, equal-height columns */}
      <section className="section bg-muted/30">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-stretch">
          {/* FORM CARD — fills the column */}
          <Reveal className="flex h-full flex-col">
            <div
              className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-elegant"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              {/* Card header strip */}
              <div className="relative overflow-hidden navy-bg p-7 text-primary-foreground">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20" style={{ background: "var(--gradient-gold)", filter: "blur(50px)" }} />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gold text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-primary-foreground">
                      Get in touch with us with your requirements
                    </h2>
                    <p className="mt-1 text-sm text-primary-foreground/80">
                      Tell us briefly what you need — we respond within the hour, 24/7.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form body — single source of truth, used here and in QuoteModal.
                  justify-center distributes any extra card height evenly above
                  and below the form so the submit button never has dead space. */}
              <div className="flex flex-1 flex-col justify-center p-7">
                <LeadForm source="contact_form" />
              </div>
            </div>
          </Reveal>

          {/* INFO COLUMN — fills the column to match form height */}
          <Reveal delay={120} className="flex h-full flex-col">
            <div className="flex h-full flex-col gap-5">
              {/* Phone — primary card (highlighted) */}
              <div
                className="relative overflow-hidden rounded-xl border-2 border-gold/30 bg-card p-6 shadow-elegant"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20"
                  style={{ background: "var(--gradient-gold)", filter: "blur(40px)" }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">24×7 Hotline</span>
                      <h3 className="font-display text-lg text-primary">Phone</h3>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {SITE.phones.map((p, i) => (
                      <li key={p.tel}>
                        <a
                          href={`tel:${p.tel}`}
                          className="group flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3.5 py-2.5 text-sm transition-all hover:border-gold hover:bg-gold/5"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                                i === 0 ? "bg-gold text-primary" : "bg-muted text-primary"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className="font-mono-num font-semibold text-primary">{p.number}</span>
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-gold">
                            {p.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-whatsapp-foreground transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email + Hours — combined card */}
              <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
                <div className="bg-card p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold/15">
                      <Mail className="h-4 w-4 text-gold" />
                    </div>
                    <h3 className="font-display text-base text-primary">Email</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {SITE.emails.map((m) => (
                      <li key={m}>
                        <a
                          href={`mailto:${m}`}
                          className="block break-all text-xs text-muted-foreground hover:text-gold"
                        >
                          {m}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold/15">
                      <Clock className="h-4 w-4 text-gold" />
                    </div>
                    <h3 className="font-display text-base text-primary">Office Time</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{SITE.hours}</p>
                </div>
              </div>

              {/* Address card — flex-1 so it absorbs leftover height to match form column */}
              <div className="flex flex-1 rounded-xl border bg-card p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold/15">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-primary">Head Office</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {SITE.address.line1},<br />
                      {SITE.address.line2},<br />
                      {SITE.address.city}-{SITE.address.pincode}, {SITE.address.state}, {SITE.address.country}.
                    </p>
                    <a
                      href={SITE.address.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:underline"
                    >
                      Get directions <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>

        {/* FOLLOW US — centered bar below both columns */}
        <div className="container-wide mt-12">
          <Reveal>
            <div
              className="mx-auto max-w-3xl rounded-xl p-[1.5px]"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(215 65% 14%) 100%)" }}
            >
              <div className="rounded-[10px] bg-card px-6 py-7 text-center">
                <div className="flex items-center justify-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-primary">
                    Follow us
                  </h3>
                </div>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Latest assignments, training drills and team news from across our 10-city footprint.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href={SITE.social.facebook}
                    target="_blank"
                    rel="noopener"
                    aria-label="Star Security on Facebook"
                    className="group inline-flex items-center gap-2.5 rounded-full border-2 border-border bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:shadow-md"
                  >
                    <Facebook className="h-4 w-4 text-[#1877F2] transition-transform group-hover:scale-110" />
                    Facebook
                  </a>
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label="Star Security on Instagram"
                    className="group inline-flex items-center gap-2.5 rounded-full border-2 border-border bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:shadow-md"
                  >
                    <Instagram className="h-4 w-4 text-[#E4405F] transition-transform group-hover:scale-110" />
                    Instagram
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener"
                    aria-label="Chat on WhatsApp"
                    className="group inline-flex items-center gap-2.5 rounded-full border-2 border-border bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-whatsapp hover:bg-whatsapp/10 hover:shadow-md"
                  >
                    <MessageCircle className="h-4 w-4 text-whatsapp transition-transform group-hover:scale-110" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAP — full-width with floating overlay info card */}
      <section className="relative">
        <div className="container-wide">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow">Find us on the map</span>
              <h2 className="font-display mt-2 text-2xl text-primary md:text-3xl">Visit our head office</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Anand Nagar, Vadgaon Br., Pune — open round the clock. Walk in or schedule a visit.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={SITE.address.mapDirectionsUrl}
                target="_blank"
                rel="noopener"
                className="btn-gold !py-2.5 !px-4 !text-xs"
              >
                <ArrowRight className="h-4 w-4" /> Directions
              </a>
              <a
                href={SITE.address.mapShortUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-md border-2 border-primary px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Open in Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Map itself, with overlay card on top-left */}
        <div className="relative">
          <div className="container-wide">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border-2 border-border shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <iframe
                title="Star Security & Bouncer — head office location"
                src={SITE.address.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Floating address card */}
              <div className="pointer-events-none absolute left-4 top-4 max-w-[20rem] sm:left-6 sm:top-6">
                <div
                  className="pointer-events-auto rounded-lg border bg-card/95 p-4 shadow-elegant backdrop-blur-md"
                  style={{ boxShadow: "var(--shadow-elegant)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Star Security & Bouncer</div>
                      <div className="font-display text-sm font-bold text-primary">Head Office</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}-{SITE.address.pincode}.
                  </p>
                  <a
                    href={SITE.address.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold hover:underline"
                  >
                    Get directions <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </section>
    </>
  );
};

export default Contact;
