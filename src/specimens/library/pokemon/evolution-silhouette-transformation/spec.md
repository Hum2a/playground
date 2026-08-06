# Evolution Silhouette Transformation

## Visual intent

An abstract silhouette (Form A) charges, then decisively alternates with a related taller silhouette (Form B) on a timing curve that gives the new identity progressively more screen time until Form B locks permanently. Not a crossfade — geometry swaps. Metadata updates after the transformation settles.

## DOM structure

- `.est[data-evolution-silhouette]` — root; `data-state` idle | running | evolved; `data-form` a | b
- `.est__sil` — single silhouette; clip-path + size swap by `data-form`
- `.est__ring--1|2|3` — charge rings (contract inward)
- `.est__mark` × 8 — radial energy marks (one 45° collective rotation during instability)
- Meta clips for `FORM // 01→02` and `BASIC→ADVANCED`
- `EVOLVE` / `RESET` + polite live region + visually hidden identity string

## Copy

| Slot | Text |
| --- | --- |
| Initial id | `FORM // 01` |
| Initial tier | `BASIC` |
| Final id | `FORM // 02` |
| Final tier | `ADVANCED` |
| Trigger | `EVOLVE` |

## Layout and colour contract

### Form A — `110 × 140px`

Broad lower geometry; two short upper protrusions.

Frozen clip-path (`--est-clip-a`):

`38% 0%, 32% 14%, 24% 18%, 14% 42%, 8% 68%, 12% 92%, 28% 100%, 50% 90%, 72% 100%, 88% 92%, 92% 68%, 86% 42%, 76% 18%, 68% 14%, 62% 0%, 50% 10%`

### Form B — `145 × 175px`

Narrower centre; three larger upper structures; two lateral structures.

Frozen clip-path (`--est-clip-b`):

`50% 0%, 42% 10%, 30% 2%, 26% 16%, 14% 8%, 18% 24%, 6% 36%, 10% 48%, 2% 58%, 12% 70%, 8% 88%, 22% 100%, 50% 88%, 78% 100%, 92% 88%, 88% 70%, 98% 58%, 90% 48%, 94% 36%, 82% 24%, 86% 8%, 74% 16%, 70% 2%, 58% 10%`

### Timings

| Phase | Duration |
| --- | --- |
| Charge | `280ms` |
| Cycle 1 A / B | `180ms` / `90ms` |
| Cycle 2 A / B | `140ms` / `120ms` |
| Cycle 3 A / B | `100ms` / `150ms` |
| Cycle 4 A then B remains | `60ms` / lock |
| Resolve | `220ms` |
| Instability scale | `1 → 1.12` over `840ms` |
| Marks rotation | `0 → 45deg` once |

### Colours

| Token | Value |
| --- | --- |
| Near | `#0c0a12` |
| Body A | `#6e5c92` |
| Body final | `#9b86c9` |
| Glow | `#f7f2ff` |
| Ring / mark | `#d9c8f5` / `#c4b0e8` |

## Reduced motion

Immediately show Form B + `FORM // 02` / `ADVANCED` with no charge, alternation, rings, or mark rotation.

## Accessibility

- Visible + live text state the before/after identity (`Form 01 Basic` → `Form 02 Advanced`)
- Decorative silhouette, rings, and marks are `aria-hidden`
- Real buttons with `:focus-visible`

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Call `evolutionSilhouetteTransformation.run()` / `.reset()` or use the buttons.
3. Keep frozen polygons, cycle timings, eight marks, and no-crossfade swaps.
4. No Pokémon likenesses, sprites, logos, particles, or looping glow.
