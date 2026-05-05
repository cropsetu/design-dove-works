import {
  CheckCircle2, GraduationCap, Award, Sparkles, ArrowRight, Phone,
  ShieldCheck, Flame, Users, HeartPulse, BadgeCheck, Footprints,
  ClipboardList, TriangleAlert, KeyRound, HardHat, Bomb, Car, Zap, Scale,
  TrendingUp, Heart, Target, Lightbulb, type LucideIcon,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { TRAINING_PROGRAMS, SITE } from "@/data/site";
import trainingImg from "@/assets/training.webp";

// Map iconKey strings → Lucide components for the data-driven program list.
const PROGRAM_ICONS: Record<string, LucideIcon> = {
  ShieldCheck, Flame, Users, HeartPulse, BadgeCheck, Footprints,
  ClipboardList, TriangleAlert, KeyRound, HardHat, Bomb, Car, Zap, Scale,
};

// Why training matters — the four headline benefits from the source page.
const BENEFITS = [
  { icon: TrendingUp, title: "Sharper Skills", body: "Officers gain new techniques, knowledge and confidence to perform every task effectively." },
  { icon: Award, title: "Higher Productivity", body: "Trained personnel deliver measurably better outcomes for our clients on every shift." },
  { icon: Lightbulb, title: "Culture of Learning", body: "We foster continuous improvement and innovation across every role and rank." },
  { icon: Heart, title: "Talent We Keep", body: "Investment in growth attracts — and retains — the kind of officers clients want returning." },
];

const Training = () => {
  const { openModal } = useQuote();
  return (
    <>
      <SEO
        title="Training & Development | Star Security & Bouncer"
        description="PSARA-aligned guard, bouncer and bodyguard training at Star Security & Bouncer's Pune academy — fire fighting, crowd control, first-aid, IED awareness, access control, the law and more."
        path="/training"
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={trainingImg}
          alt="Star Security training drills"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={900}
        />
        {/* Left-to-right gradient — strong on the left for legibility, clear on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsl(215 65% 10% / 0.85) 0%, hsl(215 65% 10% / 0.55) 40%, hsl(215 65% 10% / 0.15) 75%, hsl(215 65% 10% / 0) 100%)",
          }}
        />
        {/* Soft gold corner accent */}
        <div
          className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full opacity-30"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div className="container-wide relative z-10 py-24 text-primary-foreground lg:py-32">
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Training & Development</span>
          </div>
          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">
            We don't hire guards. <span className="text-gold">We build them.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            In today's rapidly evolving landscape, every Star Security officer completes a structured, expert-led training programme — covering 14 disciplines, from fire fighting to legal awareness — before stepping onto a client site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openModal()} className="btn-gold">
              Hire trained guards <ArrowRight className="h-4 w-4" />
            </button>
            <a href={`tel:${SITE.phones[0].tel}`} className="btn-outline-light">
              <Phone className="h-4 w-4" /> Call {SITE.phones[0].number}
            </a>
          </div>
        </div>
      </section>

      {/* INTRO + BENEFITS */}
      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <span className="eyebrow">Why training matters</span>
            <h2 className="heading-section mt-4 text-primary">
              Investment in our people is investment in your safety.
            </h2>
            <div className="gold-divider mt-6" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p className="text-lg text-foreground">
                Organisations that invest in their employees' growth maintain a measurable competitive edge. The same logic applies to security: a trained officer is a transformed officer.
              </p>
              <p>
                Our training and development programmes equip every Star Security officer with new skills, knowledge and techniques — improving engagement, sharpening judgment and signalling our commitment to the people who protect your premises.
              </p>
              <p>
                The programmes below are taught by experts and consultants, refreshed regularly, and benchmarked against industry standards.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className="card-elevate group relative overflow-hidden p-6"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: "var(--gradient-gold)", filter: "blur(30px)" }}
                  />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold-soft text-primary transition-colors group-hover:bg-gold">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display mt-4 text-lg text-primary">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAINING PROGRAMS — 14 cards in a responsive grid */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Training programme</span>
            <h2 className="heading-section mt-4 text-primary">
              {TRAINING_PROGRAMS.length} disciplines. One Star Security officer.
            </h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground">
              Every officer on our roster has completed all of the following modules — taught by experts and consultants, refreshed annually.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TRAINING_PROGRAMS.map((p, i) => {
              const Icon = PROGRAM_ICONS[p.iconKey] || GraduationCap;
              return (
                <Reveal key={p.title} delay={i * 50} className="h-full">
                  <div className="card-elevate group relative h-full overflow-hidden p-5">
                    <div
                      className="pointer-events-none absolute -right-3 -top-3 font-mono-num text-6xl font-bold text-gold/[0.08] transition-all group-hover:text-gold/15"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-soft text-primary transition-all group-hover:scale-110 group-hover:bg-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display mt-3 text-base font-bold leading-tight text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY OUR TRAINING — 2-column with checklist + CTA card */}
      <section className="section navy-bg text-primary-foreground">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="flex h-full flex-col justify-center">
            <span className="eyebrow !text-gold">Discipline can't be faked</span>
            <h2 className="heading-section mt-4 text-primary-foreground">
              Trained at Star. Trusted across Pune.
            </h2>
            <ul className="mt-8 space-y-3.5">
              {[
                "Police-verified, medically-fit candidates only",
                "PSARA-aligned curriculum with annual refresher",
                "Real-site simulation — not just classroom drills",
                "Female trainer team for women-only batches",
                "Continuous evaluation; underperformers re-trained",
                "Direct placement on Star Security roster",
              ].map((p, i) => (
                <Reveal key={p} delay={i * 60}>
                  <li className="flex items-start gap-3 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur transition-colors hover:bg-primary-foreground/10">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm leading-relaxed text-primary-foreground/90">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="flex h-full flex-col">
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-gold/40 p-8 backdrop-blur"
              style={{ background: "linear-gradient(180deg, hsl(215 60% 18% / 0.8) 0%, hsl(215 65% 12% / 0.95) 100%)" }}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-30"
                style={{ background: "var(--gradient-gold)", filter: "blur(60px)" }}
              />
              <div className="relative flex h-full flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gold text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-6 text-2xl text-primary-foreground">
                  Hire officers who've completed the full training programme.
                </h3>
                <p className="mt-3 text-primary-foreground/80">
                  Every guard, bouncer and PSO on our roster has cleared all 14 modules above before stepping onto a client site. Tell us what you need and we'll match the right people to it.
                </p>

                {/* Highlight stats */}
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-primary-foreground/10 pt-6">
                  <div>
                    <div className="font-display text-2xl font-bold text-gold">{TRAINING_PROGRAMS.length}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-primary-foreground/60">Modules</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-gold">100%</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-primary-foreground/60">Placement</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-gold">24×7</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-primary-foreground/60">Refresher Drills</div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button onClick={() => openModal()} className="btn-gold w-full">
                    <Sparkles className="h-4 w-4" /> Talk to us
                  </button>
                  <a
                    href={`tel:${SITE.phones[0].tel}`}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-primary-foreground/20 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5" /> {SITE.phones[0].number}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING — quick CTA strip */}
      <section className="py-16">
        <div className="container-wide">
          <div
            className="relative overflow-hidden rounded-xl border-2 border-gold/40 bg-card p-8 text-center md:p-12"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-15"
              style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
            />
            <div
              className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full opacity-15"
              style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
            />
            <div className="relative">
              <Target className="mx-auto h-10 w-10 text-gold" />
              <h2 className="font-display mt-5 text-2xl text-primary md:text-3xl">
                Ready for officers who've been trained, not just hired?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Free site survey. Quote within the hour. Officers on site within 48 hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={() => openModal()} className="btn-gold">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </button>
                <a href={`tel:${SITE.phones[0].tel}`} className="btn-outline-light !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
                  <Phone className="h-4 w-4" /> Call {SITE.phones[0].number}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Training;
