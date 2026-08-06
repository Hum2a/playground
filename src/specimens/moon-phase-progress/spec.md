# Moon Phase Progress (portable recreation spec)

Progress indicator where the illuminated portion of a moon is the sole progress
visual — no conventional bar. Rebuild from this document, `demo.css`, `demo.js`,
and `contract.json`.

## Visual intent

- 0%: new/dark moon
- Progress grows as a waxing illumination from the **right** edge toward the left
- 25% crescent · 50% half · 75% gibbous · 100% full pale-blue moon
- Intermediate values continuously alter shade occlusion geometry
- Milestone ticks at 25/50/75 (~160ms); completion halo at 100% (~300ms)

## Phase mapping (frozen)

CSS custom property `--moon-progress` ∈ `[0, 100]`.

Lit disc fills the moon. A same-size dark shade sits on top and translates:

```
transform: translateX(calc(var(--moon-progress) * -1%));
```

Percentage is relative to the shade/moon diameter.

| Progress | Shade offset | Reading |
| --- | --- | --- |
| 0 | `0%` | Fully covered — new/dark |
| 25 | `-25%` | Crescent |
| 50 | `-50%` | Half |
| 75 | `-75%` | Gibbous |
| 100 | `-100%` | Shade clear — full |

Direction: **waxing right → left** (illumination begins on the right edge).

Do not rotate the moon disc.

## DOM structure

```html
<div class="moon-phase" data-moon-phase>
  <p id="moon-phase-label">ARCHIVE COMPLETION</p>
  <div role="progressbar" aria-valuenow="…" aria-valuetext="Archive completion, N percent.">
    <div class="moon-phase__moon" style="--moon-progress:N" aria-hidden="true">
      lit + shade + rim + ticks + halo
    </div>
  </div>
  <p>N%</p>
  <p data-moon-full hidden>FULL</p>
  <button type="button" data-moon-inc="10">+10</button>
  <button type="button" data-moon-inc="25">+25</button>
  <button type="button" data-moon-reset>RESET</button>
</div>
```

## Colours

| Token | Hex |
| --- | --- |
| Background | `#020912` |
| Dark moon | `#071627` |
| Illuminated | `#ccefff` |
| Blue edge | `#4aa7d4` |
| White | `#f4fbff` |

## Timing

| Change | Duration |
| --- | --- |
| +10 | 260ms |
| +25 / large jump | 420ms |
| Milestone tick | 160ms |
| 100% halo | 300ms (`0.92 → 1.08 → 1`) |

Easing: `cubic-bezier(0.4, 0.05, 0.2, 1)`.

Semantic `aria-valuenow` / `aria-valuetext` update **immediately** with logical progress; the shade eases visually.

## Reduced motion

Phase snaps to the target geometry. No halo. Milestone ticks omitted.

## Accessibility

- `role="progressbar"` with min/max/now + valuetext
- Moon geometry is `aria-hidden`
- Numeric `%` remains visible

## Integration

- Import `demo.css` verbatim
- Call `setMoonProgress` / `bumpMoonProgress` / `resetMoonProgress`
- Use `type="button"` controls (sandbox has no `allow-forms`)
- No external assets, libraries, or network
