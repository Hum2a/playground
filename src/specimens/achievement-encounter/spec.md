# Achievement Encounter

## Visual intent

An achievement unlock that stages like a rare creature-battle encounter: horizontal battle streaks sweep the host, a simplified sky/grass arena appears, a geometric gold badge flashes from silhouette to final graphic, then a paper message box rises with the encounter copy and achievement title. No Pokémon names, characters, balls, logos, sprites, or music.

## DOM structure

```
.ae[data-achievement-encounter]
  button.ae__trigger[data-achievement-encounter-trigger]
  .ae__overlay[data-achievement-encounter-overlay][hidden]
    .ae__streaks[aria-hidden]           8 horizontal streak bars
    .ae__arena[aria-hidden]             sky + grass + platform
    .ae__badge[aria-hidden]             CSS circles/polygons + ★ + ACHV-07
    .ae__message[aria-hidden]           encounter line + title
  .ae__status[role=status][aria-live=polite]
```

## Copy

| Element | Text |
| --- | --- |
| Trigger | `UNLOCK ACHIEVEMENT` |
| Message line | `A RARE ACHIEVEMENT APPEARED!` |
| Title | `EARLY ADOPTER` |
| Badge code | `ACHV-07` |
| Badge glyph | `★` |
| Status announce | `Achievement unlocked: Early Adopter` |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Grass | `#65a85b` |
| Sky | `#9bd7ef` |
| Ink | `#20252a` |
| Paper | `#f7f4df` |
| Gold | `#e9b83f` |
| Platform fill | `#4f8748` |
| Badge size | `96×96px` |
| Min host height | `240px` |
| Message inset | `8%` sides / bottom |

## Phase classes

| Class | Role |
| --- | --- |
| `.ae--active` | Overlay running; trigger hidden |
| `.ae--streaks` | 8 bars sweep (350ms), then removed |
| `.ae--arena` | Arena visible |
| `.ae--badge` | Badge silhouette → flash → final |
| `.ae--message` | Message box rises; title follows |
| `.ae--settled` | Static end state; animations cleared |
| `.ae--reduced` | Instant final pose (reduced motion) |

## Timing

Total: **1250ms**.

| Phase | Start | Duration |
| --- | --- | --- |
| Streaks | 0ms | 350ms |
| Arena | 350ms | 250ms |
| Badge | 600ms | 400ms |
| Message | 1000ms | 250ms |

No continuous / infinite motion after settle. Streaks do not loop.

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)` **or** `[data-force-reduced-motion="true"]`:

- Skip streak transition
- Immediately show arena + badge + message + title
- Still announce once via the status region

## Accessibility

- Trigger is a real `<button>`
- Arena, streaks, badge, and message box are decorative (`aria-hidden`)
- Title is announced once through `role="status"` / `aria-live="polite"` when settled
- Visible `:focus-visible` ring on the trigger (gold)

## Porting to another stack

1. Mount inside `position: relative; overflow: hidden` host.
2. Import `demo.css` verbatim; keep frozen palette and phase timings.
3. Call `runAchievementEncounter()` from your unlock control, or use the built-in trigger.
4. Use `replayAchievementEncounter()` for harness Restart / re-trigger.
5. Honour both reduced-motion triggers; keep the status announcement.
