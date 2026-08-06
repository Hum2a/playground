# Tab Indicator Stretch (portable recreation spec)

Four equal-width tabs in 336px strip with single 34×3px stretching indicator.

## Contract

| Parameter | Value |
| --------- | ----- |
| Strip | `336px` wide, four tabs |
| Indicator | `34 × 3px` |
| Transition | `300ms` with stretch first 45% |
| Max stretch | `34 + 70 = 104px` |

## Reduced motion

Indicator jumps to new centre at fixed width.

## API

- `resetTabIndicatorStretch()`
