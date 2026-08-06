# Day Change Tear (portable recreation spec)

Temporal date transition: the current calendar sheet is torn away to reveal the
next date already underneath. Persona-adjacent paper language — not a game UI
replica. No copyrighted assets, fonts, or artwork.

## Visual intent

- ~260×260 irregular paper calendar card
- Month strip (black / red type), huge day number (~120px), weekday below
- NEXT physically destroys the current sheet (rupture → tear → pull)
- PREVIOUS inserts a replacement sheet from the lower-left (not reverse tear)
- Underlying next date exists before the tear begins

## DOM structure

```html
<div class="dct" data-day-change data-index="0">
  <p class="dct__live" data-dct-live aria-live="polite">Thursday, 6 August</p>
  <div class="dct__stage" aria-hidden="true">
    <div class="dct__sheet dct__sheet--under" data-dct-under><!-- next --></div>
    <div class="dct__sheet dct__sheet--current" data-dct-current>
      <div class="dct__half dct__half--left">…</div>
      <div class="dct__half dct__half--right">…</div>
      <div class="dct__rupture">…</div>
      <span class="dct__frag dct__frag--1…4"></span>
    </div>
    <div class="dct__sheet dct__sheet--incoming" data-dct-incoming hidden>…</div>
  </div>
  <div class="dct__controls">
    <button type="button" data-dct-prev>PREVIOUS</button>
    <button type="button" data-dct-next>NEXT DAY</button>
  </div>
</div>
```

Stacked sheets + halves are decorative (`aria-hidden` stage). One live region
announces the semantic date.

## Deterministic dates

| Index | Month | Day | Weekday | Announce |
| ----- | ----- | --- | ------- | -------- |
| 0 | AUGUST | 06 | THURSDAY | Thursday, 6 August |
| 1 | AUGUST | 07 | FRIDAY | Friday, 7 August |
| 2 | AUGUST | 08 | SATURDAY | Saturday, 8 August |

Cycle with wrap. No `Date` API.

## Colours

| Token | Value |
| ----- | ----- |
| Paper | `#f5f1e8` |
| Black | `#090909` |
| Red | `#e60012` |

## NEXT choreography (~760ms)

| Phase | Window | Behaviour |
| ----- | ------ | --------- |
| Rupture | 0–120ms | Irregular black/red tear mark at ~`50% 18%` |
| Tear | 120–320ms | Complementary clip-paths open an irregular vertical gap |
| Pull | 320–620ms | Left `translate(-85%, 35%) rotate(-18deg)`; right `translate(90%, 45%) rotate(21deg)` (right lags ~28ms) |
| Fragments | during pull | Exactly 4 scraps, travel ~20–45px |
| Settle | 600–760ms | Under sheet `translateY(4px → 0)` ~160ms; strip nudge ≤2px |

After complete: recycle fixed DOM — write new current/under labels; no node accumulation.

## PREVIOUS (~420ms)

Incoming sheet enters from lower-left (`translate(-42%, 58%) rotate(-14deg)` → settle).
Not a reverse tear.

## Reduced motion

Immediate date swap. No tear, fragments, or insertion motion. Paper calendar remains.

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `nextDayTear()` / `previousDayInsert()` / `resetDayChange()`.
3. Keep frozen clip-paths, pull transforms, and timing.
4. Honour `prefers-reduced-motion` and `data-force-reduced-motion="true"`.
5. No React, Tailwind, host tokens, external fonts, or network.
