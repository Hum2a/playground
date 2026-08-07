# Impact Freeze Frame (portable recreation spec)

Compact high-impact feedback: movement → contact **flash frames** → exact **80ms
frozen hold** → exaggerated consequence. The freeze must be *felt* — not faked
with easing. Portable for buttons, cards, and interaction feedback.

## CSS variable (documented recreation value)

```css
--impact-freeze: 80ms;
```

## Sequence (frozen)

| Phase | Duration | Notes |
| ----- | -------- | ----- |
| Travel | 150ms | 90px approach with late acceleration |
| Flash | 50ms | 2-frame diagonal sweep (`steps(2,end)`) |
| Freeze | **80ms** | Hard hold; wedges static; target compressed |
| Release | 110–130ms | Wedges out, target settle, token collapse |
| Applied | — | `PENDING → APPLIED` clip |

## Travel

| Property | Value |
| -------- | ----- |
| Start | `translateX(-90px)` |
| Distance | **90px** → contact at `translateX(0)` |
| Accel | first **60px** by ~67% time; final **30px** in remaining ~33% |

## Flash (contact)

Diagonal accent sweep peaks at full opacity, then settles to a **35%** wash
that persists through the freeze window. Target gains contrast boost + inset
accent border.

## Freeze (defining contract)

At contact, freeze **all** animated elements for **exactly 80ms** after flash:

- Target: `scaleX(0.96)` + `translateX(3px)` + contrast 1.12
- Token remains touching target
- Exactly **6** impact wedges at **8px**, completely static

Use `getAnimations().pause()` + freeze phase — not slowdown.

## Release

| Beat | Motion | Duration |
| ---- | ------ | -------- |
| Wedges | 8px → 28px, fade out | 110ms |
| Target | 3 → 8 → −2 → 0px; scale .96 → 1.025 → 1 | 130ms |
| Token | collapses into target | ~110ms |

## API

```js
runImpactFreeze()
resetImpactFreeze()
```

## Reduced motion

Immediately show **APPLIED**. No travel, flash, or hit-stop.

## Accessibility

Final state is normal text (`APPLIED`). Polite live region.
