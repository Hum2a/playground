# Teleport Card Transfer

A card compresses into a circular aperture at its source slot and reconstructs out of a matching aperture at the destination slot (Run auto-play or Replay).

## Behaviour

- Idle: card at the source slot, destination empty, status `SOURCE`.
- Active: card compresses at the source aperture (~200ms), teleports instantly while invisible, then reconstructs at the destination aperture (~220ms).
- Resolved: card settled at destination with an aperture flash, status `ARRIVED`, held until reset/replay.
- Reduced motion: jump straight to the arrived state.

## Freeze

- Compress: 200ms · reconstruct: 220ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
