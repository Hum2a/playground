# Four-Shape Orbit Loader

Four abstract primitives (circle, cross, square, triangle-like) orbit a center hub, then snap into a completion diamond.

## Freeze

| Item | Value |
| --- | --- |
| Shapes | 4 original primitives |
| Orbit duration | 2.4s loop |
| Settle | 400ms snap on COMPLETE |
| Trigger | PLAY / RESET |

## Behaviour

1. Idle: shapes orbit evenly around the hub.
2. COMPLETE stops the orbit and snaps shapes into corners of a completion frame.
3. RESET restarts the orbit loop.

## Reduced motion

Orbit animation removed; COMPLETE shows the settled frame instantly.
