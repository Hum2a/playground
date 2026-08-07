# Screenshot Capture Flash

A shutter blade close plus white flash confirms capture. No thumbnail travel — that belongs to Capture Thumbnail Flyout.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3416` / `PS-110` |
| Flash duration | `360ms` |
| White peak | `~95%` opacity at `14%` of keyframe |
| Blades | top/bottom scaleY open→close within same `360ms` |
| Trigger | CAPTURE |

## Acceptance

1. CAPTURE fires a brief full-stage flash with closing blades.
2. Scene returns to readable play after `360ms`; no dock thumbnail appears.
3. Status announces shutter flash (not flyout).

## Reduced motion

Keyframe animations removed; a static mid-opacity flash marks the capture under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
