# Scroll-to-Panel Transform

A small round scroll token (64×64, fully rounded) morphs its width, height, and corner radius into a full rectangular content panel (100%×176, 10px radius) as a single continuous element — the token glyph crossfades out while panel copy crossfades in.

## Behaviour

- Idle: round token only, status `SEALED`.
- Morphing: shape (width/height/border-radius) animates over 480ms; token glyph fades out first (150ms), panel copy fades in from ~260ms (220ms).
- Resolved: full panel with copy, status `OPENED`.
- Reduced motion: panel appears fully expanded with copy visible immediately; no shape morph.

## Freeze

- Shape morph: 480ms · glyph fade-out: 150ms · copy fade-in: 220ms starting at 260ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
