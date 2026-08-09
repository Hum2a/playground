# Jagged Speech Tooltip (portable recreation spec)

Persona-adjacent tooltip: an irregular, torn-edged speech-bubble shape punches outward
from a trigger on hover or focus, with a small back-ease overshoot, and snaps back
quickly on dismiss. This is a **CSS-only hover/focus tooltip**, not a JS-positioned
popover library.

## Visual intent

- The bubble is not a rounded rectangle — its outline is an irregular polygon with a
  narrow tail pointing down at the trigger, cut from one `clip-path`, not a separate
  arrow element
- Pop-in has a small overshoot (scale past 1, slight rotation settle); pop-out is a
  quicker, linear snap-away — the two directions use different easing/duration on
  purpose
- Fully driven by real `:hover` / `:focus-within` — no JavaScript, no simulated demo
  loop

## DOM structure

```html
<div class="speech-tooltip" data-speech-tooltip>
  <button type="button" class="speech-tooltip__trigger" aria-describedby="speech-tooltip-bubble">?</button>
  <div class="speech-tooltip__bubble" id="speech-tooltip-bubble" role="tooltip">
    New: hold to charge a stronger hit.
  </div>
</div>
```

The trigger is a real focusable `<button>`; the bubble is `role="tooltip"` and linked via
`aria-describedby`, so it is announced through the normal tooltip pattern rather than
relying on the animation.

## Copy

| Role | Value |
| ---- | ----- |
| Trigger | `?` |
| Bubble | `New: hold to charge a stronger hit.` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Bubble background, trigger border/text |
| Paper | `#f2eee3` | Trigger background |
| Bubble text | `#f2eee3` | On the black bubble |
| Trigger size | `34px` circle, `3px` border | |
| Bubble max width | `190px` | |
| Bubble clip-path | `polygon(3% 4%, 97% 0%, 100% 74%, 60% 78%, 52% 100%, 45% 76%, 0% 82%)` | Irregular body + tail in one shape |
| Show transition | `240ms`, `cubic-bezier(0.3, 1.5, 0.35, 1.05)` (transform), `160ms ease-out` (opacity) | Overshoot to `scale(1) rotate(-2deg)` |
| Hide transition | `160ms ease-in` (transform), `140ms ease-in` (opacity) | Quicker, no overshoot |
| Rest transform | `translate(-50%, 6px) scale(0.4) rotate(-6deg)` | |

## Phases (CSS only)

No JS phases — the bubble's visibility and transform are driven entirely by
`.speech-tooltip:hover .speech-tooltip__bubble` and
`.speech-tooltip:focus-within .speech-tooltip__bubble`. The show-state selector carries
its own `transition` value (overshoot), separate from the base rule's hide-state
`transition` (quick snap) — this is what makes pop-in and pop-out feel different without
any script.

## Reduced motion

Keep the bubble fully functional; remove only the pop motion, leaving a plain
opacity cross-fade:

```css
@media (prefers-reduced-motion: reduce) {
  .speech-tooltip__bubble {
    transition: opacity 140ms ease !important;
  }
  .speech-tooltip:hover .speech-tooltip__bubble,
  .speech-tooltip:focus-within .speech-tooltip__bubble {
    transform: translate(-50%, 0) scale(1) rotate(-2deg);
    transition: opacity 140ms ease !important;
  }
}
```

## Accessibility

- Trigger is a real `<button>`; bubble uses `role="tooltip"` with `aria-describedby`
- Fully operable by keyboard via `:focus-within` — no pointer-only interaction
- Do not rely on motion alone; the bubble's appearance/disappearance itself is the
  signal, and it is also exposed to assistive technology via the ARIA relationship

## Porting to another stack

1. Copy the DOM + CSS (no JS needed) or generate from `contract.json`.
2. Keep `role="tooltip"` and `aria-describedby` wired to a real, focusable trigger.
3. Do not add JavaScript positioning — the bubble is statically anchored via
   `position: absolute` off the trigger's own `position: relative` wrapper.
4. Wire reduced-motion the same way (media query + optional force attribute) by
   collapsing both directions to a plain opacity transition.
5. Swap trigger glyph and bubble copy freely; keep the clip-path and easing pair frozen
   for the effect to read correctly.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
