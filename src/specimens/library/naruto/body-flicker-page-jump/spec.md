# Body Flicker Page Jump

The current view flickers into compressed directional streaks, then abruptly hands off to a new destination view.

## Behaviour

- Idle: viewing HOME, status `HOME`.
- Flickering: three horizontal streaks flash and sweep across the viewport (~140ms).
- Handoff: at the end of the flicker, HOME is swapped for Mission Board instantly (no crossfade).
- Settling: residual streak opacity fades out (~90ms).
- Arrived: status `MISSION BOARD`, held until reset/replay.
- Reduced motion: destination view appears immediately, no streaks.

## Freeze

- Flicker: 140ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
