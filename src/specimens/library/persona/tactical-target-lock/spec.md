# Tactical Target Lock (portable recreation spec)

Four angular brackets attack a selected card from outside, overshoot once, settle,
then snap a `LOCKED` marker. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 3 Reload art, logos, fonts, or proprietary assets.

## Visual intent

- Three restrained cards: `ALPHA` / `BETA` / `GAMMA` (~100×100)
- Default: no selection
- Selected target receives four corner brackets (two perpendicular bars each)
- `CLEAR TARGET` restores idle
- Hover shows faint preview brackets (~0.4) — not full lock choreography

## Bracket geometry (frozen)

| Token | Value |
| ----- | ----- |
| Size | `22 × 22px` |
| Thickness | `2.5px` (2–3px) |
| Attack TL | `translate(-28px, -24px) scale(1.25)` |
| Attack TR | `translate(28px, -24px) scale(1.25)` |
| Attack BL | `translate(-28px, 24px) scale(1.25)` |
| Attack BR | `translate(28px, 24px) scale(1.25)` |
| Overshoot | `2.5px` inward past final seat |

## Phases

| Phase | Time | Action |
| ----- | ---- | ------ |
| Attack | `0–150ms` | Brackets converge; overshoot by ~120ms |
| Guides | `70–170ms` | Four thin lines extend toward centre (~100ms) |
| Target react | `0–180ms` | Card scale `1 → 0.98 → 1.02` |
| Settle | `150–210ms` | Brackets return from overshoot to final seats |
| Locked | `~210ms` | `LOCKED` snaps at lower-right (~90ms) |

## Switching

1. Previous brackets release outward (~90ms)
2. New attack begins ~50ms after release starts
3. Do not teleport one bracket set across cards

## Colours

| Token | Value |
| ----- | ----- |
| Near-black | `#020912` |
| Deep blue | `#09233d` |
| Blue | `#1677ad` |
| Bright | `#4bc4ee` |
| Pale | `#d7f7ff` |

## Accessibility

- Radiogroup of real radio controls; keyboard arrows / Home / End
- Focus ring distinct from selected lock state
- Announce e.g. `Beta targeted.`
- Decorative brackets / guides / badge are `aria-hidden`

## Reduced motion

Immediate final bracket composition + `LOCKED` on the selected card.

## API

- `window.tacticalTargetLock.select(root, index)`
- `window.tacticalTargetLock.clear(root)`
- `window.tacticalTargetLock.init(scope?)`
