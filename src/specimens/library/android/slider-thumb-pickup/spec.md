# Slider Thumb Pickup (portable recreation spec)

280px horizontal slider with range 0–100, step 5. Thumb grows from 20px to 28px
on acquisition; 44×32 value bubble sits 12px above thumb centre.

## DOM structure

```html
<div class="stp__wrap">
  <input class="stp__range" type="range" min="0" max="100" step="5" />
  <div class="stp__fill"></div>
  <div class="stp__bubble" hidden>45</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Track width | `280px` |
| Range | `0–100`, step `5` |
| Thumb idle | `20px` |
| Thumb active | `28px`, `120ms` |
| Bubble | `44 × 32px`, `12px` above thumb |
| Bubble hide | `180ms` after release |

## Reduced motion

Thumb size and bubble state switch instantly.

## API

- `resetSliderThumbPickup()`

## Accessibility

Native range input; `aria-valuetext` synced; keyboard arrows update value.
