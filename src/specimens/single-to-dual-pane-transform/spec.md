# Single-to-Dual Pane Transform (portable recreation spec)

Resizable preview 320→760px. Below 600px: single list/detail navigation. At
≥600px: 260px list pane, 1px divider, flexible detail. Transition 320ms.
Selected item and detail DOM identity persist.

## Contract

| Parameter | Value |
| --------- | ----- |
| Breakpoint | `600px` |
| List pane | `260px` |
| Transition | `320ms` |
| Width range | `320–760px` |

## Reduced motion

Layout switches immediately.

## API

- `resetSingleToDualPaneTransform()`
