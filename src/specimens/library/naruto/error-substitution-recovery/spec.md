# Error Substitution Recovery

Primary faults, a **decoy fallback** appears with residue marks, then a **recovery latch** settles Service B ACTIVE.

## Behaviour

- Idle: primary nominal, status `NOMINAL`.
- Error: primary shakes/borders danger for 170ms.
- Substituting: primary clips away; fallback expands with 4 residue marks (120ms).
- Latching: frame inset closes over 140ms.
- Recovered: fallback ACTIVE, primary FAULTED, status `RECOVERED`.
- Reduced motion: recovered immediately.

## Freeze

- Fault: 170ms · substitute: 120ms · latch: 140ms · settle: 90ms
- Residue count: 4
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#A85868` / `#6E6A78` / `#F0EEF4`
