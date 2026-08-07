# Level Up Overflow

## Visual intent

Progress crosses a level threshold without losing overflow: existing XP fills to
100%, the level increments, the bar resets to a new level, then remaining XP
continues. Pokemon-inspired progression language — original geometry only.

Canonical demo: Level 12 · 87/100 · +38 XP → Level 13 · 25/100.

## DOM structure

```
.luo[data-level-up-overflow]
  .luo__panel
    SPECIMEN MASTERY
    LEVEL + clipped numeric slot (12 → 13)
    XP readout
    .luo__bar-wrap
      .luo__token          +38 XP
      [role=progressbar]
        .luo__fill
        .luo__tick × 2     threshold markers
  button ADD XP
  .luo__status[role=status]
```

## Frozen values

| Token | Value |
| --- | --- |
| Start level | `12` |
| End level | `13` |
| Max XP | `100` |
| Start XP | `87` (87%) |
| Reward | `+38` |
| Phase 1 consume | `13` XP (87→100) |
| Overflow | `25` XP (25%) |
| Bar | `300×12px` |

Carryover is exact: `87 + 38 = 125`; level 12 consumes `13` XP to reach 100,
then level 13 begins at the remaining `25 / 100`.

## Timing (from ADD XP)

| Phase | Window (ms) | Effect |
| --- | --- | --- |
| Token travel | 0–180 | `+38 XP` moves to bar right |
| Fill to full | 180–440 | 87% → 100% (260ms) |
| Threshold | 440–540 | Hold 100ms; brighten; **exactly two** ticks |
| Level swap | 540–720 | 12 exits up, 13 enters (180ms) |
| Reset | 720–820 | 100% → 0% (100ms); meter resets for level 13 |
| Overflow | 820–1120 | 0% → 25% (300ms); token gone |

Do **not** animate 87% → 25% directly.

## Reduced motion

Immediate Level 13 · 25/100 (+ optional static `+38 XP APPLIED`).

## Accessibility

- `role="progressbar"` with `aria-valuetext` including level
- Meter resets when level increments (`0 of 100` then `25 of 100`)
- Status announces final level and progress

## Porting

Import `demo.css` verbatim. API: `runLevelUpOverflow` / `resetLevelUpOverflow` / `replayLevelUpOverflow`.
