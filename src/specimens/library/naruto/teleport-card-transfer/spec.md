# Teleport Card Transfer

Card compresses at a source aperture, holds empty mid-transfer, then reconstructs at the destination.

## Behaviour

- Idle: card at source, status `SOURCE`.
- Compress: source aperture 8→72px (200ms); card scale/opacity → 0.
- Empty hold: 120ms with card invisible (neither slot occupied).
- Reconstruct: destination aperture pulse (220ms); card appears; status `ARRIVED`.
- Reduced motion: ARRIVED immediately.

## Freeze

- Compress: 200ms · mid hold: 120ms · reconstruct: 220ms · aperture: 8→72px
- Palette (sensor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
