# Failure Shatter (portable recreation spec)

False-success export sequence: PROCESSING → temporary SUCCESS → red strike →
four-piece fracture → stable FAILED. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.
Do **not** announce SUCCESS to assistive technology — the operation never succeeded.

## Visual intent

- Card: `EXPORT SPECIMEN` / initial `READY`
- `RUN EXPORT` starts the sequence
- SUCCESS is decorative and interrupted before it settles
- Final stable state: `FAILED` + `ERROR // 042` + `TRY AGAIN`

## Phases (frozen)

| Phase | Time | Action |
| ----- | ---- | ------ |
| Processing | `0–280ms` | PROCESSING strip + 3-step marks |
| Apparent success | `280–480ms` | SUCCESS panel enters from below |
| Interruption | `~480–570ms` | Red diagonal strike (~90ms) |
| Fracture | `550–760ms` | 4 pieces + 3 fragments fly out |
| FAILED | `680–920ms` | FAILED slam; code ~850ms; retry available |

## SUCCESS enter (interrupted)

`translateY(50px) rotate(6deg) scale(1.3)` → `translateY(-3px) rotate(-2deg) scale(0.96)`

## Fracture travel (approx.)

| Piece | Translate | Rotate |
| ----- | --------- | ------ |
| UL | `-58px -52px` | `-14deg` |
| UR | `62px -48px` | `12deg` |
| LL | `-52px 55px` | `16deg` |
| LR | `70px 50px` | `-11deg` |

## FAILED

Initial `scale(2) rotate(-9deg)` → impact `scale(0.9) rotate(3deg)` → final `scale(1) rotate(-2deg)`.
Red backing offset `8px 7px`.

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Accessibility

- Live status ends as: `Export failed. Error 042.`
- SUCCESS panel `aria-hidden` (entire stage decorative during motion)
- Never announce temporary SUCCESS

## Reduced motion

Immediate READY → FAILED + ERROR // 042 + TRY AGAIN. No SUCCESS flash.

## API

- `runFailureShatter()`
- `resetFailureShatter()` / harness `{ type: 'restart' }`
