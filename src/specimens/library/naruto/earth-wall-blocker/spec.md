# Earth Wall Blocker

Five faceted stone slabs rise staggered from below to form a protective wall.

## Behaviour

- Idle: slabs hidden below, zone `EXPOSED`, status `DOWN`.
- Run: slabs rise with clip-path facets and 55ms stagger (280ms each, 500ms total).
- Raised: zone `PROTECTED`, status `WALL UP`.
- Reduced motion: wall raised immediately.

## Freeze

- Slabs: 5 · rise: 118px · slab: 280ms · stagger: 55ms · total: 500ms · settle: 150ms
- Palette (fire): `#0C0806` / `#C4B8A8` / `#E07030` / `#5A5048` / `#F4F1E8`
