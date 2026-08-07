# Manga Panel Shatter Transition

Ref `SPX-4073` · `MANGA-004`

## Visual intent

A manga **page** shatter — not glass. The current composition is six
rectangular/irregular comic panels separated by gutters. On activation those
existing panels become the fragments and fly away to reveal a destination
surface already mounted underneath.

## DOM structure

- `.mps` root with `data-state` (`ready` | `anticipate` | `shatter` | `done`)
- `.mps__plate` — 620×400 relative overflow-hidden host
- `.mps__dest` — destination under the page
- `.mps__page` — six `.mps__panel` layers in a guttered grid
- SHATTER / REPLAY controls outside the plate

## Copy

Original panel captions only (`ROOFTOP`, `STREET`, …). No published manga art.

## Layout and colour contract

| Token | Value |
| --- | --- |
| Panels | exactly **6** |
| Normal gutter | `8px` |
| Pre-shatter emphasis | `6px` black |
| Anticipation | `70ms` |
| Stagger | `0–120ms` (fixed per panel) |
| Flight | `460ms` |
| Translations | `80–180px` class distances |
| Rotation | max `±7deg` |
| Total sequence | `≤700ms` (`70+120+460=650`) |
| Paper / ink | `#F4F1E8` / `#111111` |

Panel flights are predetermined in CSS — no runtime randomness.

## Reduced motion

Both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`
skip anticipation/flight and show destination immediately.

## Accessibility

- Page/panels decorative during transition (`aria-hidden` on page stack)
- Status via `aria-live="polite"`
- Controls use visible `:focus-visible`

## Porting to another stack

1. Host destination + six panel layers in a relative overflow-hidden plate.
2. Anticipate by thickening gutters, hold 70ms, then apply fixed transforms.
3. Keep fragment shapes identical to the visible panels.
4. Replay must rebuild the exact original page before re-running.
