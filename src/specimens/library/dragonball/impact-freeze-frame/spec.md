# Impact Freeze Frame (portable recreation spec)

Compact high-impact feedback: movement → exact contact → **80ms frozen hold** →
exaggerated consequence. The freeze creates perceived impact. Portable for buttons,
cards, and interaction feedback. Dragon Ball–inspired technique language — no
franchise characters or names in the UI.

## CSS variable (documented recreation value)

```css
--impact-freeze: 80ms;
```

Not user-configurable in catalogue chrome.

## Travel

| Property | Value |
| -------- | ----- |
| Start | `translateX(-90px)` (~100px left of target contact) |
| Distance | **90px** → contact at `translateX(0)` |
| Duration | **150ms** |
| Accel | first **60px** by ~67% time; final **30px** in remaining ~33% |

## Freeze (defining contract)

At contact, freeze **all** animated elements for **exactly 80ms**:

- Target: `scaleX(0.96)` + `translateX(3px)`
- Token remains touching target
- Exactly **6** impact wedges visible at **8px**, completely static

Do **not** fake the freeze by slowing motion — use a hard hold (`getAnimations().pause()` + freeze phase).

## Release

| Beat | Motion | Duration |
| ---- | ------ | -------- |
| Wedges | 8px → 28px, fade out | 110ms |
| Target | 3 → 8 → −2 → 0px; scale .96 → 1.025 → 1 | 130ms |
| Token | collapses into target (no bounce back) | ~110ms |

## State

Only after release: `PENDING → APPLIED` via vertical clipping.

## API

```js
runImpactFreeze()
resetImpactFreeze()
```

## Reduced motion

Immediately show **APPLIED**. No travel or hit-stop.

## Accessibility

Final state is normal text (`APPLIED`).
