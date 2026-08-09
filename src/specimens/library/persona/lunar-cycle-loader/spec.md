# Lunar Cycle Loader (portable recreation spec)

A compact looping loader whose illumination cycles through a full lunation.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Static label: `LOADING`
- Geometric moon diameter: `72px`
- Subtle 1px mute orbit around the disc
- Dark void field `#09111D`

## Phase cycle

Shade occlusion, 8s ease-in-out infinite:

| Progress | Phase | Shade `translateX` |
| -------- | ----- | ------------------ |
| 0% | NEW | `0` |
| 12.5% | CRESCENT | `-25%` |
| 25% | QUARTER | `-50%` |
| 37.5% | GIBBOUS | `-75%` |
| 50% | FULL | `-100%` then `+100%` (identical full) |
| 62.5% | WANING GIBBOUS | `75%` |
| 75% | LAST QUARTER | `50%` |
| 87.5% | WANING CRESCENT | `25%` |
| 100% | NEW | `0` |

## Reduced motion

Freeze shade at `-50%` (quarter). Keep orbit, rim, and `LOADING`. No animation.

## Accessibility

- Root `aria-label="Loading"`
- Moon geometry `aria-hidden`
- Product UI should also expose busy/loading text outside the decorative moon

## Porting

Import `demo.css` verbatim. No JavaScript required.
