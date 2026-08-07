# Download Queue Advance

A ranked three-slot download stack — completion hands NOW status to the next waiting slot (not a sync beam or hold meter).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3356` / `PS-050` |
| Items | `3` |
| Fill per item | `900ms` |
| Handoff | `280ms` |
| Step | `40ms` |

## Behaviour

1. Idle: slot 01 active (NOW); 02 NEXT; 03 QUEUED.
2. Active fill completes → DONE; brief HANDOFF on next; next becomes NOW.
3. Queue panel stays mounted; completed rows keep DONE.
4. Reduced motion: all three DONE immediately on Run.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
