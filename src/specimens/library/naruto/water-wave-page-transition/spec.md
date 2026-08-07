# Water Wave Page Transition

A jagged blue wave mask sweeps horizontally across the stage, exchanging page content mid-sweep.

## Behaviour

- Idle: PAGE 01 visible.
- Sweep: wave + foam travel -108% → 108% (650ms).
- Swap: at 320ms under the wave, page identity flips.
- Settled: PAGE 02 (or back) visible after settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 650ms · swapAt: 320ms · settle: 150ms · travel: -108%→108%
- Palette: `#071018` / `#C8D8E4` / `#3A9EC9` / `#4A6A78` / `#E8F2F8`
