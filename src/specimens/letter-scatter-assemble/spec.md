# Letter Scatter Assemble

## Visual intent

Individual letters begin scattered around a dark host and rapidly assemble into a two-line headline — `NEW MATERIAL` then `AVAILABLE`. Kinetic typography with deliberate overshoot, not a soft fade-in. Inspired by Persona 5 graphic instability; no game fonts, logos, or copy.

## DOM structure

```
.lsa[data-letter-scatter]
  button.lsa__trigger
  p.lsa__sr-only                 "New material available"
  .lsa__stage[aria-hidden]
    .lsa__headline
      .lsa__line--primary        NEW MATERIAL (flex layout)
        span.lsa__letter--*
        span.lsa__gap
      .lsa__line--secondary      AVAILABLE
        span.lsa__letter--av-*
    .lsa__shards                 4 decorative red shards
  .lsa__status[role=status]
```

Final kerning comes from the flex line layout. Scatter is only `transform` on each letter — never absolute `left`/`top` for the resting pose.

## Copy

| Layer | Text |
| --- | --- |
| Line 1 | `NEW MATERIAL` |
| Line 2 | `AVAILABLE` |
| Trigger | `ASSEMBLE` |
| SR / status | `New material available` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Frozen initial transforms

Deterministic custom properties on each letter (`--sx --sy --sr --ss`). No runtime randomness.

| Letter | translate | rotate | scale | delay | dur |
| --- | --- | --- | --- | --- | --- |
| N | -148, -92 | -28° | 1.32 | 0ms | 460ms |
| E₁ | 132, -98 | 24° | 0.72 | 48ms | 420ms |
| W | -88, 108 | -16° | 1.18 | 96ms | 480ms |
| M | 158, 36 | 30° | 0.84 | 28ms | 500ms |
| A₁ | -156, 18 | -32° | 1.38 | 124ms | 440ms |
| T | 62, -108 | 14° | 0.7 | 72ms | 390ms |
| E₂ | -42, 118 | -24° | 1.12 | 168ms | 510ms |
| R | 108, 94 | 28° | 0.66 | 208ms | 450ms |
| I | -126, -54 | 12° | 1.42 | 112ms | 470ms |
| A₂ | 146, -74 | -20° | 0.9 | 248ms | 430ms |
| L₁ | -74, 86 | 32° | 1.24 | 188ms | 490ms |
| A (AV) | 128, -88 | -30° | 1.2 | 196ms | 440ms |
| V | -142, 48 | 26° | 0.68 | 248ms | 460ms |
| A | 38, 116 | -14° | 1.34 | 292ms | 400ms |
| I | -104, -102 | 18° | 0.78 | 268ms | 480ms |
| L | 160, 8 | -26° | 1.08 | 336ms | 420ms |
| A | -56, -78 | 30° | 0.94 | 372ms | 450ms |
| B | 84, 104 | -22° | 1.28 | 312ms | 500ms |
| L | -134, 92 | 16° | 0.74 | 408ms | 430ms |
| E (finale) | 118, -64 | -34° | 1.44 | 456ms | 520ms |

Overshoot targets (`--ox --oy --or`) are 2–6px / 1–4px / 1–3° past the baseline, then settle to identity.

## Timing

| Beat | When |
| --- | --- |
| NEW MATERIAL stagger | 0–248ms |
| AVAILABLE starts | ~180ms after assemble begins (first AV letter 196ms) |
| Collision shards | 520ms, 120ms |
| Finale E lands | ~976ms |
| Whole-word recoil | +90ms (`translateX(2px)` → 0) |
| Total | ~1066ms |

## Phase classes

| Class | Effect |
| --- | --- |
| `.lsa--assemble` | Per-letter assemble keyframes |
| `.lsa--shards` | Four red shards flash |
| `.lsa--recoil` | Headline nudges 2px on finale |
| `.lsa--settled` | Final readable pose |
| `.lsa--reduced` | Instant final pose |
| `.lsa--busy` | Ignore re-triggers |

## Reduced motion

Under `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, show the complete headline immediately — no scatter, shards, or recoil.

## Accessibility

- One semantic phrase: visually hidden `New material available`
- Animated letters are `aria-hidden` (stage)
- Status region announces once on settle
- Do not expose per-letter reading order

## Porting

Import `demo.css` verbatim. Call `assembleLetterScatter` / `resetLetterScatter` / `replayLetterScatter`. Host needs `position: relative; overflow: hidden`. Honour both reduced-motion triggers.
