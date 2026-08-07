# Substitution Swap

**Log → decoy-only → true target.** Each swap uses clip/scale + puff, not opacity crossfade.

## Behaviour

- Idle: Log layer active, status `LOG`.
- Substituting: puff; Log clips away; decoy expands and holds 200ms (decoy-only mid-state).
- Target: second puff; decoy clips away; true failover expands, status `TARGET`.
- Reduced motion: true target immediately.

## Freeze

- To decoy: 120ms · decoy hold: 200ms · to target: 140ms · puff: 120ms · settle: 90ms
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#6E6A78` / `#F0EEF4`
