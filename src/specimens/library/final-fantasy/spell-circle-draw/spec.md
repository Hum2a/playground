# Spell Circle Draw

## Visual intent

An original geometric spell circle draws around a selected action, then resolves with one
finite confirmation beat. It uses no Final Fantasy names, logos, characters, assets, or
proprietary iconography.

## DOM structure

Use a labelled `section` with one decorative SVG circle, a visible `CAST` label, and a
native `CAST` replay button. Mark the SVG `aria-hidden="true"`.

## Copy

Use `CAST` for the central label and replay action.

## Layout and colour contract

- The decorative SVG is 220×220px with two circular rings and fixed geometric marks.
- Use navy `#111827`, violet `#A98BFF`, and crystal cyan `#72D6E8`.
- The draw uses a 620ms linear stroke reveal followed by one finite 180ms stepped beat.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`,
show all circle strokes immediately with no draw or completion animation.

## Accessibility

The artwork is decorative, while the replay action remains a native button with a visible
focus outline. Textual CAST labels communicate the action without relying on colour.

## Porting to another stack

Mount in an overflow-hidden host at least 360×280px. Import `demo.css` unchanged and
load `demo.js` after markup. Preserve the fixed SVG geometry and timing.
