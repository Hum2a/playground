# Back Navigation Restore

Opening a tile stores its index. BACK returns to the list with the **exact
same index** focused (`data-focus-index`) and DOM focus restored on that tile.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 300px`, `overflow: hidden` |
| Tiles | `4` (2×2) |
| Focus ring travel | `200ms` |
| Views | `list` / `detail` |
| Restore | exact prior index + `.focus()` |

## Interaction

1. Click tile N → detail for that item; index N stored.
2. BACK → list view; tile N has `is-focused` and receives focus.

## Reduced motion

Both triggers disable `.bnr__tile` transitions; restore remains instant.

## Notes

No mega-kit shape/orbit selectors — list, detail, back, status only.
