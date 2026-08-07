# Training Target Acquisition (portable recreation spec)

Training target cards acquire angular brackets on a frozen stagger ladder and a
four-step confidence meter on SCAN. Original study — no franchise assets.

**Ref:** SPX-2028 · **Catalogue:** MHA-054

## Copy

| Role | Text |
| ---- | ---- |
| Heading | `TRAINING TARGETS` |
| Scan | `SCAN` |
| Locked | `LOCKED` |
| Targets | `DRONE` · `DUMMY` · `BOT` |

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
| Scan | 660ms |
| Confidence show delay | 120ms |

## Bracket ladder

| Corner | Delay |
| ------ | ----- |
| TL | 0ms |
| TR | 80ms |
| BL | 160ms |
| BR | 240ms |

## Confidence ladder

`24%` → `48%` → `72%` → `92%` (frozen four-step fill)

## API

```js
runTargetAcquisition()
resetTargetAcquisition()
replayTargetAcquisition()
```

## Wave B

Title aligned to catalogue; bracket and confidence ladders frozen via CSS vars.

## Reduced motion

Brackets and confidence appear immediately at 92% with LOCKED.

## Acceptance

1. Three targets; pick then SCAN.
2. Brackets snap on frozen stagger ladder.
3. Confidence fills in four discrete steps to 92%.
4. LOCKED label at end; SCAN disabled.
5. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant lock.
6. No network; aria-live on status.
