# Team Formation Snap (portable recreation spec)

Individual profile cards fly from frozen scatter positions into bottom-row formation
slots on a stagger ladder; **UNIT READY** end stamp slams in at settle. Original
study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Stamp | `UNIT READY` |
| Form up | `Form up` |
| Live scattered | `Units scattered.` |
| Live snap | `Snapping into formation.` |
| Live ready | `Formation complete — UNIT READY.` |

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
| Snap | 580ms |
| Stagger B | 60ms |
| Stagger C | 120ms |
| Stamp | 180ms |
| Settle | 650ms |
| Total | 1410ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Card A scatter | 8% / 12% |
| Card B scatter | 52% / 8% |
| Card C scatter | 30% / 48% |
| Slot positions | 6% · 36% · 66% |
| Row bottom | 18px |
| Stamp rotate | −6° |

## API

```js
runTeamFormationSnap()
resetTeamFormationSnap()
replayTeamFormationSnap()
```

## Wave B

Card offsets and snap stagger frozen via CSS vars; UNIT READY end stamp replaces plain label.

## Reduced motion

Cards and stamp appear in formation immediately.

## Acceptance

1. Idle: cards scattered; stamp hidden.
2. Form up: staggered snap to bottom row.
3. UNIT READY stamp slams in after snap.
4. Done: slot outlines visible; Replay enabled.
5. Replay resets scatter.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant formation.
7. No network; clipped to stage.
