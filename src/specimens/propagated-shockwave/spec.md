# Propagated Shockwave (portable recreation spec)

Consequence propagation: one central operation completes, then a shockwave
travels outward so nearer dependents update before farther ones. Dragon Ball–
inspired ring language — no franchise characters or names in the UI.

Maps catalogue **DB-123 / Punch Shockwave** (`SPX-1088`).

## Layout (frozen)

ROOT at centre. Exactly **6** dependents at fixed polar positions:

| Node | Radius | Angle |
| ---- | ------ | ----- |
| A | 70px | −15° |
| B | 88px | 45° |
| C | 105px | 105° |
| D | 126px | 165° |
| E | 144px | 225° |
| F | 166px | 285° |

## Root impact

On APPLY CHANGE, ROOT scales `1 → .92 → 1.04 → 1` over **140ms**, then emits
exactly **3** concentric rings.

## Rings

| Ring | Start (after root) | Duration | Max Ø |
| ---- | ------------------ | -------- | ----- |
| 1 | 0ms | 520ms | ~380px |
| 2 | 90ms | 520ms | ~380px |
| 3 | 180ms | 520ms | ~380px |

Thin structural outlines only. No permanent glow. No infinite ripple.

## Dependency response

Each node updates when **Ring 1**’s leading edge reaches its radius:

`hitAt = 140 + 520 × (r / 190)`

| Node | hitAt from APPLY |
| ---- | ---------------- |
| A | 332ms |
| B | 381ms |
| C | 427ms |
| D | 485ms |
| E | 534ms |
| F | 594ms |

Order follows geometry (A before F), not array index alone.

## Node update

- Radial bump `+3px` then return over **100ms**
- `STALE → UPDATED` via vertical clipping
- Exactly **2** ticks visible **90ms**

## Completion

After F updates, rings finish (~840ms from APPLY). ROOT → **PROPAGATED**.
All six remain **UPDATED**. Static.

## API

```js
runPropagatedShockwave()
resetPropagatedShockwave()
```

## Reduced motion

Immediately show ROOT **PROPAGATED** and all six **UPDATED**.

## Accessibility

Dependency states are normal text (`STALE` / `UPDATED` / `PROPAGATED`).
