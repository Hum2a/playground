# Panel Collapse Navigation (portable recreation spec)

Aggressive comic-panel page/state transition: opposing irregular panels crush the
current content into a vertical slit, fully cover for a swap, then tear apart
diagonally. Distinct from Comic Panel Wipe (which travels *over* content). Rebuild
from this document, `demo.css`, `demo.js`, and `contract.json`. No Persona assets.

## Visual intent

- Content is **visibly compressed** via `clip-path: inset(...)` — not faded
- At ~350ms ≈23% width remains; at crush ≈6px slit, then complete cover
- Left panel exits upper-left; right exits lower-right (not reverse of enter)
- Brief decorative `NEXT` flash (~120ms) during coverage
- Fast / graphic / mechanical — no blur, 3D, or elastic easing

## DOM structure

```html
<div class="panel-collapse-demo" data-panel-collapse-demo>
  <div class="panel-collapse-demo__viewport">
    <section data-state="a">SECTION 01 / CURRENT MATERIAL / CONTINUE</section>
    <section data-state="b" hidden>SECTION 02 / NEXT MATERIAL / BACK</section>
  </div>
</div>

<div class="panel-collapse" aria-hidden="true" data-panel-collapse>
  <div class="panel-collapse__wedge panel-collapse__wedge--l"></div>
  <div class="panel-collapse__wedge panel-collapse__wedge--r"></div>
  <div class="panel-collapse__panel panel-collapse__panel--left">…accents…</div>
  <div class="panel-collapse__panel panel-collapse__panel--right">…accents…</div>
  <p class="panel-collapse__next">NEXT</p>
</div>
```

## Colours

| Token | Hex |
| ----- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Frozen clip-paths

| Panel | clip-path |
| ----- | --------- |
| Left | `polygon(0% 0%, 88% 0%, 100% 12%, 92% 28%, 100% 46%, 86% 62%, 98% 78%, 84% 100%, 0% 100%)` |
| Right | `polygon(12% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 82%, 14% 64%, 0% 48%, 16% 30%, 2% 14%)` |

## Timing (980ms total)

| Phase | Window (ms) |
| ----- | ----------- |
| Anticipation (red wedges + ≤2px nudge) | 0–120 |
| Compression | 120–430 |
| Final crush to slit | 430–520 |
| Full coverage | 520–600 |
| `onCovered` | **550** |
| Diagonal reveal | 600–980 |

Easing: `cubic-bezier(0.7, 0, 0.3, 1)`.

## API

```js
export function runPanelCollapse(onCovered) { /* … */ }
```

Busy-guarded. Swap **only** inside `onCovered`. Sandbox-safe.

## Reduced motion

Both `prefers-reduced-motion` and `data-force-reduced-motion="true"`:
static full cover → swap → reveal. No crushing or panel travel.

## Accessibility

Overlay `aria-hidden`. Focus stays on semantic controls; after swap, focus the
newly revealed peer button.

## Porting checklist

1. Copy markup, CSS, and `runPanelCollapse`
2. Call from CONTINUE/BACK with swap inside `onCovered`
3. Verify slit compression (not fade), full cover before swap, diagonal reveal
4. Verify both RM triggers and 320–768px coverage
