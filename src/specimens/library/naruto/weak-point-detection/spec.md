# Weak-Point Detection

A scan line sweeps a wireframe diagram top-to-bottom (Run auto-play), bracketing each of four weak points as it crosses them, resolving to **DETECTED**.

## Behaviour

- Idle: four pending markers, scan line hidden, status `IDLE`.
- Active: scan line steps to each marker in turn (~160ms each), bracketing it on arrival.
- Resolved: all four bracketed, status `DETECTED`, held until reset/replay.
- Reduced motion: jump straight to DETECTED with the scan line parked at the last marker.

## Freeze

- Marker count: 4
- Step: 160ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
