# Sheet Rubber-Band Limit (portable recreation spec)

Bottom sheet starts at expanded detent 520px visible height with `TASK DETAILS`
content. Upward drag beyond expanded enters rubber-band overshoot with
resistance formula; release settles back to same detent.

## Visual intent

`displayOvershoot = 54 × (1 − exp(−rawOvershoot / 70))`, clamp 54px. Content
moves 35% of displayed overshoot. Handle stretches. Exactly two limit ticks at
32px overshoot. Settle 360ms. Downward drag uses normal sheet movement.

## DOM structure

```html
<div class="srbl" data-sheet-rubber-band>
  <div class="srbl__stage">
    <div class="srbl__sheet" data-srbl-sheet>
      <div class="srbl__grab" data-srbl-grab><!-- handle + ticks --></div>
      <div class="srbl__content" data-srbl-content>TASK DETAILS</div>
    </div>
  </div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Start detent | 520px visible |
| Overshoot max | 54px |
| Formula divisor | 70 |
| Content ratio | 35% |
| Tick threshold | 32px |
| Tick count | 2 |
| Settle | 360ms |

## Reduced motion

Clamp upward motion to 8px; snap back immediately.

## API

- `calcDisplayOvershoot(raw)`
- `resetSheetRubberBandLimit()`

## Accessibility

Status announces overshoot depth.

## Porting

Import `demo.css` verbatim. Freeze formula in `contract.json`.
