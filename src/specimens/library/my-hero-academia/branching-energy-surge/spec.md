# Branching Energy Surge (portable recreation spec)

Angular energy branches travel from four corners and converge on a central
**ink-star** core. Rebuild from this document and `contract.json`.

Original abstract geometry only — no copyrighted MHA assets.

## Palette

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Copy

- Trigger: `ACTIVATE`
- Idle label: `STANDBY`
- Surge label: `SURGE`
- Final label: `READY`

## Instances (frozen)

| Branch | Path | Stagger |
| ------ | ---- | ------- |
| TL | `M 20 24 L 120 90 L 180 160` | 0ms |
| TR | `M 340 24 L 240 90 L 180 160` | 60ms |
| BL | `M 20 296 L 120 230 L 180 160` | 120ms |
| BR | `M 340 296 L 240 230 L 180 160` | 180ms |

Core: octagonal ink-star at `(180,160)` — `180,128 194,152 220,160 194,168 180,192 166,168 140,160 166,152`.

## Timing

| Phase | Duration |
| ----- | -------- |
| Branch draw (staggered) | `520ms` |
| Core pulse | `740ms` |
| Flash | `280ms` at `520ms` delay |
| Total sequence | `900ms` |

## Acceptance

1. Four branch paths draw with frozen stagger delays.
2. Ink-star core pulses at center (no circle).
3. Pentagon flash at 520ms delay.
4. READY: branches lit, core filled primary.
5. Reduced motion: instant READY; no draw or flash.

## Reduced motion

Branches and core appear immediately in READY state; no flash.

## API

- `window.branchingEnergySurge.run(root)`
- `window.branchingEnergySurge.reset(root)`
