# Home-to-Game Handoff

SELECT expands the home tile spatially (`scale 1.35`, lift `12px`), fades the
rail, then hands off to a LAUNCHING surface. Phases: `idle` → `select` →
`expand` → `launch`.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 320px`, `overflow: hidden` |
| Stage height | `200px` |
| Expand scale / lift | `1.35` / `12px` |
| Expand travel | `480ms` |
| Rail fade | `320ms` |
| Launch opacity / transform | `400ms` / `520ms` |
| Handoff delay | `520ms` |
| Launch start scale | `0.92` |
| Easing | `cubic-bezier(0.2, 1, 0.3, 1)` |

## Interaction

- SELECT runs `runHomeToGameHandoff()`.
- RESET returns to `idle` home rail.

## Reduced motion

Both triggers kill `.htgh__rail`, `.htgh__tile`, and `.htgh__launch`
transitions. JS skips the expand delay and jumps straight to `launch`.

## API

- `runHomeToGameHandoff()`
- `resetHomeToGameHandoff()`
