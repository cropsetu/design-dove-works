import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { SEO } from "@/components/SEO";
import { PUNE_LOCALITIES } from "@/data/site";

const Coverage = () => (
  <>
    <SEO title="Pune Coverage Areas | Star Security & Bouncer" description="Star Security & Bouncer deploys trained security personnel across 60+ Pune neighbourhoods — Kothrud, Hinjewadi, Baner, Hadapsar and more." path="/coverage" />

    <section className="navy-bg py-20 text-primary-foreground">
      <div className="container-wide">
        <span className="eyebrow !text-gold">Coverage</span>
        <h1 className="heading-hero mt-4 text-primary-foreground">60+ areas across Pune. One trusted partner.</h1>
        <p className="mt-6 max-w-2xl text-primary-foreground/85">From Kothrud to Kharadi, Pimpri to Phursungi — wherever your site is in Pune, we've got it covered.</p>
      </div>
    </section>

    <section className="section">
      <div className="container-wide">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PUNE_LOCALITIES.map(l => (
            <Link key={l} to={`/security-services-in-${l.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center gap-2 rounded-md border bg-card p-3 text-sm transition-all hover:border-gold/50 hover:shadow-card">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="text-primary group-hover:text-gold">{l}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Coverage;
