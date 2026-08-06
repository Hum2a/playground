# Wi-Fi Searching-to-Connected Morph (portable recreation spec)

300×180 connectivity card with abstract signal arcs and finite acquisition.

## Contract

| Parameter | Value |
| --------- | ----- |
| Card | `300 × 180px` |
| Arc interval | `180ms` sequential |
| Search duration | `900ms` total |
| Outcomes | Connected or Failed + Try again |

## Reduced motion

Discrete arc states without pulsing.

## API

- `resetWiFiSearchingToConnectedMorph()`
