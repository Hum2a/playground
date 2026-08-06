# Long-Press Lift (portable recreation spec)

Pointer hold interaction where the middle message card `MESSAGE // 04` separates
from surrounding context before a three-action rail appears. Hold threshold 420ms;
movement beyond 8px cancels. No images, audio, network, or storage.

## Visual intent

Target card lifts with scale 1.035 and −4px vertical offset; neighbours recede to
0.975. Four corner ticks construct around target; shadow/material boundary appears.
Actions only after lift.

## DOM structure

```html
<div class="lpl" data-long-press-lift data-phase="idle">
  <ul class="lpl__stack"><!-- 3 cards; middle is target --></ul>
  <div class="lpl__actions" hidden>COPY PIN DELETE</div>
  <button data-lpl-reset>RESET</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Target | `MESSAGE // 04` |
| Neighbours | `MESSAGE // 02` · `MESSAGE // 06` |
| Actions | COPY · PIN · DELETE |
| Reset | `RESET` |

## Interaction

| Property | Value |
| -------- | ----- |
| Hold threshold | 420ms |
| Move cancel | 8px |
| Lift scale | 1.035 |
| Lift translateY | −4px |
| Neighbour scale | 0.975 |
| Lift transition | 160ms |
| Corner ticks | 4 |

## API

- `resetLongPressLift()`

## Reduced motion

At threshold, switch directly to lifted/context state without scale or translation.

## Accessibility

Target focusable; keyboard hold via Enter/Space. Status announces lift/cancel.
