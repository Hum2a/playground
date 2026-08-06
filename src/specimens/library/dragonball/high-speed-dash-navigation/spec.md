# High-Speed Dash Navigation (portable recreation spec)

Extreme-speed navigation between distant regions. The path stays perceptible —
unlike teleportation. No random trails.

Maps catalogue **DB-134 / High-Speed Dash** (`SPX-1099`).

## Layout

Three horizontal destinations: **OVERVIEW** · **METRICS** · **LOGS**.  
Centre distance OVERVIEW → LOGS: **320px**. Indicator starts at OVERVIEW.

## Sequence

| Phase | Motion | Duration |
| ----- | ------ | -------- |
| Anticipate | 4px opposite travel, then `scaleX(.9)` | 55ms |
| Launch | first 40px | 80ms |
| Cruise | remaining major span (~225px), 5 speed traces | 170ms |
| Pass | METRICS `translateY(-2px → 0)` (no stop) | ~90ms |
| Brake | final 55px, `scaleX(1.12)` then 1 | 110ms |
| Lock | 4 corner ticks; traces gone; `ACTIVE // LOGS` | 90ms |

Trace lengths (fixed): **18 · 30 · 44 · 62 · 78px**.

## Final

Selection only at LOGS. Static. No residual trails.

## API

```js
runHighSpeedDash()
resetHighSpeedDash()
```

## Reduced motion

Immediately move selection to LOGS.
