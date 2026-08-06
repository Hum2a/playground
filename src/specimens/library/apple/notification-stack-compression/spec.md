# Notification Stack Compression (portable recreation spec)

Three independent notifications condense into one layered stack while retaining
count and top-item identity. Counter `3 NOTIFICATIONS` appears after settle.
EXPAND restores original spacing. No images, audio, network, or storage.

## Visual intent

Stack depth via y-offset and scale — top remains readable; hidden card body text
is visually clipped but remains in DOM for accessibility.

## DOM structure

```html
<div class="nsc" data-notification-stack-compression data-phase="expanded">
  <article data-nsc-card="0">BUILD COMPLETE</article>
  <article data-nsc-card="1">REVIEW REQUESTED</article>
  <article data-nsc-card="2">DEPLOY READY</article>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Card 1 | `BUILD COMPLETE` |
| Card 2 | `REVIEW REQUESTED` |
| Card 3 | `DEPLOY READY` |
| Counter | `3 NOTIFICATIONS` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Card size | 320 × 74px |
| Initial gap | 12px |
| Compress duration | 320ms |
| Middle offset / scale | 6px / 0.98 |
| Bottom offset / scale | 12px / 0.96 |
| Top scale | 1 |

## API

- `compressNotificationStack()`
- `expandNotificationStack()`

## Reduced motion

Instant layout switch between expanded and compressed states.

## Accessibility

Each card has `aria-label` with title; counter uses `aria-live="polite"`.
Secondary body text remains in DOM when visually hidden.
