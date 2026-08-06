# Paper rip unlock (portable recreation spec)

Destructive unlock/reveal: a sealed paper sheet covering content tears from the centre,
splits into left and right halves, and violently pulls apart to reveal the underlay.
Inspired by Persona 5 collage language — not Calling Card Peel (peel removes one intact
object; this **splits** one sheet into two). Rebuild from this document, `demo.css`,
`demo.js`, and `contract.json`. No copyrighted assets.

## Visual intent

- Idle overlay reads as **one continuous paper sheet** (seam invisible)
- Tear begins near centre (~52% 46%), zig-zag edge (not a straight cut)
- Underlying content exists throughout and shows through the widening gap
- Exactly two major halves exit opposite directions; ~4 tiny fragments at rupture
- Secondary `UNLOCKED` stamp snaps in after halves leave

## DOM structure

Host is `position: relative; overflow: hidden`. Underlay stays in the DOM for the whole life.

## Copy

| Role | Text |
| --- | --- |
| Overlay title | `SEALED` |
| Microtype | `RESTRICTED · RESTRICTED · RESTRICTED` |
| Stamp | `UNLOCKED` |
| Underlay | `ADVANCED MATERIAL` / `Lesson 08` / `OPEN LESSON` |

## Colour

Paper `#f2eee3` · Ink `#090909` · Red `#d71920`

## Frozen tear polygons

See `contract.json` / CSS `--seam-left` / `--seam-right`. Do not generate geometry at runtime.

## Motion (~900ms)

| Phase | Window | Behaviour |
| --- | --- | --- |
| Rupture | 0–120ms | Crack at ~52% 46% |
| Tear | 120–360ms | Gap → 18px; zig-zag reveal |
| Separate | 360–720ms | Halves fly out with tiny resistance; fragments ~220ms |
| Settle | 720–900ms | `UNLOCKED` stamp ~180ms |

Left exit: `translateX(-115%) translateY(8%) rotate(-11deg)`  
Right exit: `translateX(115%) translateY(-5%) rotate(13deg)`

## Reduced motion

Immediately hide paper; show revealed underlay + stamp.

## Accessibility

Paper decorative. Status via `[data-paper-rip-status]`. `OPEN LESSON` disabled while locked.

## Behaviour

`ripPaperUnlock` / `resetPaperRip` / `replayPaperRip`  
`[data-paper-rip-trigger]` · `[data-paper-rip-reset]` · harness `{ type: 'restart' }`
