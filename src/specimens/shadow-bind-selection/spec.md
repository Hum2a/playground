# Shadow Bind Selection

A dark tendril extends from a shadow source to a target card and locks both together as one bound selection (Run auto-play or Replay).

## Behaviour

- Idle: source and target apart, no tendril, status `FREE`.
- Active: tendril extends across the lane toward the target (~260ms).
- Resolved: target locked with a bound outline and settle pulse, status `BOUND`, held until reset/replay.
- Reduced motion: jump straight to the bound state.

## Freeze

- Extend: 260ms · lock: 220ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
