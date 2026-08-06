# Notification Swipe Dismiss (portable recreation spec)

Four 336×76px notification cards. Horizontal drag on the top card; opacity fades
after 35% width. Commit at 45% card width or horizontal velocity >0.65 px/ms.
Exit ≤160ms then height collapses 76→0 over 180ms.

## Contract

| Parameter | Value |
| --------- | ----- |
| Card size | `336 × 76px` |
| Opacity fade start | `35%` width |
| Commit | `45%` width or `0.65 px/ms` |
| Exit | `≤160ms` |
| Collapse | `76→0px` over `180ms` |

## Reduced motion

Card follows drag; disappear/collapse immediately on commit.

## API

- `resetNotificationSwipeDismiss()`
