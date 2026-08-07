# Lightning Target Acquisition

A loose reticle snaps onto a fixed target; three branch-bolts flicker, then LOCKED.

## Behaviour

- Idle: reticle offset at (−92, −58), status `IDLE`.
- Acquiring: snap (440ms); bolts flicker at 18° / −24° / 8° from 300ms.
- Locked: status `LOCKED`, bolts gone.
- Reduced motion: LOCKED immediately.

## Freeze

- Snap: 440ms · flicker: 180ms @ 300ms · settle: 150ms · bolts: 3 @ [18, −24, 8]°
- Palette (sensor): `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#D94A38` / `#1A6B58` / `#D7F5EC`
