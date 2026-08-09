# Password Reveal Cutout (portable recreation spec)

A genuine password field whose characters are covered by a dark rectangular
mask. REVEAL tears the mask away; HIDE slams it back from the right.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Native `<input type="password">` with demo value `archive-key-77`
- Label: `PASSWORD`
- Toggle: `REVEAL` ↔ `HIDE`, `aria-pressed`
- Visibility truth = `type` `password` ↔ `text`
- Mask is visual only (pointer-events none) and covers **100%** of the well

## Tear

Deterministic jagged right edge (frozen polygon, never random):

```
0 0 → 93 0 → 96 7 → 91 14 → 97 22 → 92 31 → 98 40 → 90 49 →
96 58 → 91 67 → 98 76 → 93 85 → 97 93 → 92 100 → 0 100 → 0 0
```

Cyan tear edge: `2px` `#72D6E8` (drop-shadow along the clip).

## Motion

| Action | Duration | Transform | Easing |
| --- | --- | --- | --- |
| Reveal | `520ms` | `translateX(0 → 110%)` | `cubic-bezier(.2,.8,.2,1)` |
| Hide | `360ms` | Slam from the right (skew + overshoot, not a literal reverse) | `cubic-bezier(.62,.05,.88,.15)` |

Swap to `type="text"` when reveal starts so characters appear as the mask peels.
Swap back to `password` when the hide slam settles.

## Reduced motion

Instant mask pose + type swap. No travel.

## Porting

Import `demo.css` verbatim. Tiny JS API: `window.passwordRevealCutout`.
