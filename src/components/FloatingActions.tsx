import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export const FloatingActions = () => (
  <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2.5 lg:bottom-6 lg:right-6">
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank" rel="noopener"
      aria-label="WhatsApp"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant transition-transform hover:scale-110"
      style={{ boxShadow: "var(--shadow-elegant)" }}
    >
      <MessageCircle className="h-5 w-5" />
    </a>
    <a
      href={`tel:${SITE.phone}`}
      aria-label="Call us"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary shadow-gold transition-transform hover:scale-110 lg:hidden"
      style={{ boxShadow: "var(--shadow-gold)" }}
    >
      <Phone className="h-5 w-5" />
    </a>
  </div>
);
