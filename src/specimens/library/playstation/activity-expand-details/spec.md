# Activity Expand Details

A compact objective card expands into a **structured detail layout**: a task
checklist with done/pending rows, reward chips, and action chips. Expansion is
content reveal — not a height bump alone.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `440 × 360px`, `overflow: hidden` |
| Tasks | `5` (2 done / 3 pending) |
| Rewards | `120 XP` · `Badge fragment` |
| Actions | Resume · Track · Dismiss |
| Expand | `280ms` |
| Detail reveal | `220ms` |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- Header toggle expands/collapses (`aria-expanded` / `aria-controls`).
- Expanded state shows Tasks, Rewards, and Actions sections.
- Compact state keeps title + `2 / 5` count only.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by snapping expand/collapse with no
transition.

## API

- `toggleActivityDetails()` — expand or collapse
