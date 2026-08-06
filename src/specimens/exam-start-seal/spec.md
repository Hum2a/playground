# Exam Start Seal

A test panel stays locked and desaturated behind a central seal until it cracks open — the panel brightens and its timer begins counting (Run auto-play or Replay).

## Behaviour

- Idle: panel dim/locked, seal intact, status `LOCKED`, timer `00:00`.
- Active: seal cracks (~160ms) then flies open (~260ms), panel brightens.
- Resolved: panel active, timer counting up, status `ACTIVE`, held until reset/replay.
- Reduced motion: jump straight to ACTIVE with the timer already running.

## Freeze

- Crack: 160ms · open: 260ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
