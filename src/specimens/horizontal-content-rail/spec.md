# Horizontal Content Rail

Six abstract cards arranged as two three-card pages inside a clipped viewport. NEXT/PREV move the whole visible group by exactly one viewport width, so the rail always advances a coherent set of cards rather than a partial one.

## Freeze

| Item | Value |
| --- | --- |
| Cards | 6, in 2 pages of 3 |
| Track width | `200%` (2 × viewport) |
| Page transform | `translateX(0%)` → `translateX(-50%)` |
| Transition | `260ms cubic-bezier(.4,0,.2,1)` — identical for NEXT and PREV |
| Trigger | `NEXT` / `PREV` buttons |
| Boundaries | `PREV` disabled on page 1, `NEXT` disabled on page 2 |

## Behaviour

1. Idle: page 1 of 2 visible, PREV disabled.
2. `NEXT`: track translates to `-50%`, revealing cards 4–6 as one group; PREV enables, NEXT disables (only 2 pages).
3. `PREV`: track translates back to `0%` using the identical transition — direction never changes the easing or duration, only the target offset.

## Reduced motion

Page changes are instant — the track's transform transition is removed.

## Accessibility

Page changes announce via a polite live region (`Page X of Y`). Cards are decorative; the buttons carry the semantic state.

## Porting to another stack

A `200%`-wide flex track split into two `50%` pages, driven by a single boolean class that toggles `translateX(0%)` vs `translateX(-50%)`. No per-frame JS, no scroll listener required.
