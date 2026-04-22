import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Reveal = ({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(visible ? "animate-fade-up" : "opacity-0", className)}
    >
      {children}
    </div>
  );
};
