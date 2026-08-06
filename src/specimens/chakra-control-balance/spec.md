# Chakra Control Balance

A needle sits between two opposing chakra inputs (Left / Right, blue vs. red). Holding one side nudges the needle away from it; releasing both lets it drift back toward centre. Holding the needle inside the narrow centre band for 380ms **locks** a balanced state.

## Behaviour

- Idle: needle off-centre, status `UNBALANCED`.
- Active: needle moves in real time while a side is held (or during the scripted Run sweep).
- Locked: needle held inside the ±8% centre band for 380ms, band glows, status `BALANCED`.
- Run plays a scripted damped sweep that settles into the band and locks; Replay resets and reruns.
- Reduced motion: needle appears centred and locked immediately, no sweep or drift.

## Freeze

- Settle sweep: 560ms · in-band hold to lock: 380ms · lock pulse: 150ms
- Centre band: ±8% of track half-width
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
