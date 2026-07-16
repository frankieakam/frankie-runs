"use client";

import type { ReactNode } from "react";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";

/**
 * Two bundle-size decisions live here:
 *
 * 1. LazyMotion + `m` components (used throughout instead of `motion`) loads
 *    only the `domAnimation` feature set — animate/hover/tap/variants —
 *    rather than the full motion engine. We don't use drag or layout
 *    animations anywhere, so the larger `domMax` bundle would be dead weight.
 * 2. `reducedMotion="user"` makes every animation respect the OS-level
 *    "reduce motion" preference automatically.
 *
 * Isolated in its own client component because the root layout needs to
 * stay a Server Component to export `metadata`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
