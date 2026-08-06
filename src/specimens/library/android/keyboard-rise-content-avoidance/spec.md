# Keyboard Rise & Content Avoidance (portable recreation spec)

Simulated 390×260 keyboard panel; viewport reflows so focused input stays 16px above keys.

## Contract

| Parameter | Value |
| --------- | ----- |
| Scaffold | `390 × 700px` |
| Keyboard | `390 × 260px` |
| Rise duration | `260ms` |
| Input gap | `16px` above keyboard |

## Reduced motion

Instant keyboard and layout reflow.

## API

- `resetKeyboardRiseContentAvoidance()`
