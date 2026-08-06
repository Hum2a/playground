# Search Field Activation (portable recreation spec)

A compact search affordance expands into a focused input while neighbouring
navigation controls reorganise. CANCEL restores original header arrangement.

## Visual intent

Header 360px. Title LIBRARY clips/retracts over 120ms. ADD shifts out.
Search expands 38→276px over 260ms. Placeholder appears after 55%.

## DOM structure

```html
<div class="sfa" data-search-field-activation data-phase="compact">
  <header class="sfa__header">LIBRARY · search · ADD</header>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Title | `LIBRARY` |
| Placeholder | `Search library` |
| Action | `ADD` |
| Cancel | `CANCEL` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Header width | 360px |
| Search compact | 38px |
| Search expanded | 276px |
| Title retract | 120ms |
| Search expand | 260ms |
| Placeholder delay | 55% of expand |

## API

- `activateSearch()`
- `cancelSearch()`

## Reduced motion

Immediate layout swap with focus preserved.

## Accessibility

Search trigger and cancel are focusable with visible focus rings.
Input receives focus on activation.
