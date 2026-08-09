# XP Counter Slam (portable recreation spec)

Persona-adjacent value-change overlay: a "+240" delta chip flies in from the edge,
travels toward the existing total on a short dipped arc, and slams into it — the old
total punches out, the new total punches in with overshoot, and a small particle burst
marks the impact. This is an **earned-value counter update**, not a smooth odometer
count-up.

## Visual intent

- Delta chip enters from off-screen, dips slightly on its travel arc, and reaches the
  total's position before vanishing — it visually "delivers" its value
- The old total shrinks away and the new total punches in with overshoot at the exact
  moment the delta chip arrives, not before
- A tiny particle burst (3 dots) marks the impact point
- No smooth digit odometer roll — this is a discrete punch replacement

## DOM structure

```html
<div class="xp-slam" data-xp-slam>
  <p class="xp-slam__eyebrow">EXPERIENCE</p>
  <div class="xp-slam__total-wrap">
    <span class="xp-slam__total xp-slam__total--old">1,240</span>
    <span class="xp-slam__total xp-slam__total--new">1,480</span>
  </div>
  <div class="xp-slam__delta" aria-hidden="true">+240</div>
  <div class="xp-slam__particles" aria-hidden="true">…3 spans…</div>
</div>
```

Both total spans carry real text; only the delta chip and particles are `aria-hidden`
(the delta value is redundant with the before/after totals for assistive technology).

## Copy

| Role | Value |
| ---- | ----- |
| Eyebrow | `EXPERIENCE` |
| Old total | `1,240` |
| New total | `1,480` |
| Delta chip | `+240` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Total number |
| Accent | `#d71920` | Delta chip background, particles |
| Muted | `#767e8c` | Eyebrow |
| Total font size | `clamp(1.9rem, 9vw, 2.6rem)` | `font-weight: 900` |
| Delta travel | `360ms`, `cubic-bezier(0.25, 0.7, 0.2, 1)` | Dips up mid-travel (`translateY(-68%)` at 55%), arrives ~82%, then shatters to `scale(0.4)` |
| Old total out | `160ms ease-in`, `300ms` delay | Scale to `0.6` |
| New total in | `260ms`, `cubic-bezier(0.2, 0.85, 0.25, 1.25)`, `320ms` delay | Overshoot `1.4 → 0.88 → 1` |
| Particles | `220ms`, `320ms` delay | 3 dots, burst then fade |

## Phases (JS)

Toggle classes on the root:

- `xp-slam--enter` — delta travel + old/new total swap + particle burst
- `xp-slam--settled` — final pose: new total visible, old total hidden
- `xp-slam--reset` — snaps back to the pre-slam idle total for replay, no animation

Replay: reset → wait one frame → re-enter. Listen for harness `{ type: 'restart' }`
messages, or call `replayXp()`.

## Reduced motion

Show the settled new total immediately (no delta travel, no punch swap, no particles)
when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

## Accessibility

- Delta chip and particles: `aria-hidden="true"` — the before/after totals are the
  source of truth and both remain real text
- Do not rely on motion alone to communicate the value change

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Trigger with `slamXp()` whenever a real value change occurs; reset via `resetXp()`
   for a later replay.
3. Compute the delta chip text and both total strings from real data before triggering.
4. Wire reduced-motion the same way (media query + optional force attribute).
5. Keep the delta-travel-then-punch-swap choreography and its relative timing; swap
   copy and numbers freely.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
