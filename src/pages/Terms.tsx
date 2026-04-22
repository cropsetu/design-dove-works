import { SEO } from "@/components/SEO";
import { SITE } from "@/data/site";

const Terms = () => (
  <>
    <SEO title="Terms of Service | Star Security & Bouncer" description="Terms governing your use of starsecuritybouncer.com and engagement with Star Security & Bouncer." path="/terms" />
    <section className="navy-bg py-16 text-primary-foreground">
      <div className="container-wide">
        <h1 className="heading-hero text-primary-foreground">Terms of Service</h1>
        <p className="mt-3 text-sm text-primary-foreground/70">Last updated: April 2026</p>
      </div>
    </section>
    <section className="section">
      <div className="container-narrow prose prose-slate max-w-none">
        <h2 className="font-display text-2xl text-primary">1. About this site</h2>
        <p className="text-muted-foreground">This website is operated by {SITE.name}. By using it you agree to these terms.</p>
        <h2 className="font-display text-2xl text-primary mt-8">2. Quotes & enquiries</h2>
        <p className="text-muted-foreground">Quotes provided through this website are indicative. Final pricing and scope are confirmed in a written agreement after a site survey.</p>
        <h2 className="font-display text-2xl text-primary mt-8">3. Service commitments</h2>
        <p className="text-muted-foreground">Specific service-level commitments (response times, replacement guarantees, reporting) are governed by the contract you sign with us.</p>
        <h2 className="font-display text-2xl text-primary mt-8">4. Intellectual property</h2>
        <p className="text-muted-foreground">All content, logos and branding on this site are the property of {SITE.name} unless otherwise noted.</p>
        <h2 className="font-display text-2xl text-primary mt-8">5. Liability</h2>
        <p className="text-muted-foreground">Information on this site is provided "as is" without warranty. Liability for any deployment is governed by the signed services contract.</p>
        <h2 className="font-display text-2xl text-primary mt-8">6. Contact</h2>
        <p className="text-muted-foreground">{SITE.address.line1}, {SITE.address.city} {SITE.address.pincode} · <a className="text-gold" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </section>
  </>
);

export default Terms;
