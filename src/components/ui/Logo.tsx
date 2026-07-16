"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { IconMark } from "@/components/ui/IconMark";
import { businessConfig } from "@/config/business";

interface LogoProps {
  className?: string;
  /** "dark" wordmark for paper backgrounds, "light" for ink backgrounds. */
  theme?: "dark" | "light";
  /** Compact omits nothing extra today, but keeps the door open for a future tagline variant. */
  href?: string;
}

export function Logo({ className, theme = "dark", href = "/" }: LogoProps) {
  const pathname = usePathname();

  /**
   * Next.js's <Link> only does something when the destination differs from
   * the current route — clicking a link to the page you're already on is a
   * no-op by design (the URL isn't changing, so there's nothing to
   * navigate). That's exactly what made the logo look broken: on the home
   * page itself, clicking it did nothing visible. This explicitly scrolls
   * to top for that same-page case, and falls through to normal <Link>
   * navigation for every other case.
   */

function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
  // Check if we're on the same page (ignoring hash)
  if (pathname === href) {
    event.preventDefault();

    // Only intervene if there's actually a hash to clear
    if (window.location.hash) {
      window.history.replaceState(null, '', href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-teal focus-visible:ring-offset-2",
        className,
      )}
      aria-label={`${businessConfig.name} — home`}
    >
      <IconMark className="h-9 w-9 sm:h-10 sm:w-10" />
      <span
        className={cn(
          "font-display text-xl sm:text-2xl font-semibold",
          theme === "dark" ? "text-ink-teal" : "text-paper",
        )}
      >
        {businessConfig.name}
      </span>
    </Link>
  );
}
