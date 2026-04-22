import { useParams, Navigate, Link } from "react-router-dom";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { SEO, serviceJsonLd, localBusinessJsonLd } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, SITE, SERVICE_CITY_COMBOS } from "@/data/site";
import heroImg from "@/assets/hero-security.jpg";

// /:serviceSlug-in-:city  e.g. /bouncer-services-in-pune
const ServiceCity = () => {
  const { combo } = useParams();
  const matchCombo = SERVICE_CITY_COMBOS.find(
    c => `${c.service}-in-${c.city.toLowerCase()}` === combo ||
         `${c.service.replace(/-services?$/, "")}-services-in-${c.city.toLowerCase()}` === combo
  );
  const service = SERVICES.find(s => s.slug === matchCombo?.service);
  const { openModal } = useQuote();
  if (!service || !matchCombo) return <Navigate to="/services" replace />;

  const title = `${service.title} in ${matchCombo.city}`;
  const description = `Hire trained ${service.title.toLowerCase()} in ${matchCombo.city} from Star Security & Bouncer. Police-verified personnel, 48-hour deployment, 24×7 support.`;

  return (
    <>
      <SEO
        title={`${title} | Star Security`}
        description={description}
        path={`/${combo}`}
        jsonLd={[serviceJsonLd(`${service.title} in ${matchCombo.city}`, description), localBusinessJsonLd()]}
      />

      <section className="relative overflow-hidden">
        <img src={heroImg} alt={title} className="absolute inset-0 h-full w-full object-cover" width={1920} height={900} loading="eager" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10 py-24 text-primary-foreground">
          <span className="eyebrow !text-gold">{matchCombo.city} · {service.title}</span>
          <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">{title}.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">{service.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => openModal(service.title)} className="btn-gold">Get a Quote</button>
            <a href={`tel:${SITE.phone}`} className="btn-outline-light"><Phone className="h-4 w-4" /> {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="heading-section text-primary">Why hire {service.title.toLowerCase()} from Star Security in {matchCombo.city}?</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.highlights.map(h => (
                <li key={h} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{h}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
                Full service details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-elevate p-6">
              <h3 className="font-display text-lg text-primary">Need {service.title.toLowerCase()} today in {matchCombo.city}?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Same-day deployment available for urgent requirements.</p>
              <button onClick={() => openModal(service.title)} className="btn-gold mt-5 w-full !text-xs">Request a Quote</button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServiceCity;
