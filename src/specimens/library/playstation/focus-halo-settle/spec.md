# Focus Halo Settle

A shared halo with soft outer bloom and inset glow travels across three
tiles. Spring easing overshoots then settles on the selected target.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 280px`, `overflow: hidden` |
| Tiles | `3` |
| Gap | `0.55rem` |
| Settle travel | `420ms` |
| Easing | `cubic-bezier(0.34, 1.45, 0.48, 1)` (spring overshoot) |
| Halo | soft bloom + inset glow, `2px` soft border |
| Primary | `#2E90FF` |

## Interaction

- Click a tile → `data-index` moves the halo.
- Halo catches then settles (overshoot from spring curve).

## Reduced motion

Both triggers disable `.fhs__halo` transitions so the halo snaps with no
overshoot.

## API

- `settleFocusHalo(index)` — `0…2`
