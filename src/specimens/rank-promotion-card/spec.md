# Rank Promotion Card

A profile card flips from its current rank badge into the next — the current side folds away and the promoted rank settles in with a glow (Run auto-play or Replay).

## Behaviour

- Idle: card shows the current rank badge (`GENIN`), status `CURRENT`.
- Active: badge flips (~260ms) revealing the next rank (`CHUNIN`).
- Resolved: promoted badge glows once, status `PROMOTED`, held until reset/replay.
- Reduced motion: jump straight to the promoted rank.

## Freeze

- Fold: 260ms · glow: 320ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
