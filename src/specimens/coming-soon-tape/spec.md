# Coming-soon caution tape (portable recreation spec)

Persona-adjacent diagonal hazard tape used to mark locked lesson cards on the teacher
Classes launch pad. Agents in other projects can rebuild the effect from this document
and the machine-readable contract in `contract.json`.

## Visual intent

- Diagonal black-and-yellow caution tape across a card (keep-out / under-construction feel)
- Scrolling marquee copy mixing English and Japanese (`COMING SOON` / `近日公開`)
- Decorative only - never the sole signal for keyboard users
- Honours reduced motion (marquee stops; tape still visible when locked)

## DOM structure

Parent card must be `position: relative` (or otherwise establish a containing block) and
`overflow: hidden` so the wide strip clips cleanly.

```html
<div class="coming-soon-tape" aria-hidden="true">
  <div class="coming-soon-tape__edge coming-soon-tape__edge--top"></div>
  <div class="coming-soon-tape__band">
    <div class="coming-soon-tape__track">
      <span class="coming-soon-tape__text"><!-- copy.repeat(4) --></span>
      <span class="coming-soon-tape__text" aria-hidden="true"><!-- same, for seamless loop --></span>
    </div>
  </div>
  <div class="coming-soon-tape__edge coming-soon-tape__edge--bottom"></div>
</div>
```

When the card is locked, also expose a screen-reader-only label (e.g. `<span class="sr-only">Coming soon</span>`)
outside the decorative root - the tape itself is `aria-hidden`.

## Copy

```
COMING SOON · 近日公開 · COMING SOON ·
```

Repeat the unit four times per span. Two identical spans sit in the track so a `-50%`
translate loops without a gap.

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Angle | `-28deg` | Applied on the root with `translateY(-50%)` |
| Horizontal overhang | `left: -35%`, `width: 170%` | Covers card corners after rotation |
| Vertical anchor | `top: 42%` | Slightly below centre |
| Band fill | `#f5c518` | Caution yellow |
| Ink / borders | `#111827` | Near-black |
| Edge height | `5px` | Hazard stripes via `repeating-linear-gradient(-45deg, #111827 0 6px, #f5c518 6px 12px)` |
| Band borders | `2px solid #111827` on block axis |
| Shadow | `drop-shadow(0 2px 4px rgb(0 0 0 / 0.35))` | On the root |
| Text | Uppercase, weight 900, `letter-spacing: 0.22em`, ~`0.62rem` | Outfit or similar geometric sans |
| Marquee | `9s linear infinite` → `translateX(0)` to `translateX(-50%)` | On `__track` |
| Interaction | `pointer-events: none` | Clicks pass through to the card |

## Reduced motion

Stop the marquee (keep the static tape) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

```css
@media (prefers-reduced-motion: reduce) {
  .coming-soon-tape__track {
    animation: none;
  }
}

[data-force-reduced-motion="true"] .coming-soon-tape__track {
  animation: none;
}
```

## Accessibility

- Tape root: `aria-hidden="true"` (decorative)
- Duplicate marquee span: also `aria-hidden="true"`
- Locked card: real name / `sr-only` “Coming soon”, `disabled` / `aria-disabled` as appropriate
- Do not rely on colour or motion alone to communicate lock state

## Porting to another stack

1. Copy the DOM + CSS (or generate from `contract.json`).
2. Put the tape inside an overflow-clipped relative container.
3. Gate render with your own boolean or availability API.
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Keep EN/JP copy unless product asks otherwise - the bilingual marquee is part of the
   Persona-adjacent character.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
