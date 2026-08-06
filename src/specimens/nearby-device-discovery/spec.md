# Nearby Device Discovery (portable recreation spec)

Central 64px source node on a 360×420 sender surface. DISCOVER reveals four
fixed radial recipients at 120ms intervals, each settling from scale 0.72 over
260ms. Orbit rings draw once. NODE C becomes ready after 900ms.

## Contract

| Parameter | Value |
| --------- | ----- |
| Surface | `360 × 420px` |
| Source node | `64px` |
| Recipient positions | top, right, lower-right, lower-left |
| Stagger | `120ms` per node |
| Settle | `260ms` scale/opacity |
| Ready delay | `900ms` on NODE C |

## Reduced motion

All recipients appear immediately in final positions.

## API

- `resetNearbyDeviceDiscovery()`
