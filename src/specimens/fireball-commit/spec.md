# Fireball Commit

A compact charge grows at a source node (Run auto-play), launches across a track, impacts a target, and confirms.

## Behaviour

- Idle: orb absent at source, status `IDLE`.
- Charge: orb grows in place (~380ms).
- Launch: orb travels 216px across the track to the target (~220ms).
- Impact: radial flash at the target (~200ms).
- Confirmed: target ring lights up, status `CONFIRMED`, held until reset/replay.
- Reduced motion: jump straight to CONFIRMED.

## Freeze

- Charge: 380ms · launch: 220ms · impact: 200ms · settle: 150ms · travel: 216px
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
