# Winner Banner Breakthrough (portable recreation spec)

Tournament result UI: after scores settle, a jagged **WINNER — TEAM A** banner
tears through the scoreboard; the winner score ticks twice on impact. Original
study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Head | `MATCH RESULT` |
| Team A | `TEAM A` |
| Team B | `TEAM B` |
| VS | `VS` |
| Score A | `12` |
| Score B | `8` |
| Banner | `WINNER — TEAM A` |
| Live idle | `Scores settled. Awaiting declaration.` |
| Live break | `Banner breaking through…` |
| Live done | `Team A declared winner.` |

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
| Banner breakthrough | 740ms |
| Score tick | 180ms × 2 |
| Tick delay | 520ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Board clip corner | 12px |
| Banner slot height | 36px |
| Tear notches | 12 per edge |

## API

```js
runWinnerBannerBreakthrough()
resetWinnerBannerBreakthrough()
replayWinnerBannerBreakthrough()
```

## Wave B

Frozen `breakMs`, `tickMs`, and `tickDelayMs`. Banner uses jagged tear
`clip-path`; winner score reacts with double tick.

## Reduced motion

Banner appears in slot immediately — no slide breakthrough or score ticks.

## Acceptance

1. Idle: scoreboard visible; banner off-panel; polite live region.
2. DECLARE WINNER: jagged banner slides through over 740ms.
3. TEAM A score ticks twice at 520ms delay (accent pulse).
4. Done: banner visible; controls updated.
5. RESET restores idle state.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant banner.
7. No network; content clipped to host.
