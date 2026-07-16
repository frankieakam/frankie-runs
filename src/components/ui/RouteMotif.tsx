"use client";

import { m } from "framer-motion";
import { cn } from "@/utils/cn";

interface RouteMotifProps {
  className?: string;
  /** "onLight" for use on paper background, "onDark" for use on ink-teal background. */
  surface?: "onLight" | "onDark";
  /**
   * "tall" (default) is the full 3-point animated journey — My Location,
   * Pickup, Drop-off — proportioned for tall/narrow containers (Hero,
   * Final CTA). "square" is a separately-calibrated, deliberately STATIC
   * layout for perfectly square containers like IconMark — the logo mark
   * should never animate (a constantly-moving logo in a persistent navbar
   * reads as broken, not lively), and its viewBox is proportioned for a
   * square box rather than a tall one.
   */
  layout?: "tall" | "square";
  /** aria-hidden by default since this is decorative in nearly every placement. */
  "aria-hidden"?: boolean;
}

/** Real path data from lucide-react's Package icon (dist/esm/icons/package.mjs), embedded
 * directly rather than rendered via the React component — this SVG needs to nest inside
 * our own <svg>, and a plain nested <svg> with the raw paths is simpler and more robust
 * than mixing in a second component instance. */
function ParcelIcon({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <path d="m7.5 4.27 9 5.15" />
    </svg>
  );
}

/**
 * Brand signature motif representing a journey: My Location, to Pickup,
 * to Drop-off. A small marker travels the route, picking up a parcel icon
 * at the Pickup point and carrying it through to Drop-off, then loops.
 *
 * Renders as a scalable SVG so the same component works for the small
 * navbar mark (static "square" layout) and the large hero/decorative
 * version (animated "tall" layout) — only its container size (and
 * `layout` for square contexts) changes.
 */
export function RouteMotif({
  className,
  surface = "onLight",
  layout = "tall",
  "aria-hidden": ariaHidden = true,
}: RouteMotifProps) {
  const lineColor = surface === "onDark" ? "#FBF7F0" : "#173B3F";
  const lineOpacity = surface === "onDark" ? 0.7 : 0.35;

  if (layout === "square") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className={cn("w-full h-full", className)}
        aria-hidden={ariaHidden}
      >
        <line
          x1="50"
          y1="40"
          x2="50"
          y2="60"
          stroke={lineColor}
          strokeOpacity={lineOpacity}
          strokeWidth="3"
          strokeDasharray="5.5 4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="23.5" r="13.6" fill="none" stroke="#FFA873" strokeOpacity="0.55" strokeWidth="1.6" />
        <circle cx="50" cy="23.5" r="8.8" fill="#FF7A33" />
        <circle cx="50" cy="76.5" r="8.8" fill="#8FBF9F" />
        <circle cx="50" cy="76.5" r="3.7" fill="#0F2A2E" />
      </svg>
    );
  }

  // Three stops along the tall layout: My Location (top) -> Pickup (middle) -> Drop-off (bottom).
  const myLocationY = 42;
  const pickupY = 200;
  const dropoffY = 358;

  const myLocationFill = surface === "onDark" ? "#FBF7F0" : "#0F2A2E";
  const myLocationInner = surface === "onDark" ? "#0F2A2E" : "#FBF7F0";
  const travelerColor = surface === "onDark" ? "#FBF7F0" : "#0F2A2E";
  // amber fails contrast against the paper background at any opacity — use the
  // darkened, accessible variant on light surfaces (same rule as everywhere else
  // amber shows up as a foreground color; see docs/MAINTENANCE.md).
  const parcelColor = surface === "onDark" ? "#FF7A33" : "#BB4100";

  const times = [0, 0.05, 0.38, 0.45, 0.85, 0.9, 1];
  const positionTransition = {
    duration: 6,
    times,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <svg
      viewBox="0 0 100 400"
      fill="none"
      className={cn("w-full h-full", className)}
      aria-hidden={ariaHidden}
    >
      {/* continuous dashed route line, running behind all three markers */}
      <line
        x1="50"
        y1="76"
        x2="50"
        y2="324"
        stroke={lineColor}
        strokeOpacity={lineOpacity}
        strokeWidth="4"
        strokeDasharray="14 12"
        strokeLinecap="round"
      />

      {/* My Location — top */}
      <circle cx="50" cy={myLocationY} r="14" fill={myLocationFill} />
      <circle cx="50" cy={myLocationY} r="6" fill={myLocationInner} />

      {/* Pickup — middle */}
      <circle cx="50" cy={pickupY} r="20" fill="none" stroke="#FFA873" strokeOpacity="0.55" strokeWidth="4" />
      <circle cx="50" cy={pickupY} r="14" fill="#FF7A33" />

      {/* Drop-off — bottom */}
      <circle cx="50" cy={dropoffY} r="14" fill="#8FBF9F" />
      <circle cx="50" cy={dropoffY} r="6" fill="#0F2A2E" />

      {/* Traveling marker: My Location -> Pickup -> Drop-off, looping.
          Picks up the parcel icon at Pickup, carries it to Drop-off, then
          fades out and instantly resets to My Location for the next lap —
          the reset is masked by the opacity fade so there's never a visible
          snap backward up the line. */}
      <m.g
        animate={{ y: [myLocationY, myLocationY, pickupY, pickupY, dropoffY, dropoffY, dropoffY] }}
        transition={positionTransition}
      >
        <m.g
          animate={{ opacity: [1, 1, 1, 1, 1, 1, 0] }}
          transition={{ ...positionTransition, ease: "linear" as const }}
        >
          <circle cx="50" cy="0" r="7" fill={travelerColor} />
          <m.g
            animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
            transition={{ ...positionTransition, ease: "linear" as const }}
          >
            <ParcelIcon x={41} y={-30} size={18} color={parcelColor} />
          </m.g>
        </m.g>
      </m.g>
    </svg>
  );
}
