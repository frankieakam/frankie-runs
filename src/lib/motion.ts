import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion tokens. Framer Motion is used for page-level and
 * scroll-triggered animation only — Dialog/Drawer open/close transitions
 * are handled natively by Base UI's data-starting-style/data-ending-style
 * CSS hooks, which are more correct for interruption handling than
 * layering Framer Motion on top of them.
 */

export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
};

/** Parent wrapper for staggering a group of fadeInUp children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Default viewport config for scroll-triggered reveals — fires once, slightly before fully in view. */
export const scrollRevealViewport = { once: true, margin: "-80px" } as const;
