# Calling Card Slam (portable recreation spec)

Persona-adjacent announcement overlay: a crooked black-and-white paper card violently
slams onto a host surface, overshoots, recoils, and settles at a small angle. Agents in
other projects can rebuild the effect from this document and the machine-readable
contract in `contract.json`.

This is an **announcement / unlock / special-message reveal**, not a page transition.

## Visual intent

- Crooked printed calling card (handmade / confrontational, not a soft modal)
- Paper layer plus offset black backing for rough print registration
- Brief red/black triangular impact shards only at impact
- Rip sideways exit on dismiss/replay — no fade-out
- Decorative only — host exposes status to assistive technology separately

## DOM structure

Parent host must be `position: relative` and `overflow: hidden`.

```html
<div class="calling-card" data-calling-card aria-hidden="true">
  <div class="calling-card__backing" aria-hidden="true"></div>
  <div class="calling-card__paper">
    <p class="calling-card__eyebrow">NOTICE</p>
    <p class="calling-card__message">NEW MATERIAL</p>
    <p class="calling-card__microtype">TAKE NOTICE · TAKE NOTICE · TAKE NOTICE</p>
  </div>
  <span class="calling-card__impact calling-card__impact--1" aria-hidden="true"></span>
  <span class="calling-card__impact calling-card__impact--2" aria-hidden="true"></span>
  <span class="calling-card__impact calling-card__impact--3" aria-hidden="true"></span>
  <span class="calling-card__impact calling-card__impact--4" aria-hidden="true"></span>
</div>
```

Expose a screen-reader-only status on the host (e.g. `New material available`) outside the
decorative root.

## Copy

| Role | Value |
| ---- | ----- |
| Eyebrow | `NOTICE` |
| Message | `NEW MATERIAL` |
| Microtype | `TAKE NOTICE · TAKE NOTICE · TAKE NOTICE` |
| SR label (host) | `New material available` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#080808` | Borders, backing, some shards |
| Paper | `#f2eee3` | Card face |
| Accent | `#d71920` | Eyebrow + some shards |
| Width | `min(82%, 420px)` | |
| Min height | `150px` | |
| Final rotation | `-5deg` | Settled pose |
| Clip-path | `polygon(2% 6%, 96% 0%, 100% 88%, 94% 100%, 4% 97%, 0% 18%)` | Irregular; no border-radius |
| Backing offset | `8px 10px` | Rough registration, not a soft shadow |
| Border | `4px solid #080808` | On paper layer |
| Entrance | `620ms` | `cubic-bezier(0.22, 1.55, 0.28, 1)` |
| Impact at | `380ms` (~61%) | Overshoot then recoil |
| Backing stagger | `35ms` | After paper start |
| Shards | `180ms` from impact | Expand outward, then gone |
| Exit | `350ms` | `translateX(-140%) rotate(-14deg)` |
| Exit easing | `cubic-bezier(0.55, 0.05, 0.85, 0.35)` | |

### Entrance keyframes (paper)

1. Start: `translate(20%, -130%) rotate(14deg) scale(1.12)`
2. Impact (~61%): `translate(0, 4%) rotate(-7deg) scale(0.97)`
3. Recoil (~78%): `translate(0, -2%) rotate(-4deg) scale(1.02)`
4. Final: `translate(0, 0) rotate(-5deg) scale(1)`

## Phases (JS)

Toggle classes on the root — never append/remove shard nodes:

- `calling-card--enter` — slam + shards
- `calling-card--settled` — static final pose
- `calling-card--exit` — sideways rip

Replay: exit → re-enter. Listen for harness `{ type: 'restart' }` messages, or call
`dismissCallingCard({ reenter: true })` / `runCallingCardSlam()`.

## Reduced motion

Show the settled card immediately (no slam, recoil, shake, or shards) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

```css
@media (prefers-reduced-motion: reduce) {
  .calling-card__paper,
  .calling-card__backing,
  .calling-card__impact {
    animation: none !important;
  }
  .calling-card__paper {
    opacity: 1;
    transform: translate(0, 0) rotate(-5deg) scale(1);
  }
  .calling-card__backing {
    opacity: 1;
    transform: translate(8px, 10px) rotate(-5deg);
  }
}

[data-force-reduced-motion="true"] .calling-card__paper { /* same settled transforms */ }
```

## Accessibility

- Root, backing, and impact shards: `aria-hidden="true"`
- Host: real `sr-only` status (e.g. “New material available”)
- Do not rely on motion alone to communicate the announcement

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount inside an overflow-clipped relative container.
3. Trigger with `runCallingCardSlam()`; replay via exit then enter (or Restart postMessage).
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Keep generic NOTICE / NEW MATERIAL copy unless product asks otherwise.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
