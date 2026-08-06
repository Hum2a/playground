# 360° Network Scan

A radial sweep rotates a full circle from a central hub (Run auto-play), wiring in each of five surrounding nodes as the beam crosses it, resolving to **MAPPED**.

## Behaviour

- Idle: five pending nodes, sweep beam hidden, status `IDLE`.
- Active: sweep rotates through each node's angle in turn (~150ms each), lighting the node and its link on arrival.
- Resolved: all five wired in, sweep beam fades, status `MAPPED`, held until reset/replay.
- Reduced motion: jump straight to MAPPED with the sweep beam hidden.

## Freeze

- Node count: 5
- Step: 150ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
