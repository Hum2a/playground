# Dark Hour conversion (portable recreation spec)

Alternate-state transformation: an ordinary interface is progressively converted
into a Dark Hour nocturnal state by a travelling clip boundary. Not a theme fade.
Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Two stacked layers share geometry; clipping reveals Dark Hour behind the boundary
- Boundary travels top → bottom (~4px pale-blue irregular edge)
- Clock swaps `23:59 → 00:00` before conversion
- Dark Hour introduces structural geometry changes, not colour alone
- Four deterministic vertical anomaly streaks follow the boundary
- Final state is eerily still — no loops, flicker, or pulse

## DOM

```html
<div class="dhc" data-dark-hour data-state="normal">
  <div class="dhc__stage">
    <div class="dhc__layer--normal" data-dhc-normal>…</div>
    <div class="dhc__layer--dark" aria-hidden="true" data-dhc-dark>…</div>
    <div class="dhc__boundary" aria-hidden="true">edge + 4 streaks</div>
  </div>
  <button data-dhc-advance>ADVANCE TO MIDNIGHT</button>
  <button data-dhc-restore hidden>RESTORE</button>
  <p role="status" aria-live="polite">Normal hours</p>
</div>
```

Only one semantic layer is exposed (`aria-hidden` flips on settle).

## Timing

| Phase | Window |
| --- | --- |
| Clock vertical swap | 0–160ms |
| Hold at `00:00` | 160–240ms |
| Conversion wipe (−5% → 105%) | 240–960ms (720ms) |
| Mid-conversion refraction | ~600ms, ≤90ms |
| Restore upward retreat | ~520ms |

## Dark structural diffs (frozen)

- Diagonal bottom-right card silhouette
- Skewed / shifted metadata divider
- Angular clock backing panel
- Pale vertical rule
- Irregular dark-blue status strip

## API

```js
export function runDarkHourConversion()
export function restoreDarkHour()
```

## Reduced motion

After clock reaches `00:00`, immediately settle Dark Hour. No travelling boundary.

## Acceptance notes

Announce `Normal hours` / `Dark Hour`. Document frozen geometry in `contract.json`.
