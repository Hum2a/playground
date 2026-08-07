# Fireball Commit

Ember charge grows at a source node, launches across a track, impacts a target, and confirms.

## Behaviour

- Idle: orb absent at source, status `IDLE`.
- Charge: four ember sparks + orb grows in place (380ms).
- Launch: orb travels 216px across the track (220ms).
- Impact: radial flash at the target (200ms).
- Confirmed: target ring lights up, status `CONFIRMED`.
- Reduced motion: jump straight to CONFIRMED.

## Freeze

- Charge: 380ms · launch: 220ms · impact: 200ms · settle: 150ms · travel: 216px · embers: 4
- Palette (fire): `#0C0806` / `#C4B8A8` / `#E07030` / `#D94A38` / `#5A5048` / `#F4F1E8`
