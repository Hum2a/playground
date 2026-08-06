# Seal Stamp Confirmation

A stamp descends onto a document in one decisive strike (220ms fast ease-in), squashes on impact (90ms), then an ink seal mark blooms into view on the paper (200ms).

## Behaviour

- Idle: stamp raised above the document, no mark, status `PENDING`.
- Striking: stamp descends and squashes on contact.
- Resolved: stamp settles back slightly, ink mark visible on the document, status `FILED`.
- Reduced motion: stamp appears already struck (lowered) with the ink mark visible immediately.

## Freeze

- Descent: 220ms · impact squash: 90ms · ink bloom: 200ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
