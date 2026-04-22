import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { CLIENT_LOGOS, INDUSTRIES } from "@/data/site";

const Clients = () => (
  <>
    <SEO title="Our Clients | Star Security & Bouncer Pune" description="500+ organisations across Pune trust Star Security & Bouncer — from Tata Motors and Bajaj to leading hospitals, hotels, schools and societies." path="/clients" />

    <section className="navy-bg py-20 text-primary-foreground">
      <div className="container-wide">
        <span className="eyebrow !text-gold">Clients</span>
        <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">500+ organisations. One trusted partner.</h1>
        <p className="mt-6 max-w-2xl text-primary-foreground/85">From Fortune 500 IT campuses to single-branch cooperative banks, Star Security protects Pune's most-trusted brands.</p>
      </div>
    </section>

    <section className="section">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Selected clients</span>
          <h2 className="heading-section mt-4 text-primary">A few of the names we proudly serve.</h2>
          <div className="gold-divider mt-6" />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENT_LOGOS.map((c, i) => (
            <Reveal key={c} delay={i * 30}>
              <div className="flex h-24 items-center justify-center rounded-lg border bg-card p-4 text-center font-display text-sm font-semibold text-primary/80 transition-all hover:border-gold/50 hover:shadow-card">
                {c}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section bg-muted/30">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">By industry</span>
          <h2 className="heading-section mt-4 text-primary">Every sector. Every shift.</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INDUSTRIES.map((i, idx) => (
            <Reveal key={i.name} delay={idx * 50}>
              <div className="card-elevate p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-semibold text-primary">{i.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Clients;
