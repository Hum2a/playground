# Circular Seal Lock

A ring of six radial marks rotates from **−42°** to **0°** while a progressive engage stroke fills the rim. Twelve index ticks (six major) light as the seal locks.

## Behaviour

- Idle: ring offset −42°, status `UNLOCKED`.
- Active: ring rotates 520ms; engage stroke draws full circumference; status `ALIGNING`.
- Locked: marks + major ticks vermillion, core pulse 150ms, status `LOCKED`.
- Reduced motion: jump straight to LOCKED at 0°.

## Freeze

- Ticks: 12 (major every 60°) · marks: 6
- Offset: −42° → lock 0° · rotate: 520ms · engage: 180ms · pulse: 150ms
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
