# Radial Command Snap (portable recreation spec)

Persona-adjacent selection control: five commands sit at fixed points on a ring; picking
one snaps the whole ring so that command lands under a fixed top pointer, while every
option counter-rotates in place so its label always stays upright. The centre hub punches
in the newly active label. This is a **radial menu**, not a dropdown or tab bar.

## Visual intent

- Five square-ish command buttons arranged evenly around a circular field (72° apart)
- Selecting a command rotates the whole arrangement so the chosen option reaches the
  fixed pointer at 12 o'clock — a decisive snap with a small overshoot, not a smooth ease
- Each option's own text never rotates with the ring — it stays upright throughout
- The centre hub shows the active command name and punches (scale + slight rotate) on
  every change
- The active option inverts to a solid black pill; others remain outlined

## DOM structure

```html
<div class="radial-command" data-radial-command>
  <div class="radial-command__field" role="radiogroup" aria-label="Command">
    <button class="radial-command__option" data-radial-option="0" data-angle="0"
      role="radio" aria-checked="true"
      style="transform: rotate(0deg) translateY(-92px) rotate(0deg);">ATTACK</button>
    <!-- …4 more options at 72°, 144°, 216°, 288° … -->
    <div class="radial-command__hub" aria-hidden="true">
      <span class="radial-command__hub-label" data-radial-hub>ATTACK</span>
    </div>
    <span class="radial-command__pointer" aria-hidden="true"></span>
  </div>
</div>
```

Options are real `role="radio"` buttons inside a `role="radiogroup"` — this is a
functioning keyboard-operable control, not a decorative animation.

## Copy

| Role | Value |
| ---- | ----- |
| Options | `ATTACK`, `GUARD`, `ITEM`, `SKILL`, `RUN` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Borders, hub background, outlined option text |
| Paper | `#f2eee3` | Field background, hub label on active fill |
| Accent | `#d71920` | Active option border, pointer, focus ring |
| Field size | `224px` diameter | |
| Option size | `64px × 30px` | Square-cornered pill |
| Orbit radius | `92px` | `translateY(-92px)` from field centre |
| Slot angles | `0deg, 72deg, 144deg, 216deg, 288deg` | Evenly spaced, index 0 starts at top |
| Snap transition | `420ms`, `cubic-bezier(0.2, 0.9, 0.15, 1.15)` | Whip + small overshoot |
| Hub punch | `200ms`, `cubic-bezier(0.2, 0.85, 0.25, 1.2)` | Scale `0.4 → 1.15 → 1`, rotate `-8deg → 2deg → 0` |

### Positioning formula

Each option's live transform is `rotate(θ) translateY(-92px) rotate(-θ)` where
`θ = slotAngle − activeSlotAngle`. Rotating the outer angle and counter-rotating by the
same amount keeps every label upright while the whole set orbits together — a standard
"orbit" CSS technique that transitions smoothly because the transform function list
(`rotate`, `translateY`, `rotate`) is structurally identical between states.

## Phases (JS)

- `selectCommand(index)` — recomputes every option's `θ` for the new active index,
  flips `aria-checked`, and punches the hub label text
- `replayCycle()` — runs `selectCommand` across all five indices once, ~620ms apart, for
  demonstration; stops as soon as the visitor clicks an option or presses arrow keys

Real interaction: click any option, or focus the group and press **ArrowLeft /
ArrowRight**, to select directly — this does not require a scripted demo sequence.

## Reduced motion

Keep the radiogroup fully operable; remove only the orbit motion and hub punch:

```css
@media (prefers-reduced-motion: reduce) {
  .radial-command__option {
    transition: background 160ms ease, color 160ms ease;
  }
  .radial-command__hub-label--punch {
    animation: none !important;
  }
}
```

Selection still updates instantly (position snaps with no animation, colour states still
transition softly since colour is not considered motion).

## Accessibility

- `role="radiogroup"` / `role="radio"` / `aria-checked` reflect the real selection state
- Fully keyboard operable (Arrow keys, native `Enter`/`Space` via `<button>`)
- Hub and pointer are `aria-hidden` — decorative mirrors of the already-accessible
  option state, not the source of truth

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Keep options as real `role="radio"` buttons — do not replace with `<div>`s.
3. Recompute the five `transform` strings whenever selection changes; do not add/remove
   option nodes.
4. Wire reduced-motion the same way (media query + optional force attribute) by dropping
   `transform` from the transition list.
5. Swap `ATTACK` / `GUARD` / `ITEM` / `SKILL` / `RUN` for product commands; five items and
   72° spacing are the tested contract, but the technique generalises to other counts.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
