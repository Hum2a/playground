# Ransom Note Reveal

## Visual intent

A quiet host waits until **REVEAL MESSAGE** is pressed. Irregular printed paper scraps slam in from different directions, overshoot once each, and assemble:

`NEW MATERIAL HAS ARRIVED!`

Decorative microtype scraps (`ARCHIVE`, `NOTICE`, `02`, `READ NOW`) collide around the sentence. Persona 5 collage language only — no game assets.

## DOM structure

```
.rnr[data-ransom-note]
  button.rnr__trigger
  .rnr__stage[aria-hidden]
    .rnr__scrap--new|material|has|arrived   (+ optional .rnr__backing)
    .rnr__scrap--archive|notice|num|read
  .rnr__status[role=status][aria-live=polite]
```

## Copy

| Role | Text |
| --- | --- |
| Sentence | NEW / MATERIAL / HAS / ARRIVED! |
| Scraps | ARCHIVE, NOTICE, 02, READ NOW |
| Trigger | REVEAL MESSAGE |
| Status | New material has arrived. |

## Colour and geometry

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Warm paper | `#f2eee3` |
| Bright paper | `#fffdf7` |
| Red | `#d71920` |

| Scrap | Final rotate | Enter from | Delay | Duration | Clip-path |
| --- | --- | --- | --- | --- | --- |
| NEW | `-5deg` | left | 0ms | 280ms | `polygon(0% 8%, 96% 0%, 100% 88%, 4% 100%)` |
| MATERIAL | `2deg` | top | 90ms | 300ms | `polygon(2% 0%, 100% 6%, 97% 100%, 0% 92%)` |
| ARCHIVE | `8deg` | right | 150ms | 240ms | `polygon(0% 0%, 100% 10%, 90% 100%, 0% 85%)` |
| HAS | `-2deg` | right | 220ms | 280ms | `polygon(0% 0%, 100% 12%, 92% 100%, 6% 88%)` |
| NOTICE | `-6deg` | left | 300ms | 240ms | `polygon(5% 0%, 100% 0%, 95% 100%, 0% 90%)` |
| ARRIVED! | `4deg` | bottom | 390ms | 320ms | `polygon(3% 4%, 100% 0%, 96% 94%, 0% 100%)` |
| 02 | `3deg` | top | 450ms | 240ms | `polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)` |
| READ NOW | `-4deg` | bottom | 550ms | 250ms | `polygon(0% 0%, 94% 8%, 100% 100%, 8% 92%)` |

Backings (NEW / MATERIAL / ARRIVED): hard black offsets `5px 6px` / `6px 5px` / `7px 5px` — no blur.

## Phase classes

| Class | Role |
| --- | --- |
| `.rnr--busy` | Ignore re-triggers; hide trigger |
| `.rnr--reveal` | Staggered enter animations |
| `.rnr--impact` | Whole stage nudges ~2px (~60ms) after ARRIVED settles |
| `.rnr--settled` | Final collage; animations cleared |
| `.rnr--reduced` | Instant final collage |

## Timing

Total: **850ms**.

Per major word: enter → overshoot (~scale 0.96 / +2°) → settle. Easing: `cubic-bezier(0.25, 0.8, 0.35, 1)`.

Impact nudge starts at ~710ms (ARRIVED delay + duration), lasts 60ms.

## Reduced motion

Both `@media (prefers-reduced-motion: reduce)` and `[data-force-reduced-motion="true"]`: no flight/overshoot/nudge; final collage immediately; status still announces once.

## Accessibility

- All visual scraps: `aria-hidden` on the stage
- One status string: `New material has arrived.`
- Trigger is a real button

## Porting

1. Relative overflow-hidden host.
2. Import CSS verbatim.
3. Call `revealRansomNote()` / `replayRansomNote()` (or use the button).
4. Honour both reduced-motion triggers.
