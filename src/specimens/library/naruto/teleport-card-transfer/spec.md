# Teleport Card Transfer

A card compresses into a circular phosphor aperture at its source slot, holds empty mid-transfer, then reconstructs out of a matching aperture at the destination.

## Behaviour

- Idle: card in source slot.
- Compress: 200ms into aperture (8→72px); card clips to circle.
- Empty: 120ms mid hold with card absent.
- Reconstruct: 220ms out of destination aperture.
- Done: card only at destination; apertures closed.
- Reduced motion: destination immediately.

## Freeze

- Compress: 200ms · empty hold: 120ms · reconstruct: 220ms · aperture: 8→72px
- Palette: `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
