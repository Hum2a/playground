# Eclipse Transition (portable recreation spec)

Two stacked panels swap under a lunar eclipse: a geometric moon enters, a
smaller dark disc crosses it into a luminous crescent, then a dark overlay
covers the hard state change. Event-driven. Never auto-loops.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

```
CURRENT STATE → ECLIPSE → NEXT STATE
```

## Visual intent

- Stacked cards: CURRENT STATE on top, NEXT STATE underneath
- Moon diameter `180px`, `2px` cyan rim `#72D6E8`
- Smaller dark disc crosses in front → luminous crescent at centre
- Overlay max opacity `.92` — not an instant black cut
- Next state is already underneath during full dark

## DOM structure

```
.et[data-eclipse-transition][data-phase]
  .et__kicker
  .et__stage[aria-label]
    .et__panel--next
    .et__panel--current
    .et__overlay[aria-hidden]
    .et__astro[aria-hidden]
      .et__moon (180px)
        .et__lit / .et__occluder / .et__rim
  button[data-et-trigger]  TRIGGER
  .et__status[role=status aria-live=polite]
```

## Copy

| Role | Text |
| --- | --- |
| Kicker | `LUNAR // TRANSIT` |
| Current | `CURRENT STATE` · `SECTOR 01` · `STABLE FIELD` |
| Next | `NEXT STATE` · `SECTOR 02` · `ALIGNED FIELD` |
| Trigger | `TRIGGER` |
| Status idle | `Current state visible.` |
| Status done | `Next state visible.` |

## Frozen motion (1200ms)

| Phase | Window | Duration |
| --- | --- | --- |
| Enter | 0–350ms | Moon enters from outside viewport (left) |
| Eclipse | 350–650ms | Overlap / luminous crescent at centre |
| Dark | 650–850ms | Overlay → `.92`; next state exposed underneath |
| Reveal | 850–1200ms | Overlay fades; moon exits; next state remains |

Phases: `idle` → `enter` → `eclipse` → `dark` → `reveal` → `done`

TRIGGER resets to CURRENT STATE, then plays once. Busy-guard ignores re-entry.

## Reduced motion

Skip the moon. Immediately show NEXT STATE. Honour both
`prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Moon / overlay `aria-hidden`. State also in visible panel copy + polite live
region. `:focus-visible` `2px solid #72D6E8` on TRIGGER.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Freeze moon `180px`, rim `2px`, overlay `.92`, timings 350 / 300 / 200 / 350.
3. Call `window.eclipseTransition.trigger(root)`.
