# Lunar Calendar Change (portable recreation spec)

A compact date stepper. The month heading stays; day, weekday, and a 64px
geometric moon change on PREVIOUS / NEXT. Rebuild from this document and
`contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Stable heading: `JUNE 2026`
- Day number + weekday + phase label as text (not moon-only)
- Geometric moon diameter: `64px`
- Field `#09111D`, panel `#13263A`, ink `#C7CDD8`, cyan `#72D6E8`

## Demo dates only (no system clock)

| Day | Weekday | Phase |
| --- | ------- | ----- |
| 17 | WEDNESDAY | CRESCENT |
| 18 | THURSDAY | CRESCENT |
| 19 | FRIDAY | HALF |
| 20 | SATURDAY | GIBBOUS |
| 21 | SUNDAY | GIBBOUS |

## Motion

Duration `360ms`.

- NEXT: outgoing date slides left; incoming enters from the right
- PREVIOUS: outgoing date slides right; incoming enters from the left
- Moon crossfades / masks between phases
- Heading does not move

`PREVIOUS` / `NEXT` are real buttons. Disable at the sequence ends.

## Reduced motion

Instant date + moon. No slide or crossfade. Honour both
`@media (prefers-reduced-motion: reduce)` and
`[data-force-reduced-motion="true"]`.

## Accessibility

- Visible date text plus `aria-live="polite"` announcement
- `:focus-visible` ring `2px #72D6E8` on both buttons
- Moon geometry `aria-hidden`

## Porting

Import `demo.css` and `demo.js` verbatim. Call `stepCalendar(1 | -1)`.
