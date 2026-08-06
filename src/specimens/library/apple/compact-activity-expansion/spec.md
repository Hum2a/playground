# Compact Activity Expansion (portable recreation spec)

A compact persistent task capsule structurally expands into a richer live-status
surface and contracts again. Progress identity persists throughout. No images,
audio, network, or storage.

## Visual intent

Dark original capsule — not Apple Dynamic Island dimensions or branding. One
compact representation morphs into one expanded representation with deterministic
content construction order.

## DOM structure

```html
<div class="cae" data-compact-activity data-state="compact">
  <div class="cae__capsule">
    <svg class="cae__glyph"><!-- 72% arc --></svg>
    <div class="cae__compact"><!-- task + pct + 2 nodes --></div>
    <div class="cae__expanded"><!-- header, rows, ETA --></div>
  </div>
  <button data-cae-expand>EXPAND</button>
  <button data-cae-collapse>COLLAPSE</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Task | `DEPLOY // 2.4.0` |
| Compact percent | `72%` |
| Row 1 | `BUILD PASSED` |
| Row 2 | `TEST PASSED` |
| Row 3 | `DEPLOY 72%` |
| ETA | `ETA 00:38` |
| Expand | `EXPAND` |
| Collapse | `COLLAPSE` |

## Geometry

| State | Width | Height | Radius |
| ----- | ----- | ------ | ------ |
| Compact | 126px | 36px | 18px |
| Expanded | 318px | 152px | 24px |

Expansion duration: **360ms**.

## Reveal order (expand)

| Content | At % of 360ms |
| ------- | ------------- |
| Header | 35% (126ms) |
| Job rows | 50% (180ms) |
| ETA | 68% (245ms) |

Collapse reverses hierarchy (ETA → rows → header) before geometry contracts.

## Compact status nodes

Exactly **two** small circular nodes in compact state.

## Progress glyph

SVG ring at 72% fill. Remains visible and relocates to expanded header position.

## API

- `expandCompactActivity()`
- `collapseCompactActivity()`
- `resetCompactActivity()`

## Reduced motion

Switch geometry immediately or in **100ms** non-scaling transition. All status
text remains available.

## Accessibility

Polite status announces compact vs expanded state. Decorative nodes and glyph are
`aria-hidden`.
