import { SEO } from "@/components/SEO";
import { SITE } from "@/data/site";

const Privacy = () => (
  <>
    <SEO title="Privacy Policy | Star Security & Bouncer" description="How Star Security & Bouncer collects, uses and protects your personal information." path="/privacy" />
    <section className="navy-bg py-16 text-primary-foreground">
      <div className="container-wide">
        <h1 className="heading-hero text-primary-foreground">Privacy Policy</h1>
        <p className="mt-3 text-sm text-primary-foreground/70">Last updated: April 2026</p>
      </div>
    </section>
    <section className="section">
      <div className="container-narrow prose prose-slate max-w-none">
        <h2 className="font-display text-2xl text-primary">1. Information we collect</h2>
        <p className="text-muted-foreground">When you submit a quote request or contact form, we collect your name, phone, email, city, service interest and any message you send us. We use this information solely to respond to your enquiry and provide our services.</p>
        <h2 className="font-display text-2xl text-primary mt-8">2. How we use information</h2>
        <p className="text-muted-foreground">Your information is used to (a) respond to your enquiry, (b) prepare a quote, (c) coordinate site survey and deployment, and (d) maintain a record of our communications. We do not sell or rent your data.</p>
        <h2 className="font-display text-2xl text-primary mt-8">3. Data retention</h2>
        <p className="text-muted-foreground">We retain enquiry data for up to 24 months and active client data for the duration of our engagement plus 7 years for compliance purposes.</p>
        <h2 className="font-display text-2xl text-primary mt-8">4. Your rights</h2>
        <p className="text-muted-foreground">You may request access to, correction of, or deletion of your personal data by emailing <a className="text-gold" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        <h2 className="font-display text-2xl text-primary mt-8">5. Contact</h2>
        <p className="text-muted-foreground">{SITE.name}, {SITE.address.line1}, {SITE.address.city} {SITE.address.pincode}.</p>
      </div>
    </section>
  </>
);

export default Privacy;
