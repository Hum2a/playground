# Typographic Impact (portable recreation spec)

Persona-adjacent emphasis overlay: an oversized word slams in behind a smaller readable
callout, with a misregistered red "ghost" duplicate trailing the black main layer like
off-register print — pure typographic force, not a toast or badge.

This is an **emphasis / attention overlay**, not a page transition.

## Visual intent

- One giant, clipped headline word dominates the composition, colour black
- A second red copy of the same word sits slightly offset behind it (~6px, 4px), like a
  misprinted plate that never quite re-registers
- A small readable foreground callout (eyebrow + message) rises in just after the giant
  word settles, carrying the actual information
- No soft fade — entrance is a horizontal slam with overshoot and recoil
- Decorative background word only — host exposes the real message to assistive
  technology via the readable foreground text (not `aria-hidden`)

## DOM structure

Parent host must be `position: relative` and `overflow: hidden`.

```html
<div class="type-impact" data-type-impact aria-hidden="true">
  <p class="type-impact__giant type-impact__giant--ghost">CRITICAL</p>
  <p class="type-impact__giant type-impact__giant--main">CRITICAL</p>
  <div class="type-impact__foreground">
    <p class="type-impact__eyebrow">ALERT</p>
    <p class="type-impact__message">Weak point exposed</p>
  </div>
</div>
```

The foreground callout carries the readable message; only the giant background word and
its ghost are marked decorative via the root's `aria-hidden`. If the whole overlay is
`aria-hidden`, mirror the message as visible text on the host outside the overlay.

## Copy

| Role | Value |
| ---- | ----- |
| Giant word | `CRITICAL` |
| Eyebrow | `ALERT` |
| Message | `Weak point exposed` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Main giant word, message |
| Ghost red | `#d71920` | Offset duplicate, `mix-blend-mode: multiply` |
| Paper | `#f2eee3` | Foreground callout backing |
| Giant font size | `clamp(2.6rem, 15vw, 5.4rem)` | `font-weight: 900`, `letter-spacing: -0.02em` |
| Ghost offset (settled) | `6px, 4px` | Never fully re-registers |
| Entrance | `480ms`, `cubic-bezier(0.15, 0.85, 0.2, 1.2)` | Overshoot then recoil |
| Impact at | `~58%` (≈278ms) | `translateX(4%) rotate(1deg) scale(0.97)` |
| Final rotation | `-2deg` | Settled pose |
| Ghost stagger | `35ms` | After main layer start |
| Foreground rise | `320ms`, `300ms` delay | Starts once the giant word has landed |
| Exit | `260ms ease-in` | Crush sideways to `translateX(130%)`, main + ghost |

### Entrance keyframes (main word)

1. Start: `translateX(-135%) rotate(-6deg) scale(1.18)`, `opacity: 0`
2. Impact (~58%): `translateX(4%) rotate(1deg) scale(0.97)`, `opacity: 1`
3. Final: `translateX(0) rotate(-2deg) scale(1)`

## Phases (JS)

Toggle classes on the root — never append/remove nodes:

- `type-impact--enter` — slam + ghost stagger + foreground rise
- `type-impact--settled` — static final pose (ghost stays 6px/4px offset)
- `type-impact--exit` — crush sideways

Replay: exit → re-enter. Listen for harness `{ type: 'restart' }` messages, or call
`replayImpact()`.

## Reduced motion

Show the settled composition immediately (no slam, no crush) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

```css
@media (prefers-reduced-motion: reduce) {
  .type-impact__giant--main,
  .type-impact__giant--ghost,
  .type-impact__foreground {
    animation: none !important;
  }
  .type-impact__giant--main { opacity: 1; transform: translateX(0) rotate(-2deg) scale(1); }
  .type-impact__giant--ghost { opacity: 0.55; transform: translateX(6px) translateY(4px) rotate(-2deg) scale(1); }
  .type-impact__foreground { opacity: 1; transform: translateY(0); }
}
```

## Accessibility

- Giant word and ghost: decorative (covered by the root's `aria-hidden`)
- Foreground callout carries the real message as visible text
- Do not rely on motion alone to communicate the emphasis

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount inside an overflow-clipped relative container sized to at least the card scope.
3. Trigger with `slamImpact()`; replay via crush then slam (or Restart postMessage).
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Swap `CRITICAL` / `ALERT` / `Weak point exposed` for product copy; keep the ghost
   offset and slam timing frozen for the effect to read correctly.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
