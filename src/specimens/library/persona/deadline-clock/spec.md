# Deadline Clock (portable recreation spec)

Deadline indicator: remaining time is an incomplete circular perimeter that
closes around the label as the deadline approaches. Enclosure metaphor — not a
remaining-progress percentage bar. No pulsing red warning. No continuous alarm.

## Visual intent

As the window shrinks, the pale arc grows (25% → 100%), letter-spacing compresses
(`.08em` → `0`), and deterministic pale radial threshold marks appear.

## DOM structure

```html
<div class="deadline-clock" data-deadline-clock data-state="72h">
  <p class="deadline-clock__eyebrow">SUBMISSION WINDOW</p>
  <div class="deadline-clock__stage" role="img" aria-labelledby="deadline-clock-label">
    <div class="deadline-clock__ring" aria-hidden="true">
      <span class="deadline-clock__track"></span>
      <span class="deadline-clock__arc"></span>
      <span class="deadline-clock__marks"><!-- up to 4 ticks --></span>
    </div>
    <p id="deadline-clock-label" class="deadline-clock__time">72 HOURS</p>
  </div>
  <button data-dc-advance>ADVANCE</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Eyebrow | `SUBMISSION WINDOW` |
| States | `72 HOURS` · `24 HOURS` · `6 HOURS` · `1 HOUR` |
| Closed | `CLOSED` |
| Trigger | `ADVANCE` |

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020912` |
| Deep | `#071e38` |
| Mid | `#155f8e` |
| Bright | `#45b8df` |
| Pale | `#d7f6ff` |

## Ring

- Diameter **~150px**, stroke **~3px**, arc from **−90deg** (12 o'clock)
- Track always visible (dim); pale arc is the enclosure

## Frozen states

| State | Arc | Tracking | Marks |
| ----- | --- | -------- | ----- |
| 72h | 25% | `.08em` | 0 |
| 24h | 60% | `.05em` | 1 |
| 6h | 85% | `.02em` | 2 |
| 1h | 96% | `0` | 4 |
| 0h | 100% | `0` | 4 + `CLOSED` |

## API

- `advanceDeadlineClock()` — step to next state
- `resetDeadlineClock()` — return to 72h
- `replayDeadlineClock()` — reset then advance through all states

## Reduced motion

Immediate state changes; no arc/tracking transition.

## Accessibility

Visible label carries exact remaining time. Polite live region announces each
state. Ring and marks are decorative (`aria-hidden`). Not a `progressbar`.
