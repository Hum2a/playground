# Manga Page Turn

An original, self-contained right-to-left page-turn transition for stepping through
software content with the pacing of manga reading.

## Behaviour

- The 560 × 400 bounded stage holds both pages from the start: the destination is
  stacked beneath the current page.
- **Next** rotates the current sheet from its outer/right edge toward the left over
  760ms, using `cubic-bezier(.45,.05,.2,1)` and an 1100px perspective.
- A restrained fold shadow reaches no more than `.22` opacity. The destination stays
  flat at `0deg` and becomes the only visible page after the turn.
- **Replay** returns the current page to its unturned, deterministic starting state.

## Host integration

1. Mount current and destination content in the supplied page-stage.
2. Preserve the destination/current stacking order and perspective wrapper.
3. Trigger the page-turn state on the current sheet.
4. Swap host content only after the supplied transition completes.
5. Preserve the immediate reduced-motion path.

## Accessibility

Both `prefers-reduced-motion` and `data-force-reduced-motion="true"` remove the
transition. In those modes, **Next** immediately shows the flat destination page.
The controls retain a textual status message, so progression is not communicated by
motion alone.

## Constraints

Uses only CSS shapes, ink lines, and the `#F4F1E8` / `#111111` paper-and-ink palette.
It has no external textures or dependencies.
