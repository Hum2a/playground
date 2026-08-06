# Seal Release Sequence

Three concentric rings disengage outward in a 120ms stagger (scale up + fade), and the core glyph crossfades from a locked padlock to an open one once the last ring has cleared.

## Behaviour

- Idle: three solid concentric rings, locked glyph, status `ENGAGED`.
- Releasing: rings disengage outer→inner, 120ms apart, each animating over 300ms.
- Resolved: rings faded, glyph shows open lock, status `UNLOCKED`.
- Reduced motion: all rings appear already disengaged and the open glyph shows immediately.

## Freeze

- Ring stagger: 120ms × 3 · ring animation: 300ms each · glyph crossfade: 180ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
