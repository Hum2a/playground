# Critical Weakness Hit

## Visual intent

Short high-impact success feedback for an action that exploits a known weakness. The MEMORY target anticipates with a brief compress, four blue angular lines attack from the corners, the plate splits into three deterministic offset layers on impact, then recombines as WEAKNESS exits upward, RESOLVED enters from below, and a single horizontal blue cut exits across the card.

## DOM structure

- `.cwh[data-critical-weakness]` — root; `data-state` idle | running | resolved
- `.cwh__target` — MEMORY card
- `.cwh__status--weak` / `--resolved` — status swap pair
- `.cwh__layer--a|b|c` — three impact layers (`-4px` / `0` / `4px`)
- `.cwh__line--tl|tr|bl|br` — exactly four corner attack lines
- `.cwh__cut` — one horizontal resolution cut
- `OPTIMISE` / `RESET` controls + polite live region

## Copy

| Slot | Text |
| --- | --- |
| Target | `MEMORY` |
| Idle status | `WEAKNESS` |
| Final status | `RESOLVED` |
| Action | `OPTIMISE` |
| Reset | `RESET` |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Compress | `1 → 0.96` over `70ms` |
| Attack lines | `4`, ~`70ms` inward |
| Split layers | `-4px`, `0`, `4px` for `80ms` |
| Resolve + cut | `140ms` |
| Total | `~360ms` |
| Near / deep / blue / bright / pale | `#020912` / `#09233d` / `#1677ad` / `#4bc4ee` / `#d7f7ff` |

No random glitch. No repeated shake. State changes after impact. Final frame is static.

## Reduced motion

Under `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, jump immediately to RESOLVED with no compress/attack/split/cut.

## Accessibility

- Live status announces idle, running, and resolved states by name
- Decorative lines, layers, and cut are `aria-hidden`
- Controls are real buttons with visible `:focus-visible` rings
- Colour is not the only signal — status text swaps

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim into a sandboxed preview host.
2. Call `criticalWeaknessHit.run()` / `.reset()`, or rely on auto-bound buttons.
3. Keep frozen timings and the three deterministic layer offsets.
4. Do not add shake loops, random offsets, or external assets.
