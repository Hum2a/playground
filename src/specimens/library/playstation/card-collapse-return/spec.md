# Card Collapse Return

Paired with Card-to-Details Morph: expand lifts a rail tile (`scale 1.26`,
`16px` up); a second activate collapses it back to the **exact** original
`96×132` rail bounds. Siblings disable while expanded.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `480 × 260px`, `overflow: hidden` |
| Cards | `3` |
| Original bounds | `96 × 132px` |
| Expand scale / lift | `1.26` / `16px` |
| Collapse travel | `200ms` |
| Label swap | `160ms` |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |

## Interaction

- Click expands one tile; siblings disable.
- Click again collapses to original geometry; RETURN label clears.

## Reduced motion

Both triggers disable `.ccr__card` / label transitions so expand and return
snap to original bounds.
