# Invalid Drop Return (portable recreation spec)

A rejected drag visibly returns to its source along a fixed quadratic path
rather than disappearing and reappearing. Invalid target READ ONLY performs one
3px lateral refusal.

## Visual intent

Proxy follows pointer. On invalid drop: target refusal 3px, pause 70ms, return
360ms decelerating, merge scale 1.04→1. DROP REJECTED holds 700ms.

## DOM structure

```html
<div class="idr" data-invalid-drop-return data-phase="idle">
  <div data-idr-source>CONFIG.JSON</div>
  <div data-idr-invalid>READ ONLY</div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Source | `CONFIG.JSON` |
| Invalid | `READ ONLY` |
| Valid contrast | `ARCHIVE` |
| Rejection | `DROP REJECTED` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Refusal offset | 3px |
| Pause | 70ms |
| Return duration | 360ms |
| Merge scale | 1.04 → 1 |
| Rejection hold | 700ms |

## API

Drag interaction is pointer-driven on source/proxy.

## Reduced motion

Proxy immediately restores to source and displays rejection status.

## Accessibility

Targets have aria-labels; status uses `aria-live="polite"`.
Placeholder prevents layout collapse during drag.
