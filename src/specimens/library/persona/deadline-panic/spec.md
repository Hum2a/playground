# Deadline Panic (portable recreation spec)

Short countdown where typography grows compositionally unstable as zero
approaches. Urgency via graphic disorder — not flashing colours.

Persona-adjacent impact language. No copyrighted assets, fonts, or artwork.

## Visual intent

- Demo countdown `00:10` → `00:00` from START COUNTDOWN
- Real elapsed time via `performance.now()` + `requestAnimationFrame` (no drifting timeout chains)
- Disorder escalates at deterministic second thresholds
- At zero: digits collapse (~120ms) then `TIME UP` attacks (~300ms)
- No full-interface flashing / red-black background strobe

## DOM structure

```html
<div class="dp" data-deadline-panic data-phase="idle" data-secs="10">
  <div class="dp__stage">
    <div class="dp__timer" aria-hidden="true">
      <span class="dp__backing"></span>
      <span class="dp__marks">…</span>
      <span class="dp__group dp__group--min">
        <span class="dp__digit" data-dp-digit="0">0</span>
        <span class="dp__digit" data-dp-digit="1">0</span>
      </span>
      <span class="dp__colon">:</span>
      <span class="dp__group dp__group--sec">
        <span class="dp__digit" data-dp-digit="2">1</span>
        <span class="dp__digit" data-dp-digit="3">0</span>
      </span>
    </div>
    <div class="dp__timeup" hidden>
      <span class="dp__timeup-back"></span>
      <span class="dp__timeup-face">TIME UP</span>
    </div>
  </div>
  <button type="button" data-dp-start>START COUNTDOWN</button>
  <button type="button" data-dp-reset>RESET</button>
  <p class="dp__sr" data-dp-sr>10 seconds remaining</p>
  <div role="status" aria-live="polite" data-dp-live></div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Phase table (by displayed seconds)

| Seconds | Phase | Behaviour |
| ------- | ----- | --------- |
| 10–6 | `stable` | ≤1px digit nudge on change |
| 5–4 | `tense` | Black/red backing; rotate −1deg / +1deg; angular marks |
| 3 | `split` | Groups separate; colon 6deg; scale 1.05 |
| 2 | `scatter` | Digits offset −4/5/−3/4 px (frozen, no RNG) |
| 1 | `shatter` | Frozen transforms: (−7/−3/−5°), (3/4/3°), (−2/−6/−4°), (8/3/7°) |
| 0 | `zero`→`timeup` | Collapse 120ms → TIME UP attack 300ms |

## Shatter transforms (00:01)

| Digit | translate | rotate |
| ----- | --------- | ------ |
| 0 (min tens) | `-7px -3px` | `-5deg` |
| 0 (min ones) | `3px 4px` | `3deg` |
| 0 (sec tens) | `-2px -6px` | `-4deg` |
| 1 (sec ones) | `8px 3px` | `7deg` |

## Accessibility

- Quiet SR string updates remaining time (not `aria-live` each second)
- Final polite announcement: `Time expired.`

## Reduced motion

Digits update in place with no positional disorder. At zero, immediate static TIME UP.

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `startDeadlinePanic()` / `resetDeadlinePanic()`.
3. Keep frozen phase transforms; do not introduce `Math.random`.
4. Honour both reduced-motion triggers.
5. No React, Tailwind, host tokens, external fonts, or network.
