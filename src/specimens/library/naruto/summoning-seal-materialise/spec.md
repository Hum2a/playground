# Summoning Seal Materialise

A radial seal **draw-strokes** itself (outer → inner → ticks), then a tool panel **expands from the seal centre** via clip-path + scale.

## Behaviour

- Idle: undrawn rings, hidden panel, status `IDLE`.
- Drawing: outer stroke 300ms, inner 260ms, ticks scale in.
- Materialising: panel expands from seal centre (clip circle + scale 0.2→1) over 300ms.
- Done: status `MATERIALISED`.
- Reduced motion: fully drawn + panel visible immediately.

## Freeze

- Outer: 300ms · inner: 260ms · panel: 300ms · settle: 100ms
- Radii: 70 / 46 · ticks: 8 · panel scaleFrom: 0.2
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
