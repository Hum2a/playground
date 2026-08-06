# Rail Page Snap

A six-card scrollable rail using native `scroll-snap`. NEXT/PREV move by exactly one card width and the rail always settles on a card boundary — including after a manual drag scroll, which rounds to the nearest card once scrolling ends.

## Freeze

| Item | Value |
| --- | --- |
| Cards | 6, `120px` wide, `12px` gap |
| Step | `132px` (card + gap) per card |
| Snap | `scroll-snap-type: x mandatory` / `scroll-snap-align: start` |
| Trigger | `NEXT` / `PREV` buttons, or manual drag scroll |
| Settle | manual scroll rounds to nearest card `120ms` after scroll stops |

## Behaviour

1. Idle: card 1 of 6 visible, PREV disabled.
2. `NEXT` / `PREV` scroll by exactly one step and re-snap to the new card boundary; status announces the current card index.
3. Manually dragging the rail settles on the nearest card boundary shortly after release — it never stops mid-card.

## Reduced motion

Programmatic and snap-settle scrolling use `behavior: 'auto'` (instant jump) instead of smooth scrolling.

## Accessibility

The card row is decorative (`aria-hidden`); a live status line reports the current card index out of the total.

## Porting to another stack

Native CSS scroll-snap plus a fixed step constant; JS only computes the nearest index and calls `scrollTo`, no manual animation loop.
