"use client";

import { useMediaQuery } from "@base-ui/react/unstable-use-media-query";
import { DESKTOP_MEDIA_QUERY } from "@/constants/breakpoints";

/**
 * Returns true on viewports at or above the desktop breakpoint.
 *
 * Used to decide presentation style for the order flow: a centered modal
 * dialog on desktop, a swipe-to-dismiss bottom sheet on mobile. Since the
 * dialog/drawer only ever opens after a user interaction (never rendered
 * open on first paint), there is no SSR/hydration mismatch risk here —
 * `noSsr` keeps the check client-only and avoids an unnecessary double
 * render pass.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_MEDIA_QUERY, { noSsr: true, defaultMatches: false });
}
