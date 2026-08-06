# Quick Look Expansion (portable recreation spec)

Expand selected `DESIGN.PDF` from a five-row file list into a `420×330` preview
while list context remains visible behind at `scale(.985)`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Row height | `52px` |
| Preview final | `420 × 330px` |
| Duration | `380ms` |
| Header identity | `DESIGN.PDF` persists |
| Content blocks | exactly three at `45ms` stagger |
| Close | ESC / CLOSE returns to selected row |

## Reduced motion

Show/hide preview directly while preserving selected row.

## API

- `resetQuickLookExpansion()`
