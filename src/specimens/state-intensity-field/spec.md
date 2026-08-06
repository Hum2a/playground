# State Intensity Field

`ENGINE // 04` exposes `LOAD` as a data-bearing structural field.

| Level | Load | Contours | Fragments | Radius |
| --- | --- | --- | --- | --- |
| 1 | 20% | 1 | 0 | 8px |
| 2 | 45% | 2 | 2 | 14px |
| 3 | 70% | 3 | 4 | 22px |
| 4 | 95% | 3 + broken boundary | 8 | 34px |

Every coordinate is fixed. Transitions are `300ms`, `300ms`, `360ms`, with a
`220ms` hold at each reached level. LOAD updates only after the field structurally
arrives. At 95% (past the 90% threshold), exactly four cardinal warning ticks
construct once; there is no flash or strobe.

Reduced motion immediately presents `95% CRITICAL`.

## API
`window.stateIntensityField.increase()` · `.reset()`
