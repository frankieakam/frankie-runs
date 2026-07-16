import { businessConfig } from "@/config/business";

/**
 * Builds schema.org LocalBusiness structured data from the single business
 * config — if the service area or contact details ever change, this stays
 * correct automatically rather than needing a separate hardcoded copy.
 */
export function buildLocalBusinessJsonLd() {
  const { name, tagline, serviceArea, contact, site } = businessConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description: `Founder-led errand and delivery service in ${serviceArea.city}, ${serviceArea.state}. ${tagline}`,
    url: site.url,
    image: `${site.url}/icons/icon-512.png`,
    telephone: `+${contact.whatsappNumberIntl}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: serviceArea.city,
      addressRegion: serviceArea.state,
      addressCountry: serviceArea.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: serviceArea.city,
    },
    priceRange: "\u20A6\u20A6",
  };
}
