# Notification Detail Expansion (portable recreation spec)

A compact notification expands into actionable detail while retaining its identity.
Title remains fixed in the top region. CLOSE collapses. No page navigation.

## Visual intent

Height morph 76→184px over 280ms. Detail rows reveal after height passes 120px.
Buttons construct last at 40ms stagger.

## DOM structure

```html
<div class="nex" data-notification-expand data-phase="compact">
  <article data-nex-card>REVIEW REQUEST</article>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Title | `REVIEW REQUEST` |
| Subtitle | `Mina requested approval` |
| Detail 1 | `PR #184` |
| Detail 2 | `12 files changed` |
| Actions | `OPEN`, `APPROVE` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Compact size | 330 × 76px |
| Expanded size | 330 × 184px |
| Height expansion | 280ms |
| Detail reveal threshold | 120px |
| Button stagger | 40ms |

## API

- `expandNotification()`
- `collapseNotification()`

## Reduced motion

Immediate height/state switch.

## Accessibility

Card is focusable with `aria-expanded`; details hidden when compact.
Status region uses `aria-live="polite"`.
