# Explosive Notification Burst (portable recreation spec)

Centre **jagged ALERT polygon** scales outward into a clipped notification card.
Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Badge | `ALERT` |
| Title | `Priority notice` |
| Body | `Response required — review dispatch.` |
| Live clear | `Channel clear.` |
| Live burst | `Burst expanding.` |
| Live active | `Alert notification active.` |

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
| Burst polygon | 420ms |
| Card delay | 120ms |
| Settle | 650ms |
| Total | 1070ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Burst size | 28px |
| Burst scale max | 11× |
| Burst clip | frozen 7-point jagged polygon |
| Card clip | frozen 8-point jagged polygon |

## API

```js
runExplosiveNotificationBurst()
resetExplosiveNotificationBurst()
replayExplosiveNotificationBurst()
```

## Wave B

Circular core replaced with frozen jagged polygon growth — no soft radial bloom.

## Reduced motion

ALERT card appears immediately; burst polygon skipped.

## Acceptance

1. Idle: burst hidden; card hidden; polite live region.
2. Trigger: angular polygon scales to 11× over 420ms.
3. Card enters 120ms after burst with jagged clip-path.
4. Done: ALERT readable; Replay enabled.
5. Replay resets and reruns.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant card.
7. No network; clipped to stage.
