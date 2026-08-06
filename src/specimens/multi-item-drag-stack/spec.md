# Multi-Item Drag Stack (portable recreation spec)

Four selected files condense into one portable drag stack preserving count and
top-item identity. Dropping in target absorbs all four sequentially.

## Visual intent

Top proxy A.MD 108×58. Three behind with offsets 4/8/12px and scales
1/.98/.96/.94. Count badge 4. Formation stagger 45ms; drop stagger 35ms.

## DOM structure

```html
<div class="mds" data-multi-item-drag-stack data-phase="idle">
  <article data-mds-source="0">A.MD</article>
  <div data-mds-stack hidden></div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Files | `A.MD`, `B.PDF`, `C.PNG`, `D.JSON` |
| Trigger | `START DRAG` |
| Target | `DROP HERE` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Item count | 4 |
| Top proxy | 108 × 58px |
| Offsets | 4, 8, 12px |
| Scales | 1, 0.98, 0.96, 0.94 |
| Formation stagger | 45ms |
| Drop stagger | 35ms |

## API

- `startMultiItemDrag()`
- `resetMultiItemDrag()`

## Reduced motion

Create final four-item stack immediately.

## Accessibility

Status uses `aria-live="polite"`. Stack hidden until formed.
