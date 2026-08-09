# Confidant Rank Up (portable recreation spec)

Persona-adjacent progression milestone: a bond/rank card takes a quick camera-flash hit,
concentric rings burst from the rank badge, the old rank number is punched out and
replaced, and a "RANK UP" banner slams across the card before shrinking into a permanent
corner ribbon tag. This is a **major progression event**, not an incremental progress-bar
tick.

## Visual intent

- Whole-card white flash at the very start of the sequence (camera-flash punctuation)
- Three concentric rings burst outward from the rank badge, staggered
- Old rank number shrinks/rotates away; new rank number punches in with overshoot,
  timed to land just after the flash
- A big diagonal "RANK UP" banner slams in across the card centre, overshoots, recoils,
  then shrinks and relocates into a small permanent ribbon tag in the top-right corner —
  the announcement becomes a lasting badge, it does not simply fade away
- The card itself never leaves the layout; this augments a persistent element in place

## DOM structure

```html
<div class="rank-up" data-rank-up>
  <div class="rank-up__card">
    <div class="rank-up__avatar" aria-hidden="true"></div>
    <p class="rank-up__eyebrow">CONFIDANT</p>
    <p class="rank-up__name">Ally</p>
    <div class="rank-up__badge">
      <div class="rank-up__rings" aria-hidden="true">…3 spans…</div>
      <span class="rank-up__number rank-up__number--old">6</span>
      <span class="rank-up__number rank-up__number--new">7</span>
    </div>
    <div class="rank-up__banner" aria-hidden="true">RANK UP</div>
    <div class="rank-up__flash" aria-hidden="true"></div>
  </div>
</div>
```

Expose the actual new rank as real text content (the `rank-up__number--new` span itself
is real, readable text — only the rings, flash, and banner are decorative).

## Copy

| Role | Value |
| ---- | ----- |
| Eyebrow | `CONFIDANT` |
| Name | `Ally` |
| Old rank | `6` |
| New rank | `7` |
| Banner | `RANK UP` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Card border, badge background |
| Paper | `#f2eee3` | Card background |
| Accent | `#d71920` | Ring 1, badge border, banner border |
| Card width | `min(88%, 240px)` | |
| Badge size | `52px` circle | |
| Flash | `260ms ease-out`, opacity `0 → 0.75 → 0` | Whole-card white pulse, first thing to play |
| Rings | `420ms ease-out`, staggered `80/150/220ms` | Scale `0.2 → 2.3`, opacity `0.9 → 0` |
| Old number out | `260ms ease-in`, `200ms` delay | Scale to `0.3`, rotate `18deg` |
| New number in | `260ms`, `cubic-bezier(0.2, 0.85, 0.25, 1.3)`, `330ms` delay | Overshoot to `1.18`, settle `1` |
| Banner slam-to-tag | `640ms`, `cubic-bezier(0.18, 0.85, 0.2, 1.1)`, `60ms` delay | Big centre slam, then shrinks to a `0.5`-scale corner ribbon |

### Banner keyframes

1. `0%`: off-card left, `rotate(-14deg) scale(1.3)`, `opacity: 0`
2. `46%` (impact): centred, `rotate(-4deg) scale(1.08)`, `opacity: 1`
3. `62%` (recoil): `rotate(-6deg) scale(1)`
4. `100%` (settle): relocated `52px, -58px` toward the top-right corner, `rotate(-8deg)
   scale(0.5)` — now a permanent tag, not an overlay

## Phases (JS)

Toggle classes on the root:

- `rank-up--enter` — flash, rings, number swap, banner slam-to-tag (full sequence)
- `rank-up--settled` — final pose: new number, banner resting as a corner tag
- `rank-up--reset` — snaps back to the pre-rank-up idle pose (old number, no banner) for
  replay, with no animation

Replay: reset → wait one frame → re-enter. Listen for harness `{ type: 'restart' }`
messages, or call `replayRankUp()`.

## Reduced motion

Show the settled composition immediately (new number, banner already resting as a
corner tag, no flash/rings) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

## Accessibility

- Rings, flash, and banner: `aria-hidden="true"` — decorative punctuation only
- The rank number itself is real, readable text at all times
- Do not rely on motion alone to communicate the rank change; the visible number is the
  source of truth

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount over a persistent card component — this is an in-place augmentation, not a
   modal or toast.
3. Trigger with `playRankUp()`; reset via `resetRankUp()` for a later replay.
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Swap `CONFIDANT` / `Ally` / rank numbers for product copy; keep the flash → rings →
   number-swap → banner-to-tag choreography and its relative timing.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
