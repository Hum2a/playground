# Panel explosion reveal (portable recreation spec)

A solid irregular black cover fractures into seven interlocking comic-panel pieces that
accelerate away from an off-centre impact. Underlying content already exists beneath —
it does not fade in. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`. No copyrighted assets.

## Visual intent

- Initial cover reads as **one** black composition (panels abut tightly)
- Impact at **54% / 47%** with a brief paper mark + four red/white strokes (~80ms)
- Crack phase (~80–220ms): thin paper gaps radiate; host peeks through
- Separation (~220–620ms): panels fly outward with staggered delays; accelerating ease
- At least three panels carry red backings that lag ~25–40ms
- Host scales `.96 → 1` over ~300ms as the cover breaks — no opacity fade

Not confetti, particles, glass shatter, Panel Collapse, or Comic Panel Wipe.

## DOM

```html
<div class="panel-burst-demo">
  <section class="panel-burst-demo__host">… SPECIMEN FOUND / Graphic Burst Hover / VIEW ARTIFACT …</section>
  <div class="panel-burst" aria-hidden="true">
    <!-- 7 panels; panels 1,3,5 have .panel-burst__backing -->
    <div class="panel-burst__cracks">…6 crack strokes…</div>
    <div class="panel-burst__impact">…core + 4 strokes…</div>
  </div>
  <button type="button" data-panel-burst-trigger>BREAK SEAL</button>
</div>
```

Cover is decorative (`aria-hidden`). Host content stays semantic. Trigger is a real button.

## Colours

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Frozen clip-paths

| Panel | Region | clip-path |
| --- | --- | --- |
| 1 | upper-left | `polygon(0% 0%, 48% 0%, 52% 42%, 0% 48%)` |
| 2 | upper-centre | `polygon(46% 0%, 78% 0%, 72% 40%, 50% 44%)` |
| 3 | upper-right | `polygon(76% 0%, 100% 0%, 100% 46%, 70% 42%)` |
| 4 | centre-left | `polygon(0% 46%, 50% 42%, 48% 68%, 0% 78%)` |
| 5 | centre-right | `polygon(50% 42%, 100% 44%, 100% 72%, 52% 70%)` |
| 6 | lower-left | `polygon(0% 76%, 48% 66%, 42% 100%, 0% 100%)` |
| 7 | lower-right | `polygon(46% 68%, 100% 70%, 100% 100%, 40% 100%)` |

## Separation endpoints

| Panel | translate | rotate | delay |
| --- | --- | --- | --- |
| 1 | `-110%, -90%` | `-13deg` | 0ms |
| 2 | `-20%, -125%` | `8deg` | 20ms |
| 3 | `105%, -85%` | `15deg` | 35ms |
| 4 | `-125%, 5%` | `-9deg` | 55ms |
| 5 | `120%, -8%` | `11deg` | 70ms |
| 6 | `-90%, 105%` | `12deg` | 90ms |
| 7 | `100%, 115%` | `-14deg` | 110ms |

Easing: `cubic-bezier(0.55, 0, 0.85, 0.35)` (accelerate). Backing lag on panels 1/3/5: +30/65/100ms.

## Timing

| Phase | Window |
| --- | --- |
| Impact | 0–80ms |
| Crack | 80–220ms |
| Separate | 220–620ms |
| Host scale | ~300ms from separate start |

## API

```js
export function runPanelExplosion() { /* … */ }
export function resetPanelExplosion() { /* … */ }
```

- Busy lock while animating
- `resetPanelExplosion()` restores exact initial interlocking poses (deterministic; no DOM accumulation)
- No network / storage / `parent`

## Reduced motion

Immediately hide cover and show host at scale 1. No crack, flight, or scale animation.

## Acceptance notes

Full initial coverage at 320–768. Replay must restore identical geometry.
