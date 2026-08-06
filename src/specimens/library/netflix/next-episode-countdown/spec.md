# Next Episode Countdown

At end of episode, a next-up card shows a finite countdown ring `5 → 0`, then hands off to the next episode automatically. `CANCEL` stops the countdown and keeps the current end-state; `PLAY NOW` hands off immediately.

## Freeze

| Item | Value |
| --- | --- |
| Countdown | `5 → 0`, one tick every `700ms` (`3.5s` total) |
| Ring | `conic-gradient` progress driven by `--nec-progress` (0→1) |
| Transition | `200ms ease` opacity + `8px` translateY on dismiss |
| Trigger | automatic timer; `CANCEL`; `PLAY NOW`; `REPLAY` to restart |

## Behaviour

1. On start (or `REPLAY`): scene reads `END OF EPISODE`, next-up card visible, count at 5, ring empty.
2. Every `700ms` the count decrements and the ring fills proportionally.
3. At `0`: automatic hand-off — scene switches to `PLAYING EP. 05 — SIGNAL DRIFT`, the next-up card dismisses, `REPLAY` appears.
4. `CANCEL` (any time before hand-off) stops the countdown, dismisses the next-up card, and keeps the `END OF EPISODE` scene — status explains the cancellation.
5. `PLAY NOW` hands off immediately, identical to reaching 0.

## Reduced motion

The same states occur — only the dismiss opacity/transform transition is removed.

## Accessibility

A polite live region announces the remaining seconds each tick and the final outcome (`Handed off…` / `Countdown cancelled…`). The ring is decorative; count/state are always exposed as text.

## Porting to another stack

A single timer chain plus one CSS custom property for ring progress; hand-off and cancel are two terminal states derived from one `settled` boolean guard.
