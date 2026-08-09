# Input Focus Attack (portable recreation spec)

Persona-adjacent form focus state: four angular corner brackets converge onto a text
input the instant it receives focus, with a thick red underline shooting in beneath it —
a decisive "target acquired" attack, not a soft glow ring.

This is a **form focus state**, not a validation or error pattern.

## Visual intent

- Four independent L-shaped brackets sit pulled outward and invisible at rest
- On focus they punch inward to hug the input's corners with a small overshoot
- A thick red underline shoots in from the left edge just after the brackets land
- The input border itself flips from black to red the instant it is focused (a state
  change, not an animated property)
- On blur, brackets and underline retreat/retract; the whole thing is reversible and can
  be triggered by real keyboard/pointer focus, not just a scripted demo

## DOM structure

```html
<div class="focus-attack" data-focus-attack>
  <label class="focus-attack__label" for="focus-attack-input">Codename</label>
  <div class="focus-attack__wrap">
    <span class="focus-attack__bracket focus-attack__bracket--tl" aria-hidden="true"></span>
    <span class="focus-attack__bracket focus-attack__bracket--tr" aria-hidden="true"></span>
    <span class="focus-attack__bracket focus-attack__bracket--bl" aria-hidden="true"></span>
    <span class="focus-attack__bracket focus-attack__bracket--br" aria-hidden="true"></span>
    <input class="focus-attack__input" id="focus-attack-input" type="text" placeholder="Enter alias" />
    <span class="focus-attack__underline" aria-hidden="true"></span>
  </div>
</div>
```

`<input>` and `<label>` are real, natively focusable elements — the effect is driven by
actual `focus`/`blur` events, not a synthetic "hover" simulation.

## Copy

| Role | Value |
| ---- | ----- |
| Label | `Codename` |
| Placeholder | `Enter alias` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Label, resting input border |
| Paper | `#f2eee3` | Input background |
| Accent | `#d71920` | Focused border, brackets, underline |
| Bracket size | `16px × 16px`, `3px` border on two sides | |
| Bracket rest offset | `±14px` from corner, `scale(0.5)`, `rotate(±6deg)`, `opacity: 0` | |
| Bracket transition | `260ms`, `cubic-bezier(0.34, 1.56, 0.64, 1)` | Back-ease overshoot on converge |
| Underline height | `4px` | `scaleX(0) → scaleX(1)`, `transform-origin: left` |
| Underline transition | `240ms ease-out`, `80ms` delay | |
| Border colour transition | `160ms ease` | Instant-feeling state flip |

## Phases (JS)

- `focus-attack--active` class toggled on the root by real `focus`/`blur` listeners on
  the input — no other JS-driven state exists
- A Replay control blurs then re-focuses the input (or focuses it directly if not
  already focused) to demonstrate the attack again

## Reduced motion

Keep the focus/blur state changes; remove only the converge/retract motion and the
underline sweep:

```css
@media (prefers-reduced-motion: reduce) {
  .focus-attack__bracket,
  .focus-attack__underline {
    transition: opacity 160ms ease !important;
  }
}
```

Brackets and underline still appear/disappear on focus, just without the directional
punch-in motion (transform changes are no longer part of the transition list, so they
apply instantly).

## Accessibility

- Brackets and underline are `aria-hidden="true"` — purely decorative reinforcement of
  the real `:focus` state, which remains visible via the border colour change alone
- Label uses a real `for`/`id` association
- Do not rely on motion alone to communicate focus; the border colour flip is sufficient
  on its own

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Bind to the real `focus`/`blur` events of the actual form control — never simulate.
3. Keep the four brackets and underline as separate elements; do not add/remove nodes on
   focus change, only toggle the `focus-attack--active` class.
4. Wire reduced-motion the same way (media query + optional force attribute) by dropping
   `transform` from the bracket/underline transition list.
5. Swap `Codename` / `Enter alias` for product copy; keep bracket geometry and easing
   frozen for the effect to read correctly.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
