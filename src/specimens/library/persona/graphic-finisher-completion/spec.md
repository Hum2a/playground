# Graphic Finisher Completion (portable recreation spec)

Persona-adjacent capstone overlay: a rapid black/red panel shutter cascades across the
screen, a full-bleed flash cuts through, a giant "COMPLETE" wordmark slams in over a
darkened backdrop, concentric rings and shard particles burst from it, and a caption
rises to close the composition. This is the **largest, most composited effect in the
set** — full graphic punctuation for finishing a major arc, not a routine toast.

## Visual intent

- Three diagonal panels (black, red, black) sweep across in rapid staggered succession
  before the payoff — a shutter/strobe beat that builds anticipation
- A full-bleed white flash marks the transition into the payoff
- The backdrop darkens to a solid near-black, turning this into a takeover composition
  rather than a small card overlay
- The giant word slams in from an oversized, slightly rotated start with overshoot and
  recoil, exactly once
- Concentric rings and angular shard particles burst outward from the word once it lands
- A small caption rises in last, closing the sequence
- Every stage is sequential and non-overlapping in its *start* of motion (panels →
  flash/backdrop → word → rings/shards → caption), even though later stages' tails
  overlap earlier ones finishing

## DOM structure

Parent host must be `position: relative` and `overflow: hidden`.

```html
<div class="finisher" data-finisher aria-hidden="true">
  <div class="finisher__backdrop" aria-hidden="true"></div>
  <div class="finisher__panels" aria-hidden="true">…3 spans…</div>
  <div class="finisher__flash" aria-hidden="true"></div>
  <div class="finisher__content">
    <p class="finisher__word">COMPLETE</p>
    <div class="finisher__rings" aria-hidden="true">…3 spans…</div>
    <p class="finisher__subline">All objectives cleared</p>
  </div>
  <div class="finisher__shards" aria-hidden="true">…6 spans…</div>
</div>
```

Expose the completion to assistive technology as a real status message on the host
outside this decorative root (the whole overlay is `aria-hidden`).

## Copy

| Role | Value |
| ---- | ----- |
| Word | `COMPLETE` |
| Subline | `All objectives cleared` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Backdrop, panels 1 & 3 |
| Accent | `#d71920` | Panel 2, ring 1, subline, shards (alt) |
| Paper | `#f2eee3` | Word colour, ring 2, shards (alt) |
| Flash | `#f8f6f0` | Full-bleed, brief |
| Panel sweep | `220ms ease-in-out`, staggered `0/70/140ms` | Full-height diagonal bars, `skewX(-12deg)` |
| Backdrop fade | `320ms ease-out`, `260ms` delay | `0 → 1` opacity, stays solid |
| Flash | `220ms ease-out`, `260ms` delay | `0 → 0.95 → 0` |
| Word slam | `420ms`, `cubic-bezier(0.16, 0.85, 0.2, 1.16)`, `300ms` delay | `scale(1.7) rotate(-4deg) → scale(0.94) rotate(1deg) → scale(1) rotate(0deg)` |
| Rings | `460ms ease-out`, staggered `420/480/540ms` | `scale(0.2 → 2.6)`, opacity `0.85 → 0` |
| Shards | `260ms`, `cubic-bezier(0.2, 0.8, 0.3, 1)`, `440ms` delay | 6 particles, burst then fade |
| Subline rise | `260ms ease-out`, `760ms` delay | Last stage to start |
| Exit | `260ms ease-in` | Whole composition fades as one group |

## Phases (JS)

Toggle classes on the root — never append/remove ring/shard/panel nodes:

- `finisher--enter` — full choreographed sequence (panels → backdrop/flash → word →
  rings/shards → subline)
- `finisher--settled` — static final pose (dark backdrop, word, subline)
- `finisher--exit` — whole composition fades out together

Replay: exit → re-enter. Listen for harness `{ type: 'restart' }` messages, or call
`replayFinisher()`.

## Reduced motion

Show the settled composition immediately (dark backdrop, word, subline; no panels,
flash, rings, or shards) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

Exit also becomes an instant `opacity: 0` with no fade animation.

## Accessibility

- Entire overlay is `aria-hidden="true"` — it is a decorative graphic punctuation layer
- Host must expose the actual completion status as real text/live-region content
  elsewhere, not solely through this overlay
- Do not rely on motion alone to communicate completion

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount inside an overflow-clipped relative container sized for a full takeover (this
   is the `fullscreen`-scope member of the set — give it the whole viewport or panel).
3. Trigger with `playFinisher()`; dismiss via `dismissFinisher()` (or Restart
   postMessage) before replaying.
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Keep the panel → flash/backdrop → word → rings/shards → subline stage ordering and
   relative timing; swap `COMPLETE` / `All objectives cleared` for product copy.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
