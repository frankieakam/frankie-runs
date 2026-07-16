# Component Reference (`components/ui/`)

Generic, reusable, brand-agnostic design system primitives. If a component needs to know what a "service" or "order" is, it belongs in `features/`, not here.

---

## `Button` / `ButtonLink`

```tsx
<Button variant="primary" size="lg" icon={<ArrowIcon className="h-5 w-5" />} onClick={...}>
  Send a request
</Button>

<ButtonLink href="#how-it-works" variant="secondary" size="lg">
  See how it works
</ButtonLink>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | primary = amber fill |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | |
| `icon` | `ReactNode` | — | automatically `aria-hidden` — the button's own text is what's announced |
| `iconPosition` | `"left" \| "right"` | `"right"` | |
| `fullWidth` | `boolean` | `false` | |

`Button` renders a `<button>`; `ButtonLink` renders an `<a>` with identical styling (same variant/size classes, shared internally) — use it for same-page anchors or external links that genuinely shouldn't be a `<button>`.

---

### `IconButton`

```tsx
<IconButton aria-label="Open menu" variant="solid" size="md">
  <MenuIcon className="h-5 w-5" />
</IconButton>

<IconButton aria-label="Frankie Runs on Instagram" href="https://instagram.com/..." target="_blank">
  <InstagramIcon className="h-4 w-4" />
</IconButton>
```

`aria-label` is **required** at the type level — an icon-only control can't ship without an accessible name. Passing `href` renders an `<a>` instead of a `<button>` (mutually exclusive with native button attributes via a discriminated union type). Icon content is automatically wrapped in `aria-hidden` — the `aria-label` is what gets announced.

---

### `Card`

```tsx
<Card interactive className="p-6">...</Card>
```

`interactive` adds a Framer Motion hover lift. `as` can be `"div" | "article" | "li"` for correct semantics in a list context — defaults to `"div"` (the Services grid, for example, uses the default; reach for `"li"` if you're placing a Card directly inside a `<ul>`/`<ol>`).

---

### `Container` / `Section`

Layout rhythm primitives. `Container` is a max-width + responsive horizontal padding wrapper (`size="narrow"` for text-heavy content like FAQ). `Section` handles vertical spacing and background tone:

```tsx
<Section tone="ink" compact>...</Section>
```

`tone`: `"paper" | "ink"` — sets both background and the inherited text color for everything inside. `compact` reduces vertical padding for sections that sit tight against a neighbor.

---

### `Heading` / `Text` / `Label`

```tsx
<Heading level={2}>Services</Heading>
<Heading level={4} size={4} as="h3">Food Delivery</Heading>  {/* visual size 4, semantic h3 — keeps heading hierarchy unbroken */}
<Text size="lg" muted>Supporting copy...</Text>
<Label tone="amber">What I Can Get For You</Label>
```

`Heading`'s `level` sets both the semantic tag and default visual size — override the tag independently via `as` when you need a smaller heading that doesn't skip a level (see `docs/MAINTENANCE.md`, "Heading hierarchy" — this is a real trap, not a hypothetical one).

`Label`'s `tone="amber"` / `tone="sage"` **require a `surface` prop** to render accessibly:

```tsx
<Label tone="sage" surface="onDark">The Process</Label>   {/* on an ink-teal section */}
<Label tone="amber">What I Can Get For You</Label>         {/* surface defaults to "onLight" */}
```

`surface="onLight"` (the default) resolves to `amber-deep`/`sage-deep` — the base `amber`/`sage` fail WCAG contrast against the paper background at any opacity. Get this wrong and you get a real, computed contrast failure, not a stylistic quibble — see `docs/MAINTENANCE.md`.

---

### `Input` / `Textarea` / `Select`

```tsx
<Input label="Full name" error={errors.customerName?.message} {...register("customerName")} />
<Textarea label="Notes" {...register("notes")} />
<Select label="Service" options={[{label: "Food Delivery", value: "food-delivery"}]}
        value={field.value} onValueChange={(v) => field.onChange(v ?? "")} error={...} />
```

`Input`/`Textarea` forward refs directly, so React Hook Form's `register()` spreads onto them with no adapter needed. `Select` is built on Base UI's `Select` primitive (not a native `<select>`) and needs a `Controller` wrapper in RHF rather than `register()` — see any of the order form's step components for the exact pattern.

All three wire `aria-invalid` and `aria-describedby` automatically when `error` is set, and the error message itself renders with `role="alert"`.

---

### `Logo` / `IconMark` / `RouteMotif`

The brand signature system, as real components rather than static images:

- `RouteMotif` — the dashed-line + two-dot SVG itself. `surface="onLight" | "onDark"` controls the connecting line's color for contrast against its background.
- `IconMark` — `RouteMotif` inside a rounded-square container. This is the "icon" version used in the nav/footer logo and favicons.
- `Logo` — `IconMark` + wordmark, linked to `/`. `theme="dark" | "light"` for the wordmark's text color.

The large, uncontained hero version of the motif is just `<RouteMotif>` used directly (see `features/landing/Hero.tsx`) — not a separate component, since it's the same drawing at a different scale and container.

---

### `ResponsiveDialog`

```tsx
<ResponsiveDialog open={open} onOpenChange={setOpen} title="Send a request" description="...">
  {children}
</ResponsiveDialog>
```

Renders Base UI's `Dialog` (centered modal, fade+scale) on desktop or `Drawer` (bottom sheet, swipe-to-dismiss) on mobile, decided by `useIsDesktop()`. `title` is required — it's what screen readers announce when the dialog opens, even if `visuallyHideHeader` hides it visually because the content below already has its own heading.

This is the generic primitive; the actual order dialog instance (state, content, the "every CTA opens the same one" behavior) lives in `features/order/OrderDialogProvider.tsx` — see `docs/ARCHITECTURE.md`.
