# Calling Card Peel

## Visual intent

A crooked printed notice is **already attached** across a host card. On trigger, the upper-right corner catches and curls, the sheet tensions, then peels diagonally top-right → bottom-left, and flicks away — revealing content that was underneath the entire time. Distinct from Calling Card Slam (arrival); this is obstruction **leaving**.

No Persona 5 logos, calling-card art, characters, game fonts, or extracted assets.

## DOM structure

```
.ccp[data-calling-card-peel]
  .ccp__host                         always present underneath
    .ccp__host-eyebrow|title|body
    button.ccp__host-action
  .ccp__obstruction[aria-hidden]     paper + backing + fold
    .ccp__backing
    .ccp__paper
      .ccp__surface                  copy + clip-path peel edge
      .ccp__fold                     corner curl (under + face)
  button.ccp__trigger                PEEL NOTICE
  .ccp__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Paper eyebrow | `NOTICE // ARCHIVE` |
| Paper message | `CLASSIFIED` |
| Paper secondary | `REMOVE TO REVEAL` |
| Microtype | `RESTRICTED · RESTRICTED · RESTRICTED ·` |
| Host eyebrow | `ARCHIVE // 02` |
| Host title | `HIDDEN MATERIAL` |
| Host body | `This section is now available.` |
| Host action | `OPEN MATERIAL` |
| Trigger | `PEEL NOTICE` |

## Layout and colour contract

| Token / dim | Value |
| --- | --- |
| Paper | `#f2eee3` |
| Ink | `#090909` |
| Accent red | `#d71920` |
| Sheet width | `112%` |
| Sheet height | `78%` |
| Sheet left / top | `-6%` / `11%` |
| Initial rotate | `-3deg` |
| Transform origin | `100% 0%` |
| Backing offset | `7px 9px` |
| Backing lag | `40ms` |
| Perspective | `900px` |
| Surface clip (idle) | `polygon(2% 4%, 97% 0.5%, 100% 7%, 98% 96%, 3% 100%, 0% 7%)` |
| Backing clip | `polygon(1% 5%, 99% 0%, 100% 9%, 98% 97%, 2% 100%, 0% 8%)` |

## Phase classes

| Class | Window | Effect |
| --- | --- | --- |
| *(idle)* | — | Paper attached; no entrance |
| `.ccp--lift` | 0–180ms | Corner fold scales in; slight TR clip |
| `.ccp--tension` | 180–340ms | Sheet skew/rotate; fold grows |
| `.ccp--peel` | 340–800ms | Diagonal clip + translate toward BL |
| `.ccp--release` | 800–1040ms | Fast flick off-host |
| `.ccp--revealed` | done | Obstruction hidden; action enabled |
| `.ccp--reduced` | RM | Instant reveal |
| `.ccp--busy` | during | Ignore re-triggers |

## Timing

Total: **1040ms**.

| Phase | Duration | Easing |
| --- | --- | --- |
| Lift | 180ms | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| Tension | 160ms | `cubic-bezier(0.4, 0, 0.4, 1)` |
| Peel | 460ms | `cubic-bezier(0.45, 0.05, 0.55, 1)` |
| Release | 240ms | `cubic-bezier(0.55, 0, 0.75, 0.2)` |

No opacity fade as the primary removal. Geometry + transform exit the host.

## Reduced motion

Both `@media (prefers-reduced-motion: reduce)` and `[data-force-reduced-motion="true"]`: skip curl/travel; jump to revealed. Static attached paper remains clear before activation.

## Accessibility

- Decorative obstruction: `aria-hidden="true"`
- Status region announces restricted vs revealed
- Real buttons for peel trigger and host action
- Host action stays disabled until revealed; no focus steal into paper

## Porting

1. Host: `position: relative; overflow: hidden`.
2. Keep underlying content in the DOM under the obstruction.
3. Import CSS verbatim; call `peelCallingCard(onRevealed)` or use the PEEL NOTICE button.
4. `replayCallingCardPeel()` / harness `{ type: 'restart' }` reset then peel.
5. Honour both reduced-motion triggers.
