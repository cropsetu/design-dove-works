import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { Play } from "lucide-react";
import { useState } from "react";
import bouncer from "@/assets/service-bouncer.jpg";
import corporate from "@/assets/service-corporate.jpg";
import residential from "@/assets/service-residential.jpg";
import vvip from "@/assets/service-vvip.jpg";
import industrial from "@/assets/service-industrial.jpg";
import training from "@/assets/training.jpg";
import hero from "@/assets/hero-security.jpg";
import about from "@/assets/about.jpg";

const ALBUMS = [
  { title: "Wedding & Event Security", count: "24 photos", cover: bouncer },
  { title: "Corporate Deployments", count: "18 photos", cover: corporate },
  { title: "Society Coverage", count: "16 photos", cover: residential },
  { title: "VVIP Close Protection", count: "12 photos", cover: vvip },
  { title: "Industrial Sites", count: "20 photos", cover: industrial },
  { title: "Training Academy", count: "30 photos", cover: training },
];

const PHOTOS = [bouncer, corporate, residential, vvip, industrial, training, hero, about];

const VIDEOS = [
  { title: "Star Security in 60 seconds", id: "dQw4w9WgXcQ" },
  { title: "Inside our training academy", id: "dQw4w9WgXcQ" },
  { title: "Wedding security walkthrough", id: "dQw4w9WgXcQ" },
];

const Gallery = () => {
  const [filter, setFilter] = useState<string | null>(null);
  return (
    <>
      <SEO title="Photo & Video Gallery | Star Security & Bouncer Pune" description="See our security personnel on the ground — events, corporate sites, training drills and VVIP deployments across Pune." path="/gallery" />

      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-wide">
          <span className="eyebrow !text-gold">Gallery</span>
          <h1 className="heading-hero mt-4 text-primary-foreground">In the field, on the job.</h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/85">Snapshots from real Star Security deployments across Pune — events, corporate sites, training and more.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Albums</span>
            <h2 className="heading-section mt-4 text-primary">Browse by category.</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <button onClick={() => setFilter(null)} className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition ${filter === null ? "bg-gold text-primary" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>All</button>
            {ALBUMS.map(a => (
              <button key={a.title} onClick={() => setFilter(a.title)} className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition ${filter === a.title ? "bg-gold text-primary" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{a.title}</button>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALBUMS.filter(a => !filter || a.title === filter).map((a, i) => (
              <Reveal key={a.title} delay={i * 50}>
                <div className="card-elevate group relative overflow-hidden">
                  <img src={a.cover} alt={a.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                    <div className="font-display text-lg">{a.title}</div>
                    <div className="text-xs uppercase tracking-widest text-gold">{a.count}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Photo wall</span>
            <h2 className="heading-section mt-4 text-primary">From the field.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {PHOTOS.map((p, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="overflow-hidden rounded-md">
                  <img src={p} alt="Security operations" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Videos</span>
            <h2 className="heading-section mt-4 text-primary">Watch us in action.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VIDEOS.map((v, i) => (
              <Reveal key={i} delay={i * 60}>
                <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener" className="card-elevate group block overflow-hidden">
                  <div className="relative aspect-video bg-primary">
                    <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/30 transition-colors group-hover:bg-primary/10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary shadow-gold" style={{ boxShadow: "var(--shadow-gold)" }}>
                        <Play className="ml-0.5 h-5 w-5 fill-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-sm font-semibold text-primary">{v.title}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
