# Scroll-to-Panel Transform

A round scroll token morphs via scale/clip into a rectangular content panel.

## Behaviour

- Idle: 64px circular token, status `SEALED`.
- Morph: container expands; token collapses via scale+clip; panel copy reveals via clip-path inset (not opacity crossfade).
- Opened: full panel, status `OPENED`.
- Reduced motion: OPENED immediately.

## Freeze

- Morph: 480ms · settle: 90ms · token: 64px · panel height: 176px
- Reveal language: clip-path inset expand (not opacity crossfade)
- Palette (paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`
