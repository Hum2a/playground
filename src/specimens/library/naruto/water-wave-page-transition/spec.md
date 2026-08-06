# Water Wave Page Transition

A jagged blue wave mask sweeps horizontally across the stage (Run auto-play), exchanging page content while fully covered.

## Behaviour

- Idle: page one visible, status `PAGE 01`.
- Run: wave sweeps left to right over 650ms; content swaps at ~320ms while covered.
- Settled: new page visible and held until reset/replay.
- Reduced motion: swap instantly, no wave sweep.

## Freeze

- Swap-at: 320ms · total: 650ms · settle: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
