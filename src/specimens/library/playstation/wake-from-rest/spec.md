# Wake from Rest

Full black rest veil lifts to reveal a home shelf with focus intact. Inverse of Rest Mode Dim (console luminance down); distinct from Resume-from-Rest Wake (focus restore on a still-visible dim dock).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3436` / `PS-130` |
| Dark | black veil opacity `1` · REST mark · home hidden underneath |
| Lifting | veil opacity `0.28` · translateY `-12%` over `700ms` · home emerges |
| Awake | veil opacity `0` · home full · focus tile ring |
| Story | Black lift — inverse of rest-mode-dim luminance story |
| Silhouette | Framed home shelf (≠ console body of rest-mode-dim) |
| Trigger | WAKE |
| Chrome | Unique `.wfr` namespace |

## Behaviour

1. Dark: solid black with faint REST mark; home shelf held underneath.
2. Lifting: black veil rises and thins; shelf becomes visible.
3. Awake: black cleared; centre focus tile keeps ring.

## Reduced motion

`.wfr__black`, `.wfr__home`, and `.wfr__tile` lose transitions under both RM hooks.

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
