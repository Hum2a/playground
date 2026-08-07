# Escalating Burst Multiplier (portable recreation spec)

Stackable temporary performance multiplier on a **risk ladder**: each × step
changes core geometry, halo, sector clip-path, and palette — not the label alone.
Throughput climbs while stability margin collapses. Original software primitive.

## Semantic sequence

boost → stack boost → escalating output → collapsing safety margin → maximum temporary UNSTABLE state

## DOM structure

```html
<div class="ebm" data-escalating-burst data-stage="1">
  <p class="ebm__system">WORKER // 04</p>
  <div class="ebm__host">
    <div class="ebm__field">
      <span class="ebm__halo"></span>
      <span class="ebm__core"></span>
      …contours, fragments, outer, 4 sectors…
    </div>
    <div class="ebm__mult"><span data-ebm-curr>1×</span></div>
    <dl>OUTPUT / LOAD / STABILITY + rail / STATUS</dl>
  </div>
</div>
```

## Stages (frozen)

| Mult | Output | Load | Stability | Status | Core | Field |
| ---- | ------ | ---- | --------- | ------ | ---- | ----- |
| 1× | 100/s | 42% | 100% | NOMINAL | diamond | none |
| 2× | 200/s | 58% | 91% | NOMINAL | hexagon + dashed halo | 1 contour |
| 4× | 400/s | 72% | 76% | NOMINAL | octagon + rounded halo | 2 contours, trapezoid sectors |
| 10× | 1,000/s | 89% | 48% | STRAINED | 12-point burst | 3 contours + 4 fragments |
| 20× | 2,000/s | 98% | 17% | UNSTABLE | shattered irregular | broken outer + 8 fragments |

## Palette ladder (per stage)

| Stage | Mid | Bright | Edge |
| ----- | --- | ------ | ---- |
| 1× | `#8fa86a` | `#c8d89a` | `#6a7a58` |
| 2× | `#b4a050` | `#e0cc6a` | `#8a7840` |
| 4× | `#c4a35a` | `#e8d48b` | `#a87838` |
| 10× | `#d49248` | `#f0c060` | `#d97b5c` |
| 20× | `#e06850` | `#ffb088` | `#ff4a30` |

Stability rail uses striped fill whose stripe colour tracks the stage edge token.

## Transition

- Previous multiplier compresses vertically; new value slams up (~120ms)
- Host `scale(0.97 → 1.025 → 1)`
- At 20×: hold 100ms, then four sectors shift outward 3px once

## API

- `increaseBurstMultiplier()` / `resetBurstMultiplier()` / `replayBurstMultiplier()`
- `showFinalBurstMultiplier()` for reduced-motion final jump

## Reduced motion

Immediate 20× / 2,000/s / 98% / 17% / UNSTABLE with final geometry and shifted sectors.

## Accessibility

All metrics are text. Stability uses `role="meter"` with striped rail (not colour-only). Polite live region announces each stage.
