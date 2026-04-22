import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO, faqJsonLd, serviceJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, SITE } from "@/data/site";
import bouncerImg from "@/assets/service-bouncer.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import residentialImg from "@/assets/service-residential.jpg";
import vvipImg from "@/assets/service-vvip.jpg";
import industrialImg from "@/assets/service-industrial.jpg";
import heroImg from "@/assets/hero-security.jpg";

const IMAGES: Record<string, string> = {
  "bouncer-bodyguard": bouncerImg,
  "event-security": bouncerImg,
  "corporate-security": corporateImg,
  "banking-institutional-security": corporateImg,
  "control-room-cctv": corporateImg,
  "bank-atm-security": corporateImg,
  "residential-society-security": residentialImg,
  "real-estate-security": residentialImg,
  "hotel-restaurant-security": residentialImg,
  "personal-security": vvipImg,
  "vvip-close-protection": vvipImg,
  "secure-transit-cash-escort": vvipImg,
  "industrial-security": industrialImg,
  "warehouse-security": industrialImg,
  "manned-guarding": heroImg,
  "mall-retail-security": residentialImg,
  "hospital-security": corporateImg,
  "education-security": corporateImg,
  "women-safety-transport": vvipImg,
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  const { openModal } = useQuote();
  if (!service) return <Navigate to="/services" replace />;
  const img = IMAGES[service.slug] || heroImg;

  return (
    <>
      <SEO
        title={`${service.title} in Pune — Star Security & Bouncer`}
        description={service.description}
        path={`/services/${service.slug}`}
        jsonLd={[serviceJsonLd(service.title, service.description), faqJsonLd(service.faqs)]}
      />

      <section className="relative overflow-hidden">
        <img src={img} alt={service.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" width={1920} height={800} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10 py-24 text-primary-foreground">
          <Link to="/services" className="text-xs uppercase tracking-widest text-gold hover:underline">← All Services</Link>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold text-primary"><service.icon className="h-5 w-5" /></div>
            <span className="eyebrow !text-gold">Service</span>
          </div>
          <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/85">{service.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => openModal(service.title)} className="btn-gold">Get a Quote <ArrowRight className="h-4 w-4" /></button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light"><Phone className="h-4 w-4" /> Call now</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <span className="eyebrow">What's included</span>
            <h2 className="heading-section mt-4 text-primary">Everything you need, none of the gaps.</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.highlights.map(h => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-elevate p-6">
              <h3 className="font-display text-lg text-primary">Who it's for</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {service.forWhom.map(w => <li key={w} className="flex gap-2"><span className="text-gold">•</span>{w}</li>)}
              </ul>
              <button onClick={() => openModal(service.title)} className="btn-gold mt-6 w-full !text-xs">Request a Quote</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="heading-section mt-4 text-primary">A proven 4-step process.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="card-elevate h-full p-6">
                  <div className="font-mono-num text-3xl font-bold text-gold">0{i + 1}</div>
                  <h3 className="font-display mt-3 text-lg text-primary">{p.step}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">FAQs</span>
            <h2 className="heading-section mt-4 text-primary">Common questions, straight answers.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {service.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left font-display text-lg text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="navy-bg py-16 text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-primary-foreground">Ready to deploy {service.title.toLowerCase()}?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Free site survey. Quote within the hour. 24×7 support.</p>
          <button onClick={() => openModal(service.title)} className="btn-gold mt-8">Get a Free Quote</button>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
