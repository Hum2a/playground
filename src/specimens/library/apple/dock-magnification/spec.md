# Dock Magnification (portable recreation spec)

Pointer-proximity magnification rail: nine abstract application tiles enlarge
according to a Gaussian curve keyed to pointer distance from each tile centre.
Neighbours redistribute horizontally so enlarged tiles never overlap. Tiles
grow upward from a shared baseline. No images, audio, network, or storage.

## Visual intent

Closest tile is largest; magnification falls with distance. Leaving the rail
settles every tile back to scale 1 over 240ms.

## DOM structure

```html
<div class="dmagn" data-dock-magnification>
  <div class="dmagn__rail" data-dmagn-rail>
    <div class="dmagn__tiles" data-dmagn-tiles>
      <!-- 9 buttons data-dmagn-tile="0"…"8" with geometric glyphs -->
    </div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Tiles | `01`–`09` (aria-label Application NN) |
| Hint | Move pointer along the dock rail. |
| Status rest | Dock at rest. |
| Status active | Dock magnified. |

## Geometry (frozen)

| Token | Value |
| ----- | ----- |
| Base tile | **42 × 42px** |
| Gap | **8px** |
| Rail padding | **12px** |
| Item count | **9** |
| Max scale | **1.65** |

## Magnification curve

For each tile rest centre, distance `d` from pointer x:

`scale = min(1.65, 1 + 0.65 × exp(-(d²)/(2×70²))`

Distance uses **rest** centre positions, not live layout centres.

## Layout

Scaled width = `42 × scale`. Tiles pack left from padding with 8px gaps.
`transform-origin: bottom center` anchors growth to rail baseline.

## Settle

Pointer leaving rail: all scales return to 1 over **240ms** cubic ease-out.

## Reduced motion

Disable proximity scaling entirely. Retain hover/focus outline on tiles.
Keyboard focus announces application number without motion scaling.

## Accessibility

Tiles are focusable buttons with aria-labels. Status region is
`aria-live="polite"`.
