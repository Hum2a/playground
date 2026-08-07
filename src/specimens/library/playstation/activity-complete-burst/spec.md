# Activity Complete Burst

A completed activity card fires a **finite geometric burst** of abstract
PlayStation-language shapes (circle · cross · square · triangle), then settles
with a DONE badge. Exactly **8** particles — no looping confetti.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 300px`, `overflow: hidden` |
| Particles | `8` (2× each shape) |
| Burst duration | `560ms` |
| Settle | `180ms` |
| Phases | `idle → burst → done` |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- **Complete** runs the burst once, then holds the done state.
- **Reset** returns to idle.
- Particles travel on fixed offsets and fade out; they do not loop.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by skipping the burst and showing the
done card/badge immediately.

## API

- `runActivityCompleteBurst()` — trigger burst
- `resetActivityCompleteBurst()` — return to idle
