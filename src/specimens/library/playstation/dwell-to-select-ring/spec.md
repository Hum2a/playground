# Dwell-to-Select Ring

A spatial gaze target fills a radial ring over ~1.8s; release early cancels. Depth rings and a crosshair cue PSVR-style selection — not a flat button spinner.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3463` / `PS-157` |
| Dwell | `1800ms` |
| Circumference | `276.46` (r=44) |
| Cue | depth rings + gaze crosshair |
| Trigger | pointer hold on target |

## Acceptance

1. Hold fills the ring over ~1.8s; early release resets progress.
2. Full dwell marks Selected with status announcement.
3. Depth rings and gaze crosshair remain visible as spatial cues.

## Reduced motion

Dwell completes instantly on pointer down; progress transition removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
