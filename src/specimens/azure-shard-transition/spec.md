# Azure Shard Transition (portable recreation spec)

Elegant page/state transition: translucent blue crystalline shards slide inward over a
solid deep-navy angular wipe, fully obscure the viewport for a content swap, then drift
upward and outward. Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.
No copyrighted Persona artwork, logos, or extracted assets.

## Visual intent

- Weightless crystalline / underwater blue language (Persona 3 Reload–inspired, original geometry)
- Seven distinct `clip-path` shards plus a solid `#071b33` backing that guarantees coverage
- Midpoint must fully cover the viewport before the swap — no old-state flash
- Exit paths drift upward/outward; they must not reverse the enters
- Overlay is decorative (`aria-hidden`); focus stays on controls
- Motion language must read differently from the comic-panel wipe (elegant vs aggressive)

## DOM structure

Demo surface owns A/B content. Overlay sits as a sibling above it.

```html
<div class="azure-shard-demo" data-azure-shard-demo>
  <section data-state="a">… LAYER 01 / TARTARUS / CROSS → …</section>
  <section data-state="b" hidden>… LAYER 02 / THE VELVET / RETURN → …</section>
</div>

<div class="azure-shard" aria-hidden="true" data-azure-shard>
  <div class="azure-shard__backing"></div>
  <div class="azure-shard__shard azure-shard__shard--1"></div>
  <div class="azure-shard__shard azure-shard__shard--2"></div>
  <div class="azure-shard__shard azure-shard__shard--3"></div>
  <div class="azure-shard__shard azure-shard__shard--4"></div>
  <div class="azure-shard__shard azure-shard__shard--5"></div>
  <div class="azure-shard__shard azure-shard__shard--6"></div>
  <div class="azure-shard__shard azure-shard__shard--7"></div>
</div>
```

Host: a relative, `overflow: hidden` frame sized to the transition surface. Idle overlay uses
`pointer-events: none`.

## Colours

| Token | Hex |
| ----- | --- |
| Deep navy | `#071b33` |
| Ocean blue | `#0878c9` |
| Bright cyan | `#41c9ff` |
| Ice | `#dff7ff` |
| White | `#f7fcff` |

Shard borders: `1px solid rgba(223,247,255,.55)`. Optional `::before` linear edge highlights only —
no blur-heavy glassmorphism, images, canvas, SVG assets, or external textures.

## Frozen clip-paths

| Shard | Colour | Opacity | clip-path |
| ----- | ------ | ------- | --------- |
| `--1` | ocean | `.88` | `polygon(0% 0%, 100% 8%, 42% 100%)` |
| `--2` | cyan | `.92` | `polygon(0% 12%, 88% 0%, 100% 78%, 18% 100%)` |
| `--3` | ice | `.78` | `polygon(40% 0%, 58% 0%, 72% 100%, 28% 100%)` |
| `--4` | ocean | `.96` | `polygon(8% 0%, 100% 6%, 94% 100%, 0% 88%)` |
| `--5` | cyan | `.84` | `polygon(0% 20%, 100% 0%, 78% 100%)` |
| `--6` | navy | `.90` | `polygon(0% 0%, 100% 18%, 72% 100%, 0% 82%)` |
| `--7` | white | `.72` | `polygon(35% 0%, 52% 0%, 65% 100%, 22% 100%)` |

Backing enters via an angular `clip-path` wipe (not opacity fade) and is fully covering by 480ms.
Shard sizes overshoot the viewport so staggered entries leave no holes at widths 320–768.

## Timing

Easing: `cubic-bezier(0.33, 0, 0.2, 1)`. Total sequence **1250ms**.

| Phase | Window (ms) | Notes |
| ----- | ----------- | ----- |
| Entry | 0–480 | Backing wipe + shard stagger `0 / 40 / 75 / 110 / 150 / 190 / 230`; enter duration 250ms |
| Covered | 480–650 | Viewport fully obscured; call `onCovered()` at **560ms** |
| Exit | 650–1250 | Upward/outward drift at varied speeds; some shards rotate slowly |

Drive phases with classes `.azure-shard--active` then `.azure-shard--exit`.

## API

```js
export function runShardTransition(onCovered) { /* … */ }
```

- Guard with a `busy` flag; ignore re-entrancy; never stack overlays
- Normal path: activate → `onCovered()` once at 560ms → exit → idle at 1250ms
- Swap content **only** inside `onCovered`
- Do not touch `parent`, storage, fetch, or move focus onto the overlay

## Reduced motion

Honour both:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]` on the document element

No flying shards. Instantly show the solid deep-navy coverage frame → `onCovered()` → reveal.

## Accessibility

- Overlay root: `aria-hidden="true"`
- Idle: `pointer-events: none`
- Leave focus on the clicked control, or move it to the newly revealed peer button after swap
- Do not trap focus in the overlay

## Porting checklist

1. Copy markup, CSS (colours + polygons + keyframes), and `runShardTransition`
2. Call `runShardTransition(() => { /* swap route / section */ })` from your trigger
3. Ensure the transition surface clips (`overflow: hidden`) and is tall enough for shard travel
4. Verify full coverage at ~560ms on a 320-wide viewport and spam-click safety
5. Verify both reduced-motion triggers (no shard travel)
