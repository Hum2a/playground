# Manga Diagonal Panel Wipe

Ref `SPX-4072` · `MANGA-003`

## Visual intent

A reusable page transition where a manga-style **diagonal panel gutter**
physically separates outgoing and incoming content. Destination is revealed
behind a diagonal boundary travelling from right to left. The defining object
is the gutter — not an ink wipe.

## DOM structure

- `.mdp` root with `data-state` (`ready` | `playing` | `done`)
- `.mdp__plate` — 620×360 relative overflow-hidden host
- `.mdp__surface--in` / `--out` — identical absolute bounds
- `.mdp__wipe` / `.mdp__gutter` — oversized gutter layer above both
- RUN / REPLAY controls outside the plate

## Copy

Fictional panel labels only (`PAGE 11` / `PAGE 12`, `DEPARTURE` / `ARRIVAL`).
No published manga lettering or characters.

## Layout and colour contract

| Token | Value |
| --- | --- |
| Wipe angle | `-12deg` |
| Gutter width | `18px` paper `#F4F1E8` |
| Trailing rule | `5px` ink `#111111` |
| Travel | ~140% of plate width (`70%` → `-70%`) |
| Duration | `620ms` |
| Easing | `cubic-bezier(.65, 0, .2, 1)` |
| Speed strokes | visible ~`160–460ms` while crossing centre |

## Reduced motion

`prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]` both
skip gutter travel and speed strokes; destination shows immediately.

## Accessibility

- Decorative wipe layer is `aria-hidden`
- Status announced via `aria-live="polite"`
- Controls expose visible `:focus-visible` rings

## Porting to another stack

1. Mount outgoing and incoming surfaces in a relative overflow-hidden host.
2. Place the wipe layer above both.
3. Trigger `data-state="playing"` (or equivalent class).
4. Swap demo surfaces for host content; keep geometry and timing unchanged.
5. On replay, restore the start clip / transform state before re-triggering.
