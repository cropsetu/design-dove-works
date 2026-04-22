import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuote } from "@/context/QuoteContext";
import { SERVICES, SITE } from "@/data/site";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(2).max(60),
  service: z.string().min(1, "Please choose a service"),
  duration: z.string().max(60).optional().or(z.literal("")),
  personnel: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(800).optional().or(z.literal("")),
});

export const QuoteModal = () => {
  const { open, closeModal, preset } = useQuote();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Lovable Cloud not connected — store locally for now & open WhatsApp.
    try {
      const lead = { ...parsed.data, ts: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem("star_leads") || "[]");
      localStorage.setItem("star_leads", JSON.stringify([lead, ...existing]));
      const wa = `Hello Star Security, I'd like a quote.%0A%0AName: ${encodeURIComponent(lead.name)}%0APhone: ${encodeURIComponent(lead.phone)}%0AEmail: ${encodeURIComponent(lead.email)}%0ACity: ${encodeURIComponent(lead.city)}%0AService: ${encodeURIComponent(lead.service)}%0ADuration: ${encodeURIComponent(lead.duration || "")}%0APersonnel: ${encodeURIComponent(lead.personnel || "")}%0AMessage: ${encodeURIComponent(lead.message || "")}`;
      window.open(`https://wa.me/${SITE.whatsapp}?text=${wa}`, "_blank", "noopener");
      setSubmitted(true);
      toast({ title: "Quote request sent", description: "Our team will contact you within the hour." });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      closeModal();
      setTimeout(() => { setSubmitted(false); setErrors({}); }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
            <h3 className="font-display mt-4 text-2xl text-primary">Request received</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you. Our team will reach out within the hour. For urgent needs, call <a className="text-gold font-semibold" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <ShieldCheck className="h-6 w-6 text-gold" />
              </div>
              <DialogTitle className="font-display text-2xl text-center">Request a Free Quote</DialogTitle>
              <DialogDescription className="text-center">
                Tell us briefly what you need. We respond within the hour, 24/7.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" name="name" required maxLength={80} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" required type="tel" maxLength={15} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" required type="email" maxLength={255} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" required defaultValue="Pune" maxLength={60} />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="service">Service *</Label>
                <Select name="service" defaultValue={preset || ""}>
                  <SelectTrigger><SelectValue placeholder="Choose service" /></SelectTrigger>
                  <SelectContent>
                    {SERVICES.map(s => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" placeholder="e.g. 1 day / 6 months" maxLength={60} />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="personnel">Personnel needed</Label>
                <Input id="personnel" name="personnel" placeholder="e.g. 4 guards" maxLength={20} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={3} maxLength={800} placeholder="Anything we should know?" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold sm:col-span-2 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send & Notify on WhatsApp"}
              </button>
              <p className="sm:col-span-2 text-center text-xs text-muted-foreground">
                Or call us directly: <a className="text-gold font-semibold" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
