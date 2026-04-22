import { Helmet } from "react-helmet-async";
import { SITE } from "@/data/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export const SEO = ({ title, description, path = "/", jsonLd, noindex }: SEOProps) => {
  const url = `https://www.starsecuritybouncer.com${path}`;
  const fullTitle = title.includes(SITE.shortName) ? title : `${title} | ${SITE.name}`;
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "SecurityService",
  name: SITE.name,
  description: SITE.description,
  url: "https://www.starsecuritybouncer.com",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.pincode,
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Pune" },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "₹₹",
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceJsonLd = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  provider: { "@type": "Organization", name: SITE.name },
  areaServed: { "@type": "City", name: "Pune" },
  description,
});
