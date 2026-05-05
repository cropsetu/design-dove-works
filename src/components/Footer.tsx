import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Sparkles, ArrowRight } from "lucide-react";
import { SITE, SERVICES, PUNE_LOCALITIES } from "@/data/site";
import logoUrl from "@/assets/logo.webp";

export const Footer = () => {
  return (
    <footer className="navy-bg text-primary-foreground">
      <div className="container-wide pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              {/* Logo container has a soft white pill so the dark navy lines
                  in the brand mark stay readable on the navy footer. */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-white p-2">
                <img src={logoUrl} alt="" width={72} height={72} loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </div>
              <div className="leading-none">
                <div className="font-display text-2xl font-black tracking-tight sm:text-3xl">
                  <span className="text-gold">STAR</span>
                  <span className="ml-1.5">Security</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-foreground/70 sm:text-xs">
                  <span aria-hidden className="h-px w-5 bg-gradient-to-r from-gold to-transparent" />
                  & Bouncer · Pune
                </div>
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

        {/* Developer credit — gold-bordered chip with hover animation */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.typingcodeai.com"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/[0.06] px-5 py-2 text-xs text-primary-foreground/85 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15 hover:shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover:rotate-12" />
            <span>Designed &amp; developed by</span>
            <span className="font-bold tracking-wide text-gold">typingcodeai.com</span>
            <ArrowRight className="h-3 w-3 -translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </footer>
  );
};
