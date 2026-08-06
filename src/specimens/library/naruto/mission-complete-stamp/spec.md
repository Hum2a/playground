# Mission Complete Stamp

A briefing card receives a large original completion seal — the stamp drops in, slams, and rings out into **COMPLETE** (Run auto-play or Replay).

## Behaviour

- Idle: briefing card visible, stamp hidden above the card, status `PENDING`.
- Active: stamp slams down onto the card (~220ms).
- Resolved: stamp settled, ring pulse plays once, status `COMPLETE`, held until reset/replay.
- Reduced motion: jump straight to COMPLETE with the stamp already settled.

## Freeze

- Slam: 220ms · ring: 260ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
