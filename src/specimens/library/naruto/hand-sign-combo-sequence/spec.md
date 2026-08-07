# Hand-Sign Combo Sequence

Four distinct hand-sign glyphs (**peak**, **ring**, **bars**, **plate**) snap-latch one-by-one (Run auto-play or keys 1–4 in order) until the sequence resolves to **READY**.

## Behaviour

- Idle: four pending slots sit 10px below rest at scale 0.82; status `IDLE`.
- Active: each slot snaps through scale 1.08 into lacquer-aligned rest (~130ms cadence).
- Resolved: all four acquired, status `READY`, 220ms ready-hold pulse, held until reset/replay.
- Reduced motion: jump straight to READY (no snap).

## Freeze

- Sign count: 4 · glyphs: peak / ring / bars / plate
- Step: 130ms · snap: 110ms · settle: 90ms · ready-hold: 220ms
- Pending: translateY 10px · scale 0.82 · snapScale 1.08
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
