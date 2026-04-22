import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteContextValue {
  open: boolean;
  preset?: string;
  openModal: (preset?: string) => void;
  closeModal: () => void;
}

const Ctx = createContext<QuoteContextValue | null>(null);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>();
  return (
    <Ctx.Provider
      value={{
        open,
        preset,
        openModal: (p) => { setPreset(p); setOpen(true); },
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useQuote = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useQuote must be used within QuoteProvider");
  return v;
};
