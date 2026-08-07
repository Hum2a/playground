# Impact Frame Slam (portable recreation spec)

Comic impact-frame feedback: **hard ink hatch panel** → angular status slam **STANDBY → ALERT**
with frozen corner wedges. Original action-language study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Eyebrow | `SYSTEM // FEEDBACK` |
| From | `STANDBY` |
| To | `ALERT` |
| Note idle | `Awaiting trigger.` |
| Note done | `Impact registered.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Geometry

| Element | Frozen value |
| ------- | ------------ |
| Stage max width | `360px` |
| Stage min height | `168px` |
| Stage border | `3px` paper |
| Stage clip chamfer | `14px` corners |
| Impact panel | Paper fill + `-35°` ink hatch (`2px` / `4px`) + `4px` inset frame |
| Wedge size | `18×3px` accent bars |
| Wedge inset | `10px` from each corner |
| Wedge stagger | `0 / 40 / 60 / 80ms` (tl → br) |

## Timing

| Phase | Duration |
| ----- | -------- |
| Flash | 90ms (`steps(2)`) |
| Slam | 500ms |
| Settle | 280ms |
| Wedge pop | 280ms |

## Acceptance

1. Flash shows opaque hard ink hatch panel (no `mix-blend-mode`) over 90ms.
2. Slam swaps STANDBY out and ALERT in from 120% / scale 1.35 with overshoot.
3. Four accent wedges pop at frozen corners with staggered delays.
4. Done state locks ALERT, wedges, and “Impact registered.” note.
5. Reduced motion: ALERT + static wedges immediately; no flash or translation.

## API

```js
runImpactFrameSlam()
resetImpactFrameSlam()
replayImpactFrameSlam()
```

## Reduced motion

Immediately show **ALERT** with static wedges. No flash, translation, or scale slam.
