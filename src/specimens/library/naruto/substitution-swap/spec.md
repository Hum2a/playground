# Substitution Swap

Primary collapses through a **decoy-only** mid-hold, then the failover target expands into place.

## Behaviour

- Primary: Target Node visible.
- Decoy: only LOG / Proxy Decoy for 180ms (`data-active=decoy`).
- Active: Failover Target settled; status `ACTIVE`.
- Reduced motion: ACTIVE immediately.

## Freeze

- toDecoy: 100ms · hold: 180ms · toResolved: 140ms · puff: 120ms
- Layers scale 0↔1 with ±10° rotate — not opacity fade
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#6E6A78` / `#F0EEF4`
