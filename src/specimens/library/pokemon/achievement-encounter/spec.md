# Legendary Encounter

## Visual intent

An original abstract rare encounter: horizontal streaks sweep the host, a simplified sky/ground arena appears, a geometric gold signal flashes from silhouette to final graphic, then a paper message box identifies the anomaly. No Pokémon names, characters, balls, logos, sprites, or music.

## DOM structure

```
.ae[data-achievement-encounter]
  button.ae__trigger[data-achievement-encounter-trigger]
  .ae__overlay[data-achievement-encounter-overlay][hidden]
    .ae__streaks[aria-hidden]           8 horizontal streak bars
    .ae__arena[aria-hidden]             sky + ground + platform
    .ae__signal[aria-hidden]            CSS circles/polygons + ✦ + SIGNAL-10
    .ae__message[aria-hidden]           rare-encounter line + title
  .ae__status[role=status][aria-live=polite]
```

## Copy

| Element | Text |
| --- | --- |
| Trigger | `BEGIN ENCOUNTER` |
| Message line | `A RARE PRESENCE EMERGES.` |
| Title | `ANOMALY 010` |
| Signal code | `SIGNAL-10` |
| Signal glyph | `✦` |
| Status announce | `Rare encounter identified: Anomaly 010` |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Ground | `#54664b` |
| Sky | `#9fc8cf` |
| Ink | `#20252a` |
| Paper | `#f7f4df` |
| Gold | `#e9b83f` |
| Platform fill | `#4f8748` |
| Signal size | `96×96px` |
| Min host height | `240px` |
| Message inset | `8%` sides / bottom |

## Phase classes

| Class | Role |
| --- | --- |
| `.ae--active` | Overlay running; trigger hidden |
| `.ae--streaks` | 8 bars sweep (350ms), then removed |
| `.ae--arena` | Arena visible |
| `.ae--signal` | Signal silhouette → flash → final |
| `.ae--message` | Message box rises; anomaly title follows |
| `.ae--settled` | Static end state; animations cleared |
| `.ae--reduced` | Instant final pose (reduced motion) |

## Timing

Total: **1250ms**.

| Phase | Start | Duration |
| --- | --- | --- |
| Streaks | 0ms | 350ms |
| Arena | 350ms | 250ms |
| Signal | 600ms | 400ms |
| Message | 1000ms | 250ms |

No continuous / infinite motion after settle. Streaks do not loop.

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)` **or** `[data-force-reduced-motion="true"]`:

- Skip streak transition
- Immediately show arena + signal + message + title
- Still announce once via the status region

## Accessibility

- Trigger is a real `<button>`
- Arena, streaks, signal, and message box are decorative (`aria-hidden`)
- Anomaly identity is announced once through `role="status"` / `aria-live="polite"` when settled
- Visible `:focus-visible` ring on the trigger (gold)

## Porting to another stack

1. Mount inside `position: relative; overflow: hidden` host.
2. Import `demo.css` verbatim; keep frozen palette and phase timings.
3. Call `runAchievementEncounter()` from your encounter control, or use the built-in trigger.
4. Use `replayAchievementEncounter()` for harness Restart / re-trigger.
5. Honour both reduced-motion triggers; keep the status announcement.
