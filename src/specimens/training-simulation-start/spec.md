# Training Simulation Start (portable recreation spec)

READY countdown explodes into active telemetry tiles.

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## Sequence

1. `3` → `2` → `1` → `GO` (~380ms per step)
2. READY panel scales out
3. Telemetry tiles burst in (~580ms)

## API

- `window.trainingSimulationStart.start(root)`
- `window.trainingSimulationStart.reset(root)`
