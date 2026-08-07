# System Boot Glow

Dark surface develops a restrained blue-white glow through frozen luminance stops, then resolves to READY.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3325` / `PS-019` |
| Phase dark | luminance `0%` · glow opacity `0` |
| Phase glow | luminance `55%` over `900ms` |
| Phase settle | luminance `100%` over `320ms` |
| Phase ready | READY UI opacity `1` over `400ms` · luma mark hides |
| Trigger | Boot / restart message |
| API | `runSystemBootGlow()` · `resetSystemBootGlow()` |

## Behaviour

1. Dark: black screen, luma mark `0%`.
2. Glow: radial glow builds to 55% brightness.
3. Settle: glow peaks at full luminance.
4. Ready: READY label + status dot resolve; luma mark fades out.

## Reduced motion

`.sbg__glow`, `.sbg__ui`, and `.sbg__luma-mark` lose transitions under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]` — end states (including READY) remain.

## Accessibility

Decorative glow uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
