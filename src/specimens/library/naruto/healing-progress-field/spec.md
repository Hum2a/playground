# Healing Progress Field

A damaged 5×5 tile grid heals in three concentric rings (Run auto-play), starting from the centre tile and expanding outward, resolving to **RESTORED**.

## Behaviour

- Idle: all 25 tiles damaged (red), status `DAMAGED`.
- Active: centre ring heals first, then the middle ring, then the outer ring (~220ms each).
- Resolved: all tiles healed, status `RESTORED`, held until reset/replay.
- Reduced motion: jump straight to RESTORED with every tile healed.

## Freeze

- Ring count: 3 (centre 1 tile, middle 8 tiles, outer 16 tiles)
- Step: 220ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
