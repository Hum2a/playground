# Wind Slice Transition

Four staggered diagonal blades sweep across the stage (Run auto-play), exchanging content while the last blade fully covers it.

## Behaviour

- Idle: state one visible, status `STATE 01`.
- Run: four blades sweep left to right, each starting 70ms after the previous (~600ms total).
- Content swaps at ~420ms, once the last blade is centred.
- Settled: new state visible and held until reset/replay.
- Reduced motion: swap instantly, no blade sweep.

## Freeze

- Blade duration: 380ms · stagger: 70ms · swap-at: 420ms · total: 600ms · settle: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
