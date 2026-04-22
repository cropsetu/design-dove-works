import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/data/site";

const Services = () => (
  <>
    <SEO title="Security Services in Pune — All 19 Services" description="From manned guarding and bouncers to VVIP close protection, event security and CCTV monitoring — explore all 19 specialised security services from Star Security & Bouncer." path="/services" />

    <section className="navy-bg py-20 text-primary-foreground">
      <div className="container-wide">
        <span className="eyebrow !text-gold">Services</span>
        <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">19 specialised services. Built for every Pune setting.</h1>
        <p className="mt-6 max-w-2xl text-primary-foreground/85">Each service comes with PSARA-trained personnel, on-ground supervision, daily reporting and a same-day replacement guarantee.</p>
      </div>
    </section>

    <section className="section">
      <div className="container-wide">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link to={`/services/${s.slug}`} className="card-elevate group block h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-5 text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Services;
