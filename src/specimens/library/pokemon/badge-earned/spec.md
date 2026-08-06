# Badge Earned (portable recreation spec)

An incomplete emblem assembles into a permanent achievement.
Rebuild from this document and `contract.json`.

Do **not** reproduce official Pokémon gym badges, logos, sprites, fonts, or franchise branding.

## Visual intent

| Slot | Text |
| --- | --- |
| Achievement | `VECTOR TRIAL` |
| Initial status | `INCOMPLETE` |
| Trigger | `COMPLETE TRIAL` |
| Final status | `EARNED` |
| Ghost label | `LOCKED` |

## Badge (frozen)

| Token | Value |
| --- | --- |
| Size | `100 × 100px` |
| Primary polygons | **exactly 6** |
| Palette | `#172024` `#f2eedc` `#d3a842` `#6fa889` `#cf6655` |

Asymmetric original hull — not a franchise badge.

## Piece travel (deterministic)

| Piece | Offset | Stagger |
| --- | --- | --- |
| 1 body | `(0, 55)` | `0ms` |
| 2 cream | `(-48, -42)` | `35ms` |
| 3 gold band | `(65, 8)` | `70ms` |
| 4 green | `(50, 48)` | `105ms` |
| 5 coral | `(12, -58)` | `140ms` |
| 6 gold spur | `(-62, 20)` | `175ms` |

Duration per piece: `220ms`. No runtime randomness.

## Phases

| Phase | Timing | Action |
| --- | --- | --- |
| Assembly | stagger + `220ms` (last settles `395ms`) | Ghost/LOCKED hide; six pieces arrive |
| Lock | `140ms` | Badge rotate `-3deg → 2deg → 0`; central seam flashes once |
| Status | after lock | `INCOMPLETE → EARNED` (vertical clip) |
| Rays | `160ms` | Exactly **8** radial lines in pairs (TB, LR, diagonals), then gone |
| Final | static | Assembled badge remains; no glow loop |

## Accessibility

Announce achievement title and earned state in text, e.g.
`VECTOR TRIAL earned. The abstract badge is permanently assembled.`

## Reduced motion

Immediately show completed badge and `EARNED`.

## API

- `badgeEarned.complete()` / `window.badgeEarned.complete()`
- `badgeEarned.reset()` / `window.badgeEarned.reset()`
