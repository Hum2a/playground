# Grid Reorder Gap (portable recreation spec)

4×3 grid of 64×64 tiles with 12px gaps. Long press 240ms or 6px drag acquires a
tile; lifted proxy scales 1.06; source becomes visible gap; gap travels with
pointer.

## DOM structure

```html
<div class="grg" data-grid-reorder-gap>
  <div class="grg__grid" data-grg-grid></div>
  <div class="grg__proxy" data-grg-proxy hidden></div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Grid | `4 × 3`, tile `64px`, gap `12px` |
| Acquire | long-press `240ms` or drag `6px` |
| Proxy scale | `1.06` |
| Tile move | `160ms` |
| Cancel | Escape restores original order |

## Reduced motion

Tiles jump between slots; proxy still follows pointer.

## API

- `resetGridReorderGap()`

## Accessibility

Grid `aria-label`; status `aria-live="polite"`.
