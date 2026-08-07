# Home Game Focus Shift

Three home tiles share a stage. Focusing a tile lifts it and crossfades a
**title-keyed art plane** behind the rail — each title owns a distinct ambient
composition (bands / ellipse / grid), not a hue-only swap.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 300px`, `overflow: hidden` |
| Tiles / planes | `3` / `3` |
| Ambient travel | `520ms` opacity |
| Tile travel | `280ms` transform + border |
| Focus lift | `6px` up |
| Focus scale | `1.04` |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- Click a tile to set `data-focus` and activate the matching `.hgfs__plane`.
- Exactly one tile `is-focused` / `aria-pressed="true"`.

## Reduced motion

Honour both triggers by disabling transitions on `.hgfs__ambient`,
`.hgfs__plane`, and `.hgfs__tile` so ambient and lift snap.

## API

- `focusGameTile(index)` — focus tile `0…2`
