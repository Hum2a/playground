# Library Grid Focus

Dense `4×3` library silhouette. D-pad controls move focus; the focused tile
scales with a blue ring. Index marks and abstract cover slabs read as a
library, not a sparse card row.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 340px`, `overflow: hidden` |
| Grid | `4` cols × `3` rows |
| Gap | `8px` |
| Tile aspect | `3 / 4` |
| Focus scale | `1.06` |
| Focus travel | `180ms` |

## Interaction

- Arrow buttons move focus within the grid bounds.
- Status announces row and column.

## Reduced motion

Both triggers disable `.lgf__tile` transitions so focus snaps.

## Notes

No mega-kit shape/orbit/scan selectors — only grid, tile, controls, status.
