# Playback Controls Fade-In

An abstract player surface. Pointer movement, keyboard focus/activity, or the `SHOW CONTROLS` button reveal a control bar over the content. After `900ms` with no further activity, the controls dissolve back out.

## Freeze

| Item | Value |
| --- | --- |
| Idle delay | `900ms` after the last reveal event |
| Transition | `200ms ease` opacity + `6px` translateY |
| Reveal triggers | `mousemove`, `mouseenter`, `focusin`, `keydown` on the player, or the `SHOW CONTROLS` button |
| Hide | automatic only — no manual hide control |

## Behaviour

1. Idle: controls hidden (`opacity 0`, `translateY(6px)`, non-interactive).
2. Any reveal trigger shows the control bar and (re)starts a 900ms idle timer.
3. If no further reveal trigger fires within 900ms, the controls fade back out.

## Reduced motion

Controls still show/hide on the same triggers and timer — only the opacity/transform transition is removed.

## Accessibility

The player surface is a focusable `role="group"` region with a label describing how to reveal controls; a polite live region announces visible/hidden state. The `SHOW CONTROLS` button gives keyboard/no-mouse users a reliable non-hover path.

## Porting to another stack

One idle-timer function bound to four DOM events, reset on every call; CSS handles the actual fade via a single `is-visible` class.
