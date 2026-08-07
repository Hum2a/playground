# Vortex Hold-to-Confirm

Holding the central core builds three concentric rotating rings; releasing early cancels, holding the full **900ms** confirms.

## Behaviour

- Idle: rings at rest, status `IDLE`.
- Holding: rings rotate and scale up over the 900ms threshold.
- Cancel: early release retreats the rings (200ms) — never confirms.
- Confirmed: pulse (180ms), status `CONFIRMED`.
- Reduced motion: manual holds keep the 900ms threshold without rotating animation; Run/Replay resolve straight to CONFIRMED.

## Freeze

- Hold: 900ms · cancel: 200ms · confirm pulse: 180ms · rings: 3
- CSS vars: `--vhc-hold-ms` / `--vhc-cancel-ms` / `--vhc-confirm-pulse-ms`
- Palette (sensor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
