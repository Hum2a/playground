# Earth Wall Blocker

Five segmented slabs rise staggered from below (Run auto-play) to form a protective wall, flipping the zone label from **EXPOSED** to **PROTECTED**.

## Behaviour

- Idle: slabs down, zone `EXPOSED`, status `DOWN`.
- Rising: five slabs rise with a 55ms stagger between each (~500ms total, includes a small overshoot).
- Raised: zone `PROTECTED`, status `WALL UP`, held until reset/replay.
- Reduced motion: jump straight to raised/PROTECTED.

## Freeze

- Slab rise: 280ms · stagger: 55ms · total: 500ms · settle: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
