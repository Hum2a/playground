# Widget Resize Morph (portable recreation spec)

Launcher grid with one Activity widget morphing between 2×1 (`152×72`),
2×2 (`152×152`), and 4×2 (`320×152`) over 300ms. Content reflows by
breakpoint: title/value, mini chart, three metrics.

## Contract

| Parameter | Value |
| --------- | ----- |
| Grid | 4 columns, 68px cells, 16px gap |
| Sizes | 2×1, 2×2, 4×2 |
| Morph duration | `300ms` |
| Anchor | top-left grid cell |

## Reduced motion

Size changes instantly; content appears/disappears without movement.

## API

- `resetWidgetResizeMorph()`
