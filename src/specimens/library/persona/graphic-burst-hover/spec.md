# Graphic Burst Hover

## Visual intent

A restrained CTA (`VIEW PROJECT`) gains explosive Persona-adjacent graphic emphasis on hover/focus: eight angular shards burst outward from the centre while a red irregular backing offsets behind a stable black label. Prefer CSS-only — no game assets.

## DOM structure

```
.gbh
  a.gbh__cta
    .gbh__burst[aria-hidden]
      .gbh__shard--long-a|long-b
      .gbh__shard--wedge-a|wedge-b
      .gbh__shard--tri-a|tri-b
      .gbh__shard--line-a|line-b
    .gbh__backing[aria-hidden]
    .gbh__label
```

## Colour / size

| Token | Value |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |
| CTA | `180×48px` |
| Backing offset | `6px 5px` |
| Enter | `220ms` |
| Exit | `150ms` |

## Shard contract (idle → active)

| Shard | Size | Travel (tx, ty) | Rotate | Role |
| --- | --- | --- | --- | --- |
| long-a | 78×10 | `-48, -38` | `-38deg` | long diagonal |
| long-b | 72×9 | `50, 36` | `28deg` | long diagonal |
| wedge-a | 36×22 | `32, -28` | `12deg` | red wedge |
| wedge-b | 32×20 | `-30, 26` | `-18deg` | red wedge |
| tri-a | 24×24 | `-22, -32` | `-8deg` | black triangle |
| tri-b | 22×22 | `28, 30` | `16deg` | black triangle |
| line-a | 58×3 | `55, -12` | `-6deg` | speed line |
| line-b | 50×3 | `-52, 14` | `8deg` | speed line |

Idle: `scale(0.1)` near centre, `opacity: 0`. Active: `scale(1)` at travel offsets.

Target reaction: `translateY(-2px) rotate(-1deg) scale(1.02)`.

## States

- Idle: restrained paper CTA
- `:hover` / `:focus-visible`: full burst + red backing + inverted label
- Exit: shards contract in `150ms` (faster than enter)
- All burst layers: `pointer-events: none`

## Reduced motion

Both repository triggers: no travel transitions; final burst composition appears/disappears immediately with hover/focus.

## Accessibility

- Real `<a href="#project">`
- Burst + backing `aria-hidden`
- Visible `:focus-visible` ring in red

## Porting

1. Place CTA in a relative overflow-clipped host.
2. Import CSS verbatim.
3. Keep shard `pointer-events: none` so hover does not flicker.
4. Honour both reduced-motion triggers.
