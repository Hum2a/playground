# Context Background Crossfade

Three title-keyed art planes stay stacked under the content. Focus only
toggles opacity — A→B→C never unmounts a layer, so the stage never flashes
ink between contexts.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 300px`, `overflow: hidden` |
| Planes | `3` (`a` / `b` / `c`) |
| Crossfade | `600ms` opacity ease |
| Property | `opacity` only |
| Tiles | `3` (A / B / C) |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- Click tile A/B/C → `data-layer` + matching `.cbc__bg.is-active`.
- Label and live region update to the title.

## Reduced motion

Both triggers disable `.cbc__bg` transitions so the active plane snaps.

## API

- `setContextFocus(index)` — `0…2`
