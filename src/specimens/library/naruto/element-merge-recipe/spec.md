# Element Merge Recipe

Two element orbs travel from opposite sides into a central slot (Run auto-play), merge in a radial flash, and leave behind a dual-tone result token.

## Behaviour

- Idle: two orbs at rest at either side, status `IDLE`.
- Combining: orbs travel 104px each toward the centre (~340ms).
- Merging: orbs fade, radial flash plays (~200ms).
- Result: dual-tone token appears in the slot, status `RESULT READY`, held until reset/replay.
- Reduced motion: jump straight to the result token.

## Freeze

- Travel: 340ms · merge: 200ms · settle: 160ms · travel distance: 104px each
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
