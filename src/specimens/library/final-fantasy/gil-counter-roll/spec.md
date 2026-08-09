# Gil Counter Roll

## Visual intent

A deterministic reward odometer rolls through fixed intermediate values and settles on
`8500` credits. It borrows broad Final Fantasy/JRPG reward grammar without recreating
any specific game's assets, typeface, or interface.

## DOM structure

Use a labelled `section` containing a reward label, clipped odometer window, unit label,
and native `ROLL REWARD` replay button.

## Copy

Use `REWARD`, `CREDITS`, and a final value of `8500`.

## Layout and colour contract

- The clipped numeric window is `3.3rem` tall with tabular numerals.
- Use midnight `#111827`, parchment `#E9E3D2`, and gold `#E5BE62`.
- The odometer uses exactly 18 fixed intermediate values, a 720ms stepped roll, and a
  finite 140ms settle scale.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`,
show `8500` immediately without the roll or settle animation.

## Accessibility

The reward window has an explicit final-value label and the replay control is a native
button with a visible focus outline. Colour is paired with the textual reward labels.

## Porting to another stack

Mount in an overflow-hidden host at least 360×260px. Import `demo.css` unchanged and
load `demo.js` after the markup. Preserve the frozen values and avoid runtime randomness.
