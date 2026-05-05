import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown, MessageCircle, Mail, FileText } from "lucide-react";
import { SITE, SERVICES } from "@/data/site";
import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.webp";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const { openModal } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setSvcOpen(false); }, []);

  const nav = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services", hasDropdown: true },
    { to: "/training", label: "Training" },
    { to: "/clients", label: "Clients" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Utility strip — globe-style pill CTAs */}
      <div className="hidden border-b border-border/60 bg-background lg:block">
        <div className="container-wide flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-gold transition hover:brightness-105"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <FileText className="h-3.5 w-3.5" /> Request a Quote
            </button>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-whatsapp-foreground transition hover:brightness-110"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" /> Click to Call
            </a>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 text-muted-foreground transition hover:text-primary">
              <Mail className="h-3.5 w-3.5 text-gold" /> {SITE.email}
            </a>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 font-semibold text-primary transition hover:text-gold">
              <Phone className="h-3.5 w-3.5 text-gold" /> Hotline {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur transition-all",
        scrolled && "shadow-md"
      )}>
        <div className="container-wide flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="group flex items-center gap-3" aria-label="Star Security & Bouncer — home">
            <img
              src={logoUrl}
              alt=""
              width={56}
              height={56}
              decoding="async"
              fetchPriority="high"
              className="h-14 w-14 shrink-0 object-contain transition-transform group-hover:scale-105"
            />
            <div className="leading-none">
              <div className="font-display text-2xl font-black tracking-tight sm:text-3xl">
                <span className="text-gold">STAR</span>
                <span className="ml-1.5 text-primary">Security</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
                <span aria-hidden className="h-px w-5 bg-gradient-to-r from-gold to-transparent" />
                & Bouncer · Pune
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map(n => n.hasDropdown ? (
              <div key={n.to} className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
                <NavLink to={n.to} className={({ isActive }) => cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                  isActive ? "text-gold" : "text-foreground hover:text-gold"
                )}>
                  {n.label}<ChevronDown className="h-3.5 w-3.5" />
                </NavLink>
                {svcOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-2 gap-1 rounded-lg border bg-card p-3 shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
                      {SERVICES.slice(0, 12).map(s => (
                        <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-muted">
                          <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <div>
                            <div className="text-sm font-semibold text-primary">{s.title}</div>
                            <div className="line-clamp-1 text-xs text-muted-foreground">{s.short}</div>
                          </div>
                        </Link>
                      ))}
                      <Link to="/services" className="col-span-2 mt-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary-glow">
                        View all 19 services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cn(
                "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                isActive ? "text-gold" : "text-foreground hover:text-gold"
              )}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => openModal()} className="btn-gold !py-2.5 !px-5 !text-xs">Get Started Today</button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t bg-background lg:hidden">
            <nav className="container-wide flex flex-col py-4">
              {nav.map(n => (
                <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}
                  className={({ isActive }) => cn("py-2.5 text-sm font-semibold uppercase tracking-wider border-b border-border/40", isActive ? "text-gold" : "text-foreground")}>
                  {n.label}
                </NavLink>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-1.5 rounded-md bg-whatsapp px-3 py-2.5 text-xs font-bold uppercase text-whatsapp-foreground">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
                <a href={`tel:${SITE.phone}`} className="inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-primary px-3 py-2.5 text-xs font-bold uppercase text-primary">
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </div>
              <button onClick={() => { setOpen(false); openModal(); }} className="btn-gold mt-2">Request a Quote</button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
