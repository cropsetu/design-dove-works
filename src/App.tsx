import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";

// Code-split everything else off the initial bundle. ServiceDetail in particular
// imports 19 hero images — keeping it lazy means none of those load until the
// user actually navigates to /services/:slug.
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Training = lazy(() => import("./pages/Training"));
const Clients = lazy(() => import("./pages/Clients"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Locality = lazy(() => import("./pages/Locality"));
const ServiceCity = lazy(() => import("./pages/ServiceCity"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-gold" aria-label="Loading" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <QuoteProvider>
            <Layout>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/training" element={<Training />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/coverage" element={<Coverage />} />
                  <Route path="/security-services-in-:locality" element={<Locality />} />
                  <Route path="/:combo" element={<ServiceCity />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <QuoteModal />
            </Layout>
          </QuoteProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
