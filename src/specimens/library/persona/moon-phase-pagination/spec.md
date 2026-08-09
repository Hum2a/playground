# Moon Phase Pagination (portable recreation spec)

Eight real moon markers paginate a sequence. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Preview: `620 × 300px`
- Eight geometric moons (lit disc + offset shade circle)
- Active marker `32px` with a `2px` cyan orbit ring
- Inactive markers `24px`, no orbit
- Label below: `PHASE 01` … `PHASE 08`, plus the named phase

## Page map

| Page | Phase | Shade `translateX` |
| ---- | ----- | ------------------ |
| 01 | NEW | `0` |
| 02 | CRESCENT | `-25%` |
| 03 | QUARTER | `-50%` |
| 04 | GIBBOUS | `-75%` |
| 05 | FULL | `-100%` |
| 06 | WANING GIBBOUS | `75%` |
| 07 | LAST QUARTER | `50%` |
| 08 | WANING CRESCENT | `25%` |

## Motion

Transition `280ms`. On change: old moon shrinks, new moon grows, orbit appears
on the arriving marker, label updates. Only the departing and arriving markers
tween — do not animate all eight at once.

## Keyboard

Markers are real `<button>`s. `role="navigation"`. Active marker has
`aria-current="page"`.

- ArrowLeft / ArrowRight — previous / next (no wrap)
- Home / End — first / last
- Click a marker to jump

## Reduced motion

Active marker and labels change immediately. No scale or orbit animation.

## Accessibility

- Each button names the page and phase (`Phase 01, New`)
- `:focus-visible` ring is `2px #72D6E8`
- Moon geometry inside each marker is `aria-hidden`

## Porting

Import `demo.css` verbatim. Call `goToMoonPhasePage`. No external assets,
libraries, or parent access.
