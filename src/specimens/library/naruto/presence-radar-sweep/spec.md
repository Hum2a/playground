# Presence Radar Sweep

A finite radial sweep arcs once across a radar screen (Run auto-play), logging each of three fixed presence blips into a contact list as it crosses them, resolving to **SWEEP COMPLETE**.

## Behaviour

- Idle: three pending blips, empty contact log, status `IDLE`.
- Active: sweep arcs from −70° to 70°, pinging each blip in turn (~190ms each) and appending a contact-log row.
- Resolved: all three logged, sweep beam fades, status `SWEEP COMPLETE`, held until reset/replay.
- Reduced motion: jump straight to SWEEP COMPLETE with all contacts logged.

## Freeze

- Blip count: 3
- Step: 190ms · settle: 110ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
