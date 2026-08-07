# Rival Cards Clash (portable recreation spec)

Two rival profile cards slam from opposite sides into a central diagonal divider,
locking in a **READY** state with halftone burst and ink slash. Rebuild from this
document and `contract.json`. Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Clash | `Clash` |
| Replay | `Replay` |
| Left | `ALPHA` |
| Right | `BETA` |
| Impact | `READY` |
| Status idle | `Awaiting rival clash.` |
| Status clashing | `Cards slamming into divider…` |
| Status ready | `Rivals locked — READY.` |

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
| Card slam | 660ms |
| Total sequence | 1310ms |
| Impact fade | 280ms |
| Slash reveal | 240ms |
| Halftone burst | 200ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Arena | 340×200px |
| Divider angle | 18° |
| Divider top | −10% |
| Divider height | 120% |
| Divider width | 6px |
| Idle silhouettes | 18% width at arena edges |

## API

```js
runRivalCardsClash()
resetRivalCardsClash()
replayRivalCardsClash()
```

## Wave D

Impact overlay adds halftone burst and accent-outlined ink slash behind READY.

## Reduced motion

Instant settled composition — cards at center, divider visible, READY shown.

## Acceptance

1. Idle: off-screen cards; edge silhouettes; polite aria-live on status only.
2. Clash: 660ms slam; silhouettes fade.
3. Settled: halftone + slash + READY; Replay enabled.
4. Replay resets and reruns.
5. Divider frozen at contract geometry.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant settle.
7. No network.
