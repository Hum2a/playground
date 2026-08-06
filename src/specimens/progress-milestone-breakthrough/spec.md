# Progress Milestone Breakthrough (portable recreation spec)

Progress component where a milestone marker is a physical barrier: the fill
resists, then breaks through. Persona-adjacent impact language — not a game UI
replica. No copyrighted assets, fonts, or artwork.

## Visual intent

- Track ~320×26, irregular clip, black body, red/paper fill
- Vertical barrier at exactly **60%** (~7×44) with label `60`
- Quiet advances 54→57→59; spectacle reserved for the threshold
- Collision resistance → marker split → decorative fill overshoot → settle at 60%
- Graphic announcement: `MILESTONE` then `60% COMPLETE`
- Logical value never becomes 62%

## DOM structure

```html
<div class="pmb" data-progress-milestone data-value="54">
  <div class="pmb__stage">
    <div class="pmb__announce" aria-hidden="true">…</div>
    <div role="progressbar" aria-valuenow="54" aria-valuetext="54% complete"
         aria-valuemin="0" aria-valuemax="100" data-pmb-bar>
      <div class="pmb__fill" data-pmb-fill style="width:54%"></div>
    </div>
    <div class="pmb__marker" data-pmb-marker aria-hidden="true">…</div>
    <span class="pmb__tick" data-pmb-tick hidden></span>
    <!-- tension marks + 3 scraps -->
  </div>
  <button type="button" data-pmb-go>ADD PROGRESS</button>
  <button type="button" data-pmb-reset>RESET</button>
  <div role="status" aria-live="polite" data-pmb-live></div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Choreography

| Phase | Timing | Behaviour |
| ----- | ------ | --------- |
| 54→57 | 300ms | Quiet fill advance |
| 57→59 | 220ms | Quiet fill advance |
| Resist | 110ms | Edge compresses; marker bends 0→4→−2deg; red tension marks |
| Break | 180ms | Marker splits (upper `8px -18px` / 16deg; lower `10px 17px` / −13deg); 3 scraps; visual fill → 62% |
| Settle | 140ms | Visual fill → 60%; tick replaces marker |
| Announce | 240ms | Panel attacks; detail line +70ms |

Logical `aria-valuenow` becomes **60** at breakthrough start — never 62.

## Reduced motion

Immediate 60% + static `MILESTONE — 60% COMPLETE`. No collision/breakthrough.

## Accessibility

`role="progressbar"` with live `aria-valuenow` / `aria-valuetext`. Polite status:
`60% complete. Milestone reached.` Decorative fragments `aria-hidden`.

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `addProgressMilestone()` / `resetProgressMilestone()`.
3. Keep frozen track clip, marker geometry, and timing.
4. Never bind semantic value to decorative overshoot width.
5. No React, Tailwind, host tokens, external fonts, or network.
