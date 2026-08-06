# Instant Transmission Navigation

## Visual intent

`SESSION // 04` begins only in **REGION // A**. On **TRANSMIT**, region B is acquired (four corner brackets + centre node), the session collapses and vanishes at A with three residual fragments, a short empty teleport gap passes with no object between regions, then the session reconstructs at B. Inspired by Instant Transmission as zero-distance relocation — no characters, gestures, or franchise symbols.

## DOM structure

```
.itn[data-instant-nav][data-state][data-location]
  button[data-itn-transmit]     TRANSMIT
  .itn__status[role=status]
  .itn__host
    .itn__stage[aria-hidden]
      .itn__region--a             SESSION starts here
      .itn__gap                   intervening space (never traversed)
      .itn__region--b             destination lock + reconstruction
```

## Copy

| Element | Text |
| --- | --- |
| Regions | `REGION // A` · `REGION // B` |
| Entity | `SESSION // 04` |
| Initial A state | `LOCATION A` |
| Final A | `VACANT` |
| Final B | `SESSION // 04` |
| Trigger | `TRANSMIT` |

## Timing (frozen)

| Phase | Duration | Effect |
| --- | --- | --- |
| Lock | 140ms | 4 brackets inset 6px; node appears; SEARCHING → TARGET LOCKED |
| Collapse | 100ms | scale `1 → .72 → .28` at A |
| Fade | 35ms | opacity `1 → 0` |
| Residue | 100ms | exactly 3 horizontal fragments at A |
| Gap | 70ms | no session object anywhere between A and B |
| Arrive | 150ms | 4×4 point; scale `.12 → 1.08 → 1`; 3 arrival fragments |

Total ≈ **595ms**. Brackets retract on complete. No travel path. No looping.

## States

`idle` → `lock` → `collapse` → `fade` → `residue` → `gap` → `arrive` → `complete`

## Reduced motion

Immediately place SESSION // 04 at B; A becomes VACANT. No collapse/reconstruction.

## Accessibility

Status exposes location (`Session 04 at location A/B`) and lock progress. Stage is `aria-hidden`.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen timings (140 / 100 / 35 / 100 / 70 / 150) and fragment/bracket counts.
3. Call `transmitInstantNav()` / `resetInstantNav()` (harness restart resets to A).
4. Honour both reduced-motion triggers.
