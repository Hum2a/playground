# Filter Slash (portable recreation spec)

Persona-adjacent filtering interaction: activating a filter sends a diagonal red blade
sweeping across the list, and every non-matching row gets struck through before
collapsing away, staggered slightly so the cuts read as a sequence, not a single flat
change. Deactivating reverses it — struck rows expand back in.

This is a **filter application moment**, not a plain list re-render.

## Visual intent

- A single diagonal red blade sweeps once across the whole list the instant the filter
  turns on — pure visual punctuation, not a real element that stays
- Each non-matching row gets its own horizontal strike-through bar that grows from the
  left before the row collapses
- Strike-then-collapse is staggered per row (later rows cut slightly later) so removal
  reads as a cascading sequence
- Matching rows are untouched and simply reflow upward as space opens

## DOM structure

```html
<div class="filter-slash" data-filter-slash>
  <div class="filter-slash__toolbar">
    <button class="filter-slash__chip" data-filter-slash-toggle aria-pressed="false">URGENT ONLY</button>
  </div>
  <div class="filter-slash__field">
    <div class="filter-slash__blade" aria-hidden="true"></div>
    <ul class="filter-slash__list">
      <li class="filter-slash__item" data-tag="urgent">
        <span class="filter-slash__strike" aria-hidden="true"></span>
        <span class="filter-slash__text">Server migration</span>
        <span class="filter-slash__tag filter-slash__tag--urgent">URGENT</span>
      </li>
      <!-- …5 more items, alternating data-tag="urgent" / "normal" … -->
    </ul>
  </div>
</div>
```

## Copy

| Item | Tag |
| ---- | --- |
| Server migration | urgent |
| Update changelog | normal |
| Rotate API keys | urgent |
| Design review | normal |
| Patch CVE-2024-1147 | urgent |
| Refresh screenshots | normal |

Toggle label: `URGENT ONLY`.

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Borders, strike bar |
| Paper | `#f2eee3` | Field/list background |
| Accent | `#d71920` | Blade, active toggle border |
| Blade sweep | `360ms ease-in-out`, one-shot | `translateX(-260% → 760%) rotate(18deg)`, opacity `0 → 0.85 → 0` |
| Strike growth | `180ms ease` | `scaleX(0 → 1)`, `transform-origin: left` |
| Row collapse | `260ms ease`, `260ms` base delay after its own strike | `max-height → 0`, `opacity → 0`, `padding → 0` |
| Row stagger | `+60ms` strike delay, `+60ms` collapse delay per subsequent non-matching row | Rows 2/4/6 (0-indexed as items) get `0/60/120ms` strike delay and `180/240/300ms` collapse delay |

## Phases (JS)

- `setFilterActive(active)` — toggles `aria-pressed` and the `filter-slash--active`
  class (which drives every row's strike/collapse via CSS transitions), and on
  activation only, pulses a one-shot `filter-slash--sweep` class for `360ms` to replay
  the blade keyframe
- The blade animation only ever plays on activation; deactivation reverses row
  strike/collapse via plain CSS transitions with no re-triggered sweep

## Reduced motion

Keep filtering fully functional; remove the blade sweep and the directional
strike/collapse motion, leaving a plain opacity change:

```css
@media (prefers-reduced-motion: reduce) {
  .filter-slash--sweep .filter-slash__blade::before {
    animation: none !important;
  }
  .filter-slash__item,
  .filter-slash__strike {
    transition: opacity 160ms ease !important;
    transition-delay: 0ms !important;
  }
}
```

## Accessibility

- Blade and strike bars are `aria-hidden="true"` — decorative reinforcement only
- Toggle is a real `<button aria-pressed>`; row text remains visible/readable at all
  times, matching rows are never hidden from assistive technology
- Do not rely on motion alone to communicate which rows were filtered — removed rows
  are also removed from the accessibility tree via their collapsed, zero-height state

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Wire `setFilterActive` to your real filter predicate; keep row nodes in the DOM and
   toggle visibility via the same collapse mechanism rather than removing/adding nodes.
3. Keep the blade as a one-shot pulse class, not a persistent animation.
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Swap item text/tags and the toggle label per product; keep the stagger and
   strike-then-collapse ordering for the effect to read correctly.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
