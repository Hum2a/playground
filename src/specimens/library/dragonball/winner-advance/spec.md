# Winner Advance

## Visual intent

`QUARTER-FINAL // 02` compares **NOVA (84)** and **KITE (71)**. On **RESOLVE**, a `+13` delta holds, NOVA is identified with two side brackets while KITE stays visible as **ELIMINATED**, a separate `NOVA` advancement token emerges and travels the fixed elbow bracket path into **SEMI-FINAL**, which docks as NOVA. The original matchup remains historical evidence. Inspired by bracket promotion — no franchise assets.

## DOM structure

```
.wa[data-wa][data-state]
  button[data-wa-resolve]
  .wa__status[role=status]
  .wa__board
    .wa__qf                 NOVA / KITE (original nodes remain)
    svg.wa__svg             fixed path M 118 72 H 178 V 100 H 214
    .wa__token              offset-path travel
    .wa__semi               next-round slot
```

## Timing (frozen)

| Phase | Duration | Effect |
| --- | --- | --- |
| Compare | 120ms | Score emphasis |
| Hold | 100ms | Delta `+13` |
| Identify | 140ms | NOVA `translateX(3px)` + 2 brackets; KITE strike + ELIMINATED |
| Emerge | 90ms | Token `54×26` from winner |
| Travel | 320ms | Path draws; token along elbow; KITE collapses |
| Dock | 100ms | Slot `1 → 1.08 → 1`; SEMI = NOVA |

## States

`idle` → `compare` → `hold` → `identify` → `emerge` → `travel` → `dock` → `complete`

## Reduced motion

Immediately show resolved QF and NOVA in semi-final.

## Accessibility

Status: `Nova defeated Kite 84 to 71 and advanced to the semi-final.`

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep path `M 118 72 H 178 V 100 H 214` and timings.
3. Call `resolveWinnerAdvance()` / `resetWinnerAdvance()`.
4. Honour both reduced-motion triggers.
