# Element Merge Recipe

Two marked element orbs travel into a central seam, flash-merge, and leave a dual-tone result that inherits both marks.

## Behaviour

- Idle: orbs at rest with distinct marks (triangle / dot), status `IDLE`.
- Combining: each orb travels 104px toward the 30px seam (340ms).
- Merging: inputs hide, radial flash (200ms).
- Result: dual-tone token with inherited marks, status `RESULT READY`.
- Reduced motion: jump straight to the result token.

## Freeze

- Travel: 340ms · merge: 200ms · settle: 160ms · result: 220ms · travelPx: 104 · seamPx: 30
- Palette: `#0C0806` / `#C4B8A8` / `#E07030` / `#D94A38` / `#5A5048` / `#F4F1E8`
