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
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Training from "./pages/Training";
import Clients from "./pages/Clients";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Coverage from "./pages/Coverage";
import Locality from "./pages/Locality";
import ServiceCity from "./pages/ServiceCity";
import Sitemap from "./pages/Sitemap";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <QuoteProvider>
            <Layout>
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
              <QuoteModal />
            </Layout>
          </QuoteProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
