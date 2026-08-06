# Barrier Breach Alert

An intact perimeter (Run auto-play) fractures at one fixed point on the top edge, flashing the field and edge red with a bounded alarm pulse, resolving to **BREACH DETECTED**.

## Behaviour

- Idle: intact perimeter, blue field, status `SECURE`.
- Active: crack pops in at the fixed breach point, a halo ring expands once, the field flashes red twice (~700ms, non-looping) then settles.
- Resolved: field and breached edge stay red, status `BREACH DETECTED`, held until reset/replay.
- Reduced motion: jump straight to BREACH DETECTED with no flash animation.

## Freeze

- Alarm: 700ms (bounded, single run) · settle: 60ms
- Breach point: fixed, midpoint of the top edge
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
