# Vortex Hold-to-Confirm

Holding a central core builds three concentric rotating rings. Releasing early cancels; holding the full threshold confirms.

## Behaviour

- Idle: core alone, status `IDLE`.
- Holding: rings engage progressively over 900ms.
- Early release: unwind in 200ms, never CONFIRMED.
- Confirmed: flash pulse 180ms, status `CONFIRMED`.
- Reduced motion: no spin; manual holds keep threshold; Run auto-confirms.

## Freeze

- Hold: 900ms · cancel: 200ms · confirm pulse: 180ms · rings: 3 · core: 108px
- Palette: `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
