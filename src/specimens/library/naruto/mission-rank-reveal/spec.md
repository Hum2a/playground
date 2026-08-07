# Mission Rank Reveal

Rank **B** glyph slams into the briefing with a frozen overshoot, then a wax stamp settles at **-12°**.

## Behaviour

- Idle: no card, no stamp, status `PENDING`.
- Briefing: card travels 56px down from -8° (transform-led).
- Stamping: stamp approaches ×2.4 / -18°, settles at -12°.
- Resolved: `RANK CONFIRMED`.
- Reduced motion: settled immediately.

## Freeze

- Card: 280ms · travelY: 56px · approach: -8°
- Stamp: 240ms · approach: -18° / ×2.4 · settle: -12° · hold: 100ms
- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`
