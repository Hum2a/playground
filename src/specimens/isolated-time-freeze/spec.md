# Isolated Time Freeze

## Visual intent

Four processes run restrained local activity. On **FREEZE + EXECUTE C**, A / B / D freeze in place within 50ms while a thin boundary field constructs with an intentional opening at **C // EXPORT**. C alone advances `42% → 100%`, holds as EXPORT COMPLETE, then time resumes and A / B / D continue from their frozen offsets before settling. Inspired by time-freeze isolation — no characters or franchise symbols.

## DOM structure

```
.itf[data-itf][data-state]
  button[data-itf-freeze]
  .itf__status[role=status]
  .itf__clock
  .itf__host[aria-hidden]
    .itf__field          four boundary lines (opening at C)
    .itf__grid           A B / C D
```

## Copy

| Element | Text |
| --- | --- |
| Processes | `A // INDEX` · `B // SYNC` · `C // EXPORT` · `D // CLEANUP` |
| Trigger | `FREEZE + EXECUTE C` |
| Suspended | `TIME // SUSPENDED` |
| Resumed | `TIME // RESUMED` |
| Final | A/B/D `READY` · C `COMPLETE` |

## Activity patterns (frozen)

| Process | Indicator |
| --- | --- |
| A | Three-dot stepped sequence (1200ms) |
| B | Horizontal travelling packet (1600ms) |
| C | Progress rail (driven by JS) |
| D | Four-segment spinner (1800ms) |

## Timing (frozen)

| Phase | Duration | Effect |
| --- | --- | --- |
| Freeze | 50ms | Pause A/B/D animations in place; boundary constructs |
| Export | 500ms | Progress `42 → 58 → 73 → 89 → 100` |
| Hold | 120ms | `EXPORT COMPLETE` |
| Resume | 350ms | Boundary retracts; A/B/D continue (not restart) |
| Settle | end | READY / COMPLETE; animations cancelled |

## States

`idle` → `freeze` → `export` → `hold` → `resume` → `complete`

## Reduced motion

No looping indicators. Action immediately shows C COMPLETE and A/B/D READY.

## Accessibility

Status announces that A, B and D paused while Export C completed.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep timings 50 / 500 / 120 / 350 and progress values 42–100.
3. Call `runIsolatedTimeFreeze()` / `resetIsolatedTimeFreeze()` (harness restart resets).
4. Pause via Web Animations API — do not restart frozen indicators from zero.
5. Honour both reduced-motion triggers.
