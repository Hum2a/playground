# Shape Morph Button-to-Card (portable recreation spec)

132×48px pill labelled Details morphs into a 320×220 information card in one
DOM container. Corner radius 24→30px over 360ms. Supporting content appears
after 140ms.

## Contract

| Parameter | Value |
| --------- | ----- |
| Compact | `132 × 48px`, radius `24px` |
| Expanded | `320 × 220px`, radius `30px` |
| Duration | `360ms` |
| Content delay | `140ms` |
| Palette | `#DDE7FF`, `#17213A`, `#405F91` |

## Reduced motion

Immediate shape change and content swap.

## API

- `resetShapeMorphButtonToCard()`
