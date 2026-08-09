# Water Disturbance Hover (portable recreation spec)

Calm dark-blue liquid plate. Pointer or keyboard focus disturbs the surface
locally. Atmospheric, not a glowing hover card. All coordinates stay inside the
sandboxed iframe.

## Visual intent

- 460×260 `#12304A` surface on `#09111D`
- Idle: static horizontal wave lines, no loop
- Live: radial highlight at `--disturb-x/--disturb-y`, ≤8px line nudges, three rings
- Leave / blur: return to calm (~300ms)

## DOM structure

```
.wdh[data-water-disturbance]
  .wdh__kicker
  .wdh__surface[tabindex=0][data-wdh-surface]
    .wdh__lines > .wdh__line × 6
    .wdh__glow
    .wdh__static
    .wdh__rings > .wdh__ring × 3
    .wdh__label            WATER SURFACE
  .wdh__hint
  .wdh__status[role=status]
```

## Pointer contract

Listen only on the local surface:

- `pointerenter` — set `--disturb-x/--disturb-y`, force one ripple
- `pointermove` — rAF-update custom props; restart ripple if travel ≥ `18px`
- `pointerleave` — calm (or focus equivalent if still focused)

Never read `window.parent`, `parent.document`, or `top.document`.

## Ripple

| Token | Value |
| --- | --- |
| Rings | `3` (reused nodes) |
| Stroke | `2px` `#72D6E8` |
| Duration | `520ms` |
| Origin | `--disturb-x` / `--disturb-y` |

## Distortion

Six horizontal `#236B91` lines. Nearby lines translate ≤ **8px**. No fluid sim.
No randomness.

## Keyboard

Focus-visible: static disturbance at `230px, 130px` (surface centre). Same
highlight language without expanding rings required.

## Reduced motion

No expanding ripples. No line displacement. Static cyan circle at the pointer
or focus point. Hover/focus still readable.

## API

- `window.waterDisturbanceHover.init(scope?)`

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep 460×260, 3 rings, 520ms, 8px max nudge, frozen palette.
3. Honour both reduced-motion triggers.
