import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SITE } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/),
  message: z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const wa = `Contact form submission:%0AName: ${encodeURIComponent(parsed.data.name)}%0AEmail: ${encodeURIComponent(parsed.data.email)}%0APhone: ${encodeURIComponent(parsed.data.phone)}%0AMessage: ${encodeURIComponent(parsed.data.message)}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${wa}`, "_blank", "noopener");
    toast({ title: "Message sent", description: "We'll get back to you within the hour." });
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <>
      <SEO title="Contact Star Security & Bouncer Pune" description="Reach Pune's most trusted security agency. 24/7 hotline, free site survey and quote within the hour." path="/contact" />

      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-wide">
          <span className="eyebrow !text-gold">Contact</span>
          <h1 className="heading-hero mt-4 text-primary-foreground">Let's talk security.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">A free site survey, an honest recommendation and a quote within the hour — anywhere in Pune.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h2 className="heading-section mt-4 text-primary">Drop us a message.</h2>
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required maxLength={80} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required maxLength={15} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="message">How can we help? *</Label>
                <Textarea id="message" name="message" rows={5} required maxLength={1000} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
                <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="card-elevate flex items-start gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold/15"><MapPin className="h-5 w-5 text-gold" /></div>
                <div>
                  <h3 className="font-display text-lg text-primary">Office</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address.line1}<br />{SITE.address.line2}<br />{SITE.address.city} {SITE.address.pincode}, {SITE.address.state}</p>
                </div>
              </div>
              <div className="card-elevate flex items-start gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold/15"><Phone className="h-5 w-5 text-gold" /></div>
                <div>
                  <h3 className="font-display text-lg text-primary">Phone</h3>
                  <a href={`tel:${SITE.phone}`} className="mt-1 block text-sm text-muted-foreground hover:text-gold">{SITE.phoneDisplay}</a>
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="mt-0.5 block text-sm text-whatsapp hover:underline">WhatsApp us</a>
                </div>
              </div>
              <div className="card-elevate flex items-start gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold/15"><Mail className="h-5 w-5 text-gold" /></div>
                <div>
                  <h3 className="font-display text-lg text-primary">Email</h3>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-muted-foreground hover:text-gold">{SITE.email}</a>
                </div>
              </div>
              <div className="card-elevate flex items-start gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold/15"><Clock className="h-5 w-5 text-gold" /></div>
                <div>
                  <h3 className="font-display text-lg text-primary">Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.hours}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-wide">
          <div className="aspect-[16/7] w-full overflow-hidden rounded-lg border">
            <iframe
              title="Star Security location"
              src="https://www.google.com/maps?q=Kothrud,Pune&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
