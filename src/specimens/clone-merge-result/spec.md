# Clone Merge Result

Three parallel clone result cards (A, B, C) converge toward the centre and combine into one output card.

## Behaviour

- Idle: three clone cards at fixed corners, output card faint, status `IDLE`.
- Converging: all three clones slide toward the centre (~220ms).
- Merging: converged clones shrink and fade out (~100ms).
- Resolved: output card scales up to reveal the combined value, status `MERGED`.
- Reduced motion: the merged output appears immediately.

## Freeze

- Converge: 220ms · merge: 100ms · expand: 140ms
- Values: A=7, B=4, C=9 → output=20
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
