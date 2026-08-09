# Experience Bar Fill

## Visual intent

A fixed experience reward advances from `82 / 100 XP` to a threshold, flashes once,
then settles at LEVEL 5 with `17 / 100 XP`. It is an original progress-reward artifact,
not a reproduction of a Final Fantasy screen.

## DOM structure

Use a labelled `section` containing a level label, labelled gauge, value, reward label,
decorative burst, and native `AWARD XP` replay button.

## Copy

Use LEVEL 4 / LEVEL 5, `82 / 100 XP`, `17 / 100 XP`, and `+35 XP`.

## Layout and colour contract

- The gauge is at most 300px wide, 14px high, with a 2px parchment border.
- Use navy `#111827`, cyan `#72D6E8`, gold `#E5BE62`, and parchment `#E9E3D2`.
- Each fill phase lasts 390ms with `steps(6, end)`; the level-up burst lasts 120ms.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`,
render LEVEL 5 and `17 / 100 XP` immediately with no fill or burst animation.

## Accessibility

The gauge has an accessible progress label, the replay action is a native button with a
visible focus outline, and the textual level/value labels convey state independently of
colour and motion.

## Porting to another stack

Mount in an overflow-hidden host at least 360×260px. Import `demo.css` unchanged and
load `demo.js` after markup. Preserve the fixed values, durations, and finite burst.
