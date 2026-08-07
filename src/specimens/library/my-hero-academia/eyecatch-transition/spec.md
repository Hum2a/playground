# Eyecatch Transition (portable recreation spec)

Short branded interstitial (diagonal split panels + **ALERT // BRIEF**) separates
**BEFORE SCENE** (ANALYSIS READY) from **AFTER SCENE** (MISSION ACTIVE).

## Copy

| Role | Text |
| ---- | ---- |
| Before kicker | `BEFORE SCENE` |
| Before title | `ANALYSIS READY` |
| Before meta | `Pre-mission briefing — systems nominal.` |
| After kicker | `AFTER SCENE` |
| After title | `MISSION ACTIVE` |
| After meta | `Post-interstitial — field deployment live.` |
| Interstitial | `ALERT // BRIEF` |
| Live before | `Before scene: analysis ready.` |
| Live after | `After scene: mission active.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Panel travel | 500ms |
| Content swap | 225ms (45% of primary) |
| Total cycle | 1150ms |
| Brand delay | 180ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Split A path | `polygon(0 0, 100% 0, 0 100%)` |
| Split B path | `polygon(100% 0, 100% 100%, 0 100%)` |
| Brand scale rest | 0.8 |
| Brand scale active | 1 |

## API

```js
runEyecatchTransition(target)
resetEyecatchTransition()
```

## Reduced motion

Instant scene swap; interstitial hidden with no panel travel.

## Acceptance

1. Continue: interstitial covers swap; AFTER SCENE visible on exit.
2. Return: reverse interstitial; BEFORE SCENE restored.
3. Frozen split paths and primaryMs; swap at 225ms midpoint.
4. `aria-live="polite"` announces scene labels and interstitial progress.
5. Reduced motion → instant swap.
6. Restart resets to before scene.
