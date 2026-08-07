# Seal Release Sequence

Three concentric rings disengage **outward** on a frozen stagger, then the locked core glyph snaps to open last.

## Behaviour

- Engaged: three vermillion rings at radii 46/34/22, locked glyph, status `ENGAGED`.
- Releasing: outer→inner expand to ×1.38 / ×1.32 / ×1.26 on stagger 0 / 120 / 240ms.
- Unlocked: open glyph latches after final ring; status `UNLOCKED`.
- Reduced motion: all rings expanded + open glyph immediately.

## Freeze

- Rings: 3 · radii: 46 / 34 / 22 · expand: 1.38 / 1.32 / 1.26
- Stagger: `[0, 120, 240]` ms · ring anim: 300ms · glyph: 160ms · settle: 90ms
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
