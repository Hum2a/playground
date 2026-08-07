# Explosive Tag Countdown

An attached warning tag arms, counts 3-2-1 through increasingly urgent pulses, detonates, and settles cleared.

## Behaviour

- Idle → Arm (220ms).
- Countdown: 3 → 2 → 1 at 480ms each with rising pulse scale.
- Burst 240ms → CLEAR after settle 200ms.
- Reduced motion: CLEAR immediately.

## Freeze

- Arm: 220ms · step: 480ms · burst: 240ms · settle: 200ms · pulse: 1.04/1.08/1.14
- Palette: `#0C0806` / `#C4B8A8` / `#E07030` / `#D94A38` / `#5A5048` / `#F4F1E8`
