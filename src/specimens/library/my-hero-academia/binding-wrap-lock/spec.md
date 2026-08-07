# Binding Wrap Lock (portable recreation spec)

Four binding strips rapidly wrap a card; a heavy LOCKED stamp overlays the centre.
Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Label | `TARGET` |
| Value | `Route 07-B` |
| Locked | `LOCKED` |
| Restrict | `Restrict` |
| Replay | `Replay` |
| Live unlocked | `Resource unlocked.` |
| Live wrap | `Binding strips deploying.` |
| Live locked | `Resource locked.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Wrap | 500ms |
| Stamp | 420ms (delay 380ms) |
| Total | 1150ms |

## Strips (4)

| Strip | Angle | Delay |
| ----- | ----- | ----- |
| Horizontal | −2° at 42% | 0ms |
| Vertical | 3° at 48% | 80ms |
| Diagonal 1 | 28° at 18% | 140ms |
| Diagonal 2 | −24° at 22% bottom | 200ms |

## Stamp

| Token | Value |
| ----- | ----- |
| Text | `LOCKED` |
| Rotation | −10° |
| Border | 4px accent |
| Size | 0.95rem, 0.28em tracking |

## API

```js
runBindingWrapLock()
resetBindingWrapLock()
replayBindingWrapLock()
```

## Wave B

Strip count, angles, and LOCKED stamp geometry frozen in contract — not colour-only.

## Reduced motion

Strips and stamp appear immediately without wrap animation.

## Acceptance

1. Idle: TARGET / Route 07-B; live reads unlocked.
2. Restrict: four strips sweep with staggered delays.
3. Done: heavy LOCKED stamp; accent inset border; live reads locked.
4. Replay resets to idle.
5. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant lock.
6. No network; content clipped to host.
