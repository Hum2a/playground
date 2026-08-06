# Move Learned

## Visual intent

A new capability token travels into an empty slot and permanently installs.
Pokemon-inspired move-learn language — original angular geometry only.

Canonical demo: PROCESS // 04 · SCAN / FILTER / EXPORT / empty → LEARN → SYNC.

## DOM structure

```
.mvl[data-move-learned]
  .mvl__panel
    PROCESS // 04
    ul.mvl__grid (4 slots)
      SCAN / FILTER / EXPORT / empty→SYNC
    .mvl__confirm   NEW CAPABILITY → SYNC LEARNED
    .mvl__token     SYNC (flies in)
  .mvl__list-text   readable capability list
  button LEARN
  .mvl__status[role=status]
```

## Frozen values

| Token | Value |
| --- | --- |
| Entity | `PROCESS // 04` |
| Slots | `SCAN`, `FILTER`, `EXPORT`, empty → `SYNC` |
| Slot size | `150 × 42px` |
| Token size | `80 × 30px` |
| Corner markers | `4` |
| Outline expand | `4px` |

## Timing (from LEARN)

| Phase | Window (ms) | Effect |
| --- | --- | --- |
| Approach | 0–260 | Token travels; scale `.8 → 1`; slot expands 4px; 4 corners |
| Install | 260–400 | `scaleY` compress 60ms; outline completes 140ms |
| Lock | 400–510 | Pale sweep L→R 110ms; empty styling removed |
| Confirm | 510–690 | `NEW CAPABILITY` → `SYNC LEARNED` clip |

## Reduced motion

Immediate four capabilities including SYNC + confirmation text.

## Accessibility

- Capabilities as list items + readable `.mvl__list-text`
- Status announces learned state once — not animation-only

## Porting

Import `demo.css` verbatim. API: `runMoveLearned` / `resetMoveLearned` / `replayMoveLearned`.
