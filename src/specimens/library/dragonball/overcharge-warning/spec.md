# Overcharge Warning

**Ref:** SPX-970 · **Catalogue:** DB-005

## Intent

Distinguish progress toward safe completion from operation beyond safe capacity. SAFE CAPACITY = 100%; temporary hard limit = 125%. Canonical end = 118% **OVERCHARGED**.

## Ladder (frozen)

`72 → 84 → 93 → 100 → 106 → 112 → 118`

| Milestone | Behaviour |
| --- | --- |
| 100% | Hold 160ms · `NOMINAL MAXIMUM` |
| >100% | Overflow bay unfolds (25% of normal meter scale) |
| 106% | Two warning markers |
| 112% | Frame shifts 1px once |
| 118% | Diagonal hatch · `OVERCHARGED` |
| 125% | Hard-limit marker visible; not crossed |

## Dimensions

| Token | Value |
| --- | --- |
| Safe track | 280px |
| Overflow bay | 70px (25%) |

## API

- `runOverchargeWarning()`
- `resetOverchargeWarning()`
