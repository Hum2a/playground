# Branching Energy Surge (portable recreation spec)

Angular energy branches travel from four corners and converge on a central
action. Rebuild from this document and `contract.json`.

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

## Timing

| Phase | Duration |
| ----- | -------- |
| Branch draw (staggered) | `520ms` |
| Core pulse | `740ms` |
| Flash | `280ms` at `520ms` delay |
| Total sequence | `~900ms` |

## Reduced motion

Branches and core appear immediately in READY state; no flash.

## API

- `window.branchingEnergySurge.run(root)`
- `window.branchingEnergySurge.reset(root)`
