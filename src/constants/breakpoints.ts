/**
 * Single source of truth for the breakpoint that separates "mobile" from
 * "desktop" behavior in JS (e.g. choosing Dialog vs Drawer for the order
 * flow). Matches Tailwind's default `md` breakpoint — keep these in sync
 * if the Tailwind theme is ever customized.
 */
export const DESKTOP_BREAKPOINT_PX = 768;

export const DESKTOP_MEDIA_QUERY = `(min-width: ${DESKTOP_BREAKPOINT_PX}px)`;
