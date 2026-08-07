# Multi-Key Seal

Three prerequisite key nodes **snap-arm** in order, then triangular seal petals translate open to frozen offsets.

## Behaviour

- Sealed: three unarmed nodes at scale 0.72; petals closed; status `SEALED`.
- Arming: nodes snap through scale 1.18 every 150ms (keys 1–3 in order).
- Open: petals translate to (0,−13) / (11,7) / (−11,7) over 300ms; core pulse; status `OPEN`.
- Reduced motion: jump to OPEN with all keys armed.

## Freeze

- Keys: 3 · step: 150ms · arm snap: 120ms · petal: 300ms · pulse: 150ms
- Petal offsets px: `(0,-13)`, `(11,7)`, `(-11,7)`
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
