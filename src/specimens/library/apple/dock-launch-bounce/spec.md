# Dock Launch Bounce (portable recreation spec)

Finite vertical launch bounce for one launcher item, resolving into a persistent
running indicator. Five abstract launcher tiles; only APP // 03 moves. No images,
audio, network, or storage.

## Visual intent

Three decreasing bounces (34 / 24 / 14px peaks), ~820ms total, 80ms hold after
final landing, then a 5×5px running dot beneath the target.

## DOM structure

```html
<div class="dlbounce" data-dock-launch-bounce data-state="closed">
  <div class="dlbounce__dock">
  <!-- 5 tiles; target data-dlb-target APP // 03 -->
  </div>
  <button data-dlb-launch>LAUNCH 03</button>
  <button data-dlb-replay>REPLAY</button>
  <p data-dlb-status>CLOSED</p>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Launcher items | `APP // 01` … `APP // 05` |
| Target | `APP // 03` |
| Trigger | `LAUNCH 03` |
| Replay | `REPLAY` |
| Status closed | `CLOSED` |
| Status running | `RUNNING` |

## Geometry (frozen)

| Token | Value |
| ----- | ----- |
| Tile | **44 × 44px** |
| Tile gap | **10px** (layout only) |
| Running indicator | **5 × 5px** dot beneath target |
| Item count | **5** |

## Bounce sequence

| Bounce | Peak (up) | Duration |
| ------ | --------- | -------- |
| 1 | **34px** | **320ms** |
| 2 | **24px** | **240ms** |
| 3 | **14px** | **260ms** |

Total bounce motion: **820ms**. Hold after third landing: **80ms**. Then
running indicator constructs; status `CLOSED → RUNNING`.

Other tiles remain static. Trigger disabled during sequence; cannot stack from
repeated clicks.

## API

- `runDockLaunchBounce()`
- `resetDockLaunchBounce()`
- `replayDockLaunchBounce()`

## Reduced motion

No bounce. Running indicator and RUNNING status appear immediately on launch.

## Accessibility

Status region is `aria-live="polite"`. Controls disabled while sequence runs.
