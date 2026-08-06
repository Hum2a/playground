# Picture-in-Picture Collapse (portable recreation spec)

390×700 media app; player collapses to 176×99 PiP at lower-right over 380ms.

## Layout contract

| Token | Value |
| ----- | ----- |
| Stage | 390 × 700px |
| PiP size | 176 × 99px |
| PiP margin | 16px |
| Animation | 380ms |
| Corners | 14px in PiP |

## API

- `resetPictureInPictureCollapse()`

## Reduced motion

Direct rectangle switch plus opacity handoff.
