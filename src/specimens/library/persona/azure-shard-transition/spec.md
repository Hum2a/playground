# Blue Glass Shard Transition (portable recreation spec)

Cool, precise page/container transition: large translucent blue glass panes attack
across the host from several directions, obscure the current surface, swap content
only under full pane coverage, then continue their trajectories to reveal the
destination. Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.
No copyrighted Persona artwork, logos, or extracted assets.

## Visual intent

- Persona 3 Reload–inspired cool blue glass / refraction / angular language (original CSS geometry)
- Seven major panes + two thin accent slivers — large surfaces, not particles
- Three depth groups (rear / mid / foreground) with distinct travel speeds and scale
- Coverage comes from overlapping pane composition — **no** opaque full-screen cheat rectangle
- Exit continues trajectories (not a reverse curtain)
- Destination settles `scale(.985 → 1)` over ~180ms — no crossfade

## DOM structure

```
.azure-shard-host[data-azure-shard-host]     position:relative; overflow:hidden
  .azure-shard-demo[data-azure-shard-demo]
    section[data-state=a]   ARCHIVE // 03 / MIDNIGHT / Current surface / TRANSITION
    section[data-state=b]   ARCHIVE // 04 / DARK HOUR / Destination surface / TRANSITION
  .azure-shard[aria-hidden][data-azure-shard]
    .azure-shard__pane--1…7   (+ optional .azure-shard__refract)
    .azure-shard__sliver--a|b
```

## Copy

| State | Small | Large | Secondary | Trigger |
| --- | --- | --- | --- | --- |
| A | `ARCHIVE // 03` | `MIDNIGHT` | `Current surface` | `TRANSITION` |
| B | `ARCHIVE // 04` | `DARK HOUR` | `Destination surface` | `TRANSITION` |

## Palette

| Token | Hex |
| --- | --- |
| Deep navy | `#071525` |
| Midnight blue | `#0b2f52` |
| Electric blue | `#1976d2` |
| Glass blue | `#49a9e8` |
| Pale reflection | `#b9e7ff` |
| White | `#eef8ff` |

Opacity range on panes: **0.74–0.94**. Graphic glass edges + gradients — no blur-heavy glassmorphism.

## Frozen clip-paths

| Pane | Role / depth | Opacity | clip-path |
| --- | --- | --- | --- |
| 1 | upper-left diagonal / mid | `.86` | `polygon(0% 0%, 100% 12%, 58% 100%, 0% 78%)` |
| 2 | lower-left long / rear | `.90` | `polygon(0% 22%, 92% 0%, 100% 70%, 12% 100%)` |
| 3 | centre dominant / mid | `.80` | `polygon(8% 0%, 100% 8%, 88% 100%, 0% 90%)` |
| 4 | upper-right / fore | `.92` | `polygon(18% 0%, 100% 0%, 100% 100%, 0% 72%)` |
| 5 | bottom → upper / mid | `.88` | `polygon(0% 28%, 100% 0%, 100% 100%, 8% 100%)` |
| 6 | narrow vertical / fore | `.74` | `polygon(12% 0%, 78% 4%, 100% 100%, 0% 94%)` |
| 7 | wide rear-depth / rear | `.94` | `polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)` |
| Sliver A | thin accent | `.78` | `polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)` |
| Sliver B | thin accent | `.82` | `polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)` |

Refraction: panes 1, 3, 7 expose `.azure-shard__refract` lines offset **2–5px** during max coverage only. Decorative — never duplicate readable content.

## Depth / motion

| Group | Panes | Behaviour |
| --- | --- | --- |
| Rear | 2, 7 | Slower; scale ≈ `.95 → 1.04` |
| Mid | 1, 3, 5 | Primary coverage |
| Fore | 4, 6 | Fastest; pane 6 scales ≈ `1 → 1.15` |

Entrance staggers (ms): `0 / 35 / 65 / 95 / 125 / 155 / 190` (+ slivers at 110 / 145).

## Timing

Easing: `cubic-bezier(0.33, 0, 0.2, 1)`. Total **850ms**.

| Phase | Window (ms) | Notes |
| --- | --- | --- |
| Entrance | 0–420 | Staggered panes achieve effective full coverage |
| Covered | 390–440 | Call `onCovered()` at **410ms** — swap A↔B only here |
| Exit | 420–820 | Continue trajectories (not reverse) |
| Destination settle | after swap | `scale(.985 → 1)` over **180ms** |

Classes: `.azure-shard--active` → `.azure-shard--exit`; demo `.azure-shard-demo--settle`.

## API

```js
export function runShardTransition(onCovered) { /* … */ }
export function resetShardTransition() { /* State A */ }
export function replayShardTransition() { /* harness restart */ }
```

- Busy-guard; never stack overlays
- Swap content **only** inside `onCovered`
- Listen for `{ type: 'restart' }` → reset to State A
- No parent / storage / fetch

## Reduced motion

Both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

Immediate State A→B swap. Optional static diagonal glass accent (pane 3) for a brief flash — **no** directional travel, **no** destination scale.

## Accessibility

- Overlay: `aria-hidden="true"`
- One semantic content state visible at a time (`hidden` on the other)
- Real `TRANSITION` buttons; focus moves to the revealed peer after swap

## Porting checklist

1. Copy host + demo + overlay markup, CSS (palette, polygons, keyframes), and API
2. Call `runShardTransition(() => { /* swap */ })` from your trigger
3. Keep host `position: relative; overflow: hidden`
4. Verify full pane coverage at ~410ms on **320px** and **768px** widths
5. Verify both reduced-motion triggers
