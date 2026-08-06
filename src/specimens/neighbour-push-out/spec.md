# Neighbour Push-Out

A row of five abstract cards with a movable cursor. Activating SELECT expands the cursor card; its immediate neighbours translate away to make room while keeping their own size — only the selected card scales.

## Freeze

| Item | Value |
| --- | --- |
| Cards | 5, `76×116px` |
| Cursor start | card 3 of 5 (index 2) |
| Selected scale | `1.3` + `translateY(-8px)`, amber border |
| Neighbour push | `46px` translateX away from the selection, **no scale change** |
| Transition | `200ms cubic-bezier(.4,0,.2,1)` |
| Trigger | `SELECT` button (toggles to `DESELECT`) |
| Cursor move | `←` / `→` buttons, disabled while selected |

## Behaviour

1. Idle: cursor sits on card 3 of 5 (amber border, no scale change).
2. `←` / `→` move the cursor between cards while nothing is selected.
3. `SELECT` expands the cursor card (scale 1.3, lift 8px) and pushes only its immediate left/right neighbours outward 46px at their existing size — cards further away do not move.
4. `SELECT` becomes `DESELECT`; activating it again returns every card to baseline.

## Reduced motion

Same states apply — the transform transition is removed so changes are instant.

## Accessibility

The row is decorative (`aria-hidden`); a live status line reports cursor position and selection state in text, so colour is never the only signal.

## Porting to another stack

Three transform classes (`is-selected`, `is-pushed-left`, `is-pushed-right`) computed from one cursor index; no absolute positioning or layout measurement needed.
