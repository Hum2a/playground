# Critical Threshold Warning (portable recreation spec)

Metric warning where crossing a predefined critical threshold changes the
interface into a restrictive structural state — not a celebration. Counterpart
mood to Progress Milestone Breakthrough. No copyrighted assets, fonts, or artwork.

## Visual intent

- Meter ~320×24, irregular clip, black body, paper fill while safe
- Vertical black/paper marker at exactly **90%** with label `90 // LIMIT`
- Restrained advance 82→88; approach slows 88→90; marker reacts near 89.5%
- Crossing (>90) traps the threshold with upper/lower clamps — marker does **not** explode
- Discrete fill change to red beyond 90%; `CRITICAL` + `94% LOAD`
- Final critical state is static — no pulse, flash, or perpetual glitch

## DOM structure

```html
<div class="ctw" data-critical-threshold data-value="82">
  <p class="ctw__title">SYSTEM LOAD</p>
  <div class="ctw__stage">
    <div class="ctw__warn" aria-hidden="true">CRITICAL / 94% LOAD</div>
    <div role="meter" aria-label="System load" aria-valuenow="82"
         aria-valuetext="82 percent" aria-valuemin="0" aria-valuemax="100"
         data-ctw-meter>
      <div class="ctw__fill" data-ctw-fill style="width:82%"></div>
      <div class="ctw__threshold" aria-hidden="true">…</div>
    </div>
  </div>
  <button type="button" data-ctw-go>INCREASE LOAD</button>
  <button type="button" data-ctw-reset>RESET LOAD</button>
  <div role="status" aria-live="polite" data-ctw-live></div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Geometry

| Element | Spec |
| ------- | ---- |
| Meter | ~320×24, irregular polygon clip, no rounded bar |
| Threshold | left `90%`, mark ~6×48, label `90 // LIMIT` |
| Top clamp | translateY `-35px → 0`, ~180ms |
| Bottom clamp | translateY `35px → 0`, ~180ms |
| Host nudge | ≤ `2px` on clamp impact, then settle |

## Choreography

| Phase | Timing | Behaviour |
| ----- | ------ | --------- |
| 82→88 | 300ms | Restrained paper fill |
| 88→90 | 480ms | Slowed approach (`cubic-bezier(0.45, 0.12, 0.55, 1)`) |
| React | ~360ms into approach | Marker `0 → -3deg`; two red tension marks |
| Cross | 180ms | Logical value **> 90** → clamps trap; fill snaps to red; host ≤2px nudge |
| Fill | 200ms | Visual/logical → **94%** |
| Warn | 240ms | `CRITICAL` from `translateX(70px) rotate(6deg)` → impact `-4px/-2deg` → final `0/-1deg`; `94% LOAD` +70ms |

Critical chrome is gated on `value > 90`, not animation completion.

## Reduced motion

Immediate 94% critical state with static clamps/label. No travel choreography.
Triggers: `prefers-reduced-motion: reduce` and `data-force-reduced-motion="true"`.

## Accessibility

`role="meter"` with live `aria-valuenow` / `aria-valuetext`. On first crossing,
polite status announces once: `System load critical at 94 percent.` No repeat
while remaining critical. Decorative clamps/marks `aria-hidden`.

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `increaseCriticalThreshold()` / `resetCriticalThreshold()`.
3. Keep frozen meter clip, 90% marker, clamp travel, and timing.
4. Drive critical class from logical value, never from animation end alone.
5. No React, Tailwind, host tokens, external fonts, or network.
