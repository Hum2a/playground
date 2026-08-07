# Maximum Output Breakthrough (portable recreation spec)

Progress meter charges from 0% to explicit NOMINAL 100%, then breaks beyond its
container to 108% with a jagged accent burst.

**Ref:** SPX-2111 · **Catalogue:** MHA-137

## Copy

| Key | Text |
| --- | --- |
| output | OUTPUT |
| nominal | NOMINAL 100% |
| maxPlus | MAX+ |
| breakthrough | Breakthrough |
| statusExceeded | Maximum output exceeded. |
| liveIdle | Output at zero. Nominal limit 100%. |
| liveFill | Filling to nominal 100%. |
| liveBreak | Breaking nominal limit. |
| liveDone | Breakthrough registered at 108%. |

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## Timing (ms)

| Phase | ms |
| --- | --- |
| Fill 0→100% | 580 |
| Break →108% | 320 |
| Settle | 330 |
| Total | 1230 |

## Geometry

- Start: 0%
- Nominal cap: 100%
- Overshoot: 108%
- Burst clip-path: `polygon(30% 0, 100% 20%, 70% 50%, 100% 80%, 30% 100%, 0 50%)`

## Reduced motion

Instant 108% MAX+ with burst at final position.
