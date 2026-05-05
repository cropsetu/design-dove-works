import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useQuote } from "@/context/QuoteContext";
import { SITE } from "@/data/site";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const QuoteModal = () => {
  const { open, closeModal, preset } = useQuote();
  const [submitted, setSubmitted] = useState(false);

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      closeModal();
      // Re-show the form the next time the modal opens.
      setTimeout(() => setSubmitted(false), 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
            <h3 className="font-display mt-4 text-2xl text-primary">Request received</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you. Our team will reach out within the hour. For urgent needs, call{" "}
              <a className="font-semibold text-gold" href={`tel:${SITE.phones[0].tel}`}>
                {SITE.phones[0].number}
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <ShieldCheck className="h-6 w-6 text-gold" />
              </div>
              <DialogTitle className="font-display text-center text-2xl">
                Get in touch with us with your requirements
              </DialogTitle>
              <DialogDescription className="text-center">
                Tell us briefly what you need. We respond within the hour, 24/7.
              </DialogDescription>
            </DialogHeader>
            <LeadForm
              source="quote_modal"
              presetService={preset}
              resetOnSuccess={false}
              onSuccess={() => setSubmitted(true)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
