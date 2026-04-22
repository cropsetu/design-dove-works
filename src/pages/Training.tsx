import { CheckCircle2, GraduationCap, Award } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import trainingImg from "@/assets/training.jpg";

const PROGRAMS = [
  { title: "Basic Security Guard Course", duration: "21 days", desc: "PSARA-aligned core training: drills, frisking, observation, communication, basic first aid." },
  { title: "Bouncer & Crowd Control", duration: "14 days", desc: "Physical conditioning, de-escalation, restraint techniques, event SOPs." },
  { title: "Bodyguard / Close Protection", duration: "30 days", desc: "Threat assessment, formation walking, secure transport, firearms awareness." },
  { title: "Fire & Safety Awareness", duration: "5 days", desc: "Fire-watch, extinguisher use, evacuation drills, emergency communication." },
  { title: "Soft Skills for Corporate Sites", duration: "7 days", desc: "English basics, visitor software, grooming standards, hospitality etiquette." },
  { title: "Refresher & Recertification", duration: "3 days", desc: "Annual refresher mandatory for all guards on roster." },
];

const Training = () => {
  const { openModal } = useQuote();
  return (
    <>
      <SEO title="Security Training in Pune | Star Security & Bouncer" description="PSARA-aligned guard, bouncer and bodyguard training programs at our Pune training centre. Real drills, real instructors, real placement." path="/training" />

      <section className="relative overflow-hidden">
        <img src={trainingImg} alt="Star Security training drills" className="absolute inset-0 h-full w-full object-cover" loading="eager" width={1280} height={800} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container-wide relative z-10 py-24 text-primary-foreground">
          <span className="eyebrow !text-gold">Training Academy</span>
          <h1 className="heading-hero mt-4 max-w-3xl text-primary-foreground">Trained at Star. Trusted across Pune.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">Our guards aren't just hired — they're built. Every Star Security personnel completes our PSARA-aligned training programme before stepping onto a client site.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Programs</span>
            <h2 className="heading-section mt-4 text-primary">Six programmes. One standard: discipline.</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card-elevate h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold/15">
                    <GraduationCap className="h-5 w-5 text-gold" />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="font-display text-lg text-primary">{p.title}</h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold">{p.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Why our training matters</span>
            <h2 className="heading-section mt-4 text-primary">Discipline can't be faked. We teach it daily.</h2>
            <ul className="mt-6 space-y-3">
              {[
                "Police-verified, medically-fit candidates only",
                "PSARA-aligned curriculum with annual refresher",
                "Real-site simulation — not just classroom drills",
                "Female-trainer team for women-only batches",
                "Continuous evaluation; underperformers re-trained",
                "100% placement on Star Security roster",
              ].map(p => (
                <li key={p} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-lg border border-gold/30 bg-card p-8">
              <Award className="h-9 w-9 text-gold" />
              <h3 className="font-display mt-4 text-2xl text-primary">Hire trained guards or join our academy.</h3>
              <p className="mt-2 text-muted-foreground">Looking for trained personnel for your facility — or interested in joining our next training batch?</p>
              <button onClick={() => openModal()} className="btn-gold mt-6">Talk to us</button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Training;
