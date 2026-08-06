# Shadow Clone Fan-Out

One source card fans three temporary proxy clones out into three parallel worker slots, then dims into an **ORIGIN** marker.

## Behaviour

- Idle: source card active, three empty worker slots, status `IDLE`.
- Fanning: three clone dots travel from source to each slot, staggered 70ms apart (~180ms travel each).
- Done: each arriving clone dissolves into a filled `WORKER N ONLINE` slot; source dims to `SOURCE · ORIGIN`.
- Reduced motion: all three slots fill immediately, no clone travel.

## Freeze

- Clone count: 3 · stagger: 70ms · travel: 180ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
