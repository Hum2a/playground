# Trigger Breakpoint Confirm

A hold travels a resistance track with a labelled **68%** notch — hatched resistance is readable before the commit zone.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3369` / `PS-063` |
| Hold duration | `1100ms` |
| Notch | `68%` |
| Resistance band | `48–68%` (hatched) |
| Commit zone | `68–100%` |
| Tick | `50ms` |

## Behaviour

1. Idle: travel / resist / commit zones visible; notch shows `68%`.
2. Holding: fill eases through hatched resistance, then past-notch commit zone.
3. Full hold confirms; early release cancels (status CANCELLED).
4. Reduced motion: threshold preserved; transitions removed.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
