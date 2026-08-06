# Parallel Worker Clones

One job card divides into three deterministic worker clones, each running an independent progress bar, then recombines into one completed job.

## Behaviour

- Idle: single job card, no workers visible, status `IDLE`.
- Splitting: three worker clones fade in below the job (~120ms).
- Working: each worker's bar fills at its own fixed rate (300ms / 240ms / 360ms).
- Recombining: workers dim as output merges back (~100ms).
- Done: job card marked `JOB · COMPLETE`, status `RECOMBINED`.
- Reduced motion: all bars fill and recombine immediately.

## Freeze

- Split: 120ms · worker rates: 300 / 240 / 360ms · recombine: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
