# Smoke Mask Transition

Six overlapping abstract circles billow in to fully cover the stage (Run auto-play), a content swap happens invisibly under full cover, then the circles disperse to reveal the new state.

## Behaviour

- Idle: state one visible, status `STATE 01`.
- Run: circles scale/fade in over ~300ms to full cover, content swaps, circles continue expanding and fading out over ~400ms more.
- Settled: new state visible and held until reset/replay.
- Reduced motion: swap instantly, no circle choreography.

## Freeze

- Cover-at: 300ms · total: 700ms · settle: 140ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
