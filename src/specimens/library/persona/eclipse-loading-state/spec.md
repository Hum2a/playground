# Eclipse Loading State (portable recreation spec)

A compact looping loader: a geometric moon travels through a 120px eclipse
ring and peaks a cyan corona at centre. Rebuild from this document and
`contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Static label: `LOADING` (do not animate letters)
- Eclipse diameter: `120px` (luminous outer ring + moon disc + 3px corona)
- Moon travel: `−70px` → `+70px` (140px total)
- Dark void field `#09111D`

## Motion

One-way duration `1400ms`, `ease-in-out`, `animation-direction: alternate`
(no jump at the loop seam).

| Progress | Moon `translateX` | Corona opacity | Ring / field |
| -------- | ----------------- | -------------- | ------------ |
| 0% | `−70px` | `.45` | resting glow |
| 43.571% | approaching | `.45` (peak window starts) | |
| 50% | `0` (centre overlap) | `.9` | ring brighter, field slightly darker |
| 56.429% | departing | `.45` (peak window ends) | |
| 100% | `+70px` | `.45` | resting glow |

Corona is a `3px` `#72D6E8` ring. The 180ms peak is 90ms each side of centre
(`180 / 1400 ≈ 12.857%` of the timeline).

## Reduced motion

Stop the moon. Centre it over a visible ring. Keep static `LOADING`. Honour
both `@media (prefers-reduced-motion: reduce)` and
`[data-force-reduced-motion="true"]`.

## Accessibility

- Root `aria-label="Loading"`
- Eclipse geometry `aria-hidden`
- Product UI should also expose busy/loading text outside the decorative moon
- `:focus-visible` ring is `2px #72D6E8` if a host adds controls

## Porting

Import `demo.css` verbatim. No JavaScript required.
