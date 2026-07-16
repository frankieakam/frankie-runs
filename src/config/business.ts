/**
 * Central business configuration.
 *
 * Every piece of UI or metadata that references the service area, contact
 * details, or brand copy should read from here — never hardcode "Uyo",
 * the WhatsApp number, or the site URL directly in a component. This is
 * what lets the business expand to additional cities later by editing
 * this one file instead of hunting through the codebase.
 */

export const businessConfig = {
  name: "Frankie Runs",
  tagline: "You name it. I go get it.",
  subTagline: "Errands & Delivery",

  /** Primary/current service area. Update here when expanding to a new city. */
  serviceArea: {
    city: "Uyo",
    state: "Akwa Ibom State",
    country: "Nigeria",
    countryCode: "NG",
  },

  contact: {
    whatsappNumber: "09018848937",
    /** E.164 format, required for wa.me links */
    whatsappNumberIntl: "2349018848937",
  },

  site: {
    /**
     * `NEXT_PUBLIC_SITE_URL` should be set per-environment on Vercel (Production
     * env var pointing at the real domain). Falls back to the known production
     * URL so local dev and any environment missing the var still work correctly.
     */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankieruns.vercel.app",
  },

  payment: {
    method: "Bank transfer",
    timing: "Before delivery",
    displayLine: "Via bank transfer, before delivery",
  },

  pricing: {
    startingFrom: "\u20A6500",
    note: "Final price confirmed on WhatsApp before pickup.",
  },

  /**
   * Optional social profile URLs. Left undefined until real profiles exist —
   * the footer only renders an icon for a platform once its URL is set here.
   * WhatsApp is deliberately excluded: every WhatsApp touchpoint on the site
   * opens the order dialog rather than linking out directly.
   */
  social: {
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
    x: undefined as string | undefined,
  },
  // social: {
  //   facebook: "https://www.facebook.com/franklynakam",
  //   instagram: "https://www.instagram.com/frankie_akam",
  //   x: "https://x.com/frankie_akam",
  // },
} as const;

export type BusinessConfig = typeof businessConfig;

/** Convenience getter, so copy can read "Errands & Delivery · Uyo" consistently. */
export function getSubTaglineWithCity(): string {
  return `${businessConfig.subTagline} \u00B7 ${businessConfig.serviceArea.city}`;
}
