# Haptic Pulse Visualizer

A radial radar silhouette: the core emits concentric expanding rings representing DualSense-style haptic pulses — not a hold meter.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3365` / `PS-059` |
| Pulse duration | `520ms` |
| Gap between bursts | `180ms` |
| Bursts on Run | `3` |
| Rings per burst | `4` (staggered) |

## Behaviour

1. Idle: circular core labelled PULSE inside a radar field.
2. Each burst activates four concentric rings expanding outward.
3. Run fires three bursts; live region counts them.
4. Reduced motion: static radial highlight — no expand animation.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
