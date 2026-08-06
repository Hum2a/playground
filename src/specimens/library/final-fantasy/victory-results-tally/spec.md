# Victory Results Tally (portable recreation spec)

Classic JRPG–adjacent post-completion results plate: sequential row reveals, deterministic
count-up tallies, TOTAL after component values settle, then LEVEL UP with a gold flare.
Agents can rebuild from this document and `contract.json`.

Do **not** reproduce Final Fantasy logos, fonts, music, characters, or exact menus.

## Visual intent

- Results / rewards summary after finishing an activity
- Elegant midnight plate with thin blue rules and square corners
- Right-aligned tabular numbers; large whitespace
- Count-up lands exactly on frozen targets — never random
- Decorative counting is silent to AT; finals announced once

## DOM structure

```html
<div class="victory-tally" data-victory-tally>
  <button type="button" class="victory-tally__trigger" data-vt-trigger>FINISH ACTIVITY</button>
  <div class="victory-tally__plate" data-vt-plate aria-hidden="true">
    <h2 class="victory-tally__header">RESULTS</h2>
    <div class="victory-tally__rows">
      <!-- SCORE / BONUS / TIME / TOTAL rows -->
    </div>
    <div class="victory-tally__finale" data-vt-finale>
      <span class="victory-tally__flare" aria-hidden="true"></span>
      <p class="victory-tally__level-up">LEVEL UP</p>
    </div>
  </div>
  <p class="victory-tally__live" data-vt-live aria-live="polite"></p>
</div>
```

Parent frame: `position: relative` and `overflow: hidden`.

## Copy and frozen values

| Role | Value |
| ---- | ----- |
| Trigger | `FINISH ACTIVITY` |
| Header | `RESULTS` |
| SCORE | `02450` |
| BONUS | `+0350` |
| TIME | `01:42` |
| TOTAL | `02800` (= 2450 + 350) |
| Finale | `LEVEL UP` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Midnight | `#081329` | Background |
| Blue | `#153c78` | Rules / border |
| White | `#f5f8ff` | Body text |
| Gold | `#e9c45c` | Header, TOTAL, LEVEL UP, flare |
| Plate enter | `300ms` | |
| Row stagger | `180ms` | SCORE → BONUS → TIME |
| Tally duration | `500ms` | Per count-up |
| Corners | `0` | Square |
| Numerics | `tabular-nums`, right-aligned | |

## Sequence

1. Plate enters (~300ms).
2. SCORE reveals and counts (0 → 2450).
3. After 180ms, BONUS reveals and counts (0 → 350).
4. After another 180ms, TIME reveals and counts (0 → 01:42).
5. When SCORE and BONUS have both settled, TOTAL reveals and counts (0 → 2800).
6. LEVEL UP appears last with a brief gold horizontal CSS flare.

## Reduced motion

Show plate + all final values + LEVEL UP immediately (no counting, no flare travel) when either:

- `@media (prefers-reduced-motion: reduce)`, or
- `data-force-reduced-motion="true"` on the document root

## Accessibility

- Animated value nodes: `aria-hidden="true"` while counting
- `aria-live="polite"` region updated **once** with final results
- Do not announce intermediate tally ticks
- Plate uses `aria-hidden` until the sequence starts

## Porting

1. Copy DOM + CSS + tiny JS (or generate from `contract.json`).
2. Call `runVictoryResultsTally()` from your completion trigger; listen for harness `{ type: 'restart' }` to reset.
3. Keep frozen targets unless product supplies its own deterministic totals.
4. No React, Tailwind, host tokens, external fonts, or audio required.
