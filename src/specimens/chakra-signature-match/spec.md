# Chakra Signature Match

Five signal bars rise one-by-one (Run auto-play) to meet a dashed reference profile, resolving to a confirmed **MATCH**.

## Behaviour

- Idle: five bars flat at zero, dashed reference visible, status `IDLE`.
- Active: bars rise to their target heights left-to-right (~170ms each), tracing the reference shape.
- Resolved: all five aligned, status `MATCH`, held until reset/replay.
- Reduced motion: jump straight to MATCH with all bars at target height.

## Freeze

- Band count: 5
- Step: 170ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
