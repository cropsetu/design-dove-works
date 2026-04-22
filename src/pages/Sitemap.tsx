import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SERVICES, PUNE_LOCALITIES, SERVICE_CITY_COMBOS } from "@/data/site";

const Sitemap = () => (
  <>
    <SEO title="Sitemap | Star Security & Bouncer" description="Full sitemap of Star Security & Bouncer Pune." path="/sitemap" />
    <section className="navy-bg py-16 text-primary-foreground">
      <div className="container-wide">
        <h1 className="heading-hero text-primary-foreground">Sitemap</h1>
      </div>
    </section>
    <section className="section">
      <div className="container-wide grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-lg text-primary">Main</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/training", "Training"],
              ["/clients", "Clients"], ["/gallery", "Gallery"], ["/contact", "Contact"], ["/coverage", "Coverage"],
              ["/privacy", "Privacy"], ["/terms", "Terms"]
            ].map(([to, label]) => <li key={to}><Link to={to} className="text-muted-foreground hover:text-gold">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg text-primary">Services</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {SERVICES.map(s => <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-muted-foreground hover:text-gold">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg text-primary">Service × City</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {SERVICE_CITY_COMBOS.map(c => {
              const s = SERVICES.find(x => x.slug === c.service);
              return <li key={`${c.service}-${c.city}`}><Link to={`/${c.service}-in-${c.city.toLowerCase()}`} className="text-muted-foreground hover:text-gold">{s?.title} in {c.city}</Link></li>;
            })}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg text-primary">Pune Localities</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            {PUNE_LOCALITIES.map(l => <li key={l}><Link to={`/security-services-in-${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-muted-foreground hover:text-gold">{l}</Link></li>)}
          </ul>
        </div>
      </div>
    </section>
  </>
);

export default Sitemap;
