# Episode Title Card Interrupt (portable recreation spec)

Application state pauses while a stark finite title card (**EPISODE // 12 /
OUTPUT MAXIMUM**) interrupts the live session view, then the host UI resumes.

## Copy

| Role | Text |
| ---- | ---- |
| App kicker | `LIVE SESSION` |
| App title | `OUTPUT MONITOR` |
| App meta active | `Status: ACTIVE — awaiting next directive.` |
| Card episode | `EPISODE // 12` |
| Card title | `OUTPUT MAXIMUM` |
| Card sub | `MISSION BRIEFING` |
| Live running | `Application running.` |
| Live pausing | `Application paused for title card…` |
| Live interrupted | `Title card: OUTPUT MAXIMUM. Application paused.` |
| Live resuming | `Resuming live session…` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Card slide-in | 420ms |
| Hold | 500ms |
| Resume / slide-out | 320ms |
| Total cycle | 1240ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Card inset | `3.2rem 1rem 2.5rem` |
| Card clip | `polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%)` |
| App dim opacity | 0.35 |
| App dim grayscale | 0.4 |

## API

```js
runEpisodeTitleCardInterrupt()
resetEpisodeTitleCardInterrupt()
```

## Reduced motion

Dimmed app + title card appear instantly; hold 500ms; resume without slide.

## Acceptance

1. Interrupt: app dims; meta shows `[PAUSED]`; aria-live announces pause.
2. Card slides in (420ms); holds 500ms with episode copy.
3. Resume: card exits (320ms); app returns to full opacity; live announces resume.
4. Frozen timing vars; effect clipped to host.
5. Reduced motion: instant pause/card, hold, instant resume.
6. Restart resets to idle.
