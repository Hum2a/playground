# Notification Banner Drop (portable recreation spec)

`BUILD DASHBOARD` host with temporary banner `DEPLOY COMPLETE` / `Release 2.4.0 is
live`. Banner drops from above, overshoots, dwells, then retreats. Hover/focus
pauses auto retreat. REPLAY control provided.

## Visual intent

Banner 340×74px. Starts `translateY(-96px)`. Entry 280ms, overshoot 6px, settle
80ms. Dwell 2200ms. Exit 220ms upward. Exactly one leading status marker.

## DOM structure

```html
<div class="nbd" data-notification-banner>
  <div class="nbd__host">BUILD DASHBOARD</div>
  <div class="nbd__banner" data-nbd-banner role="status">
    <span class="nbd__marker"></span>
    DEPLOY COMPLETE
  </div>
  <button data-nbd-replay>REPLAY</button>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Banner | 340×74px |
| Start Y | -96px |
| Entry | 280ms |
| Overshoot | 6px |
| Settle | 80ms |
| Dwell | 2200ms |
| Exit | 220ms |
| Markers | 1 |

## Reduced motion

Appear at final position, dwell, disappear without travel.

## API

- `runNotificationBannerDrop()`
- `resetNotificationBannerDrop()`

## Accessibility

Banner `role="status"`. Focusable for pause. Status region for host state.

## Porting

Import `demo.css` verbatim.
