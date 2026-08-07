# Quick Resume Snapshot

Frozen still-frame snapshot (PAUSED stamp, grayscale frost) expands into a live play surface (LIVE badge, pulsing playhead).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3336` / `PS-030` |
| Frozen | `112×64` grayscale snap · PAUSED stamp · STILL meta |
| Expand | width/height → inset panel over `480ms` |
| Live | LIVE badge · green pulse · playhead animation |
| Fade | snap opacity `0` / live opacity `1` over `260ms` |
| Trigger | RESUME / RESET toggle |
| Chrome | Unique `.qrs` namespace (no shared `.ps__stage`) |

## Behaviour

1. Frozen: compact desaturated still with PAUSED stamp.
2. Resume: snap expands while live surface fades in.
3. Live: saturated panel with LIVE badge and pulsing playhead.
4. Reset: returns to frozen snapshot.

## Reduced motion

`.qrs__snap`, `.qrs__live`, playhead, and pulse lose transitions/animations under both RM hooks.

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
