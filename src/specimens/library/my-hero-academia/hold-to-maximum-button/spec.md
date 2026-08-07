# Hold-to-Maximum Button (portable recreation spec)

Hold **OUTPUT** to fill a dashed-track charge ring with cardinal + quadrant notches;
overload accent ticks appear near 100% and commit **MAXIMUM OUTPUT**. Distinct from
the cooldown ring (charge-in, not drain-out). Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Button | `OUTPUT` |
| Hint idle | `Hold OUTPUT to charge.` |
| Hint done | `MAXIMUM OUTPUT` |
| Live ready | `Ready to charge.` |
| Live charging | `Charging output…` |
| Live released | `Charge released.` |
| Live done | `Maximum output committed.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Token | Value |
| ----- | ----- |
| CIRC | 326.73 |
| HOLD_MS | 1200 |
| TICK_MS | 40 |

## Geometry

| Token | Value |
| ----- | ----- |
| ViewBox | `0 0 120 120` |
| Radius | 52 |
| Track stroke | 5px dashed |
| Fill stroke | 7px butt cap |
| Overload stroke | 8px accent |
| Cardinal notches | 4 at 12/3/6/9 |
| Quadrant notches | 4 between cardinals |
| Overload ticks | 4 accent rects at cardinals |

## Input

Hold via pointer **or** **Space** / **Enter** key hold on the OUTPUT button.

## API

```js
resetHoldToMaximumButton()
```

## Reduced motion

Skip charge ramp; immediately show 100% accent ring and MAXIMUM OUTPUT.

## Acceptance

1. Idle: 0%, dashed track, notches visible.
2. Hold fills ring over 1200ms; percent ticks every 40ms.
3. Quadrant notches brighten from 75%; overload ticks at 90%+.
4. Early release resets to idle.
5. 100% commits accent overload state.
6. Visually distinct from cooldown ring (charge vs drain semantics).
7. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant commit.
8. No network.
