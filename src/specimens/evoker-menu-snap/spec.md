# Evoker Menu Snap

## Visual intent

A decisive vertical command menu where changing selection commits in ~210ms: the previous backing contracts and clips away, a thin bright-blue execution line attacks left→right across the new row, angular navy/pale plates snap into place, and the label settles with a left targeting marker. Inspired by Persona 3 Reload’s Evoker-associated selection timing — graphic commitment only, no weapon imagery.

Sibling to `precision-menu-snap` (SPX-006 / P3-037) with a faster horizontal-line-first choreography.

## DOM structure

```
.ems[data-evoker-menu][data-selected]
  .ems__rail[role=radiogroup]
    button.ems__item[role=radio] ×4
      .ems__plate[aria-hidden]        navy main + pale shard + edge + highlight
      .ems__marker[aria-hidden]       CSS triangle targeting mark (not ▶)
      .ems__line[aria-hidden]         execution line
      .ems__label                     OVERVIEW | SPECIMENS | CONTRACT | INTEGRATION
```

## Copy

| Index | Label |
| --- | --- |
| 0 | OVERVIEW |
| 1 | SPECIMENS |
| 2 | CONTRACT |
| 3 | INTEGRATION |

Default selection: OVERVIEW.

## Layout and colour contract

| Token | Value |
| --- | --- |
| Deep navy | `#071525` |
| Blue | `#1565c0` |
| Bright blue | `#42a5f5` |
| Pale | `#d9f1ff` |
| White | `#f4fbff` |
| Stage | `#040d18` |
| Menu width | `min(100%, 260px)` |
| Row height | `52px` |
| Gap | `4px` |

No rounded pills. Flat fills. Angular `clip-path` geometry only.

## Selection-state classes

| Class / attr | Role |
| --- | --- |
| `[data-selected="0"…"3"]` | Settled selection index; drives neighbour nudge while busy |
| `.ems--busy` | Transient while choreography is in flight |
| `.ems__item--exit` | Previous plate contracts (~60ms) |
| `.ems__item--line` | Execution line travel (~65ms from ~35ms) |
| `.ems__item--snap` | Angular plates translate into place (~80ms from ~70ms) |
| `.ems__item--authority` | Label scale/shift + marker lock (~90ms from ~120ms) |
| `.ems__item--active` | Settled authoritative selected styling |

## Timing

Total selection change: **~210ms** (target 190–230ms). Phases overlap.

| Phase | Window | Effect |
| --- | --- | --- |
| Release | 0–60ms | Previous backing `scaleX` 1→0.82 then clips away; label ≤2px |
| Execution line | ~35–100ms | Bright line width 0→115%, height ~2px, L→R overshoot |
| Snap | ~70–150ms | Main plate `translateX(-18px→0)`; shard `(14px→0)` — sharp easing |
| Authority | ~120–210ms | Label `0→8→6px`, scale `1→1.045→1.03`; marker locks left |

Easing: sharp cubic-beziers — no bounce/spring.

Neighbours while `.ems--busy`: ±3px for ~80–120ms, then settle. Whole menu does not animate.

## Keyboard

- Semantics: `role="radiogroup"` + `role="radio"` with roving `tabindex`
- Arrow Down / Right → next
- Arrow Up / Left → previous
- Home / End → first / last
- Enter / Space re-assert current (preventDefault)
- Click / tap selects

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)` **or** `[data-force-reduced-motion="true"]`:

- All transitions/animations disabled
- Selection applies immediately via JS `applyImmediate`
- Settled selected styling remains (navy backing, edge, highlight, marker)
- No execution line travel; no neighbour movement

## Accessibility

- Options are real `<button role="radio">` controls with `aria-checked`
- Decorative plate / line / marker are `aria-hidden="true"`
- Visible `:focus-visible` ring in bright blue (independent of selection)
- Selected state uses geometry + marker, not colour alone
- DOM order preserved

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim into a relative overflow-clipped host.
2. Keep the frozen hex palette and phase timings (35 / 70 / 120 / 210ms).
3. Call `selectEvokerMenu(index)` or rely on auto-init on `[data-evoker-menu]`.
4. Honour both reduced-motion triggers.
5. No parent frame access, storage, or network (`sandbox="allow-scripts"` safe).
