# Butterfly Success State

## Visual intent

A calm completion state. Four geometric wing polygons and one narrow body begin embedded around a status panel showing **PROCESSING**. On **COMPLETE**, the pieces travel 20–45px into a single abstract butterfly (220ms), wings open ~12deg and hold 80ms, then the form departs upward 60px while scaling to 0.65. As it clears, the panel reads **COMPLETE** with **Record saved.** — no checkmark, no particle swarm.

## DOM structure

- Root `[data-butterfly-success]` with `data-state` idle | running | complete
- Stage host with status panel (label + meta) and one butterfly (`aria-hidden`) of four `.bss-wing` polygons + `.bss-body`
- Controls: COMPLETE trigger, RESET
- Polite live region for the saved announcement

## Copy

| Role | Text |
| --- | --- |
| Initial label | `PROCESSING` |
| Trigger | `COMPLETE` |
| Final label | `COMPLETE` |
| Meta | `Record saved.` |
| Status | `Record saved.` |
| Reset | `RESET` |

## Layout and colour contract

Velvet-adjacent blues on near-black (`#020912` / `#071f3d` / `#176fa8` / `#4dbce8` / `#d9f7ff`). Frozen piece offsets: UL (−34, −28), UR (38, −24), LL (−30, 36), LR (32, 40), body (0, 22) — all within 20–45px. Timings: assemble 220ms → open 100ms → hold 80ms → depart 260ms.

## Reduced motion

Under `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, skip the butterfly entirely and show the static COMPLETE + Record saved. state immediately.

## Accessibility

Butterfly is decorative (`aria-hidden`). Announce once via the polite status node. Visible focus on controls. Colour is paired with label change (PROCESSING → COMPLETE).

## Porting to another stack

Import `demo.css` verbatim. Call `runButterflySuccess()` / `resetButterflySuccess()`. Keep offsets, wing open angle (12deg), and phase timings frozen.
