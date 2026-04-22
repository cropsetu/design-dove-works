import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { SITE, SERVICES, PUNE_LOCALITIES } from "@/data/site";

export const Footer = () => {
  return (
    <footer className="navy-bg text-primary-foreground">
      <div className="container-wide pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-glow">
                <ShieldCheck className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">Star Security</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">& Bouncer · Pune</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">{SITE.description}</p>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE.social.facebook} aria-label="Facebook" className="rounded-full border border-white/20 p-2 hover:bg-gold hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
              <a href={SITE.social.instagram} aria-label="Instagram" className="rounded-full border border-white/20 p-2 hover:bg-gold hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
              <a href={SITE.social.linkedin} aria-label="LinkedIn" className="rounded-full border border-white/20 p-2 hover:bg-gold hover:text-primary transition"><Linkedin className="h-4 w-4" /></a>
              <a href={SITE.social.youtube} aria-label="YouTube" className="rounded-full border border-white/20 p-2 hover:bg-gold hover:text-primary transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              {SERVICES.slice(0, 10).map(s => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-gold transition">{s.title}</Link></li>
              ))}
              <li><Link to="/services" className="text-gold hover:underline">View all 19 →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold">Pune Coverage</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-primary-foreground/75">
              {PUNE_LOCALITIES.slice(0, 18).map(l => (
                <li key={l}>
                  <Link to={`/security-services-in-${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-gold transition">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/coverage" className="mt-3 inline-block text-xs text-gold hover:underline">See all 60+ areas →</Link>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{SITE.address.line1}, {SITE.address.line2}, {SITE.address.city} {SITE.address.pincode}</span>
              </li>
              <li><a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 hover:text-gold transition"><Phone className="h-4 w-4 text-gold" />{SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 hover:text-gold transition"><Mail className="h-4 w-4 text-gold" />{SITE.email}</a></li>
            </ul>
            <div className="mt-5 rounded-md border border-gold/30 bg-primary-glow/40 p-3 text-xs">
              <div className="text-gold font-semibold uppercase tracking-wider">24×7 Hotline</div>
              <div className="mt-0.5 text-primary-foreground/85">Round-the-clock deployment & emergency support.</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 md:flex-row">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-gold">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
