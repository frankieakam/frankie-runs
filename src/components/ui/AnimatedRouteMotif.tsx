"use client";

import { m } from "framer-motion";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { TruckIcon } from "@/constants/icons";
import { cn } from "@/utils/cn";

interface AnimatedRouteMotifProps {
  className?: string;
  surface?: "onLight" | "onDark";
}

/**
 * The Hero-scale route motif with a small delivery van traveling down the
 * line from the pickup dot to the drop-off dot, looping — this is what
 * turns the static brand motif into "delivery in progress" at a glance.
 *
 * Deliberately a separate component from the plain `RouteMotif` rather than
 * an `animated` prop on it: the logo/icon-mark usage (nav, footer, favicon)
 * should always stay static — a constantly-moving logo in a persistent nav
 * bar reads as broken, not lively. This component is only for large,
 * decorative, one-per-page placements like the Hero.
 */
export function AnimatedRouteMotif({ className, surface = "onLight" }: AnimatedRouteMotifProps) {
  const vanColor = surface === "onDark" ? "text-paper" : "text-ink-teal";

  return (
    <div className={cn("relative", className)}>
      <RouteMotif surface={surface} aria-hidden />
      <m.div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm",
          vanColor,
        )}
        style={{ top: "19%" }}
        animate={{ top: ["19%", "81%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3.2,
          times: [0, 0.12, 0.88, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        aria-hidden
      >
        <TruckIcon className="h-5 w-5" strokeWidth={2.25} />
      </m.div>
    </div>
  );
}
