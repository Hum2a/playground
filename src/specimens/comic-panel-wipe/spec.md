# Comic panel wipe (portable recreation spec)

Graphic page-transition language: five irregular clipped colour panels slam across the
viewport, fully obscure content for a short coverage window, then tear away in
non-mirrored exit directions while the underlying UI swaps. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No copyrighted assets.

## Visual intent

- Comic / graphic-novel energy: jagged `clip-path` panels, flat fills only
- Palette locked to red `#e60012`, black `#090909`, paper `#f5f1e8`
- Midpoint must fully cover the viewport (deliberate overlap + overshoot; no holes)
- Exit paths must not reverse the enter paths
- Overlay is decorative (`aria-hidden`); focus stays on controls

## DOM structure

Demo surface owns A/B content. Overlay sits as a sibling (or portal-equivalent) above it.

```html
<div class="comic-wipe-demo" data-comic-wipe-demo>
  <section data-state="a">… SECTION 01 / THE ARCHIVE / NEXT → …</section>
  <section data-state="b" hidden>… SECTION 02 / NEW MATERIAL / BACK → …</section>
</div>

<div class="comic-wipe" aria-hidden="true" data-comic-wipe>
  <div class="comic-wipe__panel comic-wipe__panel--1"></div>
  <div class="comic-wipe__panel comic-wipe__panel--2"></div>
  <div class="comic-wipe__panel comic-wipe__panel--3"></div>
  <div class="comic-wipe__panel comic-wipe__panel--4">
    <p class="comic-wipe__microtype">NEXT → NEXT → 次へ → …</p>
  </div>
  <div class="comic-wipe__panel comic-wipe__panel--5">
    <p class="comic-wipe__impact">NEXT!</p>
  </div>
</div>
```

Host: a relative, `overflow: hidden` frame sized to the transition surface. Idle overlay uses
`pointer-events: none`.

## Colours

| Token | Hex |
| ----- | --- |
| Red | `#e60012` |
| Black | `#090909` |
| Paper | `#f5f1e8` |

Flat fills only. No gradients, blur, glass, soft shadows, rounded panels, or 3D.

## Frozen clip-paths

| Panel | Colour | clip-path |
| ----- | ------ | --------- |
| `--1` | black | `polygon(0% 0%, 78% 0%, 100% 18%, 82% 34%, 96% 52%, 74% 68%, 92% 86%, 70% 100%, 0% 100%)` |
| `--2` | red | `polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 62%, 28% 28%)` |
| `--3` | paper | `polygon(0% 22%, 62% 0%, 100% 38%, 48% 100%, 0% 100%)` |
| `--4` | black | `polygon(12% 0%, 100% 8%, 100% 100%, 0% 100%, 0% 34%, 22% 18%)` |
| `--5` | red | `polygon(0% 0%, 88% 0%, 100% 22%, 92% 48%, 100% 72%, 78% 100%, 0% 100%, 8% 56%)` |

Panel sizes intentionally overshoot the viewport (≈10–25vw) so staggered entries leave no holes
around 420–500ms at widths 320–768.

## Timing

Easing: `cubic-bezier(0.7, 0, 0.3, 1)`. Total sequence **1050ms**.

| Phase | Window (ms) | Notes |
| ----- | ----------- | ----- |
| Attack | 0–380 | Stagger delays `0 / 45 / 90 / 135 / 180` for panels 1–5 |
| Covered | 380–520 | Viewport fully obscured; call `onCovered()` ≈450ms |
| Tear-away | 520–1050 | Exit directions: up / left / right / down / upper-right |

Drive phases with classes `.comic-wipe--active` then `.comic-wipe--exit` (or equivalent).

## Typography

System sans stack only (no `@font-face`):

`ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif`

- `__microtype`: tiny uppercase strip on panel 4
- `__impact`: huge clipped `NEXT!` (or `GO!`) on panel 5

## API

```js
export function runComicWipe(onCovered) { /* … */ }
```

- Guard with a `busy` flag; ignore re-entrancy; never stack overlays
- Normal path: activate → `onCovered()` once near 450ms → tear-away → idle at 1050ms
- Swap content **only** inside `onCovered`
- Do not touch `parent`, storage, fetch, or move focus onto the overlay

## Reduced motion

Honour both:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]` on the document element

Skip the sweeping sequence. Brief static cover flash (or immediate swap) → `onCovered()` → reveal.
No staggered enter/exit animations.

## Accessibility

- Overlay root: `aria-hidden="true"`
- Idle: `pointer-events: none`
- Leave focus on the clicked control, or move it to the newly revealed peer button after swap
- Do not trap focus in the overlay

## Porting checklist

1. Copy markup, CSS (colours + polygons + keyframes), and `runComicWipe`
2. Call `runComicWipe(() => { /* swap route / section */ })` from your trigger
3. Ensure the transition surface clips (`overflow: hidden`) and is tall enough for panel travel
4. Verify coverage at ~450ms on a 320-wide viewport and spam-click safety
5. Verify both reduced-motion triggers
