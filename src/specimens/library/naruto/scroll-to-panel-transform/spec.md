# Scroll-to-Panel Transform

A compact round scroll token morphs its own shape and size into a full rectangular content panel.

## Behaviour

- Idle: 64px circular token, status scroll.
- Morph: width/height/radius animate 480ms into 176px panel.
- Content: briefing copy fades in after 260ms delay on the same surface.
- Reduced motion: expanded panel immediately.

## Freeze

- Morph: 480ms · settle: 90ms · content delay: 260ms · token: 64px · panelH: 176px
- Palette: `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`
