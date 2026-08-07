# System Notification Slide

A compact top-right system toast slides in from the edge, dwells, then exits. Edge identity only — not a full-stage clone of the home surface.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3408` / `PS-102` |
| Entry | `320ms` translateY from `-130%` |
| Dwell | `2600ms` |
| Exit | `280ms` slide up |
| Placement | top-right · max `220px` wide · blue leading accent |
| Trigger | SHOW NOTIFICATION |

## Acceptance

1. Toast enters from above the top-right edge and becomes readable.
2. After `2600ms` dwell it exits upward and hides.
3. Home tiles remain visible behind; toast never fills the stage.

## Reduced motion

Toast appears/disappears without slide transitions under both RM hooks; dwell timeout still applies.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
