# Impact Frame Slam (portable recreation spec)

Comic impact-frame feedback: halftone flash → angular status slam **STANDBY → ALERT**
with corner wedges. Original action-language study — no franchise assets.

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

## Timing

| Phase | Duration |
| ----- | -------- |
| Flash | 90ms |
| Slam | 500ms |
| Settle | 280ms |

## API

```js
runImpactFrameSlam()
resetImpactFrameSlam()
replayImpactFrameSlam()
```

## Reduced motion

Immediately show **ALERT** with static wedges. No flash, translation, or scale slam.
