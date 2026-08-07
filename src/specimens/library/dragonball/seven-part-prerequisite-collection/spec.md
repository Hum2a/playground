# Seven-Part Prerequisite Collection (portable recreation spec)

**Ref:** SPX-1070 · **Catalogue:** DB-055

Asymmetric **signal-radar collection** grammar: seven distinct glyph shapes each
occupy a shape-matched receptacle on a radar plate — not dots on a ring. Six
begin lit; the seventh **APPROVAL** star slot begins **VACANT**. Completion draws
seven hub-ward links and a central flare before publish unlocks. No franchise
objects, symbols, or IP colours.

## Visual intent

Teal radar grid with concentric rings and a slow sweep (decorative only).
Tokens are scattered blips at fixed asymmetric coordinates. Each receptacle
outlines the exact polygon of its token (diamond, square, triangle, hex,
cross, chevron, four-point star). The vacant star receptacle pulses gold until
filled.

## DOM structure

```html
<div class="spc" data-prerequisite-collection data-state="idle">
  <header>…SIGNAL RADAR // COLLECTION · 6 / 7…</header>
  <div class="spc__plate">
    <div class="spc__grid">…rings + sweep…</div>
    <svg class="spc__web">…7 lines to hub…</svg>
    <div class="spc__hub">…core + flares…</div>
    <div class="spc__anchor">…receptacle + token + tag… ×7</div>
    <div class="spc__incoming">…flying star…</div>
  </div>
  <button data-spc-receive>ACQUIRE SIGNAL</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Label | `SIGNAL RADAR // COLLECTION` |
| Initial count | `6 / 7` |
| Vacant slot | `VACANT` |
| Trigger | `ACQUIRE SIGNAL` |
| Mid acquire | `ACQUIRING` |
| After seat | `7 / 7` |
| Final status | `COMPLETE` |
| Publish locked | `LOCKED` |
| Publish ready | `READY` |

## Colours

| Token | Hex |
| ----- | --- |
| Background | `#0c1418` |
| Panel | `#121e24` |
| Ink | `#e8f0f2` |
| Teal | `#4a9e9a` |
| Gold | `#d4a84a` |
| Amber | `#e8c060` |

## Seven glyphs (frozen)

| Label | Shape | Initial |
| ----- | ----- | ------- |
| SPEC | diamond | lit |
| TEST | square | lit |
| BUILD | triangle | lit |
| REVIEW | hexagon | lit |
| SECURITY | cross | lit |
| SIGN | chevron | lit |
| APPROVAL | four-point star | **vacant** |

## Anchor positions (px, plate 320×260)

| Label | x | y |
| ----- | - | - |
| SPEC | 58 | 48 |
| TEST | 118 | 22 |
| BUILD | 248 | 62 |
| REVIEW | 272 | 148 |
| SECURITY | 198 | 218 |
| SIGN | 72 | 196 |
| APPROVAL | 18 | 118 |

Hub centre: **160, 130**.

## Frozen motion (ms from ACQUIRE SIGNAL)

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Acquire | 0–300 | Star flies from `translate(-72,-58) rotate(-18°) scale(.55)` |
| Dock | 300–420 | Seats `1 → 1.14 → 1`; count `7/7` |
| Hold | 420–560 | Complete seven-glyph field held 140ms |
| Link | 560–800 | Seven SVG links draw hub-ward (28ms stagger) |
| Ready | 800+ | Hub flares; `COMPLETE` · `PUBLISH READY` |

## API

- `window.sevenPartPrerequisiteCollection.receive()`
- `window.sevenPartPrerequisiteCollection.reset()`
- `window.sevenPartPrerequisiteCollection.init()`

## Reduced motion

Immediate `7/7`, all links drawn, hub flared, `PUBLISH READY`. Radar sweep
animation suppressed.

## Accessibility

Polite `role="status"` for phase text. Screen-reader summary in visually hidden
`data-spc-sr` element tracks count and vacant/linked state.
