# Adaptive Trigger Meter

A DualSense-shaped L2 trigger hold meter — fill travels down through soft / firm / lock resistance zones and stiffens near threshold.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3364` / `PS-058` |
| Hold duration | `1000ms` |
| Fill tick | `60ms` |
| Soft zone | `0–34%` |
| Firm zone | `34–67%` |
| Lock zone | `67–100%` |
| Engaged label | `ENGAGED` |

## Behaviour

1. Idle: trigger silhouette at rest; fill height `0%`.
2. Holding: fill grows over `1000ms` with visual slowdown past 66%; firm/lock zones intensify.
3. Engaged: fill at `100%`; notch glows; status `ENGAGED`.
4. Early release before threshold returns to idle.

## Reduced motion

Hold still requires the full `1000ms` threshold. Fill/zone/shell transitions are removed — states snap.
