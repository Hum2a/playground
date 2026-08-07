# Forget a Move

## Visual intent

Four capability slots hold `SCAN` `FILTER` `EXPORT` `CACHE`. An incoming
`SYNC` waits below. The operator selects one slot (canonical: `CACHE`) and
confirms **REPLACE**. The outgoing capability compresses, its outline breaks
into four corner segments while the label exits left, the slot holds vacant,
then `SYNC` travels into that exact place and locks. A horizontal sweep
commits the final set: `SCAN` `FILTER` `EXPORT` `SYNC`.

Pokémon-inspired forget-a-move language — abstract capability tokens only.
PK-117 / SPX-816.

This is the replacement half of the capability pair. For a capability entering
an already empty slot without removing an existing one, use
[Move Learned](../move-learned/spec.md).

## DOM structure

```
.forget-move[data-forget-move]
  .forget-move__prompt
  .forget-move__grid[role=radiogroup]
    button.forget-move__slot[role=radio] ×4
      .forget-move__brackets (.fm-br ×4)
      .forget-move__segments (.fm-seg ×4)
      .forget-move__label
    .forget-move__sweep
  .forget-move__incoming
    .forget-move__incoming-label  INCOMING
    .forget-move__sync            SYNC
  .forget-move__announce[role=status]
  .forget-move__controls
    button[data-fm-replace]  REPLACE
    button[data-fm-reset]    RESET
```

## Frozen values

| Token | Value |
| --- | --- |
| Capabilities | `SCAN` `FILTER` `EXPORT` `CACHE` |
| Incoming | `SYNC` |
| Canonical target | `CACHE` |
| Palette | `#141a1e` `#1c242a` `#f2efe4` `#e2a03a` `#d95b4e` |
| Label exit | `translateX(-70px)` |
| Compress | `scaleX(1 → 0.9)` |
| SYNC travel | `translateY(-92px)` + fade |
| Registry | `SPX-816` |

## Timing (from REPLACE)

| Phase | Window (ms) | Effect |
| --- | --- | --- |
| Compress | 0–80 | Slot `scaleX` 1→0.9 (`is-compressing`) |
| Break | 80–260 | Label exits −70px; outline splits into 4 segments retracting to corners (`is-breaking`) |
| Vacancy | 260–360 | Empty slot hold (`is-vacant`) |
| Install | 360–580 | SYNC travels; four segments rebuild inward; label becomes SYNC (`is-installing` on root + slot) |
| Sweep | 580–740 | Horizontal line through all four slots (`is-sweeping`); slot `is-locked` |

Total ≈ 740ms.

## Observable state order and replay

`data-state` progresses deterministically through
`idle → compressing → breaking → vacant → installing → locking → done`. The
status first names the selected replacement, then confirms `SYNC replaced
{outgoing}. Capability set locked.` at the terminal state. `RESET` restores
the exact idle state; `replayForgetMove()` and a harness `restart` message
reset before running the same selected default sequence.

## Selection

- Radiogroup of four radios; default `CACHE` on bind
- Selected slot shows **exactly four** angular corner brackets
- Do **not** permanently change text size for selection emphasis

## Reduced motion

Selection remains keyboard/pointer accessible. **REPLACE** instantly swaps the
selected label to `SYNC`, announces, and shows RESET — no compress / break /
travel / sweep choreography.

Triggers: `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]`.

## Accessibility

- `role="radiogroup"` + `role="radio"` with `aria-checked`
- Arrow / Home / End move selection; Space / Enter or REPLACE confirms
- Status names the selected replacement and terminal locked set in text
- Decorative brackets, segments, and sweep: `aria-hidden`

## Porting

Import `demo.css` verbatim. API: `runForgetMove` / `resetForgetMove` /
`replayForgetMove`.
Root class: `forget-move`. Slot phases: `is-compressing` `is-breaking`
`is-vacant` `is-installing` `is-locked`. Root phases: `is-installing`
`is-sweeping`.
