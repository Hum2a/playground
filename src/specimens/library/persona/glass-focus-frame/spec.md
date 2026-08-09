# Glass Focus Frame (portable recreation spec)

Persona 3–inspired **glass focus frame** for a compact group of three native
controls. One shared frame uses exactly four translucent corner brackets, making
focus legible for pointer and keyboard users.

## DOM structure

```
.gff
  .gff__kicker
  .gff__group
    .gff__frame[aria-hidden]
      .gff__bracket--top-left
      .gff__bracket--top-right
      .gff__bracket--bottom-right
      .gff__bracket--bottom-left
    button.gff__control × 3
  .gff__hint
```

## Visual intent

- Dark blue field with restrained translucent cyan glass
- Three square-cornered controls: `Archive`, `Inspect`, `Proceed`
- Exactly four 22px corner brackets form a shared perimeter
- A focused control brightens its border and its text; the complete frame becomes
  opaque and shifts outward by 3px

## Accessibility

- All three controls are native `<button>` elements.
- Pointer click and keyboard Tab both reveal the frame through `:focus-within`.
- Keyboard focus has a separate 2px visible outline.
- Hover/active state changes border, background, and text rather than using colour
  as the only signal.
- Native Space and Enter activation require no script.
- The decorative frame is `aria-hidden`.

## Reduced motion

Under `prefers-reduced-motion: reduce` or
`data-force-reduced-motion="true"`, retain the focused frame and state changes,
but remove all transitions and leave the brackets in their resting position.

## Porting

1. Copy `demo.html` and `demo.css` verbatim.
2. Keep exactly three focusable native controls and four decorative brackets.
3. Preserve `:focus-within`, `:focus-visible`, and both reduced-motion triggers.
