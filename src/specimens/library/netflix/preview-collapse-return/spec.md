# Preview Collapse Return

A rail of four abstract cards. Activating a card expands it above its slot; activating it again (RETURN) animates it back to exactly the rail slot's baseline transform — no residual scale, offset, or shadow left behind.

## Freeze

| Item | Value |
| --- | --- |
| Cards | 4, `96×140px` slots |
| Expand | `translateY(-18px) scale(1.28)`, origin bottom center |
| Transition | `200ms cubic-bezier(.4,0,.2,1)` |
| Trigger | click/activate the card (toggle) |
| Exclusivity | other cards disable while one is expanded |

## Behaviour

1. Idle: all four cards sit flush in their slots, `transform: translateY(0) scale(1)`.
2. Activating a card expands it (lift + scale); its face label fades out and a RETURN caption fades in; the other three cards disable.
3. Activating the expanded card again removes the single `is-expanded` class — the transform rule reverts to the base declaration exactly, so the card returns to its slot with zero residue.

## Reduced motion

Same two states apply — the transform and label-opacity transitions are removed.

## Accessibility

Cards are `<button>` elements with `aria-pressed`; a live status line names the previewed reel and confirms return is available. Disabled siblings use the native `disabled` attribute, not just visual dimming.

## Porting to another stack

Single boolean class (`is-expanded`) drives the transform via one CSS rule; return is the literal absence of that class, which is what guarantees "no residue" — there is no JS-computed transform to drift.
