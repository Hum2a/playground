# Control Centre Module Expansion (portable recreation spec)

Compact `AUDIO` module at `62%` expands to `320×210` with slider, output row,
and balance row. Volume changes persist after collapse.

## Contract

| Parameter | Value |
| --------- | ----- |
| Compact | `142 × 72px` |
| Expanded | `320 × 210px` |
| Expansion | `340ms` |
| Value | `62%` persists through transition |
| Slider | constructs after 70% width |
| Detail rows | OUTPUT then BALANCE at `45ms` stagger |

## Reduced motion

Immediate compact/expanded swap; slider remains functional.

## API

- `resetControlCentreModuleExpansion()`
