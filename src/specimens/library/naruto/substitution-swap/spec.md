# Substitution Swap

A single slot cross-fades through three stacked layers: the primary target, a proxy log decoy, then the resolved failover target — a puff flashes at each swap point.

## Behaviour

- Idle: primary layer visible, status `PRIMARY`.
- Swapping: primary fades out with a puff (100ms), decoy fades in and holds (~180ms), a second puff marks the decoy-to-resolved swap.
- Resolved: failover target layer visible, status `ACTIVE`.
- Reduced motion: jumps straight to the resolved failover target; no decoy step or puff plays.

## Freeze

- Primary→decoy: 100ms · decoy hold: 180ms · decoy→resolved: 140ms · puff: 120ms each · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
