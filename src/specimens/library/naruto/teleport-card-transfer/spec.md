# Teleport Card Transfer

A card compresses into a circular aperture at its source slot and reconstructs out of a matching aperture at the destination.

## Behaviour

- Idle: card in source slot.
- Compress: 200ms into 44px aperture; source empty.
- Reconstruct: 220ms out of destination aperture.
- Done: card only at destination; apertures closed.
- Reduced motion: destination immediately.

## Freeze

- Compress: 200ms · reconstruct: 220ms · aperture: 44px · empty hold: 80ms
- Palette: `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
