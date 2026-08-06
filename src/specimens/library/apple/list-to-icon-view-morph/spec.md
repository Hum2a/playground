# List-to-Icon View Morph (portable recreation spec)

Six files morph between list rows and a `3×2` icon grid while preserving item identity.

## Contract

| Parameter | Value |
| --------- | ----- |
| List row | `44px` height |
| Grid cell | `116 × 104px` |
| Morph | `420ms` |
| Files | ALPHA.MD … ZETA.CSV |
| Glyph growth | `24 → 42px` |
| Metadata collapse | first `35%` |

## Reduced motion

Immediate re-layout.

## API

- `resetListToIconViewMorph()`
