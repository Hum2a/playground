# Four-Point Barrier Construct

Four corner nodes connect edge-by-edge (Run auto-play) around a protected region; once the perimeter closes, the field fills and the barrier resolves to **SECURED**.

## Behaviour

- Idle: four inactive corners, open perimeter, status `IDLE`.
- Active: first corner activates, then each edge draws in turn (~220ms each) activating the next corner on arrival.
- Sealing: once the perimeter closes, the field fills (~260ms).
- Resolved: field filled, status `SECURED`, held until reset/replay.
- Reduced motion: jump straight to SECURED with all edges drawn and the field filled.

## Freeze

- Edge count: 4
- Step: 220ms · fill: 260ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
