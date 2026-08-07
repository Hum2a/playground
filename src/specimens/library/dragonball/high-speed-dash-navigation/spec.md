# High-Speed Dash Navigation (portable recreation spec)

Extreme-speed navigation between distant regions. The path stays perceptible —
unlike teleportation. Selection **arrives with velocity language**: layered traces,
two residual ghosts, body streak, and lock overshoot.

Maps catalogue **DB-134 / High-Speed Dash** (`SPX-1099`).

## Layout

Three horizontal destinations: **OVERVIEW** · **METRICS** · **LOGS**.  
Centre distance OVERVIEW → LOGS: **320px**. Indicator starts at OVERVIEW.

## Sequence

| Phase | Motion | Duration |
| ----- | ------ | -------- |
| Anticipate | 4px opposite travel, then `scaleX(.9)` | 55ms |
| Launch | first 40px | 80ms |
| Cruise | ~225px; 5 speed traces + 2 ghosts + body streak | 170ms |
| Pass | METRICS `translateY(-2px → 0)` (no stop) | ~90ms |
| Brake | final 55px, `scaleX(1.12)` then 1 | 110ms |
| Lock | overshoot +8px / `scaleX(1.08)` → settle; 4 corner ticks | 90ms |

Trace lengths (fixed): **18 · 30 · 44 · 62 · 78px**.  
Ghost lag: **20px** and **36px** behind body during travel only.

## Final

Selection only at LOGS. Static. No residual trails or ghosts.

## API

```js
runHighSpeedDash()
resetHighSpeedDash()
```

## Reduced motion

Immediately move selection to LOGS at `translateX(320px)`.

## Accessibility

Active destination is text (`ACTIVE // LOGS`). Polite live region.
