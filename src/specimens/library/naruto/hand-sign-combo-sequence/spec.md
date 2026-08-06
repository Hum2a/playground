# Hand-Sign Combo Sequence

Four abstract hand-sign glyphs acquire one-by-one (Run auto-play or keys 1–4 in order) until the sequence resolves to **READY**.

## Behaviour

- Idle: four pending slots, status `IDLE`.
- Active: slots acquire left-to-right (~130ms each).
- Resolved: all four acquired, status `READY`, held until reset/replay.
- Reduced motion: jump straight to READY.

## Freeze

- Sign count: 4
- Step: 130ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
