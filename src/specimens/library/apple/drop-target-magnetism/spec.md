# Drop Target Magnetism (portable recreation spec)

A draggable `FILE // 07` proxy is subtly attracted and aligned toward valid
`ARCHIVE` before drop. `LOCKED` never attracts.

## Contract

| Parameter | Value |
| --------- | ----- |
| Proxy | `92 × 52px` |
| Magnetic radius | `86px` |
| Attraction | 0% at 86px → max 28% at 0px |
| Rotation | blends from drag angle to `0deg` |
| ARCHIVE boundary | expands `4px` when attracted |
| Acquisition ticks | exactly four corners when distance `< 42px` |
| LOCKED | never attracts |
| Drop | inside ARCHIVE commits; outside returns to source |

## Reduced motion

Disable positional magnetism; static valid-target outline when in bounds.

## API

- `resetDropTargetMagnetism()`
