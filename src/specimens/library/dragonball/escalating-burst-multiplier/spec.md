# Escalating Burst Multiplier (portable recreation spec)

Stackable temporary performance multiplier. Each increase raises throughput while
collapsing stability margin. Field complexity grows with stage. Original software
primitive — not a franchise Kaioken recreation.

## Semantic sequence

boost → stack boost → escalating output → collapsing safety margin → maximum temporary state

## DOM structure

```html
<div class="ebm" data-escalating-burst data-stage="1">
  <p class="ebm__system">WORKER // 04</p>
  <div class="ebm__host">
    <div class="ebm__field">…contours, fragments, outer, 4 sectors…</div>
    <div class="ebm__mult"><span data-ebm-curr>1×</span></div>
    <dl>OUTPUT / LOAD / STABILITY + rail / STATUS</dl>
  </div>
  <button data-ebm-increase>INCREASE MULTIPLIER</button>
</div>
```

## Stages (frozen)

| Mult | Output | Load | Stability | Status | Field |
| ---- | ------ | ---- | --------- | ------ | ----- |
| 1× | 100/s | 42% | 100% | NOMINAL | none |
| 2× | 200/s | 58% | 91% | NOMINAL | 1 contour |
| 4× | 400/s | 72% | 76% | NOMINAL | 2 contours |
| 10× | 1,000/s | 89% | 48% | STRAINED | 3 contours + 4 fragments |
| 20× | 2,000/s | 98% | 17% | UNSTABLE | 3 contours + broken outer + 8 fragments |

## Transition

- Previous multiplier compresses vertically; new value slams up (~120ms)
- Host `scale(0.97 → 1.025 → 1)`
- At 20×: hold 100ms, then four sectors shift outward 3px once

## Colours

| Token | Hex |
| ----- | --- |
| Background | `#0c0e12` |
| Foreground | `#e8e6df` |
| Mid | `#c4a35a` |
| Bright | `#e8d48b` |
| Edge | `#d97b5c` |

Stability uses an explicit striped rail — do not rely on colour alone.

## API

- `increaseBurstMultiplier()` / `resetBurstMultiplier()` / `replayBurstMultiplier()`
- `showFinalBurstMultiplier()` for reduced-motion final jump

## Reduced motion

Immediate 20× / 2,000/s / 98% / 17% / UNSTABLE with shifted sectors.

## Accessibility

All metrics are text. Stability uses `role="meter"`. Polite live region announces each stage.
