# Element Merge Recipe

Two element orbs travel into a central seam flash and produce a dual-tone result.

## Behaviour

- Idle: orbs at opposite sides, no result.
- Travel: both orbs move 104px toward centre (340ms).
- Merge: vertical seam flash (3×44px) + radial flash (200ms).
- Done: dual-tone result token; status `MERGED`.
- Reduced motion: result immediately.

## Freeze

- Travel: 340ms / 104px · merge: 200ms · settle: 160ms · seam: 3×44px
- Palette (fire): `#0C0806` / `#C4B8A8` / `#E07030` / `#D94A38` / `#5A5048` / `#F4F1E8`
