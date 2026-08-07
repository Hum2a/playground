# State Intensity Field (portable recreation spec)

ENGINE 04 load is communicated as a topographic pressure field: discrete
contour bands radiate from a clipped engine core, and a vertical magnitude
ladder labels each frozen threshold. No percentage meter or growing chip UI.

## Visual intent

Amber heat palette on deep plum void. Four concentric contour ellipses stack
like elevation lines; at CRITICAL a dashed rupture boundary and eight pressure
shards appear. The ladder highlights the active band — load is read from band
position, not a lone `%` figure.

## DOM structure

```html
<div class="sif" data-state-intensity data-level="1">
  <div class="sif__field">
    <span class="sif__band sif__band--1">…</span>
    …bands 2–4 + rupture + shards + ticks…
    <div class="sif__engine">04</div>
  </div>
  <ol class="sif__ladder" aria-label="Pressure magnitude ladder">
    <li data-sif-rung="4">95 CRITICAL</li>
    …
  </ol>
  <button data-sif-increase>INCREASE LOAD</button>
</div>
```

## Frozen levels

| Level | Load | Bands | Shards | Radius | Status |
| ----- | ---- | ----- | ------ | ------ | ------ |
| 1 | 20 | 1 | 0 | 8px | NOMINAL |
| 2 | 45 | 2 | 2 | 14px | ELEVATED |
| 3 | 70 | 3 | 4 | 22px | HIGH |
| 4 | 95 | 4 + rupture | 8 | 34px | CRITICAL |

Band diameters (px): `66 · 82 · 110 · 138`. Rupture diameter: `168`.

## Ladder thresholds

| Threshold | Label |
| --------- | ----- |
| 20 | NOMINAL |
| 45 | ELEVATED |
| 70 | HIGH |
| 95 | CRITICAL |

## Timing

Transitions: `300ms`, `300ms`, `360ms`, with `220ms` hold at each reached
level. Status and ladder update only after the field structurally arrives.

At 95% (past the 90% threshold), exactly four cardinal warning ticks appear
once — no flash or strobe.

## Colours

| Token | Hex |
| ----- | --- |
| Void | `#140a12` |
| Aura | `#e8a838` |
| Heat | `#d45a28` |
| Band | `#c88830` |

## API

- `window.stateIntensityField.increase()` · `.reset()` · `.init()`

## Reduced motion

Immediately presents Level 4: four bands, rupture, eight shards, four ticks,
ladder on CRITICAL 95.

## Accessibility

Ladder has `aria-label`. Status is polite. Screen-reader line describes band
and status textually.
