# Shard Hover (portable recreation spec)

Persona 3 Reload–inspired **glass access panel**. A completed blue-glass surface
breaks into seven deterministic polygonal shards when the panel is hovered or
keyboard focused. This is an original interface treatment, not game artwork.

## Visual intent

- A rectangular `330 × 196px` deep-blue panel with a square cyan hairline
- Exactly **seven** clipped glass shards form the full surface
- Fine pale-cyan shard borders make the completed seams legible
- Hover or focus moves each shard away from its assembly point
- Copy stays readable above the decorative glass surface

## DOM structure

```
button.shard-hover[aria-describedby]
  .shard-hover__shards[aria-hidden]
    .shard-hover__shard.shard-hover__shard--1 … --7
  .shard-hover__content
    .shard-hover__eyebrow
    strong.shard-hover__title
    .shard-hover__prompt
p#shard-hover-note.shard-hover__note
```

## Geometry and motion

| Property | Value |
| --- | --- |
| Panel | `330 × 196px` |
| Shard count | exactly `7` |
| Border | `1px` cyan hairline, square corners |
| Fracture duration | `380ms` |
| Fracture easing | `cubic-bezier(.16,.92,.28,1)` |
| Direction | outward, unique fixed vector per shard |

The seven coordinates and vectors are fixed in CSS: no random generation, no
layout measurement, and no stagger sequence.

## Interaction and accessibility

The whole panel is a native `button`, so it is reachable by keyboard. `:hover`
and `:focus-visible` use the same fractured state. A `2px` cyan focus ring with
a `4px` offset remains visible. The seven shards are decorative and hidden from
assistive technology; the note describes the effect.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or
`[data-force-reduced-motion="true"]`, the hover/focus result still separates the
seven shards but changes immediately. No transition or looping motion runs.

## Porting

1. Copy `demo.html` and `demo.css` verbatim.
2. Keep all seven shard elements, their polygons, and their fixed vectors.
3. Preserve the button semantics, focus-visible styling, and both reduced-motion selectors.
