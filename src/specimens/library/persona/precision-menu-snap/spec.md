# Precision Menu Snap

## Visual intent

A sharp angled command menu where changing selection **snaps** into alignment — thin cyan targeting lines re-aim, the previous plate contracts, and the new option plate punches outward with a short mechanical recoil. Inspired by Persona 3 Reload’s precision battle-menu language without reproducing game assets or weapon imagery.

## DOM structure

```
.pms[data-precision-menu][data-selected]
  .pms__stage[aria-hidden]          decorative targeting chrome
    .pms__radial                    circular CSS accent
    .pms__target--a|b|c             thin cyan aiming lines
    .pms__bracket--tl|br            angular corner marks
  .pms__rail[role=radiogroup]
    button.pms__option[role=radio] ×4
      .pms__index                   01–04
      .pms__label                   ACTION | ITEM | STATUS | EXIT
      .pms__accent                  cyan underline (scaleX)
      .pms__corners                 angular brackets on selected plate
```

## Copy

| Index | Label |
| --- | --- |
| 01 | ACTION |
| 02 | ITEM |
| 03 | STATUS |
| 04 | EXIT |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Navy stage | `#06182d` |
| Blue plate fill | `#087dcc` / selected fill `#0a3f66` |
| Cyan accent | `#50d6ff` |
| White labels | `#f5fbff` |
| Rail angle | `-14deg` |
| Option height | `44px` |
| Option gap | `10px` |
| Selected plate offset | `translateX(10px)` |
| Label shift | `translateX(10px)` |
| Recoil | `1–2px` vertical |
| Max width | `300px` |
| Min height | `280px` |
| Left chrome | `56px` padding for targeting stage |

No rounded pills. Flat fills only (no soft gradients). Circular accent is CSS borders + centre dot.

## Selection-state classes

| Class / attr | Role |
| --- | --- |
| `[data-selected="0"…"3"]` | Drives targeting-line aim via CSS custom properties |
| `.pms__option--selected` / `[aria-checked="true"]` | Settled selected geometry |
| `.pms--settling` | Transient while a change is in flight |
| `.pms__option--exit` | Previous plate contracts (~90ms) |
| `.pms__option--enter` | New plate snaps outward |
| `.pms--recoil` | Tiny settle after snap |

## Timing

Total selection change: **260ms**.

| Phase | Window | Duration | Effect |
| --- | --- | --- | --- |
| Contract | 0–90ms | 90ms | Previous indicator contracts (`--exit`) |
| Target | ~40–140ms | ~100ms stepped | Targeting lines move toward new option |
| Snap | 90–200ms | 110ms | New plate + label snap (`--enter`) |
| Accent | ~120–220ms | 100ms (30ms delay) | Cyan line `scaleX` 0→100% |
| Recoil | 200–260ms | 60ms | 1–2px settle |

Easing: `steps(2–3, end)` — no soft sliding.

## Keyboard

- Semantics: `role="radiogroup"` + `role="radio"` with roving `tabindex`
- Arrow Down / Right → next
- Arrow Up / Left → previous
- Home / End → first / last
- Click / tap selects

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)` **or** `[data-force-reduced-motion="true"]`:

- All transitions/animations disabled
- Selection applies immediately
- Selected plate offset, corners, and accent line at 100% remain visible

JS mirrors both triggers via `prefersReducedMotion()`.

## Accessibility

- Options are real `<button role="radio">` controls
- Decorative stage is `aria-hidden="true"`
- Visible `:focus-visible` ring in cyan
- Selected state uses geometry (offset plate, brackets, accent), not colour alone

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim into a relative overflow-clipped host.
2. Keep the frozen hex palette and timing constants (`CONTRACT_MS` / `SNAP_MS` / `RECOIL_MS`).
3. Call `selectPrecisionMenu(index)` or rely on auto-init on `[data-precision-menu]`.
4. Honour both reduced-motion triggers.
5. No parent frame access, storage, or network required (`sandbox="allow-scripts"` safe).
