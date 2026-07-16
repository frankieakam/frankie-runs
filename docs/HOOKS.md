# Hooks Reference

## `useIsDesktop()` — `hooks/useIsDesktop.ts`

```tsx
const isDesktop = useIsDesktop();
```

Returns `true` at or above the desktop breakpoint (768px, `constants/breakpoints.ts`). Wraps Base UI's own `useMediaQuery` with `noSsr: true` — safe because it's only ever used to decide *how* to render an already-closed dialog (`ResponsiveDialog`), never something visible on first paint, so there's no hydration mismatch risk to worry about.

### `useScrolled(thresholdPx = 8)` — `hooks/useScrolled.ts`

```tsx
const scrolled = useScrolled();
```

Returns `true` once the page has scrolled past `thresholdPx`. Drives the Navbar's transparent-to-blurred transition. Uses a passive scroll listener, cleaned up on unmount.

### `useOrderDialog()` — `features/order/OrderDialogProvider.tsx`

```tsx
const { openOrderDialog } = useOrderDialog();
<Button onClick={openOrderDialog}>Send a request</Button>
```

Not in `hooks/` because it's tightly coupled to one specific feature (the order dialog), not a generic utility — but it's the hook you'll reach for most often when adding a new CTA anywhere on the site. Must be called from a component rendered under `OrderDialogProvider` (which wraps the whole `(site)` route group) — calling it outside that tree throws immediately rather than failing silently, on purpose.

### Notes on hooks that don't exist (yet)

There's no `useMediaQuery` of our own — `useIsDesktop` is the only place a media query is needed, so it wasn't generalized further. If a second breakpoint-dependent behavior comes up, that's the point to extract a general-purpose hook rather than duplicating the pattern.
