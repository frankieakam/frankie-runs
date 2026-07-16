import { cn } from "@/utils/cn";

interface IconMarkProps {
  className?: string;
  /** Background tone of the rounded square. */
  background?: "ink" | "transparent";
}

/**
 * The logo/favicon-style icon mark: a rounded square containing the route
 * motif, sized by whatever width/height classes are passed in via
 * `className` (e.g. "h-9 w-9").
 *
 * Deliberately a single flat SVG — background rect and motif drawn in the
 * same coordinate space — rather than an SVG nested inside a padded div.
 * That earlier version relied on percentage padding resolving against an
 * aspect-ratio-derived height, which turned out not to render reliably
 * everywhere. An <svg> sized directly by CSS width/height classes, with
 * everything drawn in one viewBox, has nothing that can fail to size.
 */
export function IconMark({ className, background = "ink" }: IconMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block shrink-0 w-full h-full", className)}
      aria-hidden
    >
      {background === "ink" && <rect x="0" y="0" width="100" height="100" rx="22.5" fill="#0F2A2E" />}

      {/* dashed route line */}
      <line
        x1="50"
        y1="40"
        x2="50"
        y2="60"
        stroke="#FBF7F0"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeDasharray="5.5 4"
        strokeLinecap="round"
      />

      {/* pickup dot — amber, top */}
      <circle cx="50" cy="23.5" r="13.6" fill="none" stroke="#FFA873" strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="50" cy="23.5" r="8.8" fill="#FF7A33" />

      {/* drop-off dot — sage, bottom */}
      <circle cx="50" cy="76.5" r="8.8" fill="#8FBF9F" />
      <circle cx="50" cy="76.5" r="3.7" fill="#0F2A2E" />
    </svg>
  );
}
