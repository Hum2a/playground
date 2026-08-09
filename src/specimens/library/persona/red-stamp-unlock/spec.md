# Red Stamp Unlock (portable recreation spec)

Persona-adjacent status overlay: a hand-struck red ink ring stamp smashes onto a locked
surface at a steep angle, overshoots, recoils, and settles crooked — the visual language
of a physical rubber stamp being slammed down, not a soft badge fade-in.

This is a **status / unlock confirmation**, not a page transition.

## Visual intent

- Circular stamp built from two slightly irregular (hand-struck) ink rings, not a perfect
  CSS circle
- No filled background — the mark reads as ink on the host surface, matching real stamp
  texture
- A brief radial ink-bleed halo flashes only at the moment of impact
- Five small ink-spatter particles burst outward at impact and vanish quickly
- Exit lifts the ink away (fade + shrink), it does not rip like paper
- Decorative only — host exposes the unlocked status to assistive technology separately

## DOM structure

Parent host must be `position: relative` and `overflow: hidden`.

```html
<div class="stamp-unlock" data-stamp-unlock aria-hidden="true">
  <div class="stamp-unlock__ink" aria-hidden="true"></div>
  <div class="stamp-unlock__mark">
    <div class="stamp-unlock__ring stamp-unlock__ring--outer" aria-hidden="true"></div>
    <div class="stamp-unlock__ring stamp-unlock__ring--inner" aria-hidden="true"></div>
    <p class="stamp-unlock__word">UNLOCKED</p>
    <p class="stamp-unlock__sub">ACCESS &middot; GRANTED</p>
  </div>
  <div class="stamp-unlock__particles" aria-hidden="true">…5 spans…</div>
</div>
```

Expose a screen-reader-only status on the host (e.g. `Content unlocked`) outside the
decorative root.

## Copy

| Role | Value |
| ---- | ----- |
| Word | `UNLOCKED` |
| Sub | `ACCESS · GRANTED` |
| SR label (host) | `Content unlocked` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink red | `#c81324` | Rings, word, particles |
| Ink black | `#0d0d0d` | One particle only |
| Mark size | `min(62%, 230px)` | Square, `aspect-ratio: 1` |
| Outer ring | `5px solid`, radius `48% 52% 51% 49% / 53% 47% 52% 48%` | Hand-struck wobble, not a perfect circle |
| Inner ring | `82%` size, `3px solid`, independent wobble radius | |
| Final rotation | `-8deg` | Settled pose |
| Entrance | `520ms`, `cubic-bezier(0.16, 0.9, 0.24, 1.14)` | Overshoot then recoil |
| Impact at | `~55%` (≈286ms) | `rotate(-14deg) scale(1.06)` |
| Recoil at | `~78%` | `rotate(-4deg) scale(0.98)` |
| Ink halo | `380ms ease-out`, `260ms` delay | Radial gradient, scales `0.4 → 2.2`, fades out |
| Particles | `220ms`, `280ms` delay | 5 dots, burst outward then fade |
| Exit | `240ms ease-in` | Fade + shrink to `0.6`, no rip |

### Entrance keyframes (mark)

1. Start: `translate(58%, -68%) rotate(38deg) scale(1.9)`, `opacity: 0`
2. Impact (~55%): `translate(0, 0) rotate(-14deg) scale(1.06)`, `opacity: 1`
3. Recoil (~78%): `rotate(-4deg) scale(0.98)`
4. Final: `rotate(-8deg) scale(1)`

## Phases (JS)

Toggle classes on the root — never append/remove particle nodes:

- `stamp-unlock--enter` — slam + ink halo + particles
- `stamp-unlock--settled` — static final pose
- `stamp-unlock--exit` — ink lift

Replay: exit → re-enter. Listen for harness `{ type: 'restart' }` messages, or call
`replayStamp()`.

## Reduced motion

Show the settled stamp immediately (no slam, halo, or particles) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

```css
@media (prefers-reduced-motion: reduce) {
  .stamp-unlock__mark,
  .stamp-unlock__ink,
  .stamp-unlock__particle {
    animation: none !important;
  }
  .stamp-unlock__mark {
    opacity: 1;
    transform: rotate(-8deg) scale(1);
  }
}
```

## Accessibility

- Root, ink halo, and particles: `aria-hidden="true"`
- Host: real `sr-only` status (e.g. “Content unlocked”)
- Do not rely on motion alone to communicate the unlock

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount inside an overflow-clipped relative container over the newly-unlocked surface.
3. Trigger with `slamStamp()`; replay via lift then slam (or Restart postMessage).
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Keep generic UNLOCKED / ACCESS GRANTED copy unless product asks otherwise.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
