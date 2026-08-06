# Transformation Morph

Profile A collapses through a bold silhouette intermediate and expands into profile B.

## Behaviour

- Idle: profile A card visible, status `PROFILE A`.
- Collapsing: profile A shrinks away, silhouette block grows in its place (~140ms).
- Silhouette: masked block holds and pulses briefly (~90ms).
- Revealing: silhouette recedes as profile B expands out (~150ms).
- Done: profile B settled, status `PROFILE B`.
- Reduced motion: profile B appears immediately, no silhouette step.

## Freeze

- Collapse: 140ms · hold: 90ms · reveal: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
