# Technique Mastery Tree

Four skill nodes unlock one-by-one along a branching path (Run auto-play or keys 1–4 in order) until the tree resolves to **MASTERED**, filling the connecting path as it goes.

## Behaviour

- Locked: four dim nodes, no path filled, status `LOCKED`.
- Unlocking: nodes unlock left-to-right (~150ms each); each completed path segment fills.
- Mastered: all four unlocked, full path filled, status `MASTERED`, held until reset/replay.
- Reduced motion: jump straight to MASTERED.

## Freeze

- Node count: 4
- Step: 150ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
