# jrpg-turn-order-assemble

## Visual intent

Six abstract battle actors snap from vertically scattered origins into a fixed,
readable horizontal action queue. The specimen studies broad JRPG turn-order
patterns without recreating any game's HUD or assets.

## DOM structure

Use six native actor buttons in one labelled timeline. Each has a numeric
position marker, a 42px abstract portrait square, and an explicit text label.

## Copy

Use this exact deterministic order: ALLY A, ALLY B, ENEMY A, ALLY C, ENEMY B,
ENEMY C. Announce `<ACTOR> active` after pointer activation.

## Layout and colour contract

- Exactly six 42px token portraits, separated by 10px horizontal gaps.
- Join adjacent tokens with 2px connectors so ordering remains explicit when
  motion is disabled.
- Active portrait scale is `1.15`.
- Palette: dark navy `#111827`, parchment `#E9E3D2`, cyan `#72D6E8`.

## Reduced motion

Under either reduced-motion trigger, render the complete fixed timeline
immediately; retain active selection and focus.

## Accessibility

Actor controls are native buttons with visible high-contrast focus. Active
state combines cyan text/border with scale and an ordered numeric marker, so
colour and animation are never the only signal.

## Porting to another stack

Mount at a 320px minimum width. Import the CSS unchanged and load the vanilla
script after markup. Use a 240ms `steps(4, end)` entrance with a fixed 70ms
stagger; do not introduce random positions or ordering.
