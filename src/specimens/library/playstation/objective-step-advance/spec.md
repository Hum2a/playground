# Objective Step Advance

A three-step objective chain. Completing the focused step marks it done, sends
a pulse along the connector, and **hands focus** to the next objective —
visible as a soft focus ring that leaves the completed step and settles on the
next.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 320px`, `overflow: hidden` |
| Steps | `3` |
| Complete flash | `160ms` |
| Pulse travel | `280ms` |
| Focus settle | `200ms` |
| Labels | Scan route · Secure node · Extract data |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- **Advance step** completes the current objective and hands focus forward.
- Focus ring is on exactly one step until the chain finishes.
- Connector rail fills permanently after each handoff.
- **Reset** returns focus to step 1.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by snapping each advance (no pulse travel).

## API

- `advanceObjectiveStep()` — complete current + hand off
- `resetObjectiveStep()` — return to step 1
