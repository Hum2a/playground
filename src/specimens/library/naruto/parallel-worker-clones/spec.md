# Parallel Worker Clones

One job **puffs out** three marked clone workers with independent progress bars, then **reabsorbs** them — the job inherits the workers' identity marks.

## Behaviour

- Idle: single job card, workers scaled to origin, status `IDLE`.
- Splitting: workers scale/translate out from the job (140ms, 40ms stagger) with marks peak / ring / bars.
- Working: bars fill at 300 / 240 / 360ms.
- Recombining: workers scale back toward the job; trait marks latch onto the job.
- Done: `JOB · COMPLETE` with three inherited marks, status `RECOMBINED`.
- Reduced motion: completed job with traits immediately.

## Freeze

- Split: 140ms · stagger: 40ms · rates: 300 / 240 / 360ms · recombine: 160ms
- Marks: peak, ring, bars · spawnY: −36px
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#6E6A78` / `#F0EEF4`
