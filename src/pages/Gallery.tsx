import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Camera, ChevronLeft, ChevronRight, Instagram, MapPin, Sparkles, X, Play, Users, Compass } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { INSTAGRAM_REELS, SITE } from "@/data/site";

// Vite eager-globs every WebP in src/assets/gallery so the build emits one
// hashed asset per photo. The page only loads each photo when it scrolls
// into view (loading="lazy"), so the initial gallery payload stays tiny.
const galleryModules = import.meta.glob<{ default: string }>("@/assets/gallery/*.webp", {
  eager: true,
});

type Photo = { src: string; slug: string };
const PHOTOS: Photo[] = Object.entries(galleryModules)
  .map(([path, mod]) => ({
    src: mod.default,
    slug: path.split("/").pop()!.replace(/\.webp$/, ""),
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

// Self-hosted reel assets — paired by slug (reel-01.mp4 ↔ reel-01.webp).
// Videos are emitted as hashed assets and served from our own domain, so
// every viewer plays inline regardless of IG login state.
const reelPosterModules = import.meta.glob<{ default: string }>("@/assets/reels/*.webp", { eager: true });
const reelVideoModules = import.meta.glob<{ default: string }>("@/assets/reels/*.mp4", { eager: true });

const reelAssets: Record<string, { poster: string; video: string }> = {};
for (const [path, mod] of Object.entries(reelPosterModules)) {
  const slug = path.split("/").pop()!.replace(/\.webp$/, "");
  reelAssets[slug] = { ...(reelAssets[slug] || { video: "" }), poster: mod.default };
}
for (const [path, mod] of Object.entries(reelVideoModules)) {
  const slug = path.split("/").pop()!.replace(/\.mp4$/, "");
  reelAssets[slug] = { ...(reelAssets[slug] || { poster: "" }), video: mod.default };
}

// One reel card — handles its own hover state for the muted preview clip.
// On desktop (hover-capable devices) the video fades in over the poster,
// auto-plays muted/looped, and fades back out on mouse leave.
const ReelCard = ({
  reel,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  reel: { id: string; caption?: string };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const slug = `reel-${String(index + 1).padStart(2, "0")}`;
  const assets = reelAssets[slug];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause + reset the preview when the user moves away — keeps audio safely
  // muted and avoids leaving downloads in flight.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isHovered) {
      v.play().catch(() => {/* autoplay restrictions on some browsers */});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch { /* ignore — some browsers throw before metadata loads */ }
    }
  }, [isHovered]);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-lg border-2 border-transparent bg-primary shadow-md transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl"
      aria-label={`Play reel ${index + 1}`}
    >
      {/* Static poster (always rendered) */}
      {assets?.poster ? (
        <img
          src={assets.poster}
          alt={`Reel ${index + 1} cover`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${(index * 47) % 360}deg, hsl(215 65% 14%), hsl(40 55% 35%))`,
          }}
        />
      )}

      {/* Hover preview — muted, looped, fades in over the poster.
          preload="none" + only mounted on hover-capable devices keeps bandwidth in check. */}
      {assets?.video && (
        <video
          ref={videoRef}
          src={assets.video}
          muted
          loop
          playsInline
          preload="none"
          poster={assets.poster}
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 " +
            (isHovered ? "opacity-100" : "opacity-0")
          }
          aria-hidden="true"
        />
      )}

      {/* Vignette so chrome reads cleanly on busy posters */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

      {/* Reel badge — pulses when previewing */}
      <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
        <Instagram className={"h-3 w-3 " + (isHovered ? "animate-pulse text-[#E4405F]" : "")} />
        {isHovered ? "Preview" : "Reel"}
      </div>

      {/* Reel index */}
      <div className="absolute left-3 bottom-3 font-display text-3xl font-bold text-white/95 drop-shadow-lg">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Centered play button — hides during hover-preview to let the video breathe */}
      <div
        className={
          "absolute inset-0 flex items-center justify-center transition-all duration-300 " +
          (isHovered ? "scale-75 opacity-0" : "scale-100 opacity-100")
        }
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/95 text-primary shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-primary" />
        </div>
      </div>

      {/* Caption / hint bottom-right */}
      <div className="absolute bottom-3 right-3 max-w-[55%] text-right text-[10px] font-semibold uppercase tracking-wider text-white/85 drop-shadow">
        {reel.caption || (isHovered ? "Click for sound" : "Tap to play")}
      </div>
    </button>
  );
};

const Gallery = () => {
  const { openModal } = useQuote();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [openReelIdx, setOpenReelIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "crew" | "field">("all");
  const [hoveredReelIdx, setHoveredReelIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;
  const isReelOpen = openReelIdx !== null;

  // Counts per category — for the filter pills.
  const crewCount = PHOTOS.filter((p) => p.slug.startsWith("crew")).length;
  const fieldCount = PHOTOS.filter((p) => p.slug.startsWith("field")).length;

  // Photos visible in the grid (and used by the photo lightbox for prev/next).
  const visiblePhotos = useMemo(() => {
    if (filter === "all") return PHOTOS;
    return PHOTOS.filter((p) => p.slug.startsWith(filter));
  }, [filter]);

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + visiblePhotos.length - 1) % visiblePhotos.length)),
    [visiblePhotos.length],
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % visiblePhotos.length)),
    [visiblePhotos.length],
  );

  const closeReel = useCallback(() => setOpenReelIdx(null), []);
  const prevReel = useCallback(
    () => setOpenReelIdx((i) => (i === null ? null : (i + INSTAGRAM_REELS.length - 1) % INSTAGRAM_REELS.length)),
    [],
  );
  const nextReel = useCallback(
    () => setOpenReelIdx((i) => (i === null ? null : (i + 1) % INSTAGRAM_REELS.length)),
    [],
  );

  // Keyboard navigation while the photo lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  // Keyboard navigation while the reel lightbox is open.
  useEffect(() => {
    if (!isReelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReel();
      else if (e.key === "ArrowLeft") prevReel();
      else if (e.key === "ArrowRight") nextReel();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isReelOpen, closeReel, prevReel, nextReel]);

  return (
    <>
      <SEO
        title="Moments On Duty — Photo Gallery | Star Security & Bouncer Pune"
        description="Moments On Duty — real photos of Star Security & Bouncer crews at corporate gates, events, training drills and patrol rounds across Pune and Maharashtra."
        path="/gallery"
      />

      {/* HERO */}
      <section className="relative overflow-hidden navy-bg py-24 text-primary-foreground lg:py-28">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25"
          style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-15"
          style={{ background: "var(--gradient-gold)", filter: "blur(60px)" }}
        />
        <div className="container-wide relative">
          <div className="flex items-center gap-2">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Photo Gallery</span>
          </div>
          <h1 className="heading-hero mt-5 max-w-4xl text-primary-foreground">
            Moments <span className="text-gold">On Duty</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Real frames from real assignments — our crews at corporate gates, event lines, training drills and patrol rounds. Tap any photo to view full-size.
          </p>

          {/* Stat pills — quick summary of what's in the gallery */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: Camera, value: PHOTOS.length, label: "Photos" },
              { icon: Play, value: INSTAGRAM_REELS.length, label: "Reels" },
              { icon: MapPin, value: SITE.coverageCities.length, label: "Cities" },
            ].map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 backdrop-blur"
              >
                <s.icon className="h-4 w-4 text-gold" />
                <span className="font-display text-lg font-bold leading-none text-primary-foreground">{s.value}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID — uniform-size tiles (1:1) with category filter pills above. */}
      <section className="py-10 sm:py-12 lg:py-14">
        <div className="container-wide">
          {/* Filter tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "all" as const, label: "All", count: PHOTOS.length, icon: Camera },
                  { id: "crew" as const, label: "Our Team", count: crewCount, icon: Users },
                  { id: "field" as const, label: "On Site", count: fieldCount, icon: Compass },
                ]
              ).map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setFilter(tab.id);
                      setOpenIdx(null);
                    }}
                    className={
                      "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all " +
                      (isActive
                        ? "border-gold bg-gold text-primary shadow-md"
                        : "border-border bg-card text-primary hover:border-gold/50 hover:bg-gold/5")
                    }
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    <span
                      className={
                        "rounded-full px-1.5 text-[10px] font-bold " +
                        (isActive ? "bg-primary text-gold" : "bg-muted text-muted-foreground")
                      }
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-muted-foreground">
              Showing <strong className="font-display text-primary">{visiblePhotos.length}</strong> of {PHOTOS.length}
            </span>
          </div>

          <div
            key={filter}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4 animate-in fade-in duration-500"
          >
            {visiblePhotos.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 30, 600)}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="group relative block aspect-square w-full overflow-hidden rounded-lg border bg-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-lg"
                  aria-label={`Open photo ${i + 1} of ${visiblePhotos.length}`}
                >
                  <img
                    src={p.src}
                    alt={`Star Security field photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-9 w-9 translate-x-1 items-center justify-center rounded-full bg-gold text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          {visiblePhotos.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No photos in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* REEL LIGHTBOX — Instagram embed lives here, never on the main page */}
      {isReelOpen && openReelIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reel viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={closeReel}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeReel(); }}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {openReelIdx + 1} / {INSTAGRAM_REELS.length}
          </div>

          {/* Prev */}
          {INSTAGRAM_REELS.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevReel(); }}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-4 sm:h-14 sm:w-14"
              aria-label="Previous reel"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Native HTML5 video — self-hosted, no IG embed, plays inline 100% of the time. */}
          {(() => {
            const slug = `reel-${String(openReelIdx + 1).padStart(2, "0")}`;
            const assets = reelAssets[slug];
            return (
              <div
                className="relative max-h-[90vh] overflow-hidden rounded-lg bg-black shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  key={slug}
                  src={assets?.video}
                  poster={assets?.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="block max-h-[90vh] w-auto max-w-[92vw] object-contain"
                  style={{ aspectRatio: "9 / 16" }}
                />
              </div>
            );
          })()}

          {/* Next */}
          {INSTAGRAM_REELS.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextReel(); }}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-4 sm:h-14 sm:w-14"
              aria-label="Next reel"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}

      {/* PHOTO LIGHTBOX */}
      {isOpen && openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {openIdx + 1} / {visiblePhotos.length}
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-4 sm:h-14 sm:w-14"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <img
            key={openIdx}
            src={visiblePhotos[openIdx]?.src}
            alt={`Star Security field photo ${openIdx + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-md object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            decoding="async"
          />

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-4 sm:h-14 sm:w-14"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* INSTAGRAM REELS — embedded via IG's official /embed iframe */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4405F]/30 bg-[#E4405F]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[#E4405F]">
              <Instagram className="h-3.5 w-3.5" />
              Reels
            </div>
            <h2 className="heading-section mt-4 text-primary">Watch us in action.</h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground">
              Short clips from our crews — straight from{" "}
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary hover:text-[#E4405F]"
              >
                @starsecurityandbouncers
              </a>
              .
            </p>
          </div>

          {INSTAGRAM_REELS.length > 0 ? (
            <div className="mt-12 grid auto-rows-fr gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {INSTAGRAM_REELS.map((reel, i) => (
                <Reveal key={reel.id} delay={i * 60}>
                  <ReelCard
                    reel={reel}
                    index={i}
                    isHovered={hoveredReelIdx === i}
                    onHover={() => setHoveredReelIdx(i)}
                    onLeave={() => setHoveredReelIdx((curr) => (curr === i ? null : curr))}
                    onClick={() => setOpenReelIdx(i)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            // Empty state — shown until reel short-codes are added in src/data/site.ts
            <Reveal>
              <div
                className="mx-auto mt-12 max-w-2xl rounded-xl border-2 border-dashed border-border bg-card p-10 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4405F]/10 text-[#E4405F]">
                  <Play className="ml-0.5 h-6 w-6 fill-[#E4405F]" />
                </div>
                <h3 className="font-display mt-5 text-xl text-primary">Reels are coming soon</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We're curating short clips from real assignments. Until then, follow us on Instagram for the latest.
                </p>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E4405F] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <Instagram className="h-4 w-4" /> Follow on Instagram
                </a>
              </div>
            </Reveal>
          )}

          {INSTAGRAM_REELS.length > 0 && (
            <div className="mt-10 text-center">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#E4405F] px-5 py-2.5 text-sm font-bold text-[#E4405F] transition hover:bg-[#E4405F] hover:text-white"
              >
                <Instagram className="h-4 w-4" /> See all reels on Instagram
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="navy-bg py-20 text-primary-foreground">
        <div className="container-narrow text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h2 className="heading-section mt-4 text-primary-foreground">
            Want our team at your site next?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Free site survey, quote within the hour, deployment in {SITE.coverageCities.length} cities.
          </p>
          <button onClick={() => openModal()} className="btn-gold mt-8">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Gallery;
