export interface NavLink {
  label: string;
  href: string;
}

/** Anchor links into landing page sections. */
export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#footer" },
];
