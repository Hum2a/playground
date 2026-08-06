# Scrub Preview Thumbnail

A timeline with a drag handle. Dragging (or keying through) the handle reveals a preview thumbnail anchored directly above the handle's current position, labelled with the time at that point. Releasing the handle hides the thumbnail again.

## Freeze

| Item | Value |
| --- | --- |
| Simulated duration | `18:00` (`1080s`) |
| Thumbnail fade | `140ms ease` opacity |
| Thumbnail anchor | horizontally centred over the handle, `40px` above the track |
| Scrub triggers | `pointerdown`, `keydown` on the range input |
| Hide triggers | `pointerup`, `pointercancel`, `blur` |

## Behaviour

1. Idle: thumbnail hidden; readout shows the current idle time.
2. `pointerdown` or `keydown` on the range starts scrubbing — the thumbnail fades in above the handle and tracks every `input` event.
3. The thumbnail's time label and the readout below update live as the handle moves.
4. Releasing the pointer/key (`pointerup` / `blur` / `pointercancel`) hides the thumbnail and settles the readout back to an idle label at the released position.

## Reduced motion

The thumbnail still shows/hides on the same triggers — only the opacity transition is removed, so it appears/disappears instantly.

## Accessibility

The range input carries `aria-label` and a live `aria-valuetext`; a polite live region mirrors the current time as text so the preview state is available without relying on the visual thumbnail.

## Porting to another stack

One `sync` function reads the range's `value` to compute a percentage, positions the thumbnail via `left` in pixels, and updates two text nodes. Begin/end scrub only toggle a `is-scrubbing` class and the thumbnail's `hidden` attribute.
