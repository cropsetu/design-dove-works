import { useRef, useState } from "react";
import { z } from "zod";
import { Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

// Single source of truth for the lead-capture form.
// Used by Home, Contact and QuoteModal so every entry point on the site
// captures the exact same fields with the exact same validation, and
// every submission emails starbouncers@gmail.com via FormSubmit.
//
// FormSubmit is a free, no-account email relay. The endpoint is the email
// address itself — no API key, no env var, nothing to set up beyond a
// one-time activation:
//
//   1. Submit the form once on the live site (or locally).
//   2. FormSubmit sends an "Activate" email to starbouncers@gmail.com.
//   3. Open that email and click the activation link.
//   4. From then on, every submission lands in the inbox automatically.
//
// Free tier: unlimited submissions, forever.
const FORMSUBMIT_TARGET = "starbouncers@gmail.com";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
  contactNumber: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid contact number"),
  city: z.string().trim().min(2, "City is required").max(60),
  message: z.string().max(800).optional().or(z.literal("")),
});

export type LeadFormSource = "contact_form" | "quote_modal" | "home_hero";

export type Lead = z.infer<typeof schema> & {
  ts: string;
  source: LeadFormSource;
  /** Service the user was viewing when they opened the form, if applicable. */
  pageService?: string;
};

export type LeadFormProps = {
  source: LeadFormSource;
  /**
   * Service-detail context passed in for tracking only (e.g. from the QuoteModal).
   * Stored on the lead and included in the WhatsApp message — never rendered as a field.
   */
  presetService?: string;
  className?: string;
  onSuccess?: (lead: Lead) => void;
  /** When true (default), form fields are reset after a successful submit. */
  resetOnSuccess?: boolean;
};

export const LeadForm = ({
  source,
  presetService,
  className,
  onSuccess,
  resetOnSuccess = true,
}: LeadFormProps) => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Sends the lead to starbouncers@gmail.com via FormSubmit (free, no account).
  // Returns true on success, false on any failure (network, server error).
  // Failures are non-blocking — the lead stays in localStorage as a backup.
  const sendEmail = async (lead: Lead): Promise<boolean> => {
    const fullName = `${lead.firstName} ${lead.lastName}`;
    const subjectTag =
      lead.source === "quote_modal" ? "Quote request"
        : lead.source === "home_hero" ? "Homepage enquiry"
          : "Contact-page enquiry";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          // FormSubmit-recognised meta fields (prefixed with _):
          _subject: `[Star Security] ${subjectTag} from ${fullName}`,
          _replyto: lead.email,
          _template: "table",        // render the body as a clean key/value table
          _captcha: "false",          // disable captcha for AJAX flow
          _honey: "",                 // honeypot — bots that fill this are silently dropped

          // Visible body fields — keys become the labels in the email:
          Name: fullName,
          Email: lead.email,
          Phone: lead.contactNumber,
          City: lead.city,
          Message: lead.message?.trim() || "(no additional message)",
          "Service viewed": lead.pageService || "(direct enquiry)",
          Source: lead.source,
          "Submitted at": new Date(lead.ts).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        }),
      });
      if (!res.ok) return false;
      const json = await res.json().catch(() => null);
      // FormSubmit returns { success: "true" | true } on accepted submissions.
      return json?.success === true || json?.success === "true";
    } catch {
      return false;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const lead: Lead = {
      ...parsed.data,
      ts: new Date().toISOString(),
      source,
      ...(presetService ? { pageService: presetService } : {}),
    };

    // Always save locally as a backup (works even if email fails).
    try {
      const existing = JSON.parse(localStorage.getItem("star_leads") || "[]");
      localStorage.setItem("star_leads", JSON.stringify([lead, ...existing]));
    } catch {
      // localStorage unavailable — ignore.
    }

    const emailOk = await sendEmail(lead);

    if (emailOk) {
      toast({
        title: "Message sent",
        description: "We've emailed your request to our team. We'll reach out within the hour.",
      });
    } else {
      // Network / FormSubmit hiccup — the lead is still in localStorage,
      // and the user has the call/WhatsApp links right below the form.
      toast({
        title: "Couldn't send right now",
        description: `Please try again, or call us on ${SITE.phones[0].number}.`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (resetOnSuccess) formRef.current?.reset();
    setLoading(false);
    onSuccess?.(lead);
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={cn("grid w-full grid-cols-1 gap-4 sm:grid-cols-2", className)}
      noValidate
    >
      <div>
        <Label htmlFor="firstName">First Name *</Label>
        <Input id="firstName" name="firstName" required maxLength={60} autoComplete="given-name" className="mt-1.5" />
        {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
      </div>

      <div>
        <Label htmlFor="lastName">Last Name *</Label>
        <Input id="lastName" name="lastName" required maxLength={60} autoComplete="family-name" className="mt-1.5" />
        {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="email">Your email *</Label>
        <Input id="email" name="email" required type="email" maxLength={255} autoComplete="email" inputMode="email" className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          required
          type="tel"
          maxLength={15}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 ..."
          className="mt-1.5"
        />
        {errors.contactNumber && <p className="mt-1 text-xs text-destructive">{errors.contactNumber}</p>}
      </div>

      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          name="city"
          required
          maxLength={60}
          defaultValue="Pune"
          autoComplete="address-level2"
          className="mt-1.5"
        />
        {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="message">Tell us briefly what you need (optional)</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          maxLength={800}
          placeholder="Type of premises, expected footfall, special requirements, etc."
          className="mt-1.5"
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full disabled:opacity-60 sm:col-span-2"
      >
        <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-muted-foreground sm:col-span-2">
        <span>
          Or call us on{" "}
          <a className="font-bold text-gold-text underline-offset-2 hover:underline" href={`tel:${SITE.phones[0].tel}`}>
            {SITE.phones[0].number}
          </a>
        </span>
        <span aria-hidden className="hidden sm:inline">·</span>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 font-semibold text-whatsapp hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
        </a>
      </div>
    </form>
  );
};
