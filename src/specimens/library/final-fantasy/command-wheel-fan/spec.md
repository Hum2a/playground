# Command Wheel Fan

## Visual intent

Create an original, compact battle command fan. A 72×72px cyan-lined central
selector remains visually dominant while five rectangular commands snap from its
centre into a right-facing fan. It studies broad JRPG menu timing only; it does
not recreate a specific game's HUD, icons, typography, or assets.

## DOM structure

Use one labelled `section`, a live status message, a real toggle `button`, and
five real command `button` elements inside a labelled command group. The five
commands are, in order: ATTACK, MAGIC, ITEM, GUARD, SPECIAL.

## Copy

The central selector says `COMMAND`. Command labels remain uppercase and
fictional. Selection announcements use `<COMMAND> selected`; activation uses
`<COMMAND> activated`.

## Layout and colour contract

- Central selector: 72×72px, 2px crystal-cyan border, maximum visual weight.
- Command panels: exactly five, approximately 130×42px with 2px borders and
  2px corners.
- Final panel directions are approximately -62°, -31°, 0°, 31°, and 62° from
  the central selector. Their fixed positions must not overlap.
- Palette: dark navy `#111827`, silver `#C7CDD8`, crystal cyan `#72D6E8`.
- Do not introduce gradients, external fonts, images, or game-specific marks.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or
`data-force-reduced-motion="true"`, all five commands render immediately at
their final positions. The selected state, pointer interaction, keyboard
navigation, and activation remain available; only the entrance movement is
removed.

## Accessibility

The toggle exposes its state with `aria-expanded`. Command buttons are native
controls. Arrow keys move focus and selection between commands; Enter and
Space trigger native button activation. Focus-visible has a high-contrast
outline, selected state is shown with both cyan text and border, and the live
status announces selection or activation without relying on colour.

## Porting to another stack

Mount in a relative, overflow-hidden host at least 360×320px. Import
`demo.css` unchanged, then initialise the small vanilla script after the
markup. Opening uses a 260ms `steps(4, end)` animation; each later panel waits
55ms. Each command starts at the centre with `opacity: 0` and `scale(0.82)`;
the selected command settles at `scale(1.06)`. Keep all final offsets fixed:
there is no runtime randomness.
