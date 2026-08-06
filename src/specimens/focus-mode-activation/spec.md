# Focus Mode Activation

Four corner brackets converge from the field edges onto a central reticle (Run auto-play) while peripheral content dims, narrowing the view into a high-contrast analysis mode.

## Behaviour

- Idle: brackets at the field corners, reticle hidden, status `NORMAL`.
- Focused: brackets converge (~320ms), reticle fades in with a crosshair, peripheral dots dim, status `FOCUSED`, held until reset/replay.
- Reduced motion: activate directly, no convergence/dimming transition.

## Freeze

- Narrow: 320ms · settle: 140ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
