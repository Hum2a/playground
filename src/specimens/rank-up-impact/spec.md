# Rank Up Impact

## Visual intent

A major progression celebration: rank `04` anticipates, is struck and split by a red diagonal, concentric irregular rings expand, huge `05` slams in, a `RANK UP` strip attacks, then `NEW ABILITY` / `Advanced Filters` unlock. Settles to a compact `RANK 05` result. Persona 5 progression language only — no Confidant/Arcana assets.

## DOM structure

```
.rui[data-rank-up]
  .rui__card
    .rui__label ARCHIVE RANK
    .rui__rank-idle 04
    button.rui__trigger GAIN RANK
  .rui__fx[aria-hidden][hidden]
    .rui__blackout
    .rui__rings (.rui__ring--1|2|3)
    .rui__old (halves + .rui__strike)
    .rui__new 05
    .rui__strip--rankup / --ability
    .rui__ability-detail
  .rui__result[hidden] RANK 05 + Advanced Filters unlocked
  .rui__status[role=status]
```

## Colour contract

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Phase classes and timing (1550ms)

| Class | Start | Effect |
| --- | --- | --- |
| `.rui--anticipate` | 0ms | Rank scales; hard blackout shape |
| `.rui--reject` | 180ms | Red strike; 04 halves fly apart |
| `.rui--rings` | 350ms | 3 irregular rings expand (45ms stagger) |
| `.rui--impact` | 520ms | Huge 05 overshoot slam |
| `.rui--rankup` | 760ms | RANK UP strip |
| `.rui--ability` | 980ms | NEW ABILITY + Advanced Filters (+100ms) |
| `.rui--settle` | 1300ms | Rings/strips retract |
| `.rui--settled` | 1550ms | Compact result card |
| `.rui--reduced` | RM | Instant result |

## Key geometry

- Blackout clip: `polygon(8% 0%, 100% 4%, 96% 100%, 0% 94%)`
- Old half top exit: `translate(-30px, -20px)`
- Old half bot exit: `translate(25px, 30px)`
- New enter: `translateY(80px) scale(2.2) rotate(-8deg)` → impact `scale(.9) rotate(3deg)` → settle `scale(1) rotate(-1deg)`
- Strip backing offset: `5px 4px`

## Accessibility

- FX decorative: `aria-hidden`
- Status once: `Rank increased to 5. Advanced Filters unlocked.`

## Reduced motion

Both repository triggers: jump to settled result; no strike/rings/slam/panels.

## Porting

1. Relative overflow-hidden host.
2. Import CSS verbatim.
3. `runRankUp()` / `resetRankUp()` / `replayRankUp()`.
4. Honour both reduced-motion triggers.
