# Monochrome Battle Slide-In

## Visual intent

Retro confrontation transition in Game Boy spatial language: `SEARCHING...` is interrupted by three stepped pixel bands, then abstract LOCAL / REMOTE entities step in from opposite sides (**REMOTE/right starts exactly 60ms first**), gain four-chunk ground lines, and receive stepped labels aligned to their own sides. Final face-off is static. No Pokémon sprites, trainers, or fonts.

## DOM structure

- `.mbs[data-mono-battle]` — root; `data-state` idle | running | battle
- `.mbs__search` — pre-state `SEARCHING...`
- `.mbs__band--1|2|3` — interruption bands
- `.mbs__side--left|right` — entity + ground + meta
- `ENCOUNTER` / `RESET` + polite live region

## Copy

| Slot | Text |
| --- | --- |
| Before | `SEARCHING...` |
| Left | `LOCAL` / `BUILD A` |
| Right | `REMOTE` / `BUILD B` |
| Trigger | `ENCOUNTER` |

## Layout and colour contract

### Palette (exactly four)

`#0f1b16` · `#40513c` · `#8b9c68` · `#d6ddb0` — no fifth visible tone.

### Entities

Logical `16 × 16` pixels, rendered at `4px` cells (`64 × 64` display) via frozen `box-shadow` maps. Abstract machine (A) and remote core (B). Hard edges; `image-rendering: pixelated`.

### Timings

| Phase | Value |
| --- | --- |
| Bands | `160ms` · `steps(4, end)` |
| Right lead | REMOTE/right starts exactly `60ms` before LOCAL/left |
| Slide | `300ms` · `steps(6, end)` |
| Rest positions | left `28%` · right `72%` |
| Ground chunks | `4` · `steps(2, end)` staggered |
| Meta | `steps(3, end)` · `120ms` · left/right-aligned to its entity |

No smooth modern easing on decorative motion.

## Reduced motion

Immediately show the final LOCAL vs REMOTE battle layout.

## Accessibility

- Live + SR text describe searching vs confrontation identities
- Decorative entities/bands/grounds are `aria-hidden`
- Real buttons with `:focus-visible`

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Call `monochromeBattleSlideIn.run()` / `.reset()` or use the buttons.
3. Keep frozen palette, pixel maps, step counts, and right-lead asymmetry.
4. No canvas sprites, Pokémon assets, or anti-aliased decorative geometry.
