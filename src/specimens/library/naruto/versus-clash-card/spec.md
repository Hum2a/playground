# Versus Clash Card

Two competitor cards close in from either side of a VS badge and clash into a locked versus state with an impact flash (Run auto-play or Replay).

## Behaviour

- Idle: cards apart, status `STANDBY`.
- Active: cards close toward the centre (~220ms).
- Resolved: impact flash on the VS badge, cards locked, status `CLASH`, held until reset/replay.
- Reduced motion: jump straight to the clashed state.

## Freeze

- Close: 220ms · flash: 220ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
