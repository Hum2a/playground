# Vortex Hold-to-Confirm

Holding the central core builds three concentric rotating rings; releasing early cancels, holding the full **900ms** confirms. Run/Replay drive the same path automatically.

## Behaviour

- Idle: rings at rest, status `IDLE`.
- Holding: rings rotate and scale up over the 900ms threshold; core brightens.
- Cancel: early release retreats the rings (~200ms) back to idle.
- Confirmed: rings and core snap to full brightness with a radial pulse (~180ms), status `CONFIRMED`, held until reset/replay.
- Reduced motion: manual holds keep the 900ms threshold but show a static engaged state instead of the rotating animation; Run/Replay resolve straight to CONFIRMED.

## Freeze

- Hold: 900ms · cancel retreat: 200ms · confirm pulse: 180ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
