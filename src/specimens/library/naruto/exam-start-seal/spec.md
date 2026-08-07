# Exam Start Seal

A locked exam surface stays dark until the central seal **cracks and splits**, then the panel activates and the timer runs.

## Behaviour

- Idle: locked panel (dimmed), intact seal, status `LOCKED`.
- Cracking: vertical crack scales in over 160ms.
- Active: seal halves translate ±42px and rotate ±18° over 260ms; panel brightens.
- Done: seal hidden, status `ACTIVE`, timer ticking.
- Reduced motion: unlocked ACTIVE surface immediately.

## Freeze

- Crack: 160ms · split: 260ms · activate: 180ms
- Split: ±42px · rotate: ±18° · crack height: 72px
- Palette (seal lacquer): `#140C0C` / `#E8DCC8` / `#C43C2E` / `#6B5048` / `#F3EBE0`
