# Performance Meter Burst (portable recreation spec)

Three result bars **race in staggered order** to frozen heights; **OUTPUT** overshoots the ceiling with an accent **burst clip** shard.

**Ref:** SPX-2030

## Frozen bar heights

| Meter | Target | Stagger |
| ----- | ------ | ------- |
| POWER | 62% | 0ms |
| SPEED | 48% | 120ms |
| OUTPUT | 94% | 240ms |

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## API

- `window.performanceMeterBurst.run(root)`
- `window.performanceMeterBurst.reset(root)`

## Reduced motion

Instant final bar heights with OUTPUT burst clip and ceiling overshoot visible.
