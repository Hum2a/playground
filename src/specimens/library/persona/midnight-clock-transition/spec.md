# Midnight Clock Transition (portable recreation spec)

Temporal threshold: an abstract clock accelerates from ~23:54 to midnight.
Hands align at 12, a pale vertical seam splits the host, and dark-blue panels
wipe outward while the date/state swap. Rebuild from this document, `demo.css`,
`demo.js`, and `contract.json`.

## Visual intent

- Minimal clock: ring, 12 markers, hour/minute hands, hub — no realistic art
- Starts at geometrically correct 23:54 (hour `357deg`, minute `324deg`)
- Minute hand travels much farther/faster than hour (~1008deg vs ~3deg)
- Digital display steps `23:54 → 23:56 → 23:58 → 23:59 → 00:00` (decorative only)
- At alignment: 2px pale vertical seam; panels expand centre→edges; swap under cover
- Destination: `07 APR` / `MIDNIGHT` / `00:00` with a smaller static clock

## Timeline (frozen)

| Phase | Window |
| --- | --- |
| Anticipate | 0–120ms |
| Accelerate | 120–620ms |
| Seam impact | 620ms (~100ms grow) |
| Panel wipe | 620–800ms (~180ms cover) |
| Swap | ~700ms (hidden) |
| Reveal | 800–900ms (panels exit outward) |
| Total | ~900ms |

## Hand keyframes

- Hour: `357deg → 360deg` (easing accelerates late)
- Minute: `324deg → 1008deg` (≡ `0deg`, ≈1.9 turns)

## DOM structure

```html
<div class="midnight-clock" data-midnight-clock>
  <div class="midnight-clock__stage">
    <div class="midnight-clock__panels">seam + left/right panels</div>
    <div data-mc-scene="a">06 APR / LATE EVENING / 23:54 / clock</div>
    <div data-mc-scene="b" hidden>07 APR / MIDNIGHT / 00:00 / mini clock</div>
    <p role="status" aria-live="polite">…</p>
  </div>
  <button type="button" data-mc-advance>ADVANCE TIME</button>
  <button type="button" data-mc-reset>RESET</button>
</div>
```

## Colours

| Token | Hex |
| --- | --- |
| Near-black | `#020912` |
| Deep blue | `#071e38` |
| Blue | `#155f8e` |
| Bright | `#45b8df` |
| Pale | `#d7f6ff` |

## Accessibility

- Clock face is `aria-hidden`
- Status announces evening initially; final: `Midnight. 7 April.`
- Do not announce intermediate digital steps

## Reduced motion

Immediate swap to midnight state — no hand travel or panel wipe.

## Integration

- Import `demo.css` verbatim
- Call `advanceToMidnight` / `resetMidnightClock` / `replayMidnightClock`
- Use `type="button"` controls
- No external assets, libraries, or network
