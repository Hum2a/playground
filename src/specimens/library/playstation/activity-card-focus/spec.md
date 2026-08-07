# Activity Card Focus

Three activity cards sit in a home rail. Focusing one card enlarges it
(`scale 1.06`, flex `1.35`) and reveals a progress chip, fill bar, and
secondary RESUME / INFO chips — still a card, never a full page.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 280px`, `overflow: hidden` |
| Cards | `3` |
| Focus scale | `1.06` |
| Focus flex | `1.35` |
| Progress | `12%` / `48%` / `76%` |
| Focus travel | `320ms` |
| Meta / actions reveal | `240ms` |
| Border / background | `280ms` |
| Easing | `cubic-bezier(0.2, 1, 0.3, 1)` |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- Click a card to focus it (`is-focused`, `aria-pressed`).
- Exactly one card focused at a time.
- Focused card shows progress chip + bar + RESUME / INFO chips.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by disabling transitions on
`.acf__card`, `.acf__meta`, and `.acf__actions` so focus and chips snap.

## API

- `focusActivityCard(index)` — focus card `0…2`
