# Wire Connection Draw

A thin wire stroke-draws via `pathLength` between two nodes, then snaps to LINKED.

## Behaviour

- Idle: wire undrawn (`stroke-dashoffset: 100`), status `UNLINKED`.
- Drawing: dashoffset 100→0 over 180ms (`pathLength="100"`).
- Snap: stroke-width pulse 90ms, endpoints pulse, status `LINKED`.
- Reduced motion: LINKED immediately.

## Freeze

- pathLength: 100 · draw: 180ms · snap: 90ms · settle: 80ms
- Palette (sensor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
