# Crescent Wipe (portable recreation spec)

PAGE A sits over PAGE B. A geometric crescent — one large circle minus an
offset dark circle — sweeps left → right and leaves PAGE B behind. Event-driven.
Never auto-loops.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

```
PAGE A → CRESCENT WIPE → PAGE B
```

## Visual intent

- PAGE A visible initially; PAGE B underneath
- Crescent diameter `520px` (circle minus offset cut) — must read as a crescent,
  not a rectangular wipe
- Start `left: -420px`; end `left: calc(100% + 420px)`
- Duration `900ms` · `cubic-bezier(.65, 0, .25, 1)`
- `2px` cyan leading edge `#72D6E8`

## DOM structure

```
.cw[data-crescent-wipe][data-phase]
  .cw__kicker
  .cw__stage[aria-label]
    .cw__page--b
    .cw__page--a
    .cw__wipe[aria-hidden]
      .cw__crescent (520px)
        .cw__disc / .cw__cut
  button[data-cw-trigger]  NEXT PHASE
  .cw__status[role=status aria-live=polite]
```

## Copy

| Role | Text |
| --- | --- |
| Kicker | `LUNAR // PHASE` |
| Page A | `PAGE A` · `PHASE 01` · `DOCK` |
| Page B | `PAGE B` · `PHASE 02` · `ORBIT` |
| Trigger | `NEXT PHASE` |
| Status idle | `Page A visible.` |
| Status done | `Page B visible.` |

## Frozen motion

| Token | Value |
| --- | --- |
| Crescent | `520px` |
| Start | `left: -420px` |
| End | `left: calc(100% + 420px)` |
| Duration | `900ms` |
| Easing | `cubic-bezier(.65, 0, .25, 1)` |
| Leading edge | `2px` `#72D6E8` |

Phases: `idle` → `run` → `done`

NEXT PHASE resets to PAGE A, then wipes once. Busy-guard ignores re-entry.

## Reduced motion

Instant PAGE B. No crescent motion. Honour both
`prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Crescent `aria-hidden`. State also in visible page copy + polite live region.
`:focus-visible` `2px solid #72D6E8` on NEXT PHASE.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Freeze 520 / -420 / `calc(100% + 420px)` / 900ms / 2px edge.
3. Call `window.crescentWipe.trigger(root)`.
