import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, MapPin, Phone, ArrowRight } from "lucide-react";
import { SEO, localBusinessJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { PUNE_LOCALITIES, SERVICES, SITE } from "@/data/site";
import heroImg from "@/assets/hero-security.jpg";

// /security-services-in-:locality
const Locality = () => {
  const { locality } = useParams();
  const slug = (locality || "").toLowerCase();
  const match = PUNE_LOCALITIES.find(l => l.toLowerCase().replace(/\s+/g, "-") === slug);
  const { openModal } = useQuote();
  if (!match) return <Navigate to="/coverage" replace />;

  const title = `Security Services in ${match}, Pune`;
  const description = `Trained, police-verified security guards, bouncers and bodyguards in ${match}, Pune. Free site survey, 48-hour deployment, 24×7 supervision by Star Security & Bouncer.`;

  return (
    <>
      <SEO title={`${title} | Star Security`} description={description} path={`/security-services-in-${slug}`} jsonLd={localBusinessJsonLd()} />

      <section className="relative overflow-hidden">
        <img src={heroImg} alt={`Security services in ${match}`} className="absolute inset-0 h-full w-full object-cover" width={1920} height={900} loading="eager" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10 py-24 text-primary-foreground">
          <span className="eyebrow !text-gold flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {match}, Pune</span>
          <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">Security Services in {match}.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">Star Security & Bouncer deploys PSARA-trained guards, bouncers and bodyguards across {match} and surrounding areas — protecting offices, factories, societies, events and individuals 24×7.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => openModal()} className="btn-gold">Free Site Survey in {match}</button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light"><Phone className="h-4 w-4" /> {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="heading-section text-primary">Why {match} businesses choose Star Security.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {match} is one of Pune's fastest-changing neighbourhoods, with a mix of corporate offices, residential societies, retail outlets and event venues. That mix demands a security partner who understands the area — and Star Security has been serving {match} since 2007.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                `Local supervisor based near ${match}`,
                "PSARA-trained, police-verified guards",
                "48-hour deployment guarantee",
                "Day, night & 24×7 shifts",
                "Mobile patrol & rapid backup",
                "Daily site reports + monthly review",
              ].map(p => <li key={p} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-elevate p-6">
              <h3 className="font-display text-lg text-primary">Need a quote in {match}?</h3>
              <p className="mt-2 text-sm text-muted-foreground">A Star Security supervisor will visit your site in {match} for a free survey within 24 hours.</p>
              <button onClick={() => openModal()} className="btn-gold mt-5 w-full !text-xs">Request a Quote</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Services in {match}</span>
            <h2 className="heading-section mt-4 text-primary">All 19 services available locally.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Reveal key={s.slug} delay={i * 50}>
                <Link to={`/services/${s.slug}`} className="card-elevate group flex h-full items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-base text-primary">{s.title} in {match}</div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.short}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="text-sm font-semibold text-gold hover:underline">View all 19 services →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Nearby coverage</span>
            <h2 className="heading-section mt-4 text-primary">We also cover these areas near {match}.</h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PUNE_LOCALITIES.filter(l => l !== match).slice(0, 18).map(l => (
              <Link key={l} to={`/security-services-in-${l.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-gold">{l}</Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/coverage" className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">All 60+ areas <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Locality;
