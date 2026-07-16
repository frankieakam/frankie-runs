# Maintenance Guide

Task-oriented — find the thing you're trying to do.

## Update the WhatsApp number, city, or site URL

Edit `src/config/business.ts` only. Never hardcode these elsewhere — every place that needs them already reads from this file. If you're changing the WhatsApp number, update both `whatsappNumber` (display format) and `whatsappNumberIntl` (E.164 format, used to build the `wa.me` link) — they're separate fields on purpose.

## Add a new service

Edit `src/content/services.ts` — add an entry to the `services` array with a `slug`, `title`, `description`, `image` path, and `icon`. The service automatically appears in the Services grid and becomes selectable in the order form's Service dropdown (both read from the same array — no second place to update).

The `image` path needs a matching file in `public/images/services/` — see "Swap placeholder images" below.

## Add a new FAQ item

Edit `src/content/faq.ts` — add a `{ question, answer }` entry. It renders automatically as a new accordion item.

## Update pricing

Edit `businessConfig.pricing` in `src/config/business.ts` (`startingFrom` and `note`). Both the Pricing section and the FAQ's pricing answer should stay consistent — if you change one, check the other still makes sense.

## Swap placeholder service images for real photography

The 6 images in `public/images/services/` (`food-delivery.jpg`, `grocery-runs.jpg`, etc.) are intentionally plain placeholders — they say so directly on the image. Replace them with real photos at the **exact same filenames and paths**; no code changes needed. Match a roughly 4:3 aspect ratio for a clean fit in the existing card layout.

## Change brand colors

Edit the CSS custom properties in `src/app/globals.css` (`:root` block) — `--color-ink-teal`, `--color-amber`, etc. **Do not stop there if you touch `amber` or `sage`.**

### The accessibility trap here specifically

`amber` and `sage` are calibrated to look right on the dark `ink-teal` background, and they **fail WCAG contrast against the paper background at any opacity** — this was a real bug caught and fixed during the accessibility pass (see `docs/ARCHITECTURE.md`). `amber-deep` and `sage-deep` exist specifically as darkened, accessible variants for use on paper.

If you change the base `amber`/`sage` hex values, recompute whether the `-deep` variants still pass and adjust them too. A quick way to check any color pair:

```python
def rel_luminance(rgb):
    def chan(c):
        c = c / 255
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055) ** 2.4
    r, g, b = rgb
    return 0.2126*chan(r) + 0.7152*chan(g) + 0.0722*chan(b)

def contrast(rgb1, rgb2):
    l1, l2 = rel_luminance(rgb1), rel_luminance(rgb2)
    return (max(l1,l2) + 0.05) / (min(l1,l2) + 0.05)
```

Text needs `>= 4.5`, UI components/focus indicators need `>= 3.0`.

**Never use raw `text-amber` or `text-sage` directly on a paper/light background.** Use the `Label` component with `surface="onLight"` (the default) — it resolves to the `-deep` variant automatically. If you need amber/sage text outside of `Label`, use `text-amber-deep` / `text-sage-deep` explicitly rather than the base colors.

## Update the tagline or core copy

`businessConfig.tagline` and `businessConfig.subTagline` (in `business.ts`) drive the Hero, Final CTA, footer, and metadata title. Section-specific copy (Hero's supporting paragraph, Services' intro line, etc.) lives directly in each `features/landing/*.tsx` file — there wasn't enough repeated copy to justify extracting it into `content/` beyond what's already there.

## Adding a new landing page section

1. Create `features/landing/NewSection.tsx`, built from `components/ui` primitives (`Section`, `Container`, `Heading`, etc.) — follow an existing section like `WhyFrankieRuns.tsx` as a template for the Framer Motion reveal pattern.
2. If it has heading text, check `docs/COMPONENTS.md`'s `Heading` note — keep the semantic level sequential (no jumping from `h2` to `h4`). This has been a real, live bug once already (Services' card titles) — it's an easy mistake to reintroduce.
3. Add it to `src/app/(site)/page.tsx` in the right position.
4. If it needs a WhatsApp CTA, use `useOrderDialog()` — never render a second dialog or link directly to `wa.me`.

## Dependency updates

Dependabot opens PRs weekly (`.github/dependabot.yml`) — minor/patch bumps are grouped into one PR, majors get their own. Before merging any PR (especially a major bump to Next.js, React, or Base UI — all of which are pre-1.0-adjacent or move fast), run locally:

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm build
```

CI runs the same three commands automatically on the PR — but a Base UI or Framer Motion major bump is exactly the kind of change worth also re-checking manually against `docs/ARCHITECTURE.md`'s notes (the Drawer CSS variable names, the `LazyMotion` `strict` mode, the Base UI component APIs) since those integrate closely enough with hand-written code that a type-check passing doesn't guarantee the *behavior* is unchanged.

## Common pitfalls (things that have already gone wrong once)

- **Skipping a heading level** (`h2` straight to `h4`) — caught once in Services, fixed via an explicit `as="h3"` override. Check this whenever adding a new heading.
- **Using `amber`/`sage` directly on a light background** — caught in 8 places during the accessibility pass. Use `Label` or the `-deep` variants.
- **Unmounting the order form immediately on dialog close** — this was actually shipped and caught before merge: it cuts off the dialog's exit animation mid-transition. The form now stays mounted after first open and resets 300ms after close instead. If you're touching `OrderDialogProvider.tsx` or `OrderForm.tsx`, read the comments there before changing the mount/unmount logic.
- **Opening `window.open()` inside a `useEffect`** instead of synchronously in the click handler — this is what triggers popup blockers. The WhatsApp tab open must stay inside `OrderForm`'s synchronous submit handler.
- **Hardcoding "Uyo," the WhatsApp number, or the site URL** anywhere instead of reading from `businessConfig`.
