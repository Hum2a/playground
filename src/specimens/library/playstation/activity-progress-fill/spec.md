# Activity Progress Fill

A compact activity card fills a determinate progress bar in discrete steps
toward a fixed **completion boundary** at 100%. The boundary tick stays visible
at the track end so completion is spatial, not only numeric.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 280px`, `overflow: hidden` |
| Steps | `0 → 28 → 55 → 82 → 100` |
| Fill duration | `480ms` |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Completion boundary | `100%` track end tick |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- **Advance** steps to the next percent; disabled once at 100%.
- **Reset** returns to `0%` / idle.
- At 100%, card border + chip flip to completed treatment.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by disabling fill/card transitions and
jumping straight to 100% on Advance.

## API

- `advanceActivityProgress()` — next step
- `resetActivityProgress()` — return to 0%
