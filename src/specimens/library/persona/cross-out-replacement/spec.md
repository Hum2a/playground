# Cross-Out Replacement

## Visual intent

Old value is aggressively invalidated by irregular graphic strokes, then the replacement attacks into place. Editorial / graffiti value-change — not a soft fade swap. Persona 5–inspired print language only; no game assets.

Demo: `£49` → `£29` on a monthly plan.

## DOM structure

```
.cor[data-cross-out]
  p.cor__label                 MONTHLY PLAN
  .cor__stage
    .cor__value-slot
      .cor__old
        .cor__amount--old      £49
        .cor__strike--red      physical polygon
        .cor__strike--ink
      .cor__new
        .cor__amount--new      £29
        .cor__mark             recent-change underline
    .cor__suffix               / MONTH
  button.cor__trigger          APPLY CHANGE
  .cor__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Label | `MONTHLY PLAN` |
| Old | `£49` |
| New | `£29` |
| Suffix | `/ MONTH` |
| Trigger | `APPLY CHANGE` |
| Status | `Monthly plan changed to £29 per month.` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Strike geometry (relative to old value)

| Strike | Width | Height | Rotate | Direction | Clip |
| --- | --- | --- | --- | --- | --- |
| Red | `108%` | `11px` | `-4deg` | L→R (`scaleX` from left) | `polygon(0% 35%, 4% 0%, 100% 18%, 98% 100%, 0% 82%)` |
| Ink | `108%` | `7px` | `2deg` | R→L (`scaleX` from right) | `polygon(0% 20%, 100% 0%, 100% 78%, 2% 100%)` |

Never `text-decoration: line-through`.

## Timing

| Phase | Window | Class | Effect |
| --- | --- | --- | --- |
| Strike | 0–180ms | `.cor--strike` | Red strike grows L→R |
| Impact | ~150ms | `.cor--impact` | Old nudges `3px` / `1deg` |
| Invalidate | 180–300ms | `.cor--invalidate` | Black strike R→L |
| Replace | 260–500ms | `.cor--replace` | New attacks from below-right with overshoot |
| Exit | 420–560ms | `.cor--exit` | Old + strikes clip/pull up-left |
| Settled | done | `.cor--settled` | `£29 / MONTH` + red mark |

### New value keyframes

| Beat | Transform |
| --- | --- |
| From | `translate(26px, 32px) rotate(7deg) scale(1.18)` |
| Impact | `translate(-2px, -2px) rotate(-2deg) scale(0.96)` |
| Final | `translate(0, 0) rotate(-1deg) scale(1)` |

## Reduced motion

Immediate final `£29` state — no strikes or intermediate poses.

## Accessibility

One live-region announcement after settle. Decorative strikes/mark `aria-hidden`. Old/new toggle `aria-hidden` so AT does not hear both amounts as fragments.

## Porting

Import `demo.css` verbatim. Call `applyCrossOutReplacement` / `resetCrossOutReplacement` / `replayCrossOutReplacement`. Strike width is `%` of the value wrapper for portable digit lengths.
