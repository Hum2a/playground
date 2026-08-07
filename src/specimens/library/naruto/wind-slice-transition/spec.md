# Wind Slice Transition

Four staggered diagonal blades sweep across the stage, exchanging content mid-sweep.

## Behaviour

- Idle: STATE 01 visible.
- Slice: 4 clipped blades at −22/−16/−10/−4°, staggered 70ms, each 380ms.
- Swap: at 420ms under blades, content flips.
- Settled after total 600ms + settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 600ms · swapAt: 420ms · blade: 380ms · stagger: 70ms · blades: 4 · deg: −22/−16/−10/−4
- Palette: `#0C1014` / `#D0D6DC` / `#8AA0B4` / `#5A6870` / `#EEF2F4`
