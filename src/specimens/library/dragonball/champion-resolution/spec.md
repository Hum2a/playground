# Champion Resolution (portable recreation spec)

Final-selection after a tournament: one canonical champion emerges; the runner-up
and historical field remain visible. No trophy or confetti.

Maps catalogue **DB-182 / Champion Result** (`SPX-1147`).

## Initial

Equal finalists **ATLAS // 92** and **NOVA // 87** under `MODEL ARENA // 08`
(`FINAL` · `ACTIVE`). Exactly **6** subdued historical markers behind them.

## Sequence

| Phase | Motion | Duration |
| ----- | ------ | -------- |
| Scores | Rails construct to 92 / 87 | 300ms |
| Hold | Both scores held | 120ms |
| Delta | `+05` constructs | ~140ms |
| Resolve | NOVA −4px / 92% + RUNNER-UP; ATLAS +26px, frame +4px, **8** thin rays (simultaneous) | ~280ms |
| Converge | 6 paths to ATLAS, stagger 25ms | |
| Stamp | Angular outline fades in (no scale bounce); FINAL→CHAMPION; ACTIVE→COMPLETE | ~120ms |

## Final

ATLAS central as **CHAMPION // ATLAS**. NOVA remains **RUNNER-UP**. Markers stay
subdued. Static. No loops.

## API

```js
runChampionResolution()
resetChampionResolution()
```

## Reduced motion

Immediately show the champion composition. Announce:
`Atlas is champion with score 92. Nova runner-up with 87.`
