# Error Substitution Recovery

A primary service card faults, is rapidly substituted by a fallback (decoy flash), and settles into a **RECOVERED** state.

## Behaviour

- Idle: primary card nominal, status `NOMINAL`.
- Error: primary card flashes red and shakes (~170ms).
- Substituting: primary flickers out, fallback flickers in (~100ms).
- Recovered: fallback settles, status `RECOVERED`, held until reset/replay.
- Reduced motion: jump straight to RECOVERED.

## Freeze

- Fault: 170ms · substitute: 100ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
