# Three-Person Cell Formation

Three scattered profile nodes snap into a triangular cell around a shared centre point, then the connecting lines light up to link them (Run auto-play or Replay).

## Behaviour

- Idle: nodes scattered outward from the centre, status `SCATTERED`.
- Active: nodes snap into triangular positions (~260ms).
- Resolved: connecting lines light and each node pulses once, status `FORMED`, held until reset/replay.
- Reduced motion: jump straight to the formed, linked state.

## Freeze

- Snap: 260ms · link: 200ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
