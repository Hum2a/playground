# Details Panel Expand

A compact card with a `DETAILS` toggle. Activating it grows a panel beneath the card in place — a description and tags — without navigating away. `CLOSE` (or the toggle again) collapses it.

## Freeze

| Item | Value |
| --- | --- |
| Technique | CSS grid `grid-template-rows: 0fr → 1fr` |
| Transition | `220ms cubic-bezier(.4,0,.2,1)` |
| Visibility | `visibility: hidden` while closed, delayed to match the collapse duration |
| Trigger | `DETAILS` toggle (becomes `HIDE DETAILS`) or panel's `CLOSE` |

## Behaviour

1. Idle: card shows title + `DETAILS`; panel is collapsed to zero height and hidden from the accessibility tree.
2. Activating `DETAILS` grows the panel to its natural height, revealing description + tags; the toggle becomes `HIDE DETAILS`.
3. `CLOSE` (inside the panel) or the toggle again collapses the panel back to zero height; it is hidden again only once the collapse transition finishes.

## Reduced motion

The panel still opens and closes — the height and visibility transitions are removed so the change is instant.

## Accessibility

The toggle carries `aria-expanded` and `aria-controls`; the panel is `visibility: hidden` (not just zero height) while closed, so it is out of both the visual and tab order.

## Porting to another stack

The `0fr`/`1fr` grid-template-rows trick avoids measuring `scrollHeight` in JS; JS only toggles one class.
