# Mission Complete Burst (portable recreation spec)

Mission debrief UI: four telemetry widgets collapse in fixed order; **COMPLETE**
and **RANK A** slam in as an angular stamp panel. Original study — no franchise
assets.

## Copy

| Role | Text |
| ---- | ---- |
| Widget 1 | `ALT` / `12m` |
| Widget 2 | `SPD` / `84` |
| Widget 3 | `OBJ` / `3/3` |
| Widget 4 | `SIG` / `STABLE` |
| Complete | `COMPLETE` |
| Rank | `RANK A` |
| Live idle | `Mission telemetry active.` |
| Live collapse | `Collapsing telemetry…` |
| Live stamp | `Completion stamp.` |
| Live done | `Mission complete. Rank A.` |

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
| Widget collapse | 420ms |
| Stagger | 40ms × widget index |
| Burst delay | 400ms |
| Stamp slam | 360ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Stage min height | 160px |
| Stage clip corner | 12px |
| Stamp inner corner | 8px |

## API

```js
runMissionCompleteBurst()
resetMissionCompleteBurst()
replayMissionCompleteBurst()
```

## Wave B

Frozen collapse order (ALT → SPD → OBJ → SIG) and stagger. Burst is an angular
`clip-path` stamp with inner border frame — not a soft scale glow.

## Reduced motion

Widgets hidden and COMPLETE / RANK A stamp appears immediately.

## Acceptance

1. Idle: four widgets visible; burst hidden.
2. FINALIZE: widgets collapse in fixed order with 40ms stagger.
3. Angular COMPLETE stamp slams in after 400ms delay.
4. Done: COMPLETE + RANK A visible; live announces rank.
5. RESET restores idle state.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant stamp.
7. No network; content clipped to host.
